"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Bell, ChevronRight } from "lucide-react";
import Link from "next/link";

interface LiveUpdate {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
}

interface LiveFeedSidebarProps {
  updates: LiveUpdate[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const LiveFeedSidebar = ({ updates }: LiveFeedSidebarProps) => {
  return (
    <aside className="lg:col-span-4 flex flex-col gap-8">
      {/* Radio & Live TV Section */}
      <motion.div 
        className="glass rounded-[32px] p-6 md:p-8 shadow-sm border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <Zap className="w-5 h-5 text-red-500 fill-red-500" />
            </div>
            <div>
              <h2 className="text-caption text-foreground font-bold font-serif">রেডিও এবং লাইভ টিভি</h2>
              <p className="text-[10px] text-muted-foreground">সরাসরি সম্প্রচার</p>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse-glow" />
        </div>
        
        <div className="flex flex-col gap-3">
          <button className="w-full flex items-center justify-between bg-secondary/50 hover:bg-secondary p-4 rounded-2xl transition-colors border border-border/50 group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-xs">📻</span>
              </div>
              <span className="font-semibold text-sm group-hover:text-primary transition-colors">খবর শুনবি রেডিও</span>
            </div>
            <span className="text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded-full font-bold">লাইভ</span>
          </button>
          <button className="w-full flex items-center justify-between bg-secondary/50 hover:bg-secondary p-4 rounded-2xl transition-colors border border-border/50 group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-500 font-bold text-xs">📺</span>
              </div>
              <span className="font-semibold text-sm group-hover:text-blue-500 transition-colors">লাইভ নিউজ টিভি</span>
            </div>
            <span className="text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded-full font-bold">লাইভ</span>
          </button>
        </div>
      </motion.div>

      <motion.div 
        className="sticky top-24 glass rounded-[32px] p-6 md:p-8 shadow-sm border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header - Enhanced with animation and better hierarchy */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <motion.div 
              className="relative w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20"
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(245, 158, 11, 0.4)",
                  "0 0 20px 5px rgba(245, 158, 11, 0.2)",
                  "0 0 0 0 rgba(245, 158, 11, 0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
            </motion.div>
            <div>
              <h2 className="text-caption text-foreground font-bold font-serif">লাইভ আপডেট</h2>
              <p className="text-[10px] text-muted-foreground">রিয়েল-টাইম খবর</p>
            </div>
          </div>
          <motion.div 
            className="w-2 h-2 rounded-full bg-red-500"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>

        {/* Updates List - Staggered animation */}
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {updates.map((update, index) => (
            <motion.div 
              key={update.id} 
              className="group cursor-pointer relative"
              variants={itemVariants}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              {/* Timeline connector */}
              {index < updates.length - 1 && (
                <div className="absolute left-[11px] top-8 bottom-[-24px] w-[2px] bg-gradient-to-b from-border to-transparent" />
              )}
              
              <div className="flex gap-4">
                {/* Timeline dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Category & Time */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-primary/10 text-[10px] font-bold text-primary tracking-wider">
                      {update.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                      {update.publishedAt}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-1.5 font-serif">
                    {update.title}
                  </h4>
                  
                  {/* Summary */}
                  <p className="text-muted-foreground text-[13px] leading-relaxed line-clamp-2">
                    {update.summary}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View All Button - Enhanced with hover effect */}
        <Link href="/alerts" className="block">
          <motion.div 
            className="w-full mt-8 py-4 bg-secondary hover:bg-secondary/80 rounded-2xl text-caption text-secondary-foreground transition-all border border-border group flex items-center justify-center gap-2 font-serif"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Bell className="w-4 h-4" />
            সব এলার্ট দেখুন
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.div>
        </Link>
      </motion.div>
    </aside>
  );
};

export default LiveFeedSidebar;