import { inngest } from "../client";
import { createBackgroundClient } from "@/utils/supabase/background";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const processArticle = inngest.createFunction(
  { id: "process-article" },
  { event: "app/process-article" },
  async ({ event, step }) => {
    const { url, title, sourceId, category } = event.data;
    const supabase = createBackgroundClient();

    // 1. Layer 2: Deep Extraction via Jina AI
    const markdown = await step.run("extract-markdown", async () => {
      try {
        const response = await axios.get(`https://r.jina.ai/${url}`);
        return response.data;
      } catch (error) {
        throw new Error(`Failed to extract markdown from ${url}`);
      }
    });

    if (!markdown) {
      return { status: "failed", reason: "No markdown extracted" };
    }

    // 2. Fetch System Prompts from DB
    const { evaluatorPrompt, synthesizerPrompt, autoApprove } = await step.run("fetch-prompts", async () => {
      const { data } = await supabase
        .from("system_settings")
        .select("setting_key, setting_value");
      
      let ePrompt = "Respond YES if valid news, otherwise NO.";
      let sPrompt = "Summarize the news.";
      let autoApp = true; // By default auto-approve is on
      
      if (data) {
        const eSetting = data.find(s => s.setting_key === "evaluator_prompt");
        const sSetting = data.find(s => s.setting_key === "synthesizer_prompt");
        const autoSetting = data.find(s => s.setting_key === "auto_approve_news");
        
        if (eSetting) ePrompt = eSetting.setting_value;
        if (sSetting) sPrompt = sSetting.setting_value;
        if (autoSetting) autoApp = autoSetting.setting_value === "true";
      }
      return { evaluatorPrompt: ePrompt, synthesizerPrompt: sPrompt, autoApprove: autoApp };
    });

    // 3. Layer 2.5: AI Evaluator
    const isGood = await step.run("evaluate-article", async () => {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `${evaluatorPrompt}\n\nArticle Markdown:\n${markdown}`;
      
      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim().toUpperCase();
      
      return responseText.includes("YES");
    });

    if (!isGood) {
      return { status: "dropped", reason: "AI Evaluator rejected the article." };
    }

    // 4. Layer 3: AI Synthesis
    const synthesizedContent = await step.run("synthesize-content", async () => {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `${synthesizerPrompt}\n\nTitle: ${title}\nCategory: ${category}\n\nArticle Content:\n${markdown}`;
      
      const result = await model.generateContent(prompt);
      return result.response.text();
    });

    // 5. Save to Supabase (news_articles)
    await step.run("save-to-db", async () => {
      const { error } = await supabase
        .from("news_articles")
        .insert({
          headline: title,
          raw_content: markdown,
          ai_summary: synthesizedContent,
          status: autoApprove ? "published" : "draft", // Depends on auto_approve_news setting
          original_url: url,
          source: url, // Could use source name instead
          published_at: new Date().toISOString()
        });
      
      if (error) {
        throw new Error(`Failed to save to DB: ${error.message}`);
      }
    });

    return { status: "success", title };
  }
);
