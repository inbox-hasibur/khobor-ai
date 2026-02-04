import React from "react";
import NewsCard from "./NewsCard";

interface MainFeedProps {
  newsItems: any[];
}

const MainFeed = ({ newsItems }: MainFeedProps) => {
  return (
    <div className="lg:col-span-8 space-y-12">
      {/* Feed Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <h2 className="text-[28px] font-black text-white tracking-tight">Daily Digest</h2>
        <nav className="flex gap-8 text-[12px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
          <button className="text-white border-b-2 border-blue-500 pb-5 -mb-[26px] transition-all">Latest</button>
          <button className="hover:text-zinc-300 transition-colors">Trending</button>
          <button className="hover:text-zinc-300 transition-colors">Saved</button>
        </nav>
      </div>

      {/* News List */}
      <div className="grid gap-12">
        {newsItems.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </div>
  );
};

export default MainFeed;