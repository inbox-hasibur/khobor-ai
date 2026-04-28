import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function summarizeNews(title: string, content: string) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY not found, skipping summarization.");
      return content.slice(0, 150) + "...";
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert news editor for "Khobor AI". 
      Summarize the following news article into a concise, engaging, and conversational summary in Bangla.
      The summary should be suitable for an audio briefing and should be between 60-90 words.
      
      Title: ${title}
      Content: ${content}
      
      Summary (in Bangla):
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Error summarizing with Gemini:", error);
    return content.slice(0, 150) + "...";
  }
}

export async function classifyNews(title: string, summary: string) {
  try {
    if (!process.env.GEMINI_API_KEY) return "medium";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Classify the following news item into one of these priorities: "high", "medium", or "low".
      High priority is for urgent utility news (traffic, protests, strikes, emergency alerts).
      Medium priority is for important daily news (national, economy, politics).
      Low priority is for general interest (sports, entertainment, weather).
      
      Title: ${title}
      Summary: ${summary}
      
      Priority (high/medium/low):
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const priority = response.text().trim().toLowerCase();
    
    if (["high", "medium", "low"].includes(priority)) {
      return priority as "high" | "medium" | "low";
    }
    return "medium";
  } catch (error) {
    console.error("Error classifying with Gemini:", error);
    return "medium";
  }
}
