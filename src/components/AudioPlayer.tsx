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
  ListMusic,
  Shuffle,
  Repeat,
  Repeat1,
  Gauge,
  Timer,
  ChevronUp,
  X,
  Music3,
  Mic2,
  Waves,
  Forward,
  Rewind,
  Sparkles,
  Disc3,
  SlidersHorizontal,
  Heart,
  Share2,
  Radio,
  WavesIcon,
  BarChart3,
  Download,
  Clock,
  Star,
  Plus,
  Check,
  BookmarkPlus,
  Menu,
  RotateCcw,
  Cog,
  Info,
  Layers,
  TrendingUp,
  Zap,
  Activity,
  AlignCenter,
  Bot,
} from "lucide-react";
import { Howl } from "howler";

interface AudioPlayerProps {
  storiesCount: number;
}

// === AI-ENHANCED DEMO PLAYLIST ===
const DEMO_PLAYLIST = [
  {
    id: 1,
    title: "AI News Briefing",
    artist: "Khobor AI",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: 372,
    category: "Technology",
    mood: "informative",
    bpm: 120,
    rating: 4.5,
    playsCount: 1283,
    aiSummary: "Today's top stories curated by AI: breaking news in tech, politics, and global affairs with expert analysis.",
    waveform: [10,25,40,55,70,85,90,78,65,50,35,20,15,30,45,60,75,88,92,80,68,52,38,22,12,28,42,58,72,82],
  },
  {
    id: 2,
    title: "Tech Updates",
    artist: "Daily Digest",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: 335,
    category: "Technology",
    mood: "energetic",
    bpm: 135,
    rating: 4.8,
    playsCount: 2456,
    aiSummary: "Latest breakthroughs in AI, space exploration, and renewable energy. Silicon Valley updates and startup news.",
    waveform: [30,50,70,85,95,88,75,60,45,55,65,80,90,82,68,52,40,48,58,72,85,78,62,48,35,42,55,70,82,75],
  },
  {
    id: 3,
    title: "Weather Forecast",
    artist: "Local News",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: 286,
    category: "Weather",
    mood: "calm",
    bpm: 90,
    rating: 4.2,
    playsCount: 892,
    aiSummary: "7-day weather forecast with AI-powered climate predictions. Real-time storm tracking and air quality updates.",
    waveform: [5,15,25,35,45,50,55,48,40,30,20,10,8,18,28,38,48,52,45,35,25,15,12,22,32,42,50,44,35,25],
  },
  {
    id: 4,
    title: "Sports Roundup",
    artist: "ESPN Bangla",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: 404,
    category: "Sports",
    mood: "energetic",
    bpm: 140,
    rating: 4.6,
    playsCount: 1567,
    aiSummary: "Cricket World Cup highlights, football transfers, and local sports events. Expert predictions and analysis.",
    waveform: [40,60,80,92,98,90,78,65,50,55,70,85,95,88,72,58,45,50,65,78,88,82,68,52,42,48,62,75,85,78],
  },
  {
    id: 5,
    title: "Market Analysis",
    artist: "Financial Times",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: 318,
    category: "Finance",
    mood: "serious",
    bpm: 110,
    rating: 4.7,
    playsCount: 2104,
    aiSummary: "Stock market trends, cryptocurrency updates, and economic forecasts powered by AI market analysis algorithms.",
    waveform: [20,35,50,65,75,85,80,70,58,45,38,48,60,72,82,78,65,52,42,50,62,75,70,58,45,35,42,55,68,72],
  },
];

type RepeatMode = "none" | "one" | "all";
type SleepTimerOption = "off" | "15min" | "30min" | "45min" | "60min" | "end_of_track";
type EqualizerPreset = "flat" | "bass" | "treble" | "vocal" | "jazz" | "rock" | "pop" | "classical";
type ViewMode = "player" | "playlist" | "equalizer" | "stats" | "info";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// === EQUALIZER PRESETS ===
const EQ_PRESETS: Record<EqualizerPreset, number[]> = {
  flat: [0, 0, 0, 0, 0],
  bass: [6, 4, 2, 0, -2],
  treble: [-2, 0, 2, 4, 6],
  vocal: [-1, 2, 4, 2, -1],
  jazz: [3, 1, 0, 1, 3],
  rock: [4, 2, -1, 2, 4],
  pop: [-1, 2, 4, 3, 0],
  classical: [2, 1, 0, 1, 2],
};

