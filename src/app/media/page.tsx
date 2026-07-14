"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Music, Volume2, Maximize, Settings, Video, SkipBack, SkipForward, FastForward, Rewind } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockVideos = [
  {
    id: "v1",
    title: "স্মার্ট সিটি প্রকল্প: যানজট নিরসনে নতুন উদ্যোগ",
    thumbnail: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2070&auto=format&fit=crop",
    category: "National",
    duration: "04:30",
    description: "রাজধানীর যানজট নিরসনে এবং নাগরিক জীবনযাত্রার মান উন্নয়নে সরকার 'স্মার্ট সিটি' প্রকল্পের নতুন ধাপ উদ্বোধন করেছে। এই প্রকল্পের আওতায় শহরের প্রধান সড়কগুলোতে স্বয়ংক্রিয় ট্রাফিক সিগন্যাল এবং এআই ভিত্তিক মনিটরিং সিস্টেম বসানো হবে। বিস্তারিত জানতে ভিডিওটি সম্পূর্ণ দেখুন।"
  },
  {
    id: "v2",
    title: "প্রযুক্তির বিশ্ব: এআই কীভাবে আমাদের ভবিষ্যৎ বদলাচ্ছে",
    thumbnail: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=1974&auto=format&fit=crop",
    category: "প্রযুক্তি ডেস্ক",
    duration: "03:45",
    description: "আর্টিফিশিয়াল ইন্টেলিজেন্স বা কৃত্রিম বুদ্ধিমত্তা আজ শুধুমাত্র কল্পকাহিনীর বিষয় নয়, এটি আমাদের প্রাত্যহিক জীবনের একটি অবিচ্ছেদ্য অংশে পরিণত হয়েছে।"
  },
  {
    id: "v3",
    title: "বিশ্ব অর্থনীতি: মুদ্রাস্ফীতি নিয়ন্ত্রণে নতুন পলিসি",
    thumbnail: "https://images.unsplash.com/photo-1616035252656-78b1ce2f281e?q=80&w=2072&auto=format&fit=crop",
    category: "অর্থনীতি ডেস্ক",
    duration: "05:20",
    description: "বিশ্বব্যাপী ক্রমবর্ধমান মুদ্রাস্ফীতি নিয়ন্ত্রণে কেন্দ্রীয় ব্যাংকগুলো নতুন আর্থিক নীতি গ্রহণ করছে।"
  }
];

export default function MediaPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // Mock progress

  const currentVideo = mockVideos[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mockVideos.length);
    setIsPlaying(true);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + mockVideos.length) % mockVideos.length);
    setIsPlaying(true);
    setProgress(0);
  };

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = Math.abs(offset.y) * velocity.y;
    if (swipe < -10000) {
      handleNext();
    } else if (swipe > 10000) {
      handlePrev();
    }
  };

  return (
    <main className="max-w-[1400px] mx-auto px-3 md:px-6 lg:px-8 pt-24 md:pt-28 pb-32 md:pb-48">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4">
          <h1 className="text-3xl text-foreground font-serif flex items-center gap-2">
            <Video className="w-8 h-8 text-primary" />
            নিউজ <span className="text-primary">মিডিয়া</span> ভিডিও
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            ভিডিও নিউজ দেখুন এবং আমাদের এআই মিউজিক ফিল্টার ব্যবহার করে মিউজিক-মুক্ত (হালাল) খবর শুনুন। সোয়াইপ করে পরের ভিডিওতে যান।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Area */}
          <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border overflow-hidden">
            <div className="relative aspect-video bg-black overflow-hidden flex flex-col justify-end rounded-2xl m-2">
              
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentIndex}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.4 }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  onDragEnd={handleDragEnd}
                >
                  <img 
                    src={currentVideo.thumbnail} 
                    alt={currentVideo.title} 
                    className="w-full h-full object-cover opacity-80" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Player Overlay Controls (MX Player style) */}
              <div className="relative z-10 w-full p-4 flex flex-col gap-4">
                
                {/* Center Play/Pause Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div 
                      className={`w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 cursor-pointer transition-all ${isPlaying ? 'bg-black/20 opacity-0 hover:opacity-100' : 'bg-black/50 opacity-100'}`}
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="w-10 h-10 text-white" />
                      ) : (
                        <Play className="w-10 h-10 text-white ml-1" />
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Controls Bar */}
                <div className="flex flex-col gap-2 w-full mt-auto pointer-events-auto relative z-20">
                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer">
                    <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
                  </div>
                  
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                      <button className="hover:text-primary transition-colors"><Rewind className="w-5 h-5" /></button>
                      <button className="hover:text-primary transition-colors"><FastForward className="w-5 h-5" /></button>
                      <span className="text-xs font-medium">01:12 / {currentVideo.duration}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button className="hover:text-primary transition-colors"><Volume2 className="w-5 h-5" /></button>
                      <button className="hover:text-primary transition-colors"><Settings className="w-5 h-5" /></button>
                      <button className="hover:text-primary transition-colors"><Maximize className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded-md text-xs font-bold text-white z-10 flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                LIVE
              </div>
            </div>

            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">{currentVideo.title}</CardTitle>
                  <CardDescription className="mt-1">Khobor AI Studio • {currentVideo.category}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrev}><SkipBack className="w-4 h-4 mr-2" /> Prev</Button>
                  <Button variant="outline" size="sm" onClick={handleNext}>Next <SkipForward className="w-4 h-4 ml-2" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {currentVideo.description}
              </p>
            </CardContent>
          </Card>

          {/* AI Tools Sidebar */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="w-5 h-5 text-primary" />
                  এআই মিউজিক ফিল্টার
                </CardTitle>
                <CardDescription>
                  ব্যাকগ্রাউন্ড মিউজিক রিমুভ করে শুধুমাত্র ভয়েস শুনুন
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">হালাল মোড (মিউজিক ছাড়া)</span>
                    <span className="text-xs text-muted-foreground">এআই দ্বারা মিউজিক ফিল্টার করা হবে</span>
                  </div>
                  <Button variant="outline" size="sm">চালু করুন</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">অরিজিনাল অডিও</span>
                    <span className="text-xs text-muted-foreground">মিউজিক সহ অরিজিনাল অডিও</span>
                  </div>
                  <Button variant="default" size="sm">সক্রিয়</Button>
                </div>
              </CardContent>
            </Card>

            {/* Aro Dekhun Sidebar */}
            <Card className="bg-card/50 backdrop-blur-sm border-border sticky top-[340px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary" />
                  আরও দেখুন
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  {mockVideos.map((video, idx) => (
                    <div 
                      key={video.id} 
                      className={`flex gap-3 group cursor-pointer p-2 rounded-lg transition-colors ${idx === currentIndex ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'}`}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsPlaying(true);
                        setProgress(0);
                      }}
                    >
                      <div className="relative w-28 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img src={video.thumbnail} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-[9px] text-white">{video.duration}</div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className={`font-semibold text-sm line-clamp-2 transition-colors ${idx === currentIndex ? 'text-primary' : 'group-hover:text-primary'}`}>
                          {video.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">{video.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
