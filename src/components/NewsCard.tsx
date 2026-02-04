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
    <div className="relative group p-[1px] rounded-[32px] transition-all duration-500 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)]">
      {/* Dynamic Border Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]" />
      
      <Card className="relative z-10 bg-[#0c0c0e] border-white/5 group-hover:border-white/10 rounded-[31px] overflow-hidden flex flex-col md:flex-row h-full p-5 gap-7">
        
        {/* Container for Image: Perfectly rounded and spaced */}
        <div className="relative w-full md:w-[280px] h-[220px] md:h-auto shrink-0 overflow-hidden rounded-[22px]">
          <img 
            src={news.imageUrl} 
            alt={news.title}
            className="object-cover w-full h-full grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 shadow-inner"
          />
          {/* Subtle Inner Shadow on Image */}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[22px]" />
        </div>

        {/* Content Section: Symmetrical Spacing */}
        <div className="flex-1 flex flex-col relative py-1">
          {/* Category Badge & Live Indicator */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,1)]" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400">
              {news.category}
            </span>
          </div>

          {/* News Title */}
          <h3 className="text-[23px] font-bold text-white leading-[1.3] tracking-tight mb-4 line-clamp-2 pr-6">
            {news.title}
          </h3>

          {/* Summary Text */}
          <p className="text-zinc-400 text-[15px] leading-relaxed line-clamp-2 mb-10 font-medium opacity-90">
            {news.summary}
          </p>

          {/* Action Buttons */}
          <div className="mt-auto flex items-center gap-4">
            <Button className="h-12 px-8 bg-white text-black hover:bg-zinc-200 transition-all rounded-full font-black text-[13px] flex items-center gap-2 shadow-[0_10px_20px_rgba(255,255,255,0.1)] active:scale-95">
              <PlayCircle className="w-5 h-5 fill-current" />
              LISTEN NOW
            </Button>
            <Button variant="outline" className="h-12 w-12 p-0 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all">
              <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-white" />
            </Button>
          </div>

          {/* High-Contrast Large Timestamp - Bottom Right */}
          <div className="absolute bottom-2 right-0 text-zinc-500 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-[12px] font-bold uppercase tracking-[0.15em]">
              {news.publishedAt}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NewsCard;