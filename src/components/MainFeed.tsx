"use client";

import React from "react";
import NewsCard from "./NewsCard";

interface MainFeedProps {
  newsItems: any[];
}

const MainFeed = ({ newsItems }: MainFeedProps) => {
  const [activeCategory, setActiveCategory] = React.useState("Latest");
  
  // Get unique categories from news items
  const dynamicCategories = ["Latest", ...Array.from(new Set(newsItems.map(item => item.category)))];
  const categories = dynamicCategories.length > 1 ? dynamicCategories : ["Latest", "National", "Economy", "Sports", "Weather"];

  const filteredNews = activeCategory === "Latest" 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  return (
    <div className="lg:col-span-8 space-y-12">
      {/* Feed Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-6 gap-6">
        <h2 className="text-[24px] md:text-[28px] font-black text-white tracking-tight">Daily Digest</h2>
        <nav className="flex gap-4 md:gap-8 text-[11px] md:text-[12px] font-bold text-zinc-500 uppercase tracking-[0.15em] md:tracking-[0.2em] overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${
                activeCategory === cat 
                  ? "text-white border-b-2 border-blue-500 pb-2 md:pb-5 -mb-[10px] md:-mb-[26px]" 
                  : "hover:text-zinc-300"
              } transition-all whitespace-nowrap`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>

      {/* News List */}
      <div className="grid gap-8 md:gap-12">
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))
        ) : (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
            <p className="text-zinc-500 font-medium">No news found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainFeed;