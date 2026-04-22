"use client";

import React, { useState } from "react";
import { PlayCircle, PauseCircle, SkipForward, SkipBack, Volume2 } from "lucide-react";

interface AudioPlayerProps {
  storiesCount: number;
}

const AudioPlayer = ({ storiesCount }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-[95%] max-w-[460px] z-50">
      <div className="bg-[#111113]/90 backdrop-blur-3xl border border-white/10 p-3 md:p-4 rounded-[32px] md:rounded-[42px] flex items-center gap-4 md:gap-6 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)]">
        
        {/* Visualizer/Icon */}
        <div className="w-12 h-12 md:w-16 md:h-16 bg-black rounded-[20px] md:rounded-[26px] flex items-center justify-center border border-white/5 overflow-hidden shadow-inner flex-shrink-0">
           <div className="flex items-end gap-[3px] md:gap-[4px] h-4 md:h-6">
              <div className={`w-1 md:w-1.5 bg-blue-500 rounded-full ${isPlaying ? "animate-[bounce_0.8s_infinite]" : "h-1"}`} />
              <div className={`w-1 md:w-1.5 bg-blue-400 rounded-full ${isPlaying ? "animate-[bounce_1.1s_infinite]" : "h-2"}`} />
              <div className={`w-1 md:w-1.5 bg-blue-600 rounded-full ${isPlaying ? "animate-[bounce_0.9s_infinite]" : "h-1.5"}`} />
              <div className={`w-1 md:w-1.5 bg-blue-300 rounded-full ${isPlaying ? "animate-[bounce_1.3s_infinite]" : "h-1"}`} />
           </div>
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[9px] md:text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-0.5 md:mb-1 truncate">
            {isPlaying ? "Now Playing" : "Morning Briefing"}
          </p>
          <p className="text-[16px] md:text-[19px] font-black text-white tracking-tight leading-none truncate">
            {storiesCount} stories ready
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {isPlaying && (
            <button className="hidden sm:flex w-10 h-10 items-center justify-center text-zinc-400 hover:text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 md:w-16 md:h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95 flex-shrink-0"
          >
            {isPlaying ? (
              <PauseCircle className="w-8 h-8 md:w-11 md:h-11 fill-current" />
            ) : (
              <PlayCircle className="w-8 h-8 md:w-11 md:h-11 fill-current" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
