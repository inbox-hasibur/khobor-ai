import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, ArrowUpRight } from "lucide-react";

interface NewsCardProps {
  news: {
    id: string;
    title: string;
    summary: string;
    source: string;
    category: string;
    priority: "high" | "medium" | "low";
    publishedAt: string;
    imageUrl?: string;
    originalUrl?: string;
  };
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <div className="relative group p-[1px] rounded-[32px] transition-all duration-500 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)]">
      {/* Dynamic Border Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]" />
      
      <Card className="relative z-10 bg-card border-border group-hover:border-foreground/10 rounded-[31px] overflow-hidden flex flex-col md:flex-row h-full p-5 gap-7">
        
        {/* Container for Image: Perfectly rounded and spaced */}
        <div className="relative w-full md:w-[280px] h-[220px] md:h-auto shrink-0 overflow-hidden rounded-[22px]">
          <Link href={`/news/${news.id}`}>
            <img 
              src={news.imageUrl} 
              alt={news.title}
              className="object-cover w-full h-full grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 shadow-inner cursor-pointer"
            />
          </Link>
          {/* Subtle Inner Shadow on Image */}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[22px] pointer-events-none" />
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
          <h3 className="text-[20px] md:text-[23px] font-bold text-foreground leading-[1.3] tracking-tight mb-4 line-clamp-2 pr-6">
            <Link href={`/news/${news.id}`} className="hover:text-blue-500 transition-colors">
              {news.title}
            </Link>
          </h3>

          {/* Summary Text */}
          <p className="text-muted-foreground text-[14px] md:text-[15px] leading-relaxed line-clamp-2 mb-6 md:mb-10 font-medium opacity-90">
            {news.summary}
          </p>

          {/* Action Buttons */}
          <div className="mt-auto flex items-center gap-3 md:gap-4">
            <Button className="h-10 md:h-12 px-6 md:px-8 bg-foreground text-background hover:opacity-90 transition-all rounded-full font-black text-[12px] md:text-[13px] flex items-center gap-2 shadow-[0_10px_20px_rgba(255,255,255,0.1)] active:scale-95">
              <PlayCircle className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              LISTEN NOW
            </Button>
            <Link href={`/news/${news.id}`}>
              <Button variant="outline" className="h-10 w-10 md:h-12 md:w-12 p-0 rounded-full border-border bg-background hover:bg-muted text-foreground transition-all">
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover:text-foreground" />
              </Button>
            </Link>
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