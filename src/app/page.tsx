import React from "react";
import { PlayCircle } from "lucide-react";
import HeadlineSlider from "@/components/HeadlineSlider";
import MainFeed from "@/components/MainFeed";
import LiveFeedSidebar from "@/components/LiveFeedSidebar";
import AudioPlayer from "@/components/AudioPlayer";
import { getNewsFromDB, fetchLatestNews } from "@/actions/newsActions";

export default async function Home() {
  let news = await getNewsFromDB();

  // If no news in DB, try to fetch some
  if (news.length === 0) {
    news = await fetchLatestNews(false);
  }

  // Separate news into headlines, main feed, and live updates
  const headlineCount = Math.min(news.length, 3);
  const HEADLINES = news.slice(0, headlineCount).map((item: any) => ({
    id: item._id,
    title: item.title,
    category: item.category,
    imageUrl: item.imageUrl || "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2070&auto=format&fit=crop",
    source: item.source,
  }));

  const MAIN_FEED = news.slice(headlineCount).map((item: any) => ({
    id: item._id,
    title: item.title,
    summary: item.summary,
    source: item.source,
    category: item.category,
    priority: item.priority as "high" | "medium" | "low",
    publishedAt: new Date(item.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    imageUrl: item.imageUrl || "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2070&auto=format&fit=crop",
    originalUrl: item.originalUrl
  }));

  // Mock live updates for now as they are ephemeral
  const LIVE_UPDATES = [
    {
      id: "l1",
      title: "Shahbag Intersection Blocked",
      summary: "Protestors gathered; traffic halted completely.",
      category: "Traffic",
      publishedAt: "10M AGO"
    },
    {
      id: "l2",
      title: "Power Outage in Rampura",
      summary: "Maintenance work; expected to return in 2 hours.",
      category: "Utility",
      publishedAt: "25M AGO"
    }
  ];

  return (
    <main className="max-w-[1300px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-32 md:pb-48 transition-all duration-500">
      
      {/* 1. HERO SECTION */}
      <section className="mb-8 md:mb-12">
        {HEADLINES.length > 0 ? (
          <HeadlineSlider headlines={HEADLINES} />
        ) : (
          <div className="h-[400px] bg-zinc-900/50 rounded-3xl flex items-center justify-center border border-white/5">
            <p className="text-zinc-500">Loading headlines...</p>
          </div>
        )}
      </section>

      {/* 2. MAIN CONTENT: 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        
        {/* Section 2.1: Left Column (Main Feed - 8 Cols) */}
        <div className="lg:col-span-8">
          <MainFeed newsItems={MAIN_FEED} />
        </div>

        {/* Section 2.2: Right Column (Live Feed - 4 Cols) */}
        <div className="lg:col-span-4">
          <LiveFeedSidebar updates={LIVE_UPDATES} />
        </div>

      </div>

      {/* 3. FLOATING PLAYER */}
      <AudioPlayer storiesCount={news.length} />
    </main>
  );
}