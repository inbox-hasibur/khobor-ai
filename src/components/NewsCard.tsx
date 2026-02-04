import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, ArrowUpRight } from "lucide-react";

interface NewsCardProps {
  news: {
    title: string;
    summary: string;
    source: string;
    category: string;
    priority: "high" | "medium" | "low";
    publishedAt: string;
    imageUrl?: string;
  };
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <div className="relative group p-[1px] rounded-[32px] transition-all duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.1)]">
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]" />
      
      <Card className="relative z-10 bg-[#0c0c0e] border-white/5 group-hover:border-white/10 rounded-[31px] overflow-hidden flex flex-col md:flex-row h-full p-5 gap-6">
        {/* Image: Evenly spaced with p-5 from the card container */}
        <div className="relative w-full md:w-[280px] h-[220px] md:h-auto shrink-0">
          <img 
            src={news.imageUrl} 
            alt={news.title}
            className="object-cover w-full h-full rounded-[22px] grayscale-[10%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 shadow-2xl"
          />
        </div>

        {/* Content: Balanced padding */}
        <div className="flex-1 flex flex-col relative py-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-400">
              {news.category}
            </span>
          </div>

          <h3 className="text-[24px] font-bold text-white leading-tight tracking-tight mb-4 line-clamp-2 pr-4">
            {news.title}
          </h3>

          <p className="text-zinc-400 text-[16px] leading-relaxed line-clamp-2 mb-8 font-medium">
            {news.summary}
          </p>

          <div className="mt-auto flex items-center gap-4">
            <Button className="h-12 px-8 bg-white text-black hover:bg-zinc-200 transition-all rounded-full font-black text-[14px] flex items-center gap-2 shadow-xl">
              <PlayCircle className="w-5 h-5 fill-current" />
              LISTEN NOW
            </Button>
            <Button variant="outline" className="h-12 w-12 p-0 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all">
              <ArrowUpRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Time: Larger and high contrast */}
          <div className="absolute bottom-2 right-0 text-zinc-400 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-[13px] font-black uppercase tracking-widest">{news.publishedAt}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NewsCard;