import React from "react";
import { PlayCircle } from "lucide-react";
import HeadlineSlider from "@/components/HeadlineSlider";
import MainFeed from "@/components/MainFeed";
import LiveFeedSidebar from "@/components/LiveFeedSidebar";

// --- MOCK DATA ---
const HEADLINES = [
  {
    id: "h1",
    title: "Metro Rail schedules changed: Effective from tomorrow",
    category: "National",
    imageUrl: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2070&auto=format&fit=crop",
    source: "BDNews24",
  },
  {
    id: "h2",
    title: "BPL Finals: Two giants face off in the ultimate battle",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2105&auto=format&fit=crop",
    source: "Jamuna TV",
  },
  {
    id: "h3",
    title: "Foreign Exchange Reserve: Major boost after remittance surge",
    category: "Economy",
    imageUrl: "https://images.unsplash.com/photo-1611974714851-48206138d731?q=80&w=2070&auto=format&fit=crop",
    source: "Samakal",
  }
];

const MAIN_FEED = [
  {
    id: "m1",
    title: "Severe cold wave expected to sweep across North Bangladesh",
    summary: "The Meteorological Department has warned that temperatures may drop by 2-3 degrees in the next 48 hours in the northern districts.",
    source: "BDNews24",
    category: "Weather",
    priority: "medium" as const,
    publishedAt: "1 HOUR AGO",
    imageUrl: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2070&auto=format&fit=crop"
  }
];

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

export default function Home() {
  return (
    <main className="max-w-[1300px] mx-auto px-6 pt-32 pb-48 transition-all duration-500">
      
      {/* 1. HERO SECTION: Margin Reduced to mb-12 */}
      <section className="mb-12">
        <HeadlineSlider headlines={HEADLINES} />
      </section>

      {/* 2. MAIN CONTENT: 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Section 2.1: Left Column (Main Feed - 8 Cols) */}
        <MainFeed newsItems={MAIN_FEED} />

        {/* Section 2.2: Right Column (Live Feed - 4 Cols) */}
        <LiveFeedSidebar updates={LIVE_UPDATES} />

      </div>

      {/* 3. FLOATING PLAYER */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-[460px] z-50">
        <div className="bg-[#111113]/90 backdrop-blur-3xl border border-white/10 p-4 rounded-[42px] flex items-center gap-6 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)]">
          
          <div className="w-16 h-16 bg-black rounded-[26px] flex items-center justify-center border border-white/5 overflow-hidden shadow-inner">
             <div className="flex items-end gap-[4px] h-6">
                <div className="w-1.5 bg-blue-500 rounded-full animate-[bounce_0.8s_infinite]" />
                <div className="w-1.5 bg-blue-400 rounded-full animate-[bounce_1.1s_infinite]" />
                <div className="w-1.5 bg-blue-600 rounded-full animate-[bounce_0.9s_infinite]" />
                <div className="w-1.5 bg-blue-300 rounded-full animate-[bounce_1.3s_infinite]" />
             </div>
          </div>
          
          <div className="flex-1">
            <p className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-1">Morning Briefing</p>
            <p className="text-[19px] font-black text-white tracking-tight leading-none">8 stories ready to play</p>
          </div>

          <button className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95">
             <PlayCircle className="w-11 h-11 fill-current" />
          </button>
        </div>
      </div>
    </main>
  );
}