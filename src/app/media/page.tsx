"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Music, Settings, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MediaPage() {
  return (
    <main className="max-w-[1400px] mx-auto px-3 md:px-6 lg:px-8 pt-24 md:pt-36 pb-32 md:pb-48">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-10">
          <h1 className="text-display text-foreground font-serif flex items-center gap-4">
            <Video className="w-10 h-10 text-primary" />
            নিউজ <span className="text-primary">মিডিয়া</span> ভিডিও
          </h1>
          <p className="text-body text-muted-foreground mt-2 max-w-2xl">
            ভিডিও নিউজ দেখুন এবং আমাদের এআই মিউজিক ফিল্টার ব্যবহার করে মিউজিক-মুক্ত (হালাল) খবর শুনুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Area */}
          <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border overflow-hidden">
            <div className="aspect-video bg-black flex items-center justify-center relative group overflow-hidden">
              <img src="https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2070&auto=format&fit=crop" alt="News Video Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
              <Button size="icon" variant="secondary" className="w-16 h-16 rounded-full opacity-90 group-hover:scale-110 transition-all z-10">
                <Play className="w-8 h-8 ml-1" />
              </Button>
              <div className="absolute bottom-4 right-4 bg-red-600 px-3 py-1 rounded-md text-xs font-bold text-white z-10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                LIVE
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">স্মার্ট সিটি প্রকল্প: যানজট নিরসনে নতুন উদ্যোগ</CardTitle>
              <CardDescription>Khobor AI Studio • ৫ ঘন্টা আগে</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                রাজধানীর যানজট নিরসনে এবং নাগরিক জীবনযাত্রার মান উন্নয়নে সরকার 'স্মার্ট সিটি' প্রকল্পের নতুন ধাপ উদ্বোধন করেছে। এই প্রকল্পের আওতায় শহরের প্রধান সড়কগুলোতে স্বয়ংক্রিয় ট্রাফিক সিগন্যাল এবং এআই ভিত্তিক মনিটরিং সিস্টেম বসানো হবে। বিস্তারিত জানতে ভিডিওটি সম্পূর্ণ দেখুন।
              </p>
              
              <div className="mt-8 border-t border-border pt-6">
                <h3 className="text-lg font-bold mb-4">আরও দেখুন</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex gap-3 group cursor-pointer">
                    <div className="relative w-32 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=1974&auto=format&fit=crop" alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-[10px] text-white">03:45</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">প্রযুক্তির বিশ্ব: এআই কীভাবে আমাদের ভবিষ্যৎ বদলাচ্ছে</h4>
                      <p className="text-xs text-muted-foreground mt-1">প্রযুক্তি ডেস্ক</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 group cursor-pointer">
                    <div className="relative w-32 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1616035252656-78b1ce2f281e?q=80&w=2072&auto=format&fit=crop" alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-[10px] text-white">05:20</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">বিশ্ব অর্থনীতি: মুদ্রাস্ফীতি নিয়ন্ত্রণে নতুন পলিসি</h4>
                      <p className="text-xs text-muted-foreground mt-1">অর্থনীতি ডেস্ক</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Tools Sidebar */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
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
          </div>
        </div>
      </motion.div>
    </main>
  );
}
