import React from "react";
import HeadlineCard from "./HeadlineCard";

interface HeadlineSliderProps {
  headlines: any[];
}

const HeadlineSlider = ({ headlines }: HeadlineSliderProps) => {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
        <h2 className="text-[13px] font-black uppercase tracking-[0.5em] text-zinc-500">
          Top Headlines
        </h2>
      </div>
      
      {/* pb-8 রাখা হয়েছে যাতে কার্ডের শ্যাডো কেটে না যায়, কিন্তু mb-20 রিমুভ করা হয়েছে */}
      <div className="flex gap-8 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing">
        {headlines.map((item) => (
          <HeadlineCard key={item.id} news={item} />
        ))}
      </div>
    </section>
  );
};

export default HeadlineSlider;