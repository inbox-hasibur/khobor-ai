"use server";

import { scrapeJamunaTV } from "@/lib/scraper";
import { revalidatePath } from "next/cache";

export async function fetchLatestNews() {
  try {
    console.log("Starting to scrape Jamuna TV...");
    
    // Call the scraper function you just wrote
    const newsData = await scrapeJamunaTV();
    
    console.log(`Successfully scraped ${newsData.length} articles.`);
    
    // (Future Step: Here we will save this data to MongoDB)

    // Revalidate the home page cache to show new data
    revalidatePath("/");
    
    return newsData;
    
  } catch (error) {
    console.error("Error in server action:", error);
    return [];
  }
}