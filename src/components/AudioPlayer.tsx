"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Volume1,
  VolumeX,
  Headphones,
  MoreHorizontal
} from "lucide-react";
import { Howl } from "howler";

interface AudioPlayerProps {
  storiesCount: number;
}

// Demo audio sources - using reliable CDN-hosted short clips
const DEMO_PLAYLIST = [
  {
    id: 1,
    title: "AI News Briefing",
    artist: "Khobor AI",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: 372,
  },
  {
    id: 2,
    title: "Tech Updates",
    artist: "Daily Digest",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: 335,
  },
  {
    id: 3,
    title: "Weather Forecast",
    artist: "Local News",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: 286,
  },
];

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const AudioPlayer = ({ storiesCount }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [duration, setDuration] = useState(0);
  const howlRef = useRef<Howl | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Initialize Howl instance
  useEffect(() => {
    const track = DEMO_PLAYLIST[currentTrack];
    
    howlRef.current = new Howl({
      src: [track.src],
      html5: true,
      volume: isMuted ? 0 : volume,
      onload: () => {
        setDuration(howlRef.current?.duration() || track.duration);
      },
      onplay: () => {
        setIsPlaying(true);
        startProgressUpdate();
      },
      onpause: () => {
        setIsPlaying(false);
        stopProgressUpdate();
      },
      onstop: () => {
        setIsPlaying(false);
        setProgress(0);
        stopProgressUpdate();
      },
      onend: () => {
        handleNext();
      },
      onloaderror: (_id: number, _err: unknown) => {
        console.error('Audio load error:', _err);
      },
    });

    return () => {
      howlRef.current?.unload();
      stopProgressUpdate();
    };
  }, [currentTrack]);

  // Update volume
  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.volume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted]);

  const startProgressUpdate = useCallback(() => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      if (howlRef.current) {
        setProgress(howlRef.current.seek() as number);
      }
    }, 100);
  }, []);

  const stopProgressUpdate = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }, []);

  const togglePlay = () => {
    if (!howlRef.current) return;
    
    if (isPlaying) {
      howlRef.current.pause();
    } else {
      howlRef.current.play();
    }
  };

  const handleNext = () => {
    howlRef.current?.stop();
    setCurrentTrack((prev) => (prev + 1) % DEMO_PLAYLIST.length);
  };

  const handlePrev = () => {
    howlRef.current?.stop();
    setCurrentTrack((prev) => (prev - 1 + DEMO_PLAYLIST.length) % DEMO_PLAYLIST.length);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setProgress(newTime);
    if (howlRef.current) {
      howlRef.current.seek(newTime);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const track = DEMO_PLAYLIST[currentTrack];

  return (
    <>
      {/* Expanded Player Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              className="glass rounded-[40px] p-8 w-full max-w-md"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Large Visualizer */}
              <div className="w-48 h-48 mx-auto mb-8 rounded-[32px] bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                <AudioVisualizer isPlaying={isPlaying} size="large" />
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-foreground mb-1">{track.title}</h3>
                <p className="text-muted-foreground">{track.artist}</p>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-8">
                <input
                  type="range"
                  min={0}
                  max={duration || track.duration}
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration || track.duration)}</span>
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex items-center justify-center gap-6">
                <motion.button
                  onClick={handlePrev}
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SkipBack className="w-6 h-6" />
                </motion.button>
                
                <motion.button
                  onClick={togglePlay}
                  className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg shadow-primary/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                </motion.button>
                
                <motion.button
                  onClick={handleNext}
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SkipForward className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Player */}
      <motion.div 
        className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-[95%] max-w-[480px] z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div 
          className="glass rounded-[28px] md:rounded-[36px] p-3 md:p-4 shadow-2xl"
          whileHover={{ scale: 1.005 }}
          transition={{ duration: 0.2 }}
        >
          {/* Mini Progress Bar */}
          <div className="absolute top-0 left-4 right-4 h-[2px] bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary rounded-full"
              style={{ width: `${(progress / (duration || track.duration)) * 100}%` }}
              layoutId="progress"
            />
          </div>
          
          <div className="flex items-center gap-3 md:gap-5 pt-2">
            {/* Visualizer/Artwork */}
            <motion.button
              onClick={() => setIsExpanded(true)}
              className="w-12 h-12 md:w-14 md:h-14 rounded-[18px] md:rounded-[22px] bg-muted flex items-center justify-center overflow-hidden flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AudioVisualizer isPlaying={isPlaying} size="small" />
            </motion.button>
            
            {/* Info */}
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setIsExpanded(true)}>
              <motion.p 
                className="text-[10px] md:text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-0.5 truncate"
                animate={{ opacity: isPlaying ? [1, 0.6, 1] : 1 }}
                transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
              >
                {isPlaying ? "Now Playing" : "AI Podcast"}
              </motion.p>
              <p className="text-[14px] md:text-[16px] font-bold text-foreground tracking-tight leading-none truncate">
                {track.title}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Volume */}
              <motion.button
                onClick={toggleMute}
                className="hidden sm:flex p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : volume > 0.5 ? <Volume2 className="w-4 h-4" /> : <Volume1 className="w-4 h-4" />}
              </motion.button>
              
              {/* Play/Pause */}
              <motion.button 
                onClick={togglePlay}
                className="w-11 h-11 md:w-12 md:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg shadow-primary/20"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isPlaying ? "pause" : "play"}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
              
              {/* More */}
              <motion.button
                onClick={() => setIsExpanded(true)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MoreHorizontal className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

// Animated Audio Visualizer Component
const AudioVisualizer = ({ isPlaying, size }: { isPlaying: boolean; size: "small" | "large" }) => {
  const barCount = size === "large" ? 12 : 4;
  const bars = Array.from({ length: barCount }, (_, i) => i);
  
  return (
    <div className={`flex items-end gap-[2px] md:gap-1 ${size === "large" ? "h-16 md:h-24" : "h-5 md:h-6"}`}>
      {bars.map((i) => (
        <motion.div
          key={i}
          className={`bg-primary rounded-full ${size === "large" ? "w-2 md:w-3" : "w-1 md:w-1.5"}`}
          animate={
            isPlaying
              ? {
                  height: ["20%", "80%", "40%", "100%", "30%"],
                }
              : { height: "30%" }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.8 + Math.random() * 0.4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.1,
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
};

export default AudioPlayer;
