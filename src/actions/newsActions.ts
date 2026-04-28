"use server";

import { scrapeJamunaTV } from "@/lib/scraper";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import News from "@/models/News";
import { summarizeNews, classifyNews } from "@/lib/ai";

export async function fetchLatestNews(shouldRevalidate = true) {
  try {
    await connectDB();
    console.log("Starting to scrape Jamuna TV...");
    
    const newsData = await scrapeJamunaTV();
    console.log(`Successfully scraped ${newsData.length} articles.`);
    
    let processedNews = [];

    if (newsData.length > 0) {
      // Process with AI and save to MongoDB
      for (const item of newsData) {
        // AI Summarization and Classification
        const aiSummary = await summarizeNews(item.title, item.summary);
        const priority = await classifyNews(item.title, aiSummary);

        const processedItem = {
          ...item,
          summary: aiSummary,
          priority: priority,
        };

        const savedItem = await News.findOneAndUpdate(
          { originalUrl: item.originalUrl },
          processedItem,
          { upsert: true, new: true }
        );
        processedNews.push(savedItem);
      }
    } else {
      console.log("No news scraped, using mock data for demonstration.");
      processedNews = getMockNews();
    }

    // Revalidate the home page cache if requested (only from server actions)
    if (shouldRevalidate) {
      revalidatePath("/");
    }
    
    return JSON.parse(JSON.stringify(processedNews));
    
  } catch (error) {
    console.error("Error in server action:", error);
    return JSON.parse(JSON.stringify(getMockNews()));
  }
}

function getMockNews() {
  return [
    {
      _id: "m1",
      title: "Metro Rail schedules changed: Effective from tomorrow",
      summary: "The Dhaka Metro Rail authorities have announced new schedules starting tomorrow to accommodate more passengers during peak hours.",
      category: "National",
      priority: "high",
      imageUrl: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2070&auto=format&fit=crop",
      source: "Mock News",
      publishedAt: new Date().toISOString(),
      originalUrl: "#"
    },
    {
      _id: "m2",
      title: "BPL Finals: Two giants face off in the ultimate battle",
      summary: "The Bangladesh Premier League reaches its climax as Comilla Victorians take on Fortune Barishal in the grand finale tonight.",
      category: "Sports",
      priority: "medium",
      imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2105&auto=format&fit=crop",
      source: "Mock News",
      publishedAt: new Date().toISOString(),
      originalUrl: "#"
    },
    {
      _id: "m3",
      title: "Foreign Exchange Reserve: Major boost after remittance surge",
      summary: "Bangladesh's foreign exchange reserves have seen a significant boost following a record-breaking surge in inward remittances this month.",
      category: "Economy",
      priority: "medium",
      imageUrl: "https://images.unsplash.com/photo-1611974714851-48206138d731?q=80&w=2070&auto=format&fit=crop",
      source: "Mock News",
      publishedAt: new Date().toISOString(),
      originalUrl: "#"
    },
    {
      _id: "m4",
      title: "Severe cold wave expected to sweep across North Bangladesh",
      summary: "The Meteorological Department has warned that temperatures may drop significantly in the northern districts over the next 48 hours.",
      category: "Weather",
      priority: "high",
      imageUrl: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2070&auto=format&fit=crop",
      source: "Mock News",
      publishedAt: new Date().toISOString(),
      originalUrl: "#"
    }
  ];
}

export async function getNewsFromDB() {
  try {
    await connectDB();
    const news = await News.find().sort({ createdAt: -1 }).limit(20);
    return JSON.parse(JSON.stringify(news));
  } catch (error) {
    console.error("Error fetching news from DB:", error);
    return [];
  }
}

export async function getNewsById(id: string) {
  try {
    await connectDB();
    const newsItem = await News.findById(id);
    return newsItem ? JSON.parse(JSON.stringify(newsItem)) : null;
  } catch (error) {
    console.error("Error fetching news by ID:", error);
    return null;
  }
}

export async function searchNews(query: string) {
  try {
    await connectDB();
    const news = await News.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { summary: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(20);
    return JSON.parse(JSON.stringify(news));
  } catch (error) {
    console.error("Error searching news:", error);
    return [];
  }
}