const AudioPlayer = ({ storiesCount }: AudioPlayerProps) => {
  // === CORE PLAYER STATE ===
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [buffered, setBuffered] = useState(0);

  // === UI STATE ===
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("player");

  // === ADVANCED FEATURES ===
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("none");
  const [isShuffled, setIsShuffled] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [sleepTimer, setSleepTimer] = useState<SleepTimerOption>("off");
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState(0);
  const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);
  const [playHistory, setPlayHistory] = useState<number[]>([]);
  const [crossfadeEnabled, setCrossfadeEnabled] = useState(true);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [favoriteTracks, setFavoriteTracks] = useState<number[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<number[]>([]);

  // === AUDIO ENHANCEMENTS ===
  const [equalizerPreset, setEqualizerPreset] = useState<EqualizerPreset>("flat");
  const [showEqualizer, setShowEqualizer] = useState(false);
  const [bassBoost, setBassBoost] = useState(0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showSleepMenu, setShowSleepMenu] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // === REFS ===
  const howlRef = useRef<Howl | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const sleepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);
  const sleepMenuRef = useRef<HTMLDivElement>(null);

  // === INIT SHUFFLE ORDER ===
  useEffect(() => {
    const order = Array.from({ length: DEMO_PLAYLIST.length }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    setShuffledOrder(order);
  }, []);

  // === LOAD FAVORITES ===
  useEffect(() => {
    const saved = localStorage.getItem("khobor-favorites");
    if (saved) setFavoriteTracks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("khobor-favorites", JSON.stringify(favoriteTracks));
  }, [favoriteTracks]);

  // === TRACK INDEX HELPERS ===
  const getActualTrackIndex = useCallback((displayIndex: number) => {
    if (isShuffled && shuffledOrder.length > 0) {
      return shuffledOrder[displayIndex] ?? displayIndex;
    }
    return displayIndex;
  }, [isShuffled, shuffledOrder]);

  const getDisplayTrackIndex = useCallback((actualIndex: number) => {
    if (isShuffled && shuffledOrder.length > 0) {
      return shuffledOrder.indexOf(actualIndex);
    }
    return actualIndex;
  }, [isShuffled, shuffledOrder]);

  // === INIT HOWL ===
  useEffect(() => {
    const actualIndex = getActualTrackIndex(currentTrack);
    const track = DEMO_PLAYLIST[actualIndex];
    if (!track) return;

    setIsLoaded(false);
    setHasError(false);
    setDuration(0);
    setProgress(0);

    // Add to recently played
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(id => id !== actualIndex);
      return [actualIndex, ...filtered].slice(0, 20);
    });

    howlRef.current = new Howl({
      src: [track.src],
      html5: true,
      volume: isMuted ? 0 : volume,
      rate: playbackRate,
      onload: () => {
        if (howlRef.current) {
          setDuration(howlRef.current.duration());
          setIsLoaded(true);
        }
      },
      onloaderror: () => {
        setHasError(true);
        setIsLoaded(false);
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
        stopProgressUpdate();
        handleTrackEnd();
      },
    });

    return () => {
      howlRef.current?.unload();
      stopProgressUpdate();
    };
  }, [currentTrack, isShuffled, shuffledOrder]);

  // === VOLUME CONTROL ===
  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.volume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted]);

  useEffect(() => {
    howlRef.current?.rate(playbackRate);
  }, [playbackRate]);

  // === SLEEP TIMER ===
  useEffect(() => {
    if (sleepTimer === "off") {
      if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
      setSleepTimerRemaining(0);
      return;
    }
    if (sleepTimer === "end_of_track") return;

    const minutes = parseInt(sleepTimer.replace("min", ""));
    setSleepTimerRemaining(minutes * 60);
    sleepTimerRef.current = setTimeout(() => {
      howlRef.current?.pause();
      setIsPlaying(false);
      setSleepTimer("off");
      setSleepTimerRemaining(0);
    }, minutes * 60 * 1000);

    return () => { if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current); };
  }, [sleepTimer]);

  useEffect(() => {
    if (sleepTimerRemaining <= 0) return;
    const interval = setInterval(() => {
      setSleepTimerRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [sleepTimerRemaining]);

  // === VOLUME PERSISTENCE ===
  useEffect(() => {
    const saved = localStorage.getItem("khobor-audio-volume");
    if (saved) setVolume(parseFloat(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("khobor-audio-volume", volume.toString());
  }, [volume]);

  // === CLICK OUTSIDE ===
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) setShowSpeedMenu(false);
      if (sleepMenuRef.current && !sleepMenuRef.current.contains(e.target as Node)) setShowSleepMenu(false);
      if (volumeSliderRef.current && !volumeSliderRef.current.contains(e.target as Node)) setShowVolumeSlider(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // === KEYBOARD SHORTCUTS ===
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.code) {
        case "Space": e.preventDefault(); togglePlay(); break;
        case "ArrowLeft": e.preventDefault(); seekRelative(-5); break;
        case "ArrowRight": e.preventDefault(); seekRelative(5); break;
        case "ArrowUp": e.preventDefault(); setVolume(v => Math.min(1, v + 0.1)); break;
        case "ArrowDown": e.preventDefault(); setVolume(v => Math.max(0, v - 0.1)); break;
        case "KeyM": toggleMute(); break;
        case "KeyN": handleNext(); break;
        case "KeyP": handlePrev(); break;
        case "KeyS": setIsShuffled(s => !s); break;
        case "KeyR": setRepeatMode(m => m === "none" ? "all" : m === "all" ? "one" : "none"); break;
        case "KeyF": setIsExpanded(p => !p); break;
        case "Escape": setIsExpanded(false); setShowSpeedMenu(false); setShowSleepMenu(false); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  // === HELPERS ===
  const seekRelative = (seconds: number) => {
    if (!howlRef.current) return;
    const current = howlRef.current.seek() as number;
    const newTime = Math.max(0, Math.min(duration, current + seconds));
    howlRef.current.seek(newTime);
    setProgress(newTime);
  };

  const startProgressUpdate = useCallback(() => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = setInterval(() => {
      if (howlRef.current) {
        const seek = howlRef.current.seek() as number;
        setProgress(seek);
        setBuffered(Math.min(seek + 30, duration));
      }
    }, 100);
  }, [duration]);

  const stopProgressUpdate = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }, []);

  const togglePlay = () => {
    if (!howlRef.current || hasError) return;
    isPlaying ? howlRef.current.pause() : howlRef.current.play();
  };

  const handleTrackEnd = () => {
    if (sleepTimer === "end_of_track") { setSleepTimer("off"); setIsPlaying(false); return; }
    if (repeatMode === "one") { howlRef.current?.seek(0); if (isPlaying) howlRef.current?.play(); return; }
    handleNext();
  };

  const handleNext = () => {
    const actualIndex = getActualTrackIndex(currentTrack);
    setPlayHistory(prev => [...prev, actualIndex]);
    if (repeatMode === "one") { howlRef.current?.seek(0); if (isPlaying) howlRef.current?.play(); return; }
    let nextTrack: number;
    if (isShuffled) {
      const displayIndex = getDisplayTrackIndex(actualIndex);
      nextTrack = (displayIndex + 1) % DEMO_PLAYLIST.length;
    } else {
      nextTrack = (currentTrack + 1) % DEMO_PLAYLIST.length;
    }
    howlRef.current?.stop();
    setCurrentTrack(nextTrack);
  };

  const handlePrev = () => {
    if (progress > 3) { howlRef.current?.seek(0); setProgress(0); return; }
    const actualIndex = getActualTrackIndex(currentTrack);
    if (playHistory.length > 0) {
      const prevActual = playHistory[playHistory.length - 1];
      setPlayHistory(prev => prev.slice(0, -1));
      howlRef.current?.stop();
      setCurrentTrack(getDisplayTrackIndex(prevActual));
      return;
    }
    let prevTrack: number;
    if (isShuffled) {
      const displayIndex = getDisplayTrackIndex(actualIndex);
      prevTrack = (displayIndex - 1 + DEMO_PLAYLIST.length) % DEMO_PLAYLIST.length;
    } else {
      prevTrack = (currentTrack - 1 + DEMO_PLAYLIST.length) % DEMO_PLAYLIST.length;
    }
    howlRef.current?.stop();
    setCurrentTrack(prevTrack);
  };

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleFavorite = (trackId: number) => {
    setFavoriteTracks(prev => prev.includes(trackId) ? prev.filter(id => id !== trackId) : [...prev, trackId]);
  };

  const selectTrack = (displayIndex: number) => {
    howlRef.current?.stop();
    setCurrentTrack(displayIndex);
    setViewMode("player");
  };

  const actualIndex = getActualTrackIndex(currentTrack);
  const track = DEMO_PLAYLIST[actualIndex] || DEMO_PLAYLIST[0];
  const durationToUse = duration || track.duration;
  const progressPercent = durationToUse > 0 ? (progress / durationToUse) * 100 : 0;
  const bufferedPercent = durationToUse > 0 ? (buffered / durationToUse) * 100 : 0;
  const isFavorite = favoriteTracks.includes(track.id);
  const eqPreset = EQ_PRESETS[equalizerPreset];

  // === VINYL DISC ROTATION ===
  const discRotation = isPlaying ? 360 * (progress / (durationToUse || 1)) : 0;

  // === WAVEFORM RENDERER ===
  const renderWaveform = (bars: number[], active: number) => {
    return bars.map((height, i) => {
      const isActive = i <= active;
      return (
        <div
          key={i}
          className={`flex-1 rounded-full transition-all duration-150 ${
            isActive ? "bg-primary" : "bg-muted-foreground/20"
          }`}
          style={{ height: `${height * 0.7}%` }}
        />
      );
    });
  };

  return (
    <>
      {/* === AI STATUS BAR (shown when expanded) === */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[70] pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 backdrop-blur border border-primary/10 text-[10px] text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="font-medium text-primary">AI Curated</span>
              <span className="w-px h-3 bg-border" />
              <span>{track.category} · {track.mood}</span>
              <span className="w-px h-3 bg-border" />
              <span>{track.playsCount.toLocaleString()} plays</span>
              <span className="w-px h-3 bg-border" />
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>{track.rating}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === EXPANDED PLAYER OVERLAY === */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl flex items-center justify-center p-2 md:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setIsExpanded(false); setViewMode("player"); }}
          >
            <motion.div
              className="glass-strong rounded-[28px] md:rounded-[44px] p-4 md:p-8 w-full max-w-lg relative max-h-[95vh] overflow-y-auto no-scrollbar"
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 30 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Close + Top Bar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => { setViewMode("player"); setIsExpanded(false); }}
                    className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronUp className="w-5 h-5 rotate-180" />
                  </motion.button>
                  <span className="text-xs text-muted-foreground font-medium">
                    {currentTrack + 1} / {DEMO_PLAYLIST.length}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {/* View Mode Tabs */}
                  {(["player", "playlist", "equalizer", "stats", "info"] as ViewMode[]).map(mode => (
                    <motion.button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`p-2 rounded-xl transition-all ${
                        viewMode === mode ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {mode === "player" && <Disc3 className="w-4 h-4" />}
                      {mode === "playlist" && <ListMusic className="w-4 h-4" />}
                      {mode === "equalizer" && <SlidersHorizontal className="w-4 h-4" />}
                      {mode === "stats" && <BarChart3 className="w-4 h-4" />}
                      {mode === "info" && <Info className="w-4 h-4" />}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* === VIEW MODE: PLAYLIST === */}
              {viewMode === "playlist" && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-foreground">Smart Playlist</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">AI Curated</span>
                      <span className="text-xs text-muted-foreground">{DEMO_PLAYLIST.length} tracks</span>
                    </div>
                  </div>
                  <div className="space-y-1 max-h-[50vh] overflow-y-auto no-scrollbar pr-1">
                    {DEMO_PLAYLIST.map((t, i) => {
                      const isActive = i === currentTrack;
                      const isFav = favoriteTracks.includes(t.id);
                      return (
                        <motion.button
                          key={t.id}
                          onClick={() => selectTrack(i)}
                          className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-colors text-left group ${
                            isActive 
                              ? "bg-primary/10 border border-primary/20" 
                              : "hover:bg-muted/80 border border-transparent"
                          }`}
                          whileHover={{ x: 3 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Track Number / Active Icon */}
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 relative ${
                            isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}>
                            {isActive && isPlaying ? (
                              <motion.div className="flex items-center gap-[1.5px]" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                                <div className="w-[3px] h-4 bg-current rounded-full animate-pulse" />
                                <div className="w-[3px] h-3 bg-current rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                                <div className="w-[3px] h-5 bg-current rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                              </motion.div>
                            ) : (
                              <span className="text-xs font-bold">{i + 1}</span>
                            )}
                          </div>
                          {/* Track Info */}
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold truncate ${isActive ? "text-foreground" : "text-foreground/80"}`}>
                              {t.title}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                              <Mic2 className="w-3 h-3" />
                              {t.artist} · {t.category}
                            </p>
                          </div>
                          {/* Rating & Duration */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <motion.button
                              onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Heart className={`w-3.5 h-3.5 ${isFav ? "text-red-500 fill-red-500" : "text-muted-foreground"}`} />
                            </motion.button>
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star className="w-3 h-3 fill-amber-500" />
                              <span className="text-[10px] font-medium">{t.rating}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{formatTime(t.duration)}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* === VIEW MODE: EQUALIZER === */}
              {viewMode === "equalizer" && (
                <div className="space-y-6 pt-4">
                  <div>
                    <h3 className="text-base font-bold text-foreground mb-3">Equalizer</h3>
                    <div className="grid grid-cols-4 gap-2 mb-6">
                      {(["flat", "bass", "treble", "vocal", "jazz", "rock", "pop", "classical"] as EqualizerPreset[]).map(preset => (
                        <motion.button
                          key={preset}
                          onClick={() => setEqualizerPreset(preset)}
                          className={`px-3 py-2 rounded-xl text-[10px] font-semibold capitalize transition-all ${
                            equalizerPreset === preset 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {preset}
                        </motion.button>
                      ))}
                    </div>
                    {/* Visual EQ Bands */}
                    <div className="flex items-end justify-center gap-3 h-40 mb-4">
                      {eqPreset.map((value, i) => {
                        const db = value + 6; // shift to 0-12 range
                        const heightPercent = (db / 12) * 100;
                        return (
                          <div key={i} className="flex flex-col items-center gap-1">
                            <span className="text-[9px] text-muted-foreground font-mono">{value > 0 ? `+${value}` : value}</span>
                            <motion.div 
                              className="w-8 md:w-10 rounded-full bg-gradient-to-t from-primary to-purple-500"
                              animate={{ height: `${Math.max(8, heightPercent)}%` }}
                              transition={{ type: "spring", stiffness: 100, damping: 15 }}
                            />
                            <span className="text-[8px] text-muted-foreground">{
                              i === 0 ? "60Hz" : i === 1 ? "250Hz" : i === 2 ? "1kHz" : i === 3 ? "4kHz" : "16kHz"
                            }</span>
                          </div>
                        );
                      })}
                    </div>
                    {/* Bass Boost */}
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">Bass Boost</span>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        value={bassBoost}
                        onChange={(e) => setBassBoost(parseInt(e.target.value))}
                        className="flex-1 h-1.5 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                      />
                      <span className="text-xs text-muted-foreground w-6 text-right">{bassBoost}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* === VIEW MODE: STATS === */}
              {viewMode === "stats" && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-base font-bold text-foreground mb-3">Listening Insights</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Clock, label: "Total Time", value: "12.5 hrs", sub: "this week" },
                      { icon: ListMusic, label: "Tracks Played", value: "47", sub: "this session" },
                      { icon: TrendingUp, label: "Avg. Rating", value: track.rating.toString(), sub: "current track" },
                      { icon: Activity, label: "Listening Streak", value: "5 days", sub: "🔥 ongoing" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-muted/50 rounded-2xl p-4 border border-border/50">
                        <stat.icon className="w-4 h-4 text-primary mb-2" />
                        <p className="text-lg font-bold text-foreground">{stat.value}</p>
                        <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">{stat.sub}</p>
                      </div>
                    ))}
                  </div>
                  {/* Recently Played */}
                  <div className="mt-4">
                    <p className="text-[11px] font-semibold text-foreground mb-2">Recently Played</p>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                      {recentlyPlayed.slice(0, 8).map((id, i) => {
                        const t = DEMO_PLAYLIST[id];
                        if (!t) return null;
                        return (
                          <motion.button
                            key={`${id}-${i}`}
                            onClick={() => selectTrack(getDisplayTrackIndex(id))}
                            className="flex-shrink-0 w-16 h-16 rounded-2xl bg-muted flex items-center justify-center border border-border hover:border-primary/30 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="text-center">
                              <Music3 className="w-4 h-4 text-muted-foreground mx-auto mb-0.5" />
                              <p className="text-[7px] text-muted-foreground truncate max-w-[60px]">{t.title}</p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* === VIEW MODE: INFO === */}
              {viewMode === "info" && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-base font-bold text-foreground mb-2">About This Track</h3>
                  <div className="bg-muted/50 rounded-2xl p-5 border border-border/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/30 to-purple-600/30 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{track.title}</p>
                        <p className="text-xs text-muted-foreground">{track.artist}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {track.aiSummary}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      {[
                        { label: "Category", value: track.category },
                        { label: "Mood", value: track.mood.charAt(0).toUpperCase() + track.mood.slice(1) },
                        { label: "BPM", value: track.bpm.toString() },
                        { label: "Quality", value: "320 kbps" },
                        { label: "Sample Rate", value: "44.1 kHz" },
                        { label: "AI Score", value: `${(track.rating * 20).toFixed(0)}%` },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between py-1.5 px-2 bg-muted/30 rounded-lg">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="text-foreground font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* === VIEW MODE: PLAYER (DEFAULT) === */}
              {viewMode === "player" && (
                <>
                  {/* === AI ROBOT / VISUALIZER === */}
                  <div className="relative w-full max-w-[240px] mx-auto mb-6 flex flex-col items-center gap-6">
                    {/* Robot Avatar */}
                    <motion.div
                      className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.15)]"
                      animate={isPlaying ? { y: [0, -8, 0] } : {}}
                      transition={isPlaying ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : {}}
                    >
                      <motion.div
                        className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg relative overflow-hidden"
                        animate={isPlaying ? { 
                          boxShadow: ["0 0 15px rgba(59,130,246,0.4)", "0 0 35px rgba(147,51,234,0.6)", "0 0 15px rgba(59,130,246,0.4)"]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Bot className="w-12 h-12 text-white" />
                        
                        {/* Scanning line effect */}
                        {isPlaying && (
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/25 to-transparent h-1/2"
                            animate={{ top: ["-50%", "150%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                      </motion.div>
                    </motion.div>

                    {/* Sound Cloud style Waveform Below */}
                    <div className="w-full flex justify-center items-end h-16 bg-muted/30 rounded-2xl px-6 pb-2 border border-border/50">
                       <AudioVisualizer isPlaying={isPlaying} size="large" />
                    </div>

                    {/* Error / Loading overlay */}
                    {hasError && (
                      <div className="absolute inset-0 bg-destructive/10 rounded-3xl flex items-center justify-center backdrop-blur-sm z-10">
                        <p className="text-xs text-destructive font-medium">Load Error</p>
                      </div>
                    )}
                    {!isLoaded && !hasError && (
                      <div className="absolute inset-0 bg-background/30 rounded-3xl flex items-center justify-center backdrop-blur-sm z-10">
                        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* === TRACK INFO === */}
                  <div className="text-center mb-5">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-foreground">{track.title}</h3>
                      <motion.button
                        onClick={() => toggleFavorite(track.id)}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className={`w-4 h-4 ${isFavorite ? "text-red-500 fill-red-500" : "text-muted-foreground hover:text-red-400"}`} />
                      </motion.button>
                    </div>
                    <p className="text-muted-foreground flex items-center justify-center gap-1.5 text-sm">
                      <Mic2 className="w-3.5 h-3.5" />
                      {track.artist}
                    </p>
                    {/* Status badges */}
                    <div className="flex items-center justify-center gap-2 mt-2.5 flex-wrap">
                      {isShuffled && <span className="text-[9px] text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-full">🔀 Shuffled</span>}
                      {repeatMode === "one" && <span className="text-[9px] text-amber-500 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full">🔂 One</span>}
                      {repeatMode === "all" && <span className="text-[9px] text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">🔁 All</span>}
                      {sleepTimer !== "off" && <span className="text-[9px] text-purple-500 font-semibold bg-purple-500/10 px-2 py-0.5 rounded-full">⏰ {formatTime(sleepTimerRemaining)}</span>}
                      {playbackRate !== 1 && <span className="text-[9px] text-cyan-500 font-semibold bg-cyan-500/10 px-2 py-0.5 rounded-full">{playbackRate}x</span>}
                      {equalizerPreset !== "flat" && <span className="text-[9px] text-green-500 font-semibold bg-green-500/10 px-2 py-0.5 rounded-full">🎛️ {equalizerPreset}</span>}
                    </div>
                  </div>

                  {/* === WAVEFORM SEEK BAR === */}
                  <div className="mb-3">
                    <div className="relative h-14 bg-muted/30 rounded-2xl overflow-hidden cursor-pointer group mb-2"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        const newTime = percent * durationToUse;
                        setProgress(newTime);
                        if (howlRef.current) howlRef.current.seek(newTime);
                      }}
                    >
                      {/* Buffered */}
                      <div className="absolute inset-0 flex items-end gap-[2px] p-2">
                        {track.waveform.map((height, i) => {
                          const segmentProgress = (i / track.waveform.length) * 100;
                          const isActiveSegment = segmentProgress <= progressPercent;
                          const isBuffered = segmentProgress <= bufferedPercent;
                          return (
                            <div
                              key={i}
                              className={`flex-1 rounded-t-full transition-all duration-200 ${
                                isActiveSegment 
                                  ? "bg-gradient-to-t from-primary/90 to-primary" 
                                  : isBuffered 
                                    ? "bg-primary/20" 
                                    : "bg-muted-foreground/10"
                              }`}
                              style={{ height: `${height * 0.6}%` }}
                            />
                          );
                        })}
                      </div>
                      {/* Time indicators */}
                      <div className="absolute bottom-1 left-3 text-[9px] text-white/80 font-medium drop-shadow-lg">
                        {formatTime(progress)}
                      </div>
                      <div className="absolute bottom-1 right-3 text-[9px] text-white/80 font-medium drop-shadow-lg">
                        {formatTime(durationToUse)}
                      </div>
                    </div>
                    {/* Time labels */}
                    <div className="flex justify-between text-xs text-muted-foreground px-1">
                      <span>{formatTime(progress)}</span>
                      <span className="text-[9px] text-muted-foreground/60">-{formatTime(Math.max(0, durationToUse - progress))}</span>
                    </div>
                  </div>

                  {/* === MAIN CONTROLS === */}
                  <div className="flex items-center justify-center gap-3 mb-4">
                    {/* Shuffle */}
                    <motion.button
                      onClick={() => setIsShuffled(s => !s)}
                      className={`p-2 rounded-full transition-colors ${
                        isShuffled ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="Shuffle (S)"
                    >
                      <Shuffle className={`w-4 h-4 ${isShuffled ? "fill-primary" : ""}`} />
                    </motion.button>

                    {/* Previous */}
                    <motion.button
                      onClick={handlePrev}
                      className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="Previous (P)"
                    >
                      <SkipBack className="w-5 h-5" />
                    </motion.button>

                    {/* Rewind 10s */}
                    <motion.button
                      onClick={() => seekRelative(-10)}
                      className="p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted text-[9px] font-bold"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="Rewind 10s"
                    >
                      <Rewind className="w-4 h-4" />
                    </motion.button>
                    
                    {/* Play/Pause */}
                    <motion.button
                      onClick={togglePlay}
                      disabled={!isLoaded || hasError}
                      className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 text-primary-foreground rounded-full flex items-center justify-center shadow-xl shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59, 130, 246, 0.4)" }}
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
                          {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                        </motion.div>
                      </AnimatePresence>
                    </motion.button>

                    {/* Forward 10s */}
                    <motion.button
                      onClick={() => seekRelative(10)}
                      className="p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted text-[9px] font-bold"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="Forward 10s"
                    >
                      <Forward className="w-4 h-4" />
                    </motion.button>
                    
                    {/* Next */}
                    <motion.button
                      onClick={handleNext}
                      className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="Next (N)"
                    >
                      <SkipForward className="w-5 h-5" />
                    </motion.button>

                    {/* Repeat */}
                    <motion.button
                      onClick={() => setRepeatMode(m => m === "none" ? "all" : m === "all" ? "one" : "none")}
                      className={`p-2 rounded-full transition-colors ${
                        repeatMode !== "none" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="Repeat (R)"
                    >
                      {repeatMode === "one" ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
                    </motion.button>
                  </div>

                  {/* === BOTTOM CONTROLS ROW === */}
                  <div className="flex items-center justify-center gap-2">
                    {/* Speed */}
                    <div className="relative" ref={speedMenuRef}>
                      <motion.button
                        onClick={() => setShowSpeedMenu(s => !s)}
                        className={`p-2 rounded-full transition-colors ${
                          playbackRate !== 1 ? "text-cyan-500 bg-cyan-500/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title="Speed"
                      >
                        <Gauge className="w-4 h-4" />
                      </motion.button>
                      <AnimatePresence>
                        {showSpeedMenu && (
                          <motion.div
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-1.5 bg-background/95 backdrop-blur border border-border rounded-2xl shadow-xl flex gap-1 z-50"
                            initial={{ opacity: 0, y: -10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                          >
                            {SPEED_OPTIONS.map(speed => (
                              <button
                                key={speed}
                                onClick={() => { setPlaybackRate(speed); setShowSpeedMenu(false); }}
                                className={`px-2.5 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                                  playbackRate === speed ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                }`}
                              >
                                {speed}x
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Sleep Timer */}
                    <div className="relative" ref={sleepMenuRef}>
                      <motion.button
                        onClick={() => setShowSleepMenu(s => !s)}
                        className={`p-2 rounded-full transition-colors ${
                          sleepTimer !== "off" ? "text-purple-500 bg-purple-500/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title="Sleep Timer"
                      >
                        <Timer className="w-4 h-4" />
                      </motion.button>
                      <AnimatePresence>
                        {showSleepMenu && (
                          <motion.div
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-2 bg-background/95 backdrop-blur border border-border rounded-2xl shadow-xl min-w-[140px] z-50"
                            initial={{ opacity: 0, y: -10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                          >
                            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1.5 px-2">Sleep Timer</p>
                            {(["off", "15min", "30min", "45min", "60min", "end_of_track"] as SleepTimerOption[]).map(option => (
                              <button
                                key={option}
                                onClick={() => { setSleepTimer(option); setShowSleepMenu(false); }}
                                className={`w-full text-left px-2 py-1.5 text-xs font-medium rounded-xl transition-colors ${
                                  sleepTimer === option ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                }`}
                              >
                                {option === "off" ? "Off" : option === "end_of_track" ? "End of Track" : option}
                              </button>
                            ))}
                            {sleepTimerRemaining > 0 && (
                              <p className="text-[10px] text-purple-500 px-2 pt-1">{formatTime(sleepTimerRemaining)} remaining</p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Volume */}
                    <div className="relative" ref={volumeSliderRef}>
                      <motion.button
                        onClick={() => setShowVolumeSlider(s => !s)}
                        className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Volume (↑↓)"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : volume > 0.5 ? <Volume2 className="w-4 h-4" /> : <Volume1 className="w-4 h-4" />}
                      </motion.button>
                      <AnimatePresence>
                        {showVolumeSlider && (
                          <motion.div
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-3 bg-background/95 backdrop-blur border border-border rounded-2xl shadow-xl z-50"
                            initial={{ opacity: 0, y: -10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                          >
                            <div className="flex items-center gap-2">
                              <button onClick={toggleMute} className="text-muted-foreground hover:text-foreground">
                                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                              </button>
                              <input
                                type="range"
                                min={0} max={1} step={0.01}
                                value={isMuted ? 0 : volume}
                                onChange={(e) => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
                                className="w-24 h-1.5 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                              />
                              <span className="text-xs text-muted-foreground w-8 text-right">{Math.round((isMuted ? 0 : volume) * 100)}%</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* EQ Toggle */}
                    <motion.button
                      onClick={() => setViewMode("equalizer")}
                      className={`p-2 rounded-full transition-colors ${
                        equalizerPreset !== "flat" ? "text-green-500 bg-green-500/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="Equalizer"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === COMPACT PLAYER (BOTTOM BAR) === */}
      <motion.div 
        className="fixed bottom-3 md:bottom-10 left-1/2 -translate-x-1/2 w-[96%] max-w-[520px] z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div 
          className="glass-strong rounded-[20px] md:rounded-[36px] p-2.5 md:p-4"
          whileHover={{ scale: 1.005 }}
          transition={{ duration: 0.2 }}
        >
          {/* Waveform mini progress */}
          <div className="absolute top-0 left-4 right-4 h-[3px] bg-muted rounded-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-muted-foreground/10 rounded-full" style={{ width: `${bufferedPercent}%` }} />
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50 animate-pulse" />
            </motion.div>
          </div>
          
          <div className="flex items-center gap-2.5 md:gap-5 pt-2">
            {/* Vinyl Mini */}
            <motion.button
              onClick={() => setIsExpanded(true)}
              className="w-10 h-10 md:w-14 md:h-14 rounded-[14px] md:rounded-[22px] bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0 relative shadow-inner"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center"
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={isPlaying ? { duration: 6, repeat: Infinity, ease: "linear" } : {}}
              >
                <Disc3 className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </motion.div>
              {/* Error/Loading */}
              {hasError && <div className="absolute inset-0 bg-destructive/20 flex items-center justify-center"><span className="text-[8px] text-destructive font-bold">ERR</span></div>}
              {!isLoaded && !hasError && isPlaying && (
                <div className="absolute inset-0 bg-background/30 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </motion.button>
            
            {/* Info */}
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setIsExpanded(true)}>
              <div className="flex items-center gap-1.5 mb-0.5">
                <motion.p 
                  className="text-[9px] md:text-[11px] font-bold text-muted-foreground uppercase tracking-[0.15em] truncate flex items-center gap-1"
                  animate={{ opacity: isPlaying ? [1, 0.6, 1] : 1 }}
                  transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
                >
                  {isPlaying ? "Now Playing" : "AI Podcast"}
                </motion.p>
                {isPlaying && (
                  <motion.span 
                    className="w-1 h-1 rounded-full bg-green-500"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <p className="text-[13px] md:text-[16px] font-bold text-foreground tracking-tight leading-none truncate">
                  {track.title}
                </p>
                {/* Mini status icons */}
                {repeatMode === "one" && <Repeat1 className="w-3 h-3 text-amber-500 flex-shrink-0" strokeWidth={2.5} />}
                {isShuffled && <Shuffle className="w-3 h-3 text-primary flex-shrink-0" strokeWidth={2.5} />}
                {playbackRate !== 1 && <span className="text-[8px] text-cyan-500 font-semibold flex-shrink-0">{playbackRate}x</span>}
                {isFavorite && <Heart className="w-3 h-3 text-red-500 fill-red-500 flex-shrink-0" strokeWidth={2.5} />}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-0.5 md:gap-2">
              {/* Prev */}
              <motion.button
                onClick={handlePrev}
                className="hidden md:flex p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <SkipBack className="w-4 h-4" />
              </motion.button>
              
              {/* Play/Pause */}
              <motion.button 
                onClick={togglePlay}
                disabled={!isLoaded || hasError}
                className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-purple-600 text-primary-foreground rounded-full flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
              
              {/* Next */}
              <motion.button
                onClick={handleNext}
                className="hidden md:flex p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <SkipForward className="w-4 h-4" />
              </motion.button>
              
              {/* Expand */}
              <motion.button
                onClick={() => setIsExpanded(true)}
                className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronUp className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

// === ENHANCED AUDIO VISUALIZER ===
const AudioVisualizer = ({ isPlaying, size }: { isPlaying: boolean; size: "small" | "large" }) => {
  const barCount = size === "large" ? 8 : 3;
  const bars = Array.from({ length: barCount }, (_, i) => i);
  
  const getHeights = () => {
    const h = ["20%", "80%", "40%", "100%", "30%", "60%", "90%", "50%"];
    return h.slice(0, barCount);
  };
  
  return (
    <div className={`flex items-end gap-[2px] ${size === "large" ? "h-8 md:h-10" : "h-3 md:h-4"}`}>
      {bars.map((i) => (
        <motion.div
          key={i}
          className={`bg-white rounded-full ${size === "large" ? "w-1.5 md:w-2" : "w-[3px]"}`}
          animate={isPlaying ? { height: getHeights() } : { height: "30%" }}
          transition={isPlaying ? {
            duration: 0.4 + (i * 0.06),
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.07,
          } : { duration: 0.3 }}
        />
      ))}
    </div>
  );
};

export default AudioPlayer;