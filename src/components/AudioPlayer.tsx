import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Disc, Music, AlignLeft, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Track, Release } from '../types';

interface AudioPlayerProps {
  currentTrack: Track | null;
  currentRelease: Release | null;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  themeColor: string;
}

export default function AudioPlayer({
  currentTrack,
  currentRelease,
  isPlaying,
  onPlayToggle,
  onNextTrack,
  onPrevTrack,
  themeColor
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [visualizerBars, setVisualizerBars] = useState<number[]>([]);

  // Seed visualizer bars
  useEffect(() => {
    const barsCount = 36;
    setVisualizerBars(Array.from({ length: barsCount }, () => Math.random() * 40 + 10));
  }, []);

  // Update visualizer heights when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setVisualizerBars(prev => prev.map(() => Math.random() * 80 + 20));
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Load new audio source on track change
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    audioRef.current.src = currentTrack.previewUrl;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch(err => console.log("Audio play error:", err));
    }
  }, [currentTrack]);

  // Handle play/pause commands from parent
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(err => console.log("Audio play error:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleTrackEnded = () => {
    onNextTrack();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    if (vol > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioRef.current.muted = nextMute;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) return null;

  return (
    <div id="audio-floating-os" className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/40 border-t border-white/10 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Hidden Audio element */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleTrackEnded}
        />

        {/* Dynamic Track Art and Metadata Card */}
        <div className="flex items-center gap-4 w-full md:w-1/4">
          <div className="relative group overflow-hidden rounded-lg w-14 h-14 bg-neutral-900 border border-neutral-700">
            {currentRelease ? (
              <img
                src={currentRelease.coverUrl}
                alt={currentRelease.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'animate-spin [animation-duration:8s]' : ''}`}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-500">
                <Music className="w-6 h-6" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Disc className="w-5 h-5 text-white animate-pulse" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white truncate">{currentTrack.title}</h4>
            <p className="text-xs text-neutral-400 truncate">
              {currentRelease?.title || "Single Output"}
            </p>
          </div>
        </div>

        {/* Waveform visualizer & Control Consoles */}
        <div className="flex flex-col items-center gap-1.5 w-full md:w-2/4">
          <div className="flex items-center gap-5">
            <button
              onClick={onPrevTrack}
              aria-label="Previous track"
              className="p-2 text-neutral-400 hover:text-white transition-colors hover:scale-105 active:scale-95"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={onPlayToggle}
              aria-label={isPlaying ? "Pause track" : "Play track"}
              className="p-3 bg-white text-black rounded-full hover:scale-110 active:scale-95 transition-all shadow-md group"
              style={{ backgroundColor: themeColor }}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-black text-black" />
              ) : (
                <Play className="w-5 h-5 fill-black text-black ml-0.5" />
              )}
            </button>
            <button
              onClick={onNextTrack}
              aria-label="Next track"
              className="p-2 text-neutral-400 hover:text-white transition-colors hover:scale-105 active:scale-95"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Timeline and duration bars */}
          <div className="flex items-center gap-3 w-full">
            <span className="text-[11px] font-mono text-neutral-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 accent-white bg-neutral-800 rounded-lg h-1.5 cursor-pointer appearance-none range-sm [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              style={{ accentColor: themeColor }}
            />
            <span className="text-[11px] font-mono text-neutral-400 w-10">
              {formatTime(duration)}
            </span>
          </div>

          {/* Audio Waveform Spectrum simulation */}
          <div className="h-4 flex items-center justify-center gap-0.5 w-[200px] overflow-hidden opacity-40">
            {visualizerBars.map((barHeight, idx) => (
              <div
                key={idx}
                className="w-1 bg-red-600 rounded-full transition-all duration-100 ease-out"
                style={{
                  height: isPlaying ? `${barHeight}%` : '4px',
                  backgroundColor: themeColor
                }}
              />
            ))}
          </div>
        </div>

        {/* Volume & Utility Buttons */}
        <div className="flex items-center justify-end gap-3.5 w-full md:w-1/4">
          <button
            onClick={() => setShowLyrics(prev => !prev)}
            className="p-2 relative rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
            title="Lyrics Viewer"
          >
            <AlignLeft className="w-4 h-4" />
            {currentTrack.lyrics && (
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
            )}
          </button>

          <div className="flex items-center gap-2 bg-neutral-900/40 px-3 py-1.5 rounded-full border border-neutral-800/80">
            <button
              onClick={toggleMute}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 accent-white h-1 bg-neutral-700 cursor-pointer rounded-lg hover:h-1.5 transition-all"
              style={{ accentColor: themeColor }}
            />
          </div>
        </div>
      </div>

      {/* Lyrics Sliding Panel Overlay */}
      <AnimatePresence>
        {showLyrics && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute bottom-[88px] right-4 md:right-12 w-80 md:w-96 max-h-96 overflow-y-auto bg-black/40 border border-white/10 rounded-xl p-4 md:p-6 shadow-2xl z-50 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Music className="w-4 h-4" style={{ color: themeColor }} />
                Lyric Transcription
              </h3>
              <button
                onClick={() => setShowLyrics(false)}
                className="text-neutral-400 hover:text-white text-xs border border-neutral-800 hover:border-neutral-700 rounded px-2 py-0.5 transition"
              >
                Close
              </button>
            </div>
            {currentTrack.lyrics ? (
              <div className="font-sans text-neutral-300 text-sm whitespace-pre-wrap leading-relaxed select-text font-medium text-center">
                {currentTrack.lyrics}
              </div>
            ) : (
              <p className="text-xs text-neutral-500 italic text-center py-8">
                No transcription available for this session track.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
