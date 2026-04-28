import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeJamunaTV() {
  try {
    // Try Jamuna TV
    const newsItems = await scrapeSource("https://www.jamuna.tv/", ".post-item, article, .news-item");
    if (newsItems.length > 0) return newsItems;

    // Fallback to a secondary source if Jamuna fails (403 or empty)
    console.log("Jamuna TV failed or blocked, trying fallback source...");
    return await scrapeSource("https://www.dhakatribune.com/articles/latest", ".news-list-item, article, .news-item");
  } catch (error) {
    console.error("Error in scraping service:", error);
    return [];
  }
}

async function scrapeSource(url: string, selector: string) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      },
      timeout: 10000,
    });

    const $ = cheerio.load(data);
    const newsItems: any[] = [];

    $(selector).each((i, element) => {
      if (newsItems.length < 10) {
        const title = $(element).find("h1, h2, h3, .title, .post-title, .heading").first().text().trim();
        const summary = $(element).find("p, .description, .summary, .excerpt, .post-content").first().text().trim();
        const imageUrl = $(element).find("img").attr("src") || $(element).find("img").attr("data-src");
        const originalUrl = $(element).find("a").attr("href");

        if (title && title.length > 10 && originalUrl) {
          let fullUrl = originalUrl;
          if (!originalUrl.startsWith("http")) {
            const domain = new URL(url).origin;
            fullUrl = `${domain}${originalUrl.startsWith("/") ? "" : "/"}${originalUrl}`;
          }

          if (!newsItems.some(item => item.originalUrl === fullUrl)) {
            newsItems.push({
              title,
              summary: summary || "সংক্ষিপ্ত বিবরণ পাওয়া যায়নি।",
              imageUrl: imageUrl || "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2070&auto=format&fit=crop",
              originalUrl: fullUrl,
              source: new URL(url).hostname.replace("www.", ""),
              category: "National",
              priority: "medium",
              publishedAt: new Date(),
              expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            });
          }
        }
      }
    });

    return newsItems;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error instanceof Error ? error.message : String(error));
    return [];
  }
}
