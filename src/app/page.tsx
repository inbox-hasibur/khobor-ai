"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import HeadlineSlider from "@/components/HeadlineSlider";
import MainFeed from "@/components/MainFeed";
import LiveFeedSidebar from "@/components/LiveFeedSidebar";
import AudioPlayer from "@/components/AudioPlayer";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import { useNews, useWeather } from "@/hooks/useNews";
import { Newspaper, Loader2, Radio, TrendingUp, Calendar, Sparkles, CloudSun, Play } from "lucide-react";

const LIVE_UPDATES = [
  {
    id: "l1",
    title: "Shahbag Intersection Blocked",
    summary: "Protestors gathered; traffic halted completely. Alternative routes advised.",
    category: "Traffic",
    publishedAt: "10M AGO"
  },
  {
    id: "l2",
    title: "Power Outage in Rampura",
    summary: "Maintenance work ongoing; expected to return in 2 hours.",
    category: "Utility",
    publishedAt: "25M AGO"
  },
  {
    id: "l3",
    title: "Metro Rail Service Update",
    summary: "Normal operations resume on the Green Line after brief technical delay.",
    category: "Transport",
    publishedAt: "35M AGO"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const { news, loading: newsLoading } = useNews();
  const { weather } = useWeather();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Set current date
    const date = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(date);

    return () => clearTimeout(timer);
  }, []);

  // Transform news for headlines (top 3 with images)
  const headlines = news.slice(0, 3).map((item: any) => ({
    id: item._id || item.id,
    title: item.title,
    category: item.category,
    imageUrl: item.imageUrl || "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2070&auto=format&fit=crop",
    source: item.source,
  }));

  // Transform news for main feed
  const feedItems = news.map((item: any, index: number) => ({
    id: item._id || `news-${index}`,
    title: item.title,
    summary: item.summary || "সংক্ষিপ্ত বিবরণ পাওয়া যায়নি।",
    source: item.source || "Khobor AI",
    category: item.category || "General",
    priority: item.priority || "medium" as const,
    publishedAt: item.publishedAt 
      ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      : "Today",
    imageUrl: item.imageUrl || "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2070&auto=format&fit=crop",
  }));

  const totalStories = news.length || 0;

  if (isLoading || newsLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-primary" />
        </motion.div>
        <p className="text-muted-foreground text-sm">আপনার কাস্টমাইজড খবর লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <motion.main 
      className="max-w-[1400px] mx-auto px-3 md:px-6 lg:px-8 pt-24 md:pt-36 pb-32 md:pb-48"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome Header - Visual Hierarchy */}
      <motion.section variants={itemVariants} className="mb-10 md:mb-14">
        <BreakingNewsTicker />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-[13px] font-medium">{currentDate}</span>
            </div>
            <h1 className="text-display text-foreground font-serif">
              আপনার <span className="text-primary">দৈনিক সারসংক্ষেপ</span>
            </h1>
            <p className="text-body text-muted-foreground mt-2 max-w-lg">
              এআই দ্বারা বাছাইকৃত খবরের সাথে আপডেট থাকুন। আজ 
              <span className="text-foreground font-medium"> {totalStories}টি খবর</span> রয়েছে।
            </p>
          </div>
          
          {/* Quick Stats & Weather */}
          <div className="flex flex-col items-end gap-3 md:gap-4">
            <div className="flex items-center gap-3">
              {/* Premium CTA */}
              <Link href="/pricing" className="group hidden sm:block">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 to-orange-600/10 hover:from-amber-500/20 hover:to-orange-600/20 rounded-full border border-amber-500/20 shadow-sm transition-all cursor-pointer">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-[12px] font-bold text-amber-500 group-hover:text-amber-400 transition-colors">
                    Upgrade to premium for personalized news
                  </span>
                </div>
              </Link>
              
              {/* Weather widget */}
              {weather && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full border border-blue-500/20 shadow-sm">
                  <CloudSun className="w-5 h-5 text-blue-500" />
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-foreground leading-none">{weather.temp}°C</span>
                    <span className="text-[10px] font-medium text-muted-foreground capitalize">{weather.description}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                <Radio className="w-4 h-4 text-primary" />
                <span className="text-[12px] font-semibold">লাইভ আপডেট</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-[12px] font-semibold">ট্রেন্ডিং</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* AI Daily Briefing / Video Podcast Section */}
      <motion.section variants={itemVariants} className="mb-10 md:mb-16">
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">
          {/* Background Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          {/* Left: Video Player */}
          <div className="w-full md:w-5/12 flex-shrink-0 relative group rounded-xl overflow-hidden aspect-video bg-black/80 border border-white/10 shadow-lg">
            <img src="https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2070&auto=format&fit=crop" alt="AI Briefing" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center shadow-lg shadow-primary/20 backdrop-blur-md cursor-pointer hover:scale-105 transition-transform">
                <Play className="w-8 h-8 ml-1" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 rounded text-xs font-medium text-white flex items-center gap-1 backdrop-blur-sm border border-white/10">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              AI নিউজ ব্রিফিং
            </div>
            <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 rounded text-xs font-medium text-white backdrop-blur-sm">
              05:30
            </div>
          </div>

          {/* Right: Textual Archive / Content */}
          <div className="w-full md:w-7/12 flex flex-col justify-center z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
                আজকের সারসংক্ষেপ
              </span>
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {currentDate}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4 leading-tight">
              এআই পডকাস্ট: আজকের খবরের সম্পূর্ণ বিশ্লেষণ
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
              আজকের প্রধান খবরগুলোতে থাকছে স্মার্ট সিটি প্রকল্পের নতুন উদ্যোগ, বিশ্ব অর্থনীতিতে মুদ্রাস্ফীতির প্রভাব এবং প্রযুক্তিতে এআই এর নতুন দিগন্ত। ভিডিওটি প্লে করে পুরো ব্রিফিং শুনুন অথবা নিচে স্ক্রল করে বিস্তারিত পড়ুন।
            </p>
            
            {/* Scraped News Demo / Highlights */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                গুরুত্বপূর্ণ পয়েন্টসমূহ:
              </h4>
              {[
                { time: "09:00 AM", title: "স্মার্ট সিটি প্রকল্প: যানজট নিরসনে নতুন উদ্যোগ" },
                { time: "11:30 AM", title: "বিশ্ব অর্থনীতি: মুদ্রাস্ফীতি নিয়ন্ত্রণে নতুন পলিসি" },
                { time: "02:15 PM", title: "প্রযুক্তির বিশ্ব: এআই কীভাবে আমাদের ভবিষ্যৎ বদলাচ্ছে" }
              ].map((news, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background border border-border/50 hover:border-border transition-colors cursor-pointer">
                  <span className="text-xs font-mono text-muted-foreground w-16 flex-shrink-0">{news.time}</span>
                  <p className="text-sm font-medium text-foreground line-clamp-1">{news.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 1. HERO SECTION - Headlines */}
      <motion.section variants={itemVariants} className="mb-10 md:mb-16">
        <HeadlineSlider headlines={headlines} />
      </motion.section>

      {/* 2. MAIN CONTENT: 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Section 2.1: Left Column (Main Feed - 8 Cols) */}
        <motion.div 
          className="lg:col-span-8"
          variants={itemVariants}
        >
          <MainFeed newsItems={feedItems} />
        </motion.div>

        {/* Section 2.2: Right Column (Live Feed - 4 Cols) */}
        <motion.div 
          className="lg:col-span-4"
          variants={itemVariants}
        >
          <LiveFeedSidebar updates={LIVE_UPDATES} />
        </motion.div>

      </div>

      {/* 3. FLOATING AUDIO PLAYER */}
      <AudioPlayer storiesCount={totalStories || 7} newsItems={feedItems} />
    </motion.main>
  );
}