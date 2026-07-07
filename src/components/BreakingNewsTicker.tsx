"use client";

import React from "react";
import Link from "next/link";

const newsItems = [
  "ঔষধের সেরাসয়ে ওষুধ নিয়েও কোটি কোটি টাকা তছরুপ, নতুন অভিযোগ দায়ের",
  "দেশের বিভিন্ন স্থানে বৃষ্টির সম্ভাবনা, আবহাওয়া অধিদপ্তরের পূর্বাভাস",
  "নতুন শিক্ষাক্রম বাস্তবায়নে শিক্ষকদের প্রশিক্ষণ শুরু হচ্ছে আগামী সপ্তাহে",
  "শেয়ার বাজারে সূচকের বড় উত্থান, বিনিয়োগকারীদের মধ্যে স্বস্তি",
];

export default function BreakingNewsTicker() {
  return (
    <div className="w-full bg-[#111116]/90 backdrop-blur-md border-b border-red-900/30 text-white flex items-center relative z-[200]">
      <div className="flex-shrink-0 bg-[#0f0709] text-red-500 font-bold px-4 py-2 border-r border-red-900/30 flex items-center gap-2 z-10 shadow-[4px_0_12px_rgba(0,0,0,0.5)]">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-glow"></span>
        <span className="font-serif">ব্রেকিং নিউজ</span>
      </div>
      
      <div className="flex-1 overflow-hidden whitespace-nowrap relative flex items-center h-10">
        <div className="flex gap-8 px-4 animate-marquee min-w-max">
          {/* Double the items to make the infinite scroll seamless */}
          {[...newsItems, ...newsItems].map((item, index) => (
            <Link href={`/news/${index}`} key={index} className="text-sm md:text-base text-gray-200 hover:text-red-400 transition-colors flex items-center">
              {item} <span className="mx-6 text-red-700/50">|</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
