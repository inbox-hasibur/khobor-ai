"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import NewsCard from "./NewsCard";
import { Sparkles } from "lucide-react";

interface MainFeedProps {
  newsItems: any[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const MainFeed = ({ newsItems }: MainFeedProps) => {
  const [activeCategory, setActiveCategory] = React.useState("Latest");
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Get unique categories from news items
  const dynamicCategories = ["Latest", ...Array.from(new Set(newsItems.map(item => item.category)))];
  const categories = dynamicCategories.length > 1 ? dynamicCategories : ["Latest", "National", "Economy", "Sports", "Weather"];

  const filteredNews = activeCategory === "Latest" 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  return (
    <motion.div 
      className="lg:col-span-8 space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Feed Header - Enhanced with Design Theory */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-6 gap-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Sparkles className="w-5 h-5 text-primary" />
            <div className="absolute inset-0 animate-pulse-glow">
              <Sparkles className="w-5 h-5 text-primary opacity-50" />
            </div>
          </div>
          <h2 className="text-headline text-foreground">Daily Digest</h2>
        </div>
        
        {/* Category Navigation - Improved visual hierarchy */}
        <nav className="flex gap-2 md:gap-3 text-caption overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {categories.map((cat, index) => (
            <motion.button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                activeCategory === cat 
                  ? "text-primary-foreground font-bold" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </motion.button>
          ))}
        </nav>
      </motion.div>

      {/* News List - Staggered Animation */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeCategory}
          className="grid gap-6 md:gap-8"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
        >
          {filteredNews.length > 0 ? (
            filteredNews.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                custom={index}
              >
                <NewsCard news={item} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              variants={itemVariants}
              className="py-20 text-center border border-dashed border-border rounded-3xl bg-muted/30"
            >
              <p className="text-muted-foreground font-medium">No news found in this category.</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default MainFeed;