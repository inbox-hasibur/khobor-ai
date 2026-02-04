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
    <div className="relative group p-[1px] rounded-[32px] transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
      {/* Subtle border glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]" />
      
      <Card className="relative z-10 bg-[#0c0c0e] border-white/5 group-hover:border-white/10 rounded-[31px] overflow-hidden flex flex-col md:flex-row h-full">
        {/* Image: Now contained and sharp */}
        <div className="relative w-full md:w-[260px] h-[220px] md:h-auto p-3">
          <img 
            src={news.imageUrl} 
            alt={news.title}
            className="object-cover w-full h-full rounded-[24px] grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 md:p-8 flex flex-col relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400/90">
              {news.category}
            </span>
          </div>

          <h3 className="text-[22px] font-bold text-white leading-tight tracking-tight mb-4 line-clamp-2 pr-4">
            {news.title}
          </h3>

          <p className="text-zinc-400 text-[15px] leading-relaxed line-clamp-2 mb-8 font-medium max-w-[90%]">
            {news.summary}
          </p>

          <div className="mt-auto flex items-center gap-3">
            <Button className="h-12 px-8 bg-white text-black hover:bg-zinc-200 transition-all rounded-full font-black text-[13px] flex items-center gap-2 shadow-xl active:scale-95">
              <PlayCircle className="w-5 h-5 fill-current" />
              LISTEN NOW
            </Button>
            <Button variant="outline" className="h-12 w-12 p-0 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all">
              <ArrowUpRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Time: Moved to Bottom Right in English */}
          <div className="absolute bottom-8 right-8 text-zinc-500 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold uppercase tracking-wider">{news.publishedAt}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NewsCard;