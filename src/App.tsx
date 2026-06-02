import React, { useState, useEffect } from 'react';
import {
  Sparkles, Music, BookOpen, Users, Radio, Cloud, Send, Sliders, Play, Pause,
  Lock, ArrowRight, Shield, Disc, Bell, UserCheck, Flame, Info, Check, LogIn
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Imports from local configuration and components
import {
  Artist, Release, VaultAsset, Comment, BroadcastCampaign,
  MythologyChapter, MemberProfile, ThemePreset, Track
} from './types';
import {
  SEED_ARTISTS, SEED_RELEASES, SEED_MYTHOLOGY, SEED_VAULT,
  SEED_CAMPAIGNS, SEED_THEMES
} from './data/mockSeeds';

import AudioPlayer from './components/AudioPlayer';
import ThemeStudio from './components/ThemeStudio';
import CommunityCenter from './components/CommunityCenter';
import AdminPanel from './components/AdminPanel';
import MythologyScroller from './components/MythologyScroller';
import DigitalVault from './components/DigitalVault';
import UserProfile from './components/UserProfile';

export default function App() {
  // STATE: Data Roster fallback collections
  const [artists, setArtists] = useState<Artist[]>(SEED_ARTISTS);
  const [releases, setReleases] = useState<Release[]>(SEED_RELEASES);
  const [myths, setMyths] = useState<MythologyChapter[]>(SEED_MYTHOLOGY);
  const [vaultAssets, setVaultAssets] = useState<VaultAsset[]>(SEED_VAULT);
  const [campaigns, setCampaigns] = useState<BroadcastCampaign[]>(SEED_CAMPAIGNS);
  const [themes, setThemes] = useState<ThemePreset[]>(SEED_THEMES);
  const [activeTheme, setActiveTheme] = useState<ThemePreset>(SEED_THEMES[0]);

  // STATE: Active Tab Routing
  const [activeRoute, setActiveRoute] = useState<'home' | 'myths' | 'artists' | 'discography' | 'community' | 'vault' | 'admin' | 'theme' | 'profile'>('home');

  // STATE: Simulated Role Configuration
  const [simulatedRole, setSimulatedRole] = useState<'fan' | 'inner_circle' | 'artist' | 'admin'>('admin');
  
  // STATE: Fan profile structure
  const [userProfile, setUserProfile] = useState<MemberProfile>({
    id: "admin_uid_777",
    email: "tyresecashy@gmail.com",
    displayName: "Tyrese Cashy",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    role: "admin",
    isInnerCircle: true,
    level: 12,
    xp: 412,
    badges: ["Sovereign Leader", "432Hz Attuned", "Master Curator"],
    joinedAt: "2026-06-02T09:16:20Z"
  });

  // Track comments list
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "comment-1",
      targetId: "general",
      userId: "fan_01",
      userName: "Kabera Flow",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=600",
      content: "The Matatu Rhapsody synthesizers are completely out of this world! Pure spiritual boom bap.",
      createdAt: "2026-06-02T08:30:00Z",
      likes: 12,
      isInnerCircle: false
    },
    {
      id: "comment-2",
      targetId: "general",
      userId: "inner_circle_02",
      userName: "Kibera Sage",
      userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
      content: "I downloaded Kinyan's WAV stems from the Cyber Vault. Re-routing the Mt Kenya vocal frequencies through my analog delays is absolute magic.",
      createdAt: "2026-06-02T08:50:00Z",
      likes: 24,
      isInnerCircle: true
    }
  ]);

  // AUDIO PLAYER CONNECTION STATE
  const [currentTrack, setCurrentTrack] = useState<Track | null>(SEED_RELEASES[0].tracks[1]); // Matatu Rhapsody default
  const [currentRelease, setCurrentRelease] = useState<Release | null>(SEED_RELEASES[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  // COUNTDOWN TIMERS STATE
  const [countdown, setCountdown] = useState({ hours: 12, minutes: 4, seconds: 45 });

  // Update Countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 }; // Loop countdown
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync role controls
  useEffect(() => {
    if (simulatedRole === 'fan') {
      setUserProfile(prev => ({ ...prev, role: 'fan', isInnerCircle: false, displayName: "Suburban Guerilla" }));
    } else if (simulatedRole === 'inner_circle') {
      setUserProfile(prev => ({ ...prev, role: 'fan', isInnerCircle: true, displayName: "Inner Circle Sage" }));
    } else if (simulatedRole === 'artist') {
      setUserProfile(prev => ({ ...prev, role: 'artist', isInnerCircle: true, displayName: "Kadogo Queen (Proxy)" }));
    } else {
      setUserProfile(prev => ({ ...prev, role: 'admin', isInnerCircle: true, displayName: "Tyrese Cashy (Admin)" }));
    }
  }, [simulatedRole]);

  // Actions creators
  const handlePlayToggle = () => setIsPlaying(prev => !prev);

  const handleSelectTrack = (track: Track, parentRelease: Release) => {
    setCurrentTrack(track);
    setCurrentRelease(parentRelease);
    setIsPlaying(true);
  };

  const handleNextTrack = () => {
    if (!currentTrack || !currentRelease) return;
    const tracksIdx = currentRelease.tracks.findIndex(t => t.id === currentTrack.id);
    if (tracksIdx !== -1 && tracksIdx < currentRelease.tracks.length - 1) {
      setCurrentTrack(currentRelease.tracks[tracksIdx + 1]);
    } else {
      // Loop or go to next release
      const releaseIdx = releases.findIndex(r => r.id === currentRelease.id);
      const nextRelease = releases[(releaseIdx + 1) % releases.length];
      if (nextRelease.tracks.length > 0) {
        setCurrentRelease(nextRelease);
        setCurrentTrack(nextRelease.tracks[0]);
      }
    }
  };

  const handlePrevTrack = () => {
    if (!currentTrack || !currentRelease) return;
    const tracksIdx = currentRelease.tracks.findIndex(t => t.id === currentTrack.id);
    if (tracksIdx > 0) {
      setCurrentTrack(currentRelease.tracks[tracksIdx - 1]);
    }
  };

  // Add Comment Flow
  const handleAddComment = (targetId: string, content: string) => {
    const freshComment: Comment = {
      id: "comment-" + Date.now(),
      targetId,
      userId: userProfile.id,
      userName: userProfile.displayName,
      userAvatar: userProfile.avatarUrl,
      content,
      createdAt: new Date().toISOString(),
      isInnerCircle: userProfile.isInnerCircle,
      likes: 0
    };
    setComments(prev => [freshComment, ...prev]);
  };

  const handleLikeComment = (commentId: string) => {
    setComments(prev => prev.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c));
  };

  // Admin dynamic updates
  const handleAddRelease = (item: Release) => {
    setReleases(prev => [item, ...prev]);
  };

  const handleAddVaultAsset = (item: VaultAsset) => {
    setVaultAssets(prev => [item, ...prev]);
  };

  const handleAddCampaign = (item: BroadcastCampaign) => {
    setCampaigns(prev => [item, ...prev]);
  };

  const handleAddMyth = (item: MythologyChapter) => {
    setMyths(prev => [item, ...prev]);
  };

  const handleDeleteRelease = (id: string) => {
    setReleases(prev => prev.filter(r => r.id !== id));
  };

  const handleDeleteVaultAsset = (id: string) => {
    setVaultAssets(prev => prev.filter(v => v.id !== id));
  };

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${activeTheme.colors.bgGradStart} 0%, ${activeTheme.colors.bgGradEnd} 100%)`,
        color: activeTheme.colors.textActive
      }}
      className="relative min-h-screen font-sans antialiased text-white pb-28 transition-all duration-700 select-none overflow-x-hidden"
    >
      {/* Background Decorative Emitters */}
      <div className="absolute top-1/4 right-[10%] w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-[10%] w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[130px] pointer-events-none z-0"></div>
      
      {/* 1. Cinematic Header Ambient Row */}
      <header className="px-6 py-3.5 bg-black/30 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-purple-800 shadow-md">
            <Disc className="w-5 h-5 text-white animate-spin [animation-duration:5s]" />
          </div>
          <div className="text-left">
            <h1 className="text-sm font-black tracking-widest uppercase">Hood Authority Co.</h1>
            <p className="text-[9px] uppercase font-mono tracking-widest text-neutral-400">Media Operating System v1.5</p>
          </div>
        </div>

        {/* Dynamic Navigation Links */}
        <nav className="flex gap-1 overflow-x-auto w-full md:w-auto pb-1.5 md:pb-0">
          {[
            { id: 'home', label: 'Dashboard', icon: Radio },
            { id: 'myths', label: 'Saga Archive', icon: BookOpen },
            { id: 'artists', label: 'Artists', icon: Users },
            { id: 'discography', label: 'Discography', icon: Music },
            { id: 'community', label: 'Council', icon: Flame },
            { id: 'profile', label: 'Sovereign Profile', icon: UserCheck },
            { id: 'vault', label: 'Cyber Vault', icon: Cloud },
            { id: 'theme', label: 'Shaders', icon: Sliders },
            { id: 'admin', label: 'Admin OS', icon: Shield }
          ].map(tab => {
            const Icon = tab.icon;
            const isTabActive = activeRoute === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveRoute(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isTabActive
                    ? 'bg-white/10 border border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" style={isTabActive ? { color: activeTheme.colors.primary } : undefined} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* 2. Interactive Simulation Role Switcher */}
        <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mr-1">ROLE:</span>
          {(['fan', 'inner_circle', 'artist', 'admin'] as const).map(roleOption => {
            const isRoleActive = simulatedRole === roleOption;
            return (
              <button
                key={roleOption}
                onClick={() => setSimulatedRole(roleOption)}
                className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold transition-all uppercase cursor-pointer ${
                  isRoleActive
                    ? 'text-black font-extrabold shadow-sm scale-105'
                    : 'text-neutral-400 hover:text-white'
                }`}
                style={isRoleActive ? { backgroundColor: activeTheme.colors.primary, color: '#000000' } : undefined}
              >
                {roleOption.replace('_', ' ')}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Core Body Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-12">
        
        {/* VIEW 1: Cinematic Hero & Hub */}
        {activeRoute === 'home' && (
          <div className="space-y-12">
            
            {/* Countdown Banner / Hero Core */}
            <div className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center justify-center p-6 md:p-12 border border-neutral-800/80">
              {/* Background Video Layer */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src="https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-futuristic-city-night-concept-43098-large.mp4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black" />
              </div>

              {/* Foreground Typography */}
              <div className="relative z-10 max-w-4xl text-center space-y-6">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-semibold text-red-500 uppercase tracking-widest">
                  <Flame className="w-3.5 h-3.5" style={{ color: activeTheme.colors.primary }} />
                  Upcoming Transmission Leak
                </span>

                <h1 className="text-4xl md:text-7xl font-sans font-black tracking-tighter text-white leading-none uppercase">
                  Rift Valley Legacy
                </h1>
                
                <p className="text-xs md:text-sm text-neutral-300 max-w-xl mx-auto font-medium">
                  The restricted studio masters containing low frequency 432Hz keys. Syncing with Nairobi and Mombasa transponders. Watch the countdown timer reach target zeroes.
                </p>

                {/* Grid Clock Tracker */}
                <div className="flex justify-center items-center gap-4 py-5">
                  <div className="bg-neutral-900/40 backdrop-blur border border-neutral-850 p-3 rounded-2xl w-20 text-center">
                    <div className="text-xl md:text-3xl font-mono font-black" style={{ color: activeTheme.colors.accent }}>{countdown.hours}</div>
                    <div className="text-[10px] text-neutral-500 uppercase font-bold mt-1">Hours</div>
                  </div>
                  <div className="text-neutral-600 font-mono text-xl">:</div>
                  <div className="bg-neutral-900/40 backdrop-blur border border-neutral-850 p-3 rounded-2xl w-20 text-center">
                    <div className="text-xl md:text-3xl font-mono font-black" style={{ color: activeTheme.colors.accent }}>{countdown.minutes}</div>
                    <div className="text-[10px] text-neutral-500 uppercase font-bold mt-1">MIN</div>
                  </div>
                  <div className="text-neutral-600 font-mono text-xl">:</div>
                  <div className="bg-neutral-900/40 backdrop-blur border border-neutral-850 p-3 rounded-2xl w-20 text-center">
                    <div className="text-xl md:text-3xl font-mono font-black text-red-500">{countdown.seconds}</div>
                    <div className="text-[10px] text-neutral-500 uppercase font-bold mt-1">SEC</div>
                  </div>
                </div>

                {/* Clickable Action Portlets */}
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => setActiveRoute('discography')}
                    className="px-6 py-3 bg-white text-black text-xs font-bold rounded-xl hover:opacity-90 active:scale-95 transition flex items-center gap-2 cursor-pointer"
                    style={{ backgroundColor: activeTheme.colors.primary, color: '#000000' }}
                  >
                    <Music className="w-4 h-4" /> Listen Releases
                  </button>
                  <button
                    onClick={() => setActiveRoute('myths')}
                    className="px-6 py-3 bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-bold rounded-xl hover:text-white hover:bg-neutral-800 transition flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" /> Read Chronicles
                  </button>
                  <button
                    onClick={() => setActiveRoute('vault')}
                    className="px-6 py-3 bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-bold rounded-xl hover:text-white hover:bg-neutral-800 transition flex items-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" style={{ color: activeTheme.colors.accent }} /> Access Cyber Vault
                  </button>
                </div>
              </div>
            </div>

            {/* Aesthetic Bento Grid Portraying active features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Feature A: Audio Spotlight */}
              <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl flex flex-col justify-between text-left space-y-4 hover:bg-white/10 hover:border-white/20 hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-950/20 blur-[60px] rounded-full pointer-events-none z-0"></div>
                <div className="relative z-10">
                  <Music className="w-6 h-6 mb-2" style={{ color: activeTheme.colors.primary }} />
                  <h3 className="text-sm font-bold uppercase text-white">432Hz Attuned Discography</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mt-2">
                    Separate stereo separations, EP tracks layouts, with live lyrics transcribing engines.
                  </p>
                </div>
                <button
                  onClick={() => setActiveRoute('discography')}
                  className="relative z-10 text-xs font-bold inline-flex items-center gap-1 text-white hover:opacity-80 cursor-pointer"
                  style={{ color: activeTheme.colors.primary }}
                >
                  Launch player deck <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Feature B: Immersive Saga storytelling */}
              <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl flex flex-col justify-between text-left space-y-4 hover:bg-white/10 hover:border-white/20 hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-yellow-950/10 blur-[60px] rounded-full pointer-events-none z-0"></div>
                <div className="relative z-10">
                  <BookOpen className="w-6 h-6 mb-2" style={{ color: activeTheme.colors.accent }} />
                  <h3 className="text-sm font-bold uppercase text-white">East African Mythology</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mt-2">
                    Scroll-based narrative chapters describing Nairobi concrete sages and Golden Mombasa Shield wars.
                  </p>
                </div>
                <button
                  onClick={() => setActiveRoute('myths')}
                  className="relative z-10 text-xs font-bold inline-flex items-center gap-1 text-white hover:opacity-80 cursor-pointer"
                  style={{ color: activeTheme.colors.accent }}
                >
                  Unveil saga scrolls <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Feature C: Multi-Artist Swipers */}
              <div className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl flex flex-col justify-between text-left space-y-4 hover:bg-white/10 hover:border-white/20 hover:scale-[1.01] transition-all relative overflow-hidden group">
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-950/20 blur-[60px] rounded-full pointer-events-none z-0"></div>
                <div className="relative z-10">
                  <Users className="w-6 h-6 mb-2" style={{ color: activeTheme.colors.primary }} />
                  <h3 className="text-sm font-bold uppercase text-white">The Roster Sovereign Profiles</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mt-2">
                    Individual statistics, biographic data logs, and sound recordings of Kinyan MC and Empress Kadogo Queen.
                  </p>
                </div>
                <button
                  onClick={() => setActiveRoute('artists')}
                  className="relative z-10 text-xs font-bold inline-flex items-center gap-1 text-white hover:opacity-80 cursor-pointer"
                  style={{ color: activeTheme.colors.primary }}
                >
                  Inspect active roster <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 2: Immersive Mythology */}
        {activeRoute === 'myths' && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-wider">The Cinematic Chronicles</h2>
              <p className="text-xs text-neutral-400">Scroll through the ancient and cybernetic sagas of East Africa's resistance.</p>
            </div>
            
            <MythologyScroller
              chapters={myths}
              accentColor={activeTheme.colors.primary}
              onSelectAmbientTrack={(url, title) => {
                setCurrentTrack({
                  id: "ambient-" + Date.now(),
                  title,
                  duration: "Loop",
                  previewUrl: url,
                  lyrics: "Dynamic continuous cinematic ambient background loops."
                });
                setIsPlaying(true);
              }}
              onPlayTrack={handleSelectTrack}
            />
          </div>
        )}

        {/* VIEW 3: Roster Profiles */}
        {activeRoute === 'artists' && (
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-wider">The Hood Authority Roster</h2>
              <p className="text-xs text-neutral-400">Meet the lyrical orators fighting againstcorporate voice colonization grids.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {artists.map(artist => (
                <div
                  key={artist.id}
                  className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg p-5 flex flex-col justify-between hover:scale-[1.01] transition-all"
                >
                  <div className="space-y-4">
                    <img src={artist.avatarUrl} alt={artist.name} className="w-24 h-24 mx-auto object-cover rounded-full border border-neutral-800" />
                    <div className="text-center">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wide">{artist.name}</h3>
                      <span className="text-[10px] text-neutral-400 block font-mono uppercase mt-0.5">{artist.role}</span>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed text-justify px-2 line-clamp-4">
                      {artist.bio}
                    </p>

                    <div className="grid grid-cols-3 gap-1 px-2">
                      <div className="text-center p-2 bg-black/40 rounded border border-neutral-950">
                        <span className="text-[8px] uppercase text-neutral-500 block">Listeners</span>
                        <span className="text-xs font-bold text-white">{(artist.stats.monthlyListeners / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="text-center p-2 bg-black/40 rounded border border-neutral-950">
                        <span className="text-[8px] uppercase text-neutral-500 block">Followers</span>
                        <span className="text-xs font-bold text-white">{(artist.stats.followers / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="text-center p-2 bg-black/40 rounded border border-neutral-950">
                        <span className="text-[8px] uppercase text-neutral-500 block">Myth Rating</span>
                        <span className="text-xs font-bold text-white">⭐ {artist.stats.mythRating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-950 flex justify-center gap-3">
                    {artist.socials.instagram && (
                      <a href={artist.socials.instagram} target="_blank" className="text-neutral-500 hover:text-white transition text-[10px] font-mono">
                        INSTAGRAM
                      </a>
                    )}
                    {artist.socials.spotify && (
                      <a href={artist.socials.spotify} target="_blank" className="text-neutral-500 hover:text-white transition text-[10px] font-mono">
                        SPOTIFY
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: Discography Releases */}
        {activeRoute === 'discography' && (
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-wider">Sovereign Discography</h2>
              <p className="text-xs text-neutral-400">Discover full lists of studio tracks aligned inside raw, interactive visualizers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {releases.map(release => {
                // Determine whether to display unreleased queue
                const isItemScheduled = release.status === 'scheduled';
                return (
                  <div
                    key={release.id}
                    className="p-5 bg-neutral-900/40 border border-neutral-800 rounded-3xl space-y-4 flex flex-col md:flex-row gap-5 items-start relative overflow-hidden"
                  >
                    <div className="w-full md:w-36 h-36 relative rounded-xl overflow-hidden border border-neutral-800">
                      <img src={release.coverUrl} alt={release.title} className="w-full h-full object-cover" />
                      {isItemScheduled && (
                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-3 text-center">
                          <Lock className="w-4 h-4 text-amber-500 mb-1" />
                          <span className="text-[8px] uppercase tracking-widest text-amber-400 font-bold">Scheduled Leak</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-3.5 text-left">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-neutral-950 text-[9px] font-mono rounded text-neutral-400 border border-neutral-900">
                            {release.type}
                          </span>
                          {release.isPremium && (
                            <span className="px-1.5 py-0.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[8px] font-mono rounded">
                              PREMIUM VAULT
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-white mt-1.5">{release.title}</h3>
                        <p className="text-[10px] text-neutral-400 leading-normal mt-1">{release.description}</p>
                      </div>

                      {/* Display Track List */}
                      {release.tracks.length > 0 ? (
                        <div className="space-y-1.5">
                          {release.tracks.map((track, idx) => {
                            const isSelectedTrack = currentTrack?.id === track.id;
                            return (
                              <button
                                key={track.id}
                                disabled={isItemScheduled && simulatedRole === 'fan'}
                                onClick={() => handleSelectTrack(track, release)}
                                className={`w-full flex items-center justify-between p-2 rounded-lg text-xs leading-none transition-colors border ${
                                  isSelectedTrack
                                    ? 'bg-neutral-800/80 border-neutral-700 text-white'
                                    : 'bg-black/20 border-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="font-mono text-[10px] text-neutral-500">{idx + 1}</span>
                                  <span className="truncate font-semibold">{track.title}</span>
                                </div>
                                <span className="text-[10px] font-mono text-neutral-500 ml-2">{track.duration}</span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-[10px] text-neutral-500 italic">No tracks loaded inside this release container.</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 5: Community Council */}
        {activeRoute === 'community' && (
          <CommunityCenter
            comments={comments}
            onAddComment={handleAddComment}
            onLikeComment={handleLikeComment}
            currentUser={userProfile}
            releases={releases}
            themeColor={activeTheme.colors.primary}
            themeAccent={activeTheme.colors.accent}
          />
        )}

        {/* VIEW 6: Premium Members Vault */}
        {activeRoute === 'vault' && (
          <DigitalVault
            assets={vaultAssets}
            isInnerCircle={userProfile.isInnerCircle}
            themeColor={activeTheme.colors.primary}
          />
        )}

        {/* VIEW 7: Dynamic Theme Studio */}
        {activeRoute === 'theme' && (
          <ThemeStudio
            currentTheme={activeTheme}
            onThemeSelect={setActiveTheme}
            isAdmin={userProfile.role === 'admin'}
          />
        )}

        {/* VIEW 8: Multi-Artist Admin OS Control Suite */}
        {activeRoute === 'admin' && (
          userProfile.role === 'admin' ? (
            <AdminPanel
              artists={artists}
              releases={releases}
              vaultAssets={vaultAssets}
              campaigns={campaigns}
              myths={myths}
              onAddRelease={handleAddRelease}
              onAddVaultAsset={handleAddVaultAsset}
              onAddCampaign={handleAddCampaign}
              onAddMyth={handleAddMyth}
              onDeleteRelease={handleDeleteRelease}
              onDeleteVaultAsset={handleDeleteVaultAsset}
              themeColor={activeTheme.colors.primary}
              themeAccent={activeTheme.colors.accent}
            />
          ) : (
            <div className="bg-neutral-900/60 backdrop-blur border border-neutral-800 rounded-3xl p-8 max-w-lg mx-auto text-center space-y-4 shadow-xl">
              <Shield className="w-10 h-10 mx-auto text-red-500" />
              <h3 className="text-xl font-bold text-white">Access Violation Notice</h3>
              <p className="text-xs text-neutral-400">
                You must possess Administrative clearance parameters to access the full multi-artist operational dashboard.
              </p>
              <div className="p-3 bg-black/40 rounded border border-neutral-950 text-left">
                <span className="text-[10px] text-neutral-500 block">Quick Bypass:</span>
                <p className="text-[11px] text-neutral-300">
                  Simply select **ADMIN** inside the role switcher on the right side of the main header bar to gain instant administrative clearance variables.
                </p>
              </div>
            </div>
          )
        )}

        {/* VIEW 9: Fan Sovereign Profile */}
        {activeRoute === 'profile' && (
          <UserProfile
            profile={userProfile}
            onUpdateProfile={setUserProfile}
            comments={comments}
            onAddComment={handleAddComment}
            artists={artists}
            releases={releases}
            themeColor={activeTheme.colors.primary}
            themeAccent={activeTheme.colors.accent}
          />
        )}

      </main>

      {/* Floating Bottom Media OS AudioPlayer Bar */}
      <AudioPlayer
        currentTrack={currentTrack}
        currentRelease={currentRelease}
        isPlaying={isPlaying}
        onPlayToggle={handlePlayToggle}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        themeColor={activeTheme.colors.primary}
      />

    </div>
  );
}
