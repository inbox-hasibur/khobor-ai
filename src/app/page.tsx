"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeadlineSlider from "@/components/HeadlineSlider";
import MainFeed from "@/components/MainFeed";
import LiveFeedSidebar from "@/components/LiveFeedSidebar";
import AudioPlayer from "@/components/AudioPlayer";
import { Newspaper, Loader2, Radio, TrendingUp, Calendar } from "lucide-react";

// Mock data for demo purposes
const MOCK_HEADLINES = [
  {
    id: "1",
    title: "Bangladesh Economy Shows Strong Growth in Q3 2024",
    category: "Economy",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    source: "Financial Express",
  },
  {
    id: "2",
    title: "New Tech Innovations Transforming Dhaka's Startup Scene",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    source: "Tech Bangladesh",
  },
  {
    id: "3",
    title: "National Cricket Team Prepares for International Series",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2070&auto=format&fit=crop",
    source: "Sports Daily",
  },
];

const MOCK_NEWS = [
  {
    id: "4",
    title: "Government Announces New Infrastructure Projects for 2025",
    summary: "Major development initiatives including highway expansion and bridge construction are set to begin early next year, promising to boost connectivity across the nation.",
    source: "Daily Star",
    category: "National",
    priority: "high" as const,
    publishedAt: "2 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "AI Revolution: How Local Businesses Are Adapting",
    summary: "Small and medium enterprises across Bangladesh are increasingly adopting artificial intelligence tools to streamline operations and reach new markets.",
    source: "Business Standard",
    category: "Technology",
    priority: "medium" as const,
    publishedAt: "4 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Weather Alert: Heavy Rain Expected in Coastal Regions",
    summary: "Meteorological Department forecasts significant rainfall in the southern districts over the next 48 hours. Residents advised to take precautions.",
    source: "Weather BD",
    category: "Weather",
    priority: "medium" as const,
    publishedAt: "5 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1525088553748-01d6e210e00b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "7",
    title: "Education Ministry Reforms Curriculum for Digital Age",
    summary: "New educational framework emphasizes coding, digital literacy, and critical thinking skills for students from primary to higher secondary levels.",
    source: "Education Today",
    category: "Education",
    priority: "low" as const,
    publishedAt: "6 hours ago",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2070&auto=format&fit=crop",
  },
];

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-primary" />
        </motion.div>
        <p className="text-muted-foreground text-sm">Loading your personalized briefing...</p>
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-[13px] font-medium">{currentDate}</span>
            </div>
            <h1 className="text-display text-foreground">
              Your <span className="gradient-text">Daily Briefing</span>
            </h1>
            <p className="text-body text-muted-foreground mt-2 max-w-lg">
              Stay informed with AI-curated news personalized for you. 
              <span className="text-foreground font-medium"> {MOCK_NEWS.length + MOCK_HEADLINES.length} stories</span> today.
            </p>
          </div>
          
          {/* Quick Stats - Design Theory: Repetition, Balance */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
              <Radio className="w-4 h-4 text-primary" />
              <span className="text-[12px] font-semibold">Live Updates</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-[12px] font-semibold">Trending</span>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* 1. HERO SECTION - Headlines */}
      <motion.section variants={itemVariants} className="mb-10 md:mb-16">
        <HeadlineSlider headlines={MOCK_HEADLINES} />
      </motion.section>

      {/* 2. MAIN CONTENT: 2-Column Grid - Design Theory: Balance, Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Section 2.1: Left Column (Main Feed - 8 Cols) */}
        <motion.div 
          className="lg:col-span-8"
          variants={itemVariants}
        >
          <MainFeed newsItems={MOCK_NEWS} />
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
      <AudioPlayer storiesCount={MOCK_NEWS.length + MOCK_HEADLINES.length} />
    </motion.main>
  );
}