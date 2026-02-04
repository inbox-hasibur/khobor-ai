import React from "react";
import { Badge } from "@/components/ui/badge";
import { PlayCircle } from "lucide-react";

interface HeadlineCardProps {
  news: {
    title: string;
    category: string;
    imageUrl: string;
    source: string;
  };
}

const HeadlineCard = ({ news }: HeadlineCardProps) => {
  return (
    <div className="relative min-w-[320px] md:min-w-[450px] h-[280px] rounded-[32px] overflow-hidden group cursor-pointer snap-center">
      {/* Background Image */}
      <img
        src={news.imageUrl}
        alt={news.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* High-Contrast Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-blue-600 text-white border-none text-[10px] font-black px-3 py-1 uppercase tracking-widest">
            {news.category}
          </Badge>
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
            {news.source}
          </span>
        </div>

        <h2 className="text-2xl font-black text-white leading-tight tracking-tight mb-4 group-hover:text-blue-400 transition-colors line-clamp-2">
          {news.title}
        </h2>

        <div className="flex items-center gap-2 text-white/80 font-bold text-xs">
          <PlayCircle className="w-5 h-5 fill-white text-black" />
          <span>Tap to listen</span>
        </div>
      </div>

      {/* Subtle Inner Glow Border */}
      <div className="absolute inset-0 rounded-[32px] border border-white/10 group-hover:border-white/20 transition-colors pointer-events-none" />
    </div>
  );
};

export default HeadlineCard;