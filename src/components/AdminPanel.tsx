import React, { useState, FormEvent } from 'react';
import {
  TrendingUp, Users, Radio, Cloud, Send, Clock, Play, Plus, Trash2, ShieldAlert,
  Sliders, Music, BookOpen, Layers, CheckCircle2, ChevronRight, Share2, Award, Zap
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Artist, Release, VaultAsset, BroadcastCampaign, MythologyChapter, Track } from '../types';

interface AdminPanelProps {
  artists: Artist[];
  releases: Release[];
  vaultAssets: VaultAsset[];
  campaigns: BroadcastCampaign[];
  myths: MythologyChapter[];
  onAddRelease: (release: Release) => void;
  onAddVaultAsset: (asset: VaultAsset) => void;
  onAddCampaign: (campaign: BroadcastCampaign) => void;
  onAddMyth: (myth: MythologyChapter) => void;
  onDeleteRelease: (id: string) => void;
  onDeleteVaultAsset: (id: string) => void;
  themeColor: string;
  themeAccent: string;
}

const ANALYTICS_DATA = [
  { name: 'Jan', listeners: 45000, revenue: 2400, depth: 78 },
  { name: 'Feb', listeners: 52000, revenue: 2900, depth: 82 },
  { name: 'Mar', listeners: 68000, revenue: 4100, depth: 84 },
  { name: 'Apr', listeners: 85000, revenue: 4900, depth: 88 },
  { name: 'May', listeners: 145000, revenue: 8600, depth: 92 },
  { name: 'Jun', listeners: 189000, revenue: 11400, depth: 95 }
];

export default function AdminPanel({
  artists,
  releases,
  vaultAssets,
  campaigns,
  myths,
  onAddRelease,
  onAddVaultAsset,
  onAddCampaign,
  onAddMyth,
  onDeleteRelease,
  onDeleteVaultAsset,
  themeColor,
  themeAccent
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'release' | 'vault' | 'broadcast' | 'workspace'>('dashboard');

  // Multi-Artist Context Switcher Inside Workspace
  const [workingArtistId, setWorkingArtistId] = useState<string>(artists[0]?.id || "kinyan-mc");

  // Input States for New Form Entries
  const [newRelease, setNewRelease] = useState({
    title: "",
    type: "LP" as 'LP' | 'EP' | 'Single' | 'Mixtape',
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400",
    description: "",
    isPremium: false,
    status: "released" as 'draft' | 'scheduled' | 'released',
    scheduledAt: "2026-07-15T20:00:00Z"
  });

  const [newVaultAsset, setNewVaultAsset] = useState({
    title: "",
    type: "stems" as 'master' | 'stems' | 'artwork' | 'press-kit' | 'other',
    fileUrl: "",
    fileSize: "45 MB",
    description: "",
    artistId: artists[0]?.id || ""
  });

  const [newCampaign, setNewCampaign] = useState({
    title: "",
    channel: "Discord" as 'Discord' | 'Email' | 'In-App' | 'Telegram' | 'Push',
    content: ""
  });

  const [newMyth, setNewMyth] = useState({
    title: "",
    subtitle: "",
    chapterNumber: myths.length + 1,
    narrativeHtml: "",
    bgVideoUrl: "",
    ambientAudioUrl: ""
  });

  const handleCreateRelease = (e: FormEvent) => {
    e.preventDefault();
    if (!newRelease.title.trim()) return;
    const releaseId = newRelease.title.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const createdItem: Release = {
      id: releaseId,
      title: newRelease.title,
      type: newRelease.type,
      coverUrl: newRelease.coverUrl,
      description: newRelease.description,
      artistIds: [workingArtistId],
      isPremium: newRelease.isPremium,
      status: newRelease.status,
      isScheduled: newRelease.status === 'scheduled',
      scheduledAt: newRelease.scheduledAt,
      releaseDate: new Date().toISOString().split('T')[0],
      tracks: [] // Emptied raw listing placeholder
    };
    onAddRelease(createdItem);
    setNewRelease({
      title: "",
      type: "LP",
      coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400",
      description: "",
      isPremium: false,
      status: "released",
      scheduledAt: "2026-07-15T20:00:00Z"
    });
  };

  const handleCreateVaultAsset = (e: FormEvent) => {
    e.preventDefault();
    if (!newVaultAsset.title.trim() || !newVaultAsset.fileUrl.trim()) return;
    const createdItem: VaultAsset = {
      id: "vault-" + Date.now(),
      title: newVaultAsset.title,
      type: newVaultAsset.type,
      fileUrl: newVaultAsset.fileUrl,
      fileSize: newVaultAsset.fileSize,
      artistId: newVaultAsset.artistId,
      description: newVaultAsset.description,
      tags: [newVaultAsset.type, "private-vault-leak"],
      createdAt: new Date().toISOString()
    };
    onAddVaultAsset(createdItem);
    setNewVaultAsset({
      title: "",
      type: "stems",
      fileUrl: "",
      fileSize: "45 MB",
      description: "",
      artistId: artists[0]?.id || ""
    });
  };

  const handleCreateCampaign = (e: FormEvent) => {
    e.preventDefault();
    if (!newCampaign.title.trim() || !newCampaign.content.trim()) return;
    const createdItem: BroadcastCampaign = {
      id: "campaign-" + Date.now(),
      title: newCampaign.title,
      channel: newCampaign.channel,
      content: newCampaign.content,
      status: "sent",
      sentAt: new Date().toISOString(),
      recipientsCount: Math.floor(Math.random() * 8000 + 1000)
    };
    onAddCampaign(createdItem);
    setNewCampaign({
      title: "",
      channel: "Discord",
      content: ""
    });
  };

  const handleCreateMyth = (e: FormEvent) => {
    e.preventDefault();
    if (!newMyth.title.trim()) return;
    const createdItem: MythologyChapter = {
      id: "chapter-" + (myths.length + 1),
      chapterNumber: newMyth.chapterNumber,
      title: newMyth.title,
      subtitle: newMyth.subtitle,
      narrativeHtml: newMyth.narrativeHtml,
      bgVideoUrl: newMyth.bgVideoUrl || "https://assets.mixkit.co/videos/preview/mixkit-dark-cyberpunk-city-street-under-heavy-rain-41712-large.mp4",
      ambientAudioUrl: newMyth.ambientAudioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    };
    onAddMyth(createdItem);
    setNewMyth({
      title: "",
      subtitle: "",
      chapterNumber: myths.length + 2,
      narrativeHtml: "",
      bgVideoUrl: "",
      ambientAudioUrl: ""
    });
  };

  const activeWorkingArtistObj = artists.find(a => a.id === workingArtistId) || artists[0];

  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-4 md:p-8 max-w-7xl mx-auto shadow-2xl space-y-8">
      
      {/* Operating System Admin Navigation Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-5 h-5" style={{ color: themeColor }} />
            Hood OS Administrative Deck
          </h2>
          <p className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">
            Multi-artist release pipeline / Click metrics / Interactive database seeds
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-1.5 md:pb-0">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'content', label: 'Publishing', icon: BookOpen },
            { id: 'release', label: 'Release Engine', icon: Clock },
            { id: 'vault', label: 'Digital Vault', icon: Cloud },
            { id: 'broadcast', label: 'Broadcasts', icon: Send },
            { id: 'workspace', label: 'Artist Desk', icon: Sliders }
          ].map(tab => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isTabActive
                    ? 'bg-neutral-900 border border-neutral-800 text-white'
                    : 'text-neutral-500 hover:text-white hover:bg-neutral-900/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" style={isTabActive ? { color: themeColor } : undefined} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: real-time dashboard analytics */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-neutral-900/40 border border-neutral-800/80 rounded-xl">
              <span className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase">Active Listeners</span>
              <div className="text-2xl font-black text-white mt-1">189,450</div>
              <p className="text-[10px] text-emerald-400 mt-1">▲ +24% monthly spike</p>
            </div>
            <div className="p-4 bg-neutral-900/40 border border-neutral-800/80 rounded-xl">
              <span className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase">Monthly Royalty Rev</span>
              <div className="text-2xl font-black text-white mt-1">$11,400</div>
              <p className="text-[10px] text-emerald-400 mt-1">▲ +12% active playrate</p>
            </div>
            <div className="p-4 bg-neutral-900/40 border border-neutral-800/80 rounded-xl">
              <span className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase">Scheduled Releases</span>
              <div className="text-2xl font-black text-white mt-1">1 LP / EP pending</div>
              <p className="text-[10px] text-amber-500 mt-1">● Auto countdown active</p>
            </div>
            <div className="p-4 bg-neutral-900/40 border border-neutral-800/80 rounded-xl">
              <span className="text-[10px] text-neutral-400 font-mono tracking-wider uppercase">Vault Asset Count</span>
              <div className="text-2xl font-black text-white mt-1">{vaultAssets.length} Stems/Masters</div>
              <p className="text-[10px] text-purple-400 mt-1">★ Private Inner Circle Encrypt</p>
            </div>
          </div>

          {/* Recharts Graphical Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-black/60 border border-neutral-900 rounded-xl p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4">
                Operational Listening Resonance (Plays)
              </h3>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ANALYTICS_DATA}>
                    <defs>
                      <linearGradient id="colorListeners" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={themeColor} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={themeColor} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="name" stroke="#555" fontSize={10} />
                    <YAxis stroke="#555" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                    <Area type="monotone" dataKey="listeners" stroke={themeColor} fillOpacity={1} fill="url(#colorListeners)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-black/60 border border-neutral-900 rounded-xl p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4 font-sans">
                Accumulated Revenue Stream ($)
              </h3>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ANALYTICS_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="name" stroke="#555" fontSize={10} />
                    <YAxis stroke="#555" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                    <Bar dataKey="revenue" fill={themeAccent} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Content Management & Publishing */}
      {activeTab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Add releases or albums config */}
          <form onSubmit={handleCreateRelease} className="space-y-4 bg-black/40 border border-neutral-900 rounded-xl p-5">
            <h3 className="text-sm font-bold uppercase text-white flex items-center gap-1.5 border-b border-neutral-900 pb-2">
              <Plus className="w-4 h-4" /> Publish Discography Track/EP
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-neutral-400 block font-mono uppercase mb-1">Release Title</label>
                <input
                  type="text"
                  required
                  value={newRelease.title}
                  onChange={e => setNewRelease({ ...newRelease, title: e.target.value })}
                  placeholder="e.g. Mombasa Rebellion"
                  className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-2 text-white placeholder-neutral-600"
                />
              </div>
              <div>
                <label className="text-[10px] text-neutral-400 block font-mono uppercase mb-1">Release Type</label>
                <select
                  value={newRelease.type}
                  onChange={e => setNewRelease({ ...newRelease, type: e.target.value as any })}
                  className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-2 text-white"
                >
                  <option value="LP">LP (Album)</option>
                  <option value="EP">EP (Extended Play)</option>
                  <option value="Single">Single</option>
                  <option value="Mixtape">Mixtape</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-neutral-400 block font-mono uppercase mb-1">Cover Art URL</label>
              <input
                type="text"
                required
                value={newRelease.coverUrl}
                onChange={e => setNewRelease({ ...newRelease, coverUrl: e.target.value })}
                className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-2 text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-neutral-400 block font-mono uppercase mb-1">Status Action</label>
                <select
                  value={newRelease.status}
                  onChange={e => setNewRelease({ ...newRelease, status: e.target.value as any })}
                  className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-2 text-white"
                >
                  <option value="released">Instant Release</option>
                  <option value="scheduled">Schedule Countdown</option>
                  <option value="draft">Save Mock Draft</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-neutral-400 block font-mono uppercase mb-1">Is Premium Secret?</label>
                <select
                  value={newRelease.isPremium ? "true" : "false"}
                  onChange={e => setNewRelease({ ...newRelease, isPremium: e.target.value === "true" })}
                  className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-2 text-white"
                >
                  <option value="false">Standard Public Free</option>
                  <option value="true">Premium Inner-Circle Encrypt</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-neutral-400 block font-mono uppercase mb-1">Description</label>
              <textarea
                value={newRelease.description}
                onChange={e => setNewRelease({ ...newRelease, description: e.target.value })}
                placeholder="Cinematic marketing summaries..."
                rows={2}
                className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-2 text-white placeholder-neutral-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-white text-black font-semibold rounded-lg text-xs hover:opacity-90 transition"
              style={{ backgroundColor: themeColor }}
            >
              Add Release to Catalog
            </button>
          </form>

          {/* Add mythology chapters */}
          <form onSubmit={handleCreateMyth} className="space-y-4 bg-black/40 border border-neutral-900 rounded-xl p-5">
            <h3 className="text-sm font-bold uppercase text-white flex items-center gap-1.5 border-b border-neutral-900 pb-2">
              <Plus className="w-4 h-4" /> Construct Mythology Chapter
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <label className="text-[10px] text-neutral-400 block font-mono uppercase mb-1">Chapter #</label>
                <input
                  type="number"
                  required
                  value={newMyth.chapterNumber}
                  onChange={e => setNewMyth({ ...newMyth, chapterNumber: parseInt(e.target.value) || 1 })}
                  className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-2 text-white"
                />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] text-neutral-400 block font-mono uppercase mb-1">Chapter Title</label>
                <input
                  type="text"
                  required
                  value={newMyth.title}
                  onChange={e => setNewMyth({ ...newMyth, title: e.target.value })}
                  placeholder="e.g. Swahili Thunder"
                  className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-2 text-white placeholder-neutral-600"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-neutral-400 block font-mono uppercase mb-1">Subtitle narrative</label>
              <input
                type="text"
                value={newMyth.subtitle}
                onChange={e => setNewMyth({ ...newMyth, subtitle: e.target.value })}
                className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="text-[10px] text-neutral-400 block font-mono uppercase mb-1">HTML Story Prose</label>
              <textarea
                required
                value={newMyth.narrativeHtml}
                onChange={e => setNewMyth({ ...newMyth, narrativeHtml: e.target.value })}
                placeholder="Detail the spiritual resistance narrative in html paragraphs..."
                rows={3}
                className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-2 text-white placeholder-neutral-600 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-white text-black font-semibold rounded-lg text-xs hover:opacity-90 transition"
              style={{ backgroundColor: themeAccent }}
            >
              Commit Chapter to Archive
            </button>
          </form>
        </div>
      )}

      {/* VIEW 3: Release Engine & Scheduled counting */}
      {activeTab === 'release' && (
        <div className="space-y-6">
          <div className="p-4 bg-neutral-900/20 border border-neutral-800 rounded-xl">
            <h3 className="text-sm font-bold text-white mb-2">Automated Release Gate Queue</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Below is the list of physical LP/EP releases currently scheduled or released. The operating system triggers notifications whenever a timer reaches target zeroes.
            </p>
          </div>

          <div className="space-y-3.5">
            {releases.map(release => (
              <div
                key={release.id}
                className="p-4 bg-black/40 border border-neutral-900 hover:border-neutral-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img src={release.coverUrl} alt={release.title} className="w-12 h-12 object-cover rounded-md" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{release.title}</h4>
                    <span className="text-[9px] uppercase font-mono text-neutral-500 tracking-wider">
                      {release.type} · State: {release.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {release.status === 'scheduled' ? (
                    <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] text-amber-400 font-mono">
                      📅 Scheduled: {release.scheduledAt?.substring(0, 10)}
                    </div>
                  ) : (
                    <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Released
                    </div>
                  )}

                  <button
                    onClick={() => onDeleteRelease(release.id)}
                    className="p-1.5 rounded bg-neutral-900 border border-neutral-800 hover:bg-red-950/20 text-neutral-400 hover:text-red-500 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: Digital Asset Warehouse */}
      {activeTab === 'vault' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Stem/Master Upload Form */}
          <div className="lg:col-span-1 bg-black/40 border border-neutral-900 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-neutral-900 pb-2 flex items-center gap-1.5">
              <Cloud className="w-4 h-4" /> Deposit Master stems
            </h3>
            
            <form onSubmit={handleCreateVaultAsset} className="space-y-3.5">
              <div>
                <label className="text-[9px] text-neutral-400 font-mono uppercase block mb-1">Asset Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead Vocals Kinyan MC"
                  value={newVaultAsset.title}
                  onChange={e => setNewVaultAsset({ ...newVaultAsset, title: e.target.value })}
                  className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-1.5 text-white"
                />
              </div>

              <div>
                <label className="text-[9px] text-neutral-400 font-mono uppercase block mb-1">Classification Category</label>
                <select
                  value={newVaultAsset.type}
                  onChange={e => setNewVaultAsset({ ...newVaultAsset, type: e.target.value as any })}
                  className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-1.5 text-white"
                >
                  <option value="stems">Raw STEMS (Separated Tracks)</option>
                  <option value="master">Unreleased Stereo Master</option>
                  <option value="artwork">Print High-Res Artwork</option>
                  <option value="press-kit">Digital EPK Package</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] text-neutral-400 font-mono uppercase block mb-1">Mock File Size</label>
                  <input
                    type="text"
                    required
                    value={newVaultAsset.fileSize}
                    onChange={e => setNewVaultAsset({ ...newVaultAsset, fileSize: e.target.value })}
                    className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-neutral-400 font-mono uppercase block mb-1">Artist owner</label>
                  <select
                    value={newVaultAsset.artistId}
                    onChange={e => setNewVaultAsset({ ...newVaultAsset, artistId: e.target.value })}
                    className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-1.5 text-white"
                  >
                    {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[9px] text-neutral-400 font-mono uppercase block mb-1">File Download URL link</label>
                <input
                  type="text"
                  required
                  value={newVaultAsset.fileUrl}
                  onChange={e => setNewVaultAsset({ ...newVaultAsset, fileUrl: e.target.value })}
                  placeholder="https://bucket.firebasestorage.app/master.zip"
                  className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-1.5 text-white placeholder-neutral-600"
                />
              </div>

              <div>
                <label className="text-[9px] text-neutral-400 font-mono uppercase block mb-1">Secret Description</label>
                <textarea
                  value={newVaultAsset.description}
                  onChange={e => setNewVaultAsset({ ...newVaultAsset, description: e.target.value })}
                  placeholder="Confidential usage details..."
                  rows={2}
                  className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-1.5 text-white placeholder-neutral-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-white text-black font-semibold rounded-lg text-xs hover:opacity-90 transition cursor-pointer"
                style={{ backgroundColor: themeColor }}
              >
                Deposit in Private Vault
              </button>
            </form>
          </div>

          {/* Catalog view grid */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Active Leaks Catalog ({vaultAssets.length})
            </h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {vaultAssets.map(asset => (
                <div
                  key={asset.id}
                  className="p-4 bg-black border border-neutral-900 rounded-xl flex items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-xs font-semibold text-white">{asset.title}</h4>
                    <p className="text-[10px] text-neutral-500 mt-1">
                      Type: <span className="uppercase text-neutral-400">{asset.type}</span> · Size: {asset.fileSize}
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteVaultAsset(asset.id)}
                    className="p-1.5 rounded hover:bg-red-950/20 text-neutral-400 hover:text-red-500 transition cursor-pointer border border-neutral-900"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: Transmission & Outbound Center */}
      {activeTab === 'broadcast' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Dispatch campaign forms */}
          <div className="lg:col-span-1 bg-black/40 border border-neutral-900 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-neutral-900 pb-2 flex items-center gap-1.5">
              <Send className="w-4 h-4" /> Trigger Broadcaster Alert
            </h3>

            <form onSubmit={handleCreateCampaign} className="space-y-3.5">
              <div>
                <label className="text-[9px] text-neutral-400 font-mono uppercase block mb-1">Campaign Header Title</label>
                <input
                  type="text"
                  required
                  value={newCampaign.title}
                  onChange={e => setNewCampaign({ ...newCampaign, title: e.target.value })}
                  placeholder="Emergency Wave Broadcast"
                  className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-1.5 text-white"
                />
              </div>

              <div>
                <label className="text-[9px] text-neutral-400 font-mono uppercase block mb-1">Target dispatch channel</label>
                <select
                  value={newCampaign.channel}
                  onChange={e => setNewCampaign({ ...newCampaign, channel: e.target.value as any })}
                  className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-1.5 text-white"
                >
                  <option value="Discord">Discord Webhook</option>
                  <option value="Telegram">Telegram Channel Bulletin</option>
                  <option value="Push">In-App OS Alert</option>
                  <option value="Email">Sovereign Email Campaign</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] text-neutral-400 font-mono uppercase block mb-1">Dispatch Content Message</label>
                <textarea
                  required
                  value={newCampaign.content}
                  onChange={e => setNewCampaign({ ...newCampaign, content: e.target.value })}
                  placeholder="Type dispatch messages here..."
                  rows={3}
                  className="w-full bg-neutral-950 text-xs border border-neutral-900 rounded-lg px-3 py-1.5 text-white placeholder-neutral-600 resize-none animate-pulse"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-white text-black font-semibold rounded-lg text-xs hover:opacity-90 transition cursor-pointer"
                style={{ backgroundColor: themeAccent }}
              >
                Transmit Alert Immediately
              </button>
            </form>
          </div>

          {/* Sent signals historical log */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Dispatched Broadcast Campaigns Log
            </h3>
            <div className="space-y-2.5 max-h-[400px] overflow-y-auto">
              {campaigns.map(cam => (
                <div
                  key={cam.id}
                  className="p-4 bg-black border border-neutral-900 rounded-xl space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{cam.title}</span>
                    <span className="px-2 py-0.5 bg-neutral-900 text-[9px] font-mono rounded text-neutral-400">
                      Channel: {cam.channel}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-mono bg-black/50 p-2 rounded border border-neutral-900 text-left select-text">
                    {cam.content}
                  </p>
                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono pt-1">
                    <span>👥 Target Reach: {cam.recipientsCount} fans</span>
                    <span>✓ Transmitted Successfully</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 6: Artist Workspace Profile and Metrics */}
      {activeTab === 'workspace' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 border-b border-neutral-900 pb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Individual Artist Workspaces</h3>
              <p className="text-[10px] text-neutral-500">Manage separate artist profile bios, performance insights, and custom streams.</p>
            </div>
            {/* Switch Artist */}
            <select
              value={workingArtistId}
              onChange={e => setWorkingArtistId(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-xs text-white rounded-lg px-2 py-1 focus:outline-none"
            >
              {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>

          {/* Workspace info & bio controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Artist visual card */}
            <div className="md:col-span-1 p-5 bg-black/40 border border-neutral-900 rounded-xl space-y-4 text-center">
              <img
                src={activeWorkingArtistObj?.avatarUrl}
                alt={activeWorkingArtistObj?.name}
                className="w-20 h-20 mx-auto object-cover rounded-full border-2 border-dashed"
                style={{ borderColor: themeColor }}
              />
              <div>
                <h4 className="text-sm font-bold text-white">{activeWorkingArtistObj?.name}</h4>
                <p className="text-xs text-neutral-500 mt-0.5">{activeWorkingArtistObj?.role}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-left pt-2 border-t border-neutral-900">
                <div className="p-2 bg-neutral-950 rounded">
                  <span className="text-[9px] text-neutral-500 block uppercase">Listeners</span>
                  <span className="text-xs font-bold text-white">{(activeWorkingArtistObj?.stats.monthlyListeners / 1000).toFixed(0)}K</span>
                </div>
                <div className="p-2 bg-neutral-950 rounded">
                  <span className="text-[9px] text-neutral-500 block uppercase">Myth Rating</span>
                  <span className="text-xs font-bold text-white">⭐ {activeWorkingArtistObj?.stats.mythRating}</span>
                </div>
              </div>
            </div>

            {/* Profile bio summary and gallery showcase */}
            <div className="md:col-span-2 space-y-4">
              <div className="p-5 bg-black/40 border border-neutral-900 rounded-xl text-left space-y-2.5">
                <h4 className="text-xs font-bold uppercase text-neutral-400">Cinematic Biography Overview</h4>
                <p className="text-xs text-neutral-300 leading-relaxed select-text">{activeWorkingArtistObj?.bio}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {activeWorkingArtistObj?.gallery.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-neutral-900 group">
                    <img src={img} alt="Showcase" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-2.5">
                      <span className="text-[10px] uppercase font-mono text-neutral-400">Live Street Capture #{idx + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
