"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Music, Video, SkipBack, SkipForward, Rewind, FastForward, Volume2, Settings, Maximize, BookOpen, X, Headphones, FileText, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useNews } from "@/hooks/useNews";

export default function MediaPage() {
  const { news, loading } = useNews();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // Mock progress
  const [isHalalMode, setIsHalalMode] = useState(true);
  const [readerModeArticle, setReaderModeArticle] = useState<any | null>(null);

  const mockArticles = [
    {
      id: "v1",
      headline: "স্মার্ট সিটি প্রকল্প: যানজট নিরসনে নতুন উদ্যোগ",
      imageUrl: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2070&auto=format&fit=crop",
      category: "National",
      duration: "04:30",
      ai_summary: "রাজধানীর যানজট নিরসনে এবং নাগরিক জীবনযাত্রার মান উন্নয়নে সরকার 'স্মার্ট সিটি' প্রকল্পের নতুন ধাপ উদ্বোধন করেছে। এই প্রকল্পের আওতায় শহরের প্রধান সড়কগুলোতে স্বয়ংক্রিয় ট্রাফিক সিগন্যাল এবং এআই ভিত্তিক মনিটরিং সিস্টেম বসানো হবে। বিস্তারিত জানতে ভিডিওটি সম্পূর্ণ দেখুন।",
      published_at: new Date().toISOString()
    },
    {
      id: "v2",
      headline: "প্রযুক্তির বিশ্ব: এআই কীভাবে আমাদের ভবিষ্যৎ বদলাচ্ছে",
      imageUrl: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=1974&auto=format&fit=crop",
      category: "প্রযুক্তি ডেস্ক",
      duration: "03:45",
      ai_summary: "আর্টিফিশিয়াল ইন্টেলিজেন্স বা কৃত্রিম বুদ্ধিমত্তা আজ শুধুমাত্র কল্পকাহিনীর বিষয় নয়, এটি আমাদের প্রাত্যহিক জীবনের একটি অবিচ্ছেদ্য অংশে পরিণত হয়েছে।",
      published_at: new Date().toISOString()
    }
  ];

  const articles = news?.length > 0 ? news : mockArticles;
  const currentVideo = articles[currentIndex];

  const handleNext = () => {
    if (articles.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % articles.length);
    setIsPlaying(true);
    setProgress(0);
  };

  const handlePrev = () => {
    if (articles.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
    setIsPlaying(true);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No media available at the moment.</p>
      </div>
    );
  }

  // Use AI summary if Halal Mode is active, else original audio
  const audioSrc = isHalalMode 
    ? (currentVideo.summary_audio_url || `/api/audio/tts?text=${encodeURIComponent((currentVideo.ai_summary || currentVideo.summary || "").substring(0, 200))}`)
    : (currentVideo.audio_url || `/api/audio/tts?text=${encodeURIComponent((currentVideo.headline || currentVideo.title || "").substring(0, 200))}`);

  return (
    <main className="max-w-[1200px] mx-auto px-4 pt-28 pb-32">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Video className="w-8 h-8 text-primary" />
          নিউজ <span className="text-primary">মিডিয়া</span>
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          ভিডিও নিউজ দেখুন এবং আমাদের এআই মিউজিক ফিল্টার ব্যবহার করে মিউজিক-মুক্ত (হালাল) খবর শুনুন।
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden bg-card/50">
          <div className="relative aspect-video bg-black group">
            <img 
              src={currentVideo.imageUrl || "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2070&auto=format&fit=crop"} 
              alt={currentVideo.headline || currentVideo.title} 
              className={`w-full h-full object-cover transition-opacity ${isPlaying ? 'opacity-50' : 'opacity-80'}`} 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:bg-black/80 transition-all"
              >
                {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
              </button>
            </div>
            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex items-center justify-between text-white mt-1">
                <div className="flex items-center gap-4">
                  <button className="hover:text-primary transition-colors"><Rewind className="w-4 h-4" /></button>
                  <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-primary transition-colors">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button className="hover:text-primary transition-colors"><FastForward className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center gap-4">
                  <button className="hover:text-primary transition-colors"><Volume2 className="w-4 h-4" /></button>
                  <button 
                    onClick={() => setReaderModeArticle(currentVideo)}
                    className="hover:text-primary transition-colors flex items-center gap-1 text-xs font-bold"
                    title="Reading Mood Freedom"
                  >
                    <BookOpen className="w-4 h-4" /> Read
                  </button>
                  <button className="hover:text-primary transition-colors"><Maximize className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
            
            {/* Hidden audio element for actual playback */}
            <audio 
              src={audioSrc}
              autoPlay={isPlaying}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onEnded={handleNext}
              onTimeUpdate={(e) => {
                const target = e.target as HTMLAudioElement;
                setProgress((target.currentTime / target.duration) * 100);
              }}
              style={{ display: 'none' }}
            />
            
            <div className="absolute top-4 right-4 bg-red-600 px-2 py-1 rounded text-[10px] font-bold text-white flex items-center gap-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
            </div>
          </div>
          <CardHeader>
            <div className="flex justify-between items-start gap-4">
              <div>
                <CardTitle className="text-xl">{currentVideo.headline || currentVideo.title}</CardTitle>
                <CardDescription className="mt-1">{currentVideo.category || "National"} • {new Date(currentVideo.published_at || currentVideo.created_at || Date.now()).toLocaleDateString()}</CardDescription>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="icon" onClick={handlePrev}><SkipBack className="w-4 h-4" /></Button>
                <Button variant="outline" size="icon" onClick={handleNext}><SkipForward className="w-4 h-4" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{currentVideo.ai_summary || currentVideo.summary}</p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2"><Music className="w-4 h-4 text-primary"/> হালাল মোড</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className={`flex items-center justify-between p-3 rounded-lg border ${isHalalMode ? 'bg-primary/10 border-primary/20' : 'bg-muted border-border'}`}>
                <div className={`text-sm font-medium ${isHalalMode ? 'text-primary' : ''}`}>মিউজিক ছাড়া (এআই সামারি)</div>
                <Button 
                  size="sm" 
                  variant={isHalalMode ? "default" : "outline"}
                  onClick={() => setIsHalalMode(true)}
                >
                  {isHalalMode ? "সক্রিয়" : "চালু করুন"}
                </Button>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-lg border ${!isHalalMode ? 'bg-primary/10 border-primary/20' : 'bg-muted border-border'}`}>
                <div className={`text-sm font-medium ${!isHalalMode ? 'text-primary' : ''}`}>অরিজিনাল ফুল অডিও</div>
                <Button 
                  size="sm"
                  variant={!isHalalMode ? "default" : "outline"}
                  onClick={() => setIsHalalMode(false)}
                >
                  {!isHalalMode ? "সক্রিয়" : "চালু করুন"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 overflow-hidden flex flex-col h-[400px]">
            <CardHeader className="pb-3 shrink-0">
              <CardTitle className="text-lg">আরও সংবাদ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 overflow-y-auto flex-1">
              {articles.map((video, idx) => (
                <div 
                  key={video.id || video._id} 
                  className={`flex gap-3 cursor-pointer p-2 rounded-lg transition-colors ${idx === currentIndex ? 'bg-primary/10' : 'hover:bg-muted'}`}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsPlaying(true);
                    setProgress(0);
                  }}
                >
                  <div className="w-24 aspect-video rounded overflow-hidden shrink-0 relative">
                    <img src={video.imageUrl || "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2070&auto=format&fit=crop"} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium line-clamp-2 leading-tight">{video.headline || video.title}</h4>
                    <p className="text-[10px] text-muted-foreground mt-1">{video.category || "National"}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reader Mode Modal */}
      <AnimatePresence>
        {readerModeArticle && (
          <ReaderMode 
            article={readerModeArticle} 
            onClose={() => setReaderModeArticle(null)} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function ReaderMode({ article, onClose }: { article: any, onClose: () => void }) {
  const [activeAudio, setActiveAudio] = useState<"summary" | "full" | null>(null);
  
  const title = article.headline || article.title;
  const summary = article.ai_summary || article.summary;
  const fullContent = article.raw_content || summary || "সংক্ষিপ্ত বিবরণ পাওয়া যায়নি।";
  
  const summaryAudioUrl = article.summary_audio_url || `/api/audio/tts?text=${encodeURIComponent(summary?.substring(0, 200) || "")}`;
  const fullAudioUrl = article.audio_url || `/api/audio/tts?text=${encodeURIComponent(title?.substring(0, 200) || "")}`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-background/95 backdrop-blur-md overflow-y-auto"
    >
      <div className="max-w-4xl w-full bg-card rounded-3xl border border-border shadow-2xl relative flex flex-col max-h-[90vh]">
        <div className="sticky top-0 right-0 p-6 flex justify-end bg-gradient-to-b from-card to-transparent z-10 rounded-t-3xl">
          <button 
            onClick={onClose}
            className="p-3 bg-muted hover:bg-muted/80 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8 md:p-16 pt-0 overflow-y-auto">
          {/* Reader Meta */}
          <div className="mb-10 text-center">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
              Reading Mood Freedom
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">
              {title}
            </h1>
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              <span className="font-medium text-foreground">{article.source || "KahfNews"}</span>
              <span>•</span>
              <span>{new Date(article.published_at || article.created_at || Date.now()).toLocaleDateString()}</span>
            </p>
          </div>

          {/* Audio Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 p-6 bg-muted/30 rounded-2xl border border-border">
            <div className="flex-1">
              <p className="text-sm font-bold text-center mb-3 flex items-center justify-center gap-2">
                <Headphones className="w-4 h-4 text-primary" /> 
                Listen to Summary
              </p>
              <audio 
                controls 
                className="w-full" 
                src={summaryAudioUrl}
                onPlay={() => setActiveAudio("summary")}
              />
            </div>
            
            <div className="w-px bg-border hidden sm:block"></div>
            
            <div className="flex-1">
              <p className="text-sm font-bold text-center mb-3 flex items-center justify-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> 
                Listen to Headline/Post
              </p>
              <audio 
                controls 
                className="w-full" 
                src={fullAudioUrl}
                onPlay={() => setActiveAudio("full")}
              />
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 mb-12">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
              <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">AI</span>
              AI Summary
            </h3>
            <p className="text-lg leading-relaxed text-foreground/90">
              {summary}
            </p>
          </div>

          {/* Full Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {fullContent.split('\n').map((paragraph: string, idx: number) => (
              paragraph.trim() ? <p key={idx} className="mb-6 text-xl leading-loose font-serif text-foreground/80">{paragraph}</p> : null
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
