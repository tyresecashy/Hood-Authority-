import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User, Award, Trophy, Flame, Sparkles, MessageSquare, Check, ShieldCheck,
  Edit2, Save, X, Eye, HelpCircle, Star, Music, BookOpen
} from 'lucide-react';
import { MemberProfile, Comment, Artist, Release } from '../types';

interface UserProfileProps {
  profile: MemberProfile;
  onUpdateProfile: (updated: MemberProfile) => void;
  comments: Comment[];
  onAddComment: (targetId: string, content: string) => void;
  artists: Artist[];
  releases: Release[];
  themeColor: string;
  themeAccent: string;
}

// Generative avatar images representing different East African hip-hop profiles
const AVATAR_PRESETS = [
  { name: "Neon Orator", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" },
  { name: "Rift Valley Griot", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { name: "Coastal Swahili Shaman", url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" },
  { name: "Ghetto Sage", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400" },
  { name: "Nairobi Rebel", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400" },
  { name: "Crystalline Empress", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" }
];

const ACHIEVEMENT_LIBRARY = [
  { id: "432hz", title: "432Hz Attuned", desc: "Listened to the Golden Swahili Shield coastal chants.", xpreward: 120, icon: Sparkles },
  { id: "curator", title: "Master Curator", desc: "Unlocked administrative or oratory keys.", xpreward: 150, icon: ShieldCheck },
  { id: "shaman", title: "High-Frequency Shaman", desc: "Customized a full sovereign shader pipeline in digital studio.", xpreward: 100, icon: Flame },
  { id: "raider", title: "Cyber Vault Raider", desc: "Authenticated and read 24-bit mastered sound stems.", xpreward: 110, icon: Trophy },
  { id: "pilgrim", title: "Coastal Ritualist", desc: "Visited Mombasa fortress chambers and retrieved the brass plates.", xpreward: 130, icon: Star },
  { id: "storm", title: "Storm Catcher", desc: "Channeled Kampala electric lightning onto Buganda drums.", xpreward: 140, icon: Music }
];

export default function UserProfile({
  profile,
  onUpdateProfile,
  comments,
  onAddComment,
  artists,
  releases,
  themeColor,
  themeAccent
}: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profile.displayName);
  const [editBio, setEditBio] = useState(profile.badges[profile.badges.length - 1] || "A loyal resonant voice inside the Ghetto Sage council.");
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'achievements' | 'discussions'>('achievements');
  
  // Custom states for direct discussions within profile
  const [commentTargetId, setCommentTargetId] = useState<'general' | string>('general');
  const [newComment, setNewComment] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = () => {
    if (!editName.trim()) return;
    
    // Maintain standard badges but replace the latest text if desired
    const updatedBadges = [...profile.badges];
    if (updatedBadges.length > 0) {
      updatedBadges[updatedBadges.length - 1] = editBio;
    } else {
      updatedBadges.push(editBio);
    }

    onUpdateProfile({
      ...profile,
      displayName: editName,
      badges: updatedBadges
    });
    setIsEditing(false);
    showSuccessNotification("Profile customization synced!");
  };

  const selectAvatarPreset = (url: string) => {
    onUpdateProfile({
      ...profile,
      avatarUrl: url
    });
    setShowAvatarModal(false);
    showSuccessNotification("Sovereign avatar matrix updated!");
  };

  const showSuccessNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Allow claiming un-earned achievements to interactively boost levels & XP
  const claimBadge = (badgeTitle: string, xpReward: number) => {
    if (profile.badges.includes(badgeTitle)) return;
    
    // Add badge, boost XP and adjust level if XP exceeds 500
    let newXp = profile.xp + xpReward;
    let newLevel = profile.level;
    if (newXp >= 500) {
      newLevel += Math.floor(newXp / 500);
      newXp = newXp % 500;
    }

    onUpdateProfile({
      ...profile,
      badges: [...profile.badges, badgeTitle],
      xp: newXp,
      level: newLevel
    });
    showSuccessNotification(`Unlocked: ${badgeTitle}! (+${xpReward} XP earned)`);
  };

  const postLocalComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(commentTargetId, newComment);
    setNewComment('');
    showSuccessNotification("Message broadcasted onto Council channels!");
  };

  // Find all comments belonging to active user
  const userComments = comments.filter(c => c.userId === profile.id);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Banner Success Notification Toast */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
            <span className="text-xs font-bold text-white tracking-wide">{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Section: Glassmorphic Customizable User Card */}
        <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6 text-center relative overflow-hidden group">
          
          {/* Subtle overlay decorative gradients */}
          <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full pointer-events-none z-0 blur-2xl opacity-10" style={{ backgroundColor: themeColor }} />
          <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full pointer-events-none z-0 blur-2xl opacity-10" style={{ backgroundColor: themeAccent }} />
          
          <div className="relative z-10 space-y-4">
            
            {/* Action Header Button */}
            <div className="flex justify-end">
              {isEditing ? (
                <div className="flex gap-1.5">
                  <button
                    onClick={handleSave}
                    className="p-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditName(profile.displayName);
                    }}
                    className="p-1.5 bg-white/5 hover:bg-white/10 text-neutral-400 border border-white/15 rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-300 hover:text-white rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer font-bold"
                >
                  <Edit2 className="w-3 h-3 text-neutral-400" /> Customize Profile
                </button>
              )}
            </div>

            {/* Glowing Avatar Selector Area */}
            <div className="relative mx-auto w-28 h-28 group/avatar">
              <img
                src={profile.avatarUrl}
                alt={profile.displayName}
                className="w-full h-full object-cover rounded-full border-2 border-dashed shadow-[0_0_25px_rgba(255,255,255,0.05)]"
                style={{ borderColor: themeColor }}
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setShowAvatarModal(true)}
                className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
                <span className="text-[9px] font-extrabold text-white tracking-widest uppercase mt-1">Morph</span>
              </button>
              <div
                className="absolute -bottom-1 right-1 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black text-black border shadow-lg"
                style={{ backgroundColor: themeColor }}
              >
                {profile.level}
              </div>
            </div>

            {/* Editable Profile Information Form / Values */}
            <div className="space-y-4">
              {isEditing ? (
                <div className="space-y-3">
                  <div className="text-left">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">DisplayName</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      maxLength={24}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 transition-all font-semibold"
                    />
                  </div>
                  <div className="text-left">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Sheng Mantra / Headline</label>
                    <input
                      type="text"
                      value={editBio}
                      onChange={e => setEditBio(e.target.value)}
                      maxLength={80}
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30 transition-all font-mono"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <h3 className="text-xl font-black text-white uppercase tracking-wider flex items-center justify-center gap-1.5">
                    {profile.displayName}
                    {profile.isInnerCircle && (
                      <span className="px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[8px] font-mono tracking-wider rounded uppercase">
                        Vip
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-neutral-400 italic max-w-xs mx-auto text-center font-mono">
                    "{profile.badges[profile.badges.length - 1] || "Level Alignments Active"}"
                  </p>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">
                    Sovereign {profile.role} • Sync: {new Date(profile.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            {/* Progress XP Metrics */}
            <div className="pt-4 border-t border-white/5 text-left space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                <span className="flex items-center gap-1 font-semibold uppercase">
                  <Flame className="w-3.5 h-3.5" style={{ color: themeAccent }} /> Level {profile.level} Threshold
                </span>
                <span>{profile.xp} / 500 XP</span>
              </div>
              <div className="w-full h-2.5 bg-black/50 border border-white/10 rounded-full overflow-hidden p-[2px]">
                <div
                  className="h-full rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(255,255,255,0.15)] bg-gradient-to-r"
                  style={{
                    width: `${(profile.xp / 500) * 100}%`,
                    backgroundImage: `linear-gradient(to right, ${themeColor}, ${themeAccent})`
                  }}
                />
              </div>
              <div className="flex justify-between text-[9px] text-neutral-500 uppercase font-bold tracking-widest">
                <span>RESONANT</span>
                <span>ASCENDED</span>
              </div>
            </div>

            {/* Sub-card explaining Simulated Role influence */}
            <div className="p-3 bg-black/30 border border-white/10 rounded-xl text-left space-y-1">
              <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-400 block">Sovereign Clearance:</span>
              <p className="text-[10px] text-neutral-300 leading-normal font-sans">
                You possess <strong style={{ color: themeAccent }}>{profile.isInnerCircle ? 'AUTHORIZED INNER CIRCLE' : 'STANDARD CITIZEN'}</strong> clearances. Utilize the header bar ROLE SWITCHER to bypass lock grids!
              </p>
            </div>

          </div>
        </div>

        {/* Right Section: Interactive Area (Tabs for Achievements vs. Discussions Connector) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Glassmorphous Tab Switcher */}
          <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-2xl w-full">
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'achievements'
                  ? 'bg-white/15 border border-white/15 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-4 h-4" style={{ color: themeColor }} /> Sovereign Badges & Achievements
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'discussions'
                  ? 'bg-white/15 border border-white/15 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-4 h-4" style={{ color: themeAccent }} /> Discussions & Postings Connect
            </button>
          </div>

          {/* TAB 1: Achievements & Badge claiming console */}
          {activeTab === 'achievements' && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="text-left">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    Ascended Ranks & Achievements
                  </h3>
                  <p className="text-[11px] text-neutral-400">Claim, activate and unlock sovereign badges by engaging with the Media OS.</p>
                </div>
                <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-center">
                  <span className="text-[9px] uppercase font-mono text-neutral-400 block font-bold">Unlocks Completed</span>
                  <span className="text-sm font-black text-white">
                    {profile.badges.filter(b => ACHIEVEMENT_LIBRARY.some(lib => lib.title === b)).length} / {ACHIEVEMENT_LIBRARY.length}
                  </span>
                </div>
              </div>

              {/* Grid of badges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ACHIEVEMENT_LIBRARY.map(badge => {
                  const isUnlocked = profile.badges.includes(badge.title);
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.id}
                      className={`p-4 border rounded-2xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden group/badge ${
                        isUnlocked
                          ? 'bg-white/5 border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.02)]'
                          : 'bg-black/40 border-white/5 opacity-60 hover:opacity-100 hover:border-white/10'
                      }`}
                    >
                      {isUnlocked && (
                        <div className="absolute top-2 right-2 p-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                          <Check className="w-3 h-3" />
                        </div>
                      )}

                      <div className="flex gap-3.5 items-start text-left">
                        <div
                          className="p-2.5 rounded-xl border flex items-center justify-center transition"
                          style={{
                            backgroundColor: isUnlocked ? `${themeColor}10` : 'transparent',
                            borderColor: isUnlocked ? `${themeColor}30` : 'rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          <Icon className="w-4 h-4" style={{ color: isUnlocked ? themeColor : '#9CA3AF' }} />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-white">{badge.title}</h4>
                          <p className="text-[11px] text-neutral-400 leading-normal">{badge.desc}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-rose-400/90">
                          +{badge.xpreward} XP Boost
                        </span>
                        
                        {!isUnlocked ? (
                          <button
                            onClick={() => claimBadge(badge.title, badge.xpreward)}
                            className="px-2.5 py-1 bg-white hover:bg-neutral-100 text-black text-[10px] font-extrabold rounded-lg hover:scale-105 active:scale-95 transition cursor-pointer uppercase shadow"
                            style={{ backgroundColor: themeAccent }}
                          >
                            Claim Feat
                          </button>
                        ) : (
                          <span className="text-[10px] font-bold text-green-400 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> Activated
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Combined Discussions Connector & Postings Section */}
          {activeTab === 'discussions' && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
              
              <div className="border-b border-white/5 pb-4 text-left">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" style={{ color: themeAccent }} />
                  Council Chats Sync
                </h3>
                <p className="text-[11px] text-neutral-400">
                  Target a specific ritual release or general room and launch comment queries immediately from your profile dashboard.
                </p>
              </div>

              {/* Dropdown connector mapping Releases & Artists */}
              <form onSubmit={postLocalComment} className="p-4 bg-black/30 border border-white/10 rounded-2xl text-left space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">Select Channel Room</label>
                    <select
                      value={commentTargetId}
                      onChange={e => setCommentTargetId(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-white/20 font-semibold"
                    >
                      <option value="general">🔊 General Council</option>
                      <option value="chapter-1">📜 Chapter 1 (Nairobi Oracle)</option>
                      <option value="chapter-2">📜 Chapter 2 (Golden Mombasa Shield)</option>
                      <option value="chapter-3">📜 Chapter 3 (Royal Buganda Spark)</option>
                      {releases.map(release => (
                        <option key={release.id} value={release.id}>💿 Release: {release.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end justify-end">
                    <span className="text-[10px] text-neutral-500 font-mono text-right leading-tight">
                      Broadcasting under address <br />
                      <strong className="text-white font-semibold">{profile.displayName}</strong>
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <textarea
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Input frequency message transmissions..."
                    rows={2}
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-white/20 leading-relaxed"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="px-4 py-2 text-xs font-bold uppercase rounded-lg hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                      style={{ backgroundColor: themeColor, color: '#000000' }}
                    >
                      <Flame className="w-3.5 h-3.5" /> Broadcast Message
                    </button>
                  </div>
                </div>
              </form>

              {/* My Postings History */}
              <div className="space-y-3 text-left">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-500" />
                  Your Transmission Log History ({userComments.length})
                </h4>
                
                {userComments.length === 0 ? (
                  <div className="p-8 border border-white/5 bg-black/20 rounded-2xl text-center space-y-1">
                    <HelpCircle className="w-6 h-6 mx-auto text-neutral-600" />
                    <p className="text-xs text-neutral-400 italic">No broadcast logs created by this profile yet.</p>
                    <p className="text-[10px] text-neutral-600">Draft a comment using the dashboard form above to begin alignment!</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {userComments.map(c => {
                      // Get a friendly room title
                      let roomName = "General Council";
                      if (c.targetId === "chapter-1") roomName = "Nairobi Oracle (Chapter 1)";
                      else if (c.targetId === "chapter-2") roomName = "Mombasa Shield (Chapter 2)";
                      else if (c.targetId === "chapter-3") roomName = "Buganda Spark (Chapter 3)";
                      else {
                        const rel = releases.find(r => r.id === c.targetId);
                        if (rel) roomName = `Release: ${rel.title}`;
                      }

                      return (
                        <div key={c.id} className="p-3 bg-black/20 border border-white/5 rounded-xl hover:border-white/10 transition space-y-2">
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-neutral-400">
                              Logged in <strong style={{ color: themeAccent }}>#{roomName}</strong>
                            </span>
                            <span className="text-neutral-500">
                              {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-300 leading-normal px-1">{c.content}</p>
                          <div className="flex justify-end gap-2 text-[10px] text-neutral-500 font-mono">
                            <span>Likes: ❤️ {c.likes}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Preset avatar collection modal popup */}
      <AnimatePresence>
        {showAvatarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-neutral-900 border border-white/10 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl text-left"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Select Avatar Paradigm
                </h4>
                <button
                  onClick={() => setShowAvatarModal(false)}
                  className="p-1 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-neutral-400 leading-normal">
                Choose a visual template alignment representing your spiritual character archetype inside Hood Authority's digital landscape.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {AVATAR_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectAvatarPreset(preset.url)}
                    className="p-2 bg-black/40 border border-white/5 rounded-2xl hover:border-white/20 hover:scale-[1.02] transition-all text-center space-y-2 cursor-pointer group"
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-16 h-16 rounded-full mx-auto object-cover border border-white/10 group-hover:border-white/30"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-[10px] font-bold text-neutral-300 group-hover:text-white truncate">
                      {preset.name}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-2 border-t border-white/5">
                <button
                  onClick={() => setShowAvatarModal(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white rounded-xl transition cursor-pointer"
                >
                  Keep Current
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
