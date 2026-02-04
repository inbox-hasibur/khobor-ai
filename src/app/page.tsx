import React from "react";
import NewsCard from "@/components/NewsCard";
import { PlayCircle } from "lucide-react";

const CATEGORIES = ["All", "Traffic", "Weather", "National", "Economy"];

const MOCK_NEWS = [
  {
    id: "1",
    title: "আজকের ঢাকা ট্রাফিক আপডেট: শাহবাগ মোড় অবরুদ্ধ",
    summary: "একটি বিক্ষোভ সমাবেশের কারণে শাহবাগ মোড়ে যান চলাচল সম্পূর্ণ বন্ধ রয়েছে। যাত্রীদের বিকল্প রাস্তা হিসেবে মৎস্য ভবন ব্যবহারের পরামর্শ দেওয়া হয়েছে।",
    source: "Jamuna TV",
    category: "Traffic",
    priority: "high" as const,
    publishedAt: "10 MINS AGO",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "শীতের তীব্রতা বাড়তে পারে: আবহাওয়া অফিসের পূর্বাভাস",
    summary: "আগামী ৪৮ ঘণ্টায় দেশের উত্তরাঞ্চলে শৈত্যপ্রবাহের সম্ভাবনা রয়েছে। রাজধানী ঢাকায় তাপমাত্রা ২-৩ ডিগ্রি সেলসিয়াস হ্রাস পেতে পারে।",
    source: "BDNews24",
    category: "Weather",
    priority: "medium" as const,
    publishedAt: "1 HOUR AGO",
    imageUrl: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2070&auto=format&fit=crop"
  },
];

export default function Home() {
  return (
    <main className="max-w-[900px] mx-auto px-6 pt-20 pb-40">
      <header className="mb-16 flex flex-col items-center text-center">
        <h1 className="text-[64px] font-black tracking-[-0.06em] text-white leading-none">
          Khobor<span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600">AI</span>
        </h1>
        <p className="text-zinc-500 text-base font-bold mt-2 tracking-tight">
          Your morning briefing, reimagined for your walk.
        </p>
      </header>

      {/* Filter Chips */}
      <nav className="flex items-center justify-center gap-3 mb-20">
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat}
            className={`px-7 py-2.5 rounded-full text-[13px] font-black transition-all ${
              i === 0 
                ? "bg-white text-black shadow-white/10 shadow-lg" 
                : "bg-white/5 text-zinc-500 border border-white/5 hover:border-white/20 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      <section className="space-y-12">
        <div className="flex items-center gap-6">
          <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-zinc-600 shrink-0">
            Live Feed
          </h2>
          <div className="h-[1px] w-full bg-white/5"></div>
        </div>
        
        <div className="grid gap-10">
          {MOCK_NEWS.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </section>

      {/* Floating Audio Player: Now in Dark Aesthetic */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-[440px] z-50">
        <div className="bg-[#1a1a1c]/90 backdrop-blur-3xl border border-white/10 p-4 rounded-[40px] flex items-center gap-5 shadow-2xl">
          <div className="w-14 h-14 bg-black rounded-[24px] flex items-center justify-center border border-white/5 shadow-inner">
             <div className="flex gap-[3px] items-end h-5">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
             </div>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Daily Briefing</p>
            <p className="text-[17px] font-black text-white tracking-tight">8 stories ready to play</p>
          </div>
          <button className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
             <PlayCircle className="w-10 h-10 fill-current" />
          </button>
        </div>
      </div>
    </main>
  );
}