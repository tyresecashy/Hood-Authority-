import React, { useState, useEffect } from 'react';
import {
  BookOpen, Volume2, ChevronLeft, ChevronRight, HelpCircle, Play,
  Cpu, Flame, Compass, Sparkles, Star, Tag, X, Radio
} from 'lucide-react';
import { MythologyChapter, Track, Release } from '../types';
import { LORE_ARTIFACTS_BY_CHAPTER, LoreArtifact } from '../data/loreData';
import { SEED_RELEASES } from '../data/mockSeeds';

interface MythologyScrollerProps {
  chapters: MythologyChapter[];
  onSelectAmbientTrack: (previewUrl: string, trackTitle: string) => void;
  accentColor: string;
  onPlayTrack?: (track: Track, parentRelease: Release) => void;
}

export default function MythologyScroller({
  chapters,
  onSelectAmbientTrack,
  accentColor,
  onPlayTrack
}: MythologyScrollerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeChapter = chapters[activeIndex] || chapters[0];
  
  // State for active lore artifact
  const artifacts = LORE_ARTIFACTS_BY_CHAPTER[activeChapter.id] || [];
  const [selectedArtifact, setSelectedArtifact] = useState<LoreArtifact | null>(null);

  // Automatically trigger ambient track on chapter focus (cinematic auto-play)
  useEffect(() => {
    onSelectAmbientTrack(activeChapter.ambientAudioUrl, `${activeChapter.title} (Ambient Mood)`);
    // Default to first artifact of the chapter so the panel has glorious content loaded
    if (artifacts.length > 0) {
      setSelectedArtifact(artifacts[0]);
    } else {
      setSelectedArtifact(null);
    }
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % chapters.length);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + chapters.length) % chapters.length);
  };

  // Click interceptor mapping data-lore-id to selected artifact
  const handleTextContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const loreId = target.getAttribute('data-lore-id');
    if (loreId) {
      const found = artifacts.find(art => art.id === loreId);
      if (found) {
        setSelectedArtifact(found);
        if (found.audioSnippetUrl) {
          onSelectAmbientTrack(found.audioSnippetUrl, `${found.title} (Decrypted Tone)`);
        }
      }
    }
  };

  // Helper inside render to dynamically highlight keywords inside the narrative HTML
  const getProcessedNarrative = () => {
    let text = activeChapter.narrativeHtml;
    artifacts.forEach(art => {
      // Create a regex matching keyword globally with boundary checks
      const escapedKwd = art.keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(${escapedKwd})`, 'gi');
      
      text = text.replace(regex, (match) => {
        return `<span data-lore-id="${art.id}" class="cursor-pointer font-bold border-b border-dashed text-purple-300 hover:text-white hover:bg-purple-900/40 px-1 py-0.5 rounded transition duration-200" style="border-color: ${accentColor}">${match}</span>`;
      });
    });
    return text;
  };

  const handleAudioPreview = (art: LoreArtifact) => {
    if (art.audioSnippetUrl) {
      onSelectAmbientTrack(art.audioSnippetUrl, `${art.title} (Decrypted Snippet)`);
    }
  };

  const handleListenInPlayer = (trackId: string, releaseId: string) => {
    if (!onPlayTrack) return;
    const releaseFound = SEED_RELEASES.find(r => r.id === releaseId);
    if (releaseFound) {
      const trackFound = releaseFound.tracks.find(t => t.id === trackId);
      if (trackFound) {
        onPlayTrack(trackFound, releaseFound);
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* High-level navigation details */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
        
        {/* Left Side (3 cols): Chapter Narrative Scroller */}
        <div className="lg:col-span-3 relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl min-h-[550px] flex flex-col justify-between shadow-2xl">
          
          {/* Background Cinematic Media Layer */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-105 blur-sm"
              src={activeChapter.bgVideoUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]" />
          </div>

          {/* Floating Header Column */}
          <div className="relative z-10 p-5 flex items-center justify-between gap-4 border-b border-white/10 bg-black/30 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-neutral-400" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold">
                Chapter Saga: {activeChapter.chapterNumber} of {chapters.length}
              </span>
            </div>

            {/* Listen Ambient Theme button */}
            <button
              onClick={() => onSelectAmbientTrack(activeChapter.ambientAudioUrl, `${activeChapter.title} (Ambient Theme)`)}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full text-[10px] font-bold text-white transition hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
            >
              <Volume2 className="w-3.5 h-3.5 animate-pulse" style={{ color: accentColor }} />
              Trigger Chapter Pulse
            </button>
          </div>

          {/* Narrative Body Column */}
          <div className="relative z-10 px-6 py-10 md:px-12 space-y-6 flex-1 flex flex-col justify-center text-left">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest font-mono" style={{ color: accentColor }}>
                East African Chronicles
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight uppercase">
                {activeChapter.title}
              </h2>
              <p className="text-xs md:text-sm text-neutral-400 italic font-medium">
                {activeChapter.subtitle}
              </p>
            </div>

            {/* Click-interceptable narrative rendering block */}
            <div
              onClick={handleTextContainerClick}
              className="prose prose-invert text-xs md:text-sm text-neutral-300 leading-relaxed text-justify max-w-2xl space-y-5 pt-4 border-t border-white/10 select-text"
              dangerouslySetInnerHTML={{ __html: getProcessedNarrative() }}
            />

            {/* Discovered quick-list keys for reference */}
            <div className="pt-4 border-t border-white/5 space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-neutral-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" style={{ color: accentColor }} />
                Clickable Chapter Artifacts ({artifacts.length})
              </span>
              <div className="flex flex-wrap gap-2">
                {artifacts.map(art => {
                  const isCurActive = selectedArtifact?.id === art.id;
                  return (
                    <button
                      key={art.id}
                      onClick={() => {
                        setSelectedArtifact(art);
                        handleAudioPreview(art);
                      }}
                      className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer border ${
                        isCurActive
                          ? 'bg-purple-500/20 text-white border-purple-500/40 font-extrabold shadow-sm scale-105'
                          : 'bg-white/5 text-neutral-400 border-white/5 hover:border-white/10 hover:text-white'
                      }`}
                      style={isCurActive ? { borderColor: accentColor } : undefined}
                    >
                      <Tag className="w-3 h-3" style={{ color: accentColor }} />
                      {art.keyword}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer controls row */}
          <div className="relative z-10 p-5 bg-black/30 backdrop-blur-md border-t border-white/10 flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition active:scale-95 cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Chapter
            </button>

            {/* Custom state progress bead layouts */}
            <div className="flex gap-1.5">
              {chapters.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6' : 'w-2 bg-white/10'}`}
                  style={idx === activeIndex ? { backgroundColor: accentColor } : undefined}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition active:scale-95 cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              Next Chapter
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side (2 cols): Interactive "Sovereign Codex" detail display */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between min-h-[550px] relative overflow-hidden text-left">
          
          <div className="absolute top-0 right-0 w-44 h-44 bg-purple-500/5 blur-[50px] pointer-events-none rounded-full" />
          
          <div className="space-y-6 relative z-10">
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-neutral-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 animate-pulse" style={{ color: accentColor }} />
                Sovereign Codex Analyzer
              </span>
              {selectedArtifact && (
                <span className="px-2 py-0.5 bg-white/10 text-white text-[8px] font-mono rounded font-extrabold uppercase tracking-widest">
                  {selectedArtifact.category}
                </span>
              )}
            </div>

            {selectedArtifact ? (
              <div className="space-y-5 animate-fadeIn">
                
                {/* Visual Asset Thumbnail Mock */}
                <div className="relative group aspect-video overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-lg">
                  <img
                    src={selectedArtifact.visualAssetUrl}
                    alt={selectedArtifact.visualAssetAlt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                    <p className="text-[10px] font-mono text-neutral-300 font-bold tracking-wider">
                      DEC-ID: #{selectedArtifact.id.toUpperCase()} • {selectedArtifact.visualAssetAlt}
                    </p>
                  </div>
                </div>

                {/* Artifact Core Details */}
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    {selectedArtifact.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                    "{selectedArtifact.essence}"
                  </p>
                </div>

                {/* Cultural Legacy text */}
                <div className="space-y-2 p-4 bg-black/30 border border-white/5 rounded-2xl">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-neutral-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" style={{ color: accentColor }} />
                    Decrypted Historical Context
                  </span>
                  <p className="text-[11px] text-neutral-300 leading-normal select-text">
                    {selectedArtifact.culturalDoc}
                  </p>
                </div>

                {/* Artist Inspiration connection */}
                <div className="space-y-2 p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-neutral-300 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5" style={{ color: accentColor }} />
                    Acoustic Integration & Inspiration
                  </span>
                  <p className="text-[11px] text-neutral-300 leading-normal">
                    {selectedArtifact.artistInspiration}
                  </p>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-20 space-y-4">
                <HelpCircle className="w-12 h-12 text-neutral-600 animate-bounce" />
                <div className="space-y-1 max-w-xs">
                  <h4 className="text-xs font-extrabold text-white uppercase">Ready to decrypt</h4>
                  <p className="text-[11px] text-neutral-400">
                    Click any highlighted term inside the narrative scroll to project visual and sonic intelligence modules.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Persistent Player trigger connected directly to the persistent master player */}
          {selectedArtifact && (
            <div className="relative z-10 pt-4 mt-6 border-t border-white/5">
              {selectedArtifact.relatedTrackId && selectedArtifact.relatedReleaseId && onPlayTrack ? (
                <button
                  onClick={() => handleListenInPlayer(selectedArtifact.relatedTrackId!, selectedArtifact.relatedReleaseId!)}
                  className="w-full py-3 bg-white text-black hover:opacity-90 active:scale-95 text-xs font-bold rounded-2xl transition cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  style={{ backgroundColor: accentColor, color: '#000000' }}
                >
                  <Play className="w-4 h-4 fill-black text-black" />
                  Stream Inspired Track in Persisted Player
                </button>
              ) : (
                <button
                  onClick={() => handleAudioPreview(selectedArtifact)}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white hover:text-white text-xs font-bold rounded-2xl transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  Pre-audition Runic Sonic Pattern
                </button>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
