import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import { scrapeJamunaTV } from '@/lib/scraper';
import { summarizeNews } from '@/lib/ai';

export async function GET(req: NextRequest) {
  // 🔐 Security check
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 401 }
    );
  }

  const now = new Date();
  const dhakaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }));
  const hour = dhakaTime.getHours();
  const period = hour < 12 ? 'সকাল' : hour < 17 ? 'দুপুর' : 'রাত';
  
  console.log(`🕖 Cron started: ${now.toISOString()} (Dhaka: ${period})`);

  try {
    await connectDB();

    // Step 1: Weather + Date + Traffic intro
    let introText = '';
    try {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const weatherRes = await fetch(`${appUrl}/api/weather`);
      const weatherData = await weatherRes.json();
      introText = weatherData.data?.introText || '';
      console.log('🌤️ Weather intro:', introText);
    } catch (e) {
      console.error('Weather fetch failed in cron:', e);
    }

    // Step 2: News scrape করো
    console.log('📰 Scraping news...');
    const rawArticles = await scrapeJamunaTV();
    console.log(`✅ Scraped ${rawArticles.length} articles`);

    if (rawArticles.length === 0) {
      return NextResponse.json({
        success: true,
        scraped: 0,
        saved: 0,
        period,
        message: 'No articles scraped',
        timestamp: new Date().toISOString()
      });
    }

    // Step 3: Gemini দিয়ে summarize করো
    console.log('🤖 Summarizing with Gemini...');
    const processedNews = [];
    
    for (const item of rawArticles) {
      const aiSummary = await summarizeNews(item.title, item.summary);
      processedNews.push({
        ...item,
        summary: aiSummary,
      });
    }

    // Step 4: MongoDB তে save করো (upsert to avoid duplicates)
    console.log('💾 Saving to database...');
    let savedCount = 0;
    for (const item of processedNews) {
      try {
        await News.findOneAndUpdate(
          { originalUrl: item.originalUrl },
          item,
          { upsert: true, new: true }
        );
        savedCount++;
      } catch (e) {
        console.error('Failed to save item:', item.title, e);
      }
    }

    console.log(`✅ Pipeline complete! ${period} - Saved: ${savedCount} items`);

    return NextResponse.json({
      success: true,
      intro: introText,
      period,
      scraped: rawArticles.length,
      saved: savedCount,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Pipeline failed:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
