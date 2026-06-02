import React, { useState, FormEvent } from 'react';
import { MessageSquare, Heart, Award, Shield, User, Send, Flame, Trophy, Sparkles } from 'lucide-react';
import { Comment, MemberProfile, Release } from '../types';

interface CommunityCenterProps {
  comments: Comment[];
  onAddComment: (targetId: string, content: string) => void;
  onLikeComment: (commentId: string) => void;
  currentUser: MemberProfile | null;
  releases: Release[];
  themeColor: string;
  themeAccent: string;
}

export default function CommunityCenter({
  comments,
  onAddComment,
  onLikeComment,
  currentUser,
  releases,
  themeColor,
  themeAccent
}: CommunityCenterProps) {
  const [selectedTargetId, setSelectedTargetId] = useState<string>("general");
  const [newCommentText, setNewCommentText] = useState("");

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    onAddComment(selectedTargetId, newCommentText);
    setNewCommentText("");
  };

  const filteredComments = comments.filter(c => c.targetId === selectedTargetId);

  // Fallback profile if not signed in to prove engagement levels
  const activeProfile = currentUser || {
    displayName: "Ghetto Sage Envoy",
    email: "guest@sage.co",
    role: "fan",
    isInnerCircle: false,
    level: 3,
    xp: 320,
    badges: ["First Beat Attuned", "Sheng Orator"],
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
      
      {/* Discussion Feed Core */}
      <div className="lg:col-span-2 bg-neutral-900/40 backdrop-blur-md rounded-2xl border border-neutral-800/80 p-5 md:p-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-4 mb-5">
          <MessageSquare className="w-5 h-5" style={{ color: themeColor }} />
          <div>
            <h2 className="text-lg font-bold text-white">Community Council Chats</h2>
            <p className="text-[11px] text-neutral-400">Join discussions on mythologies, track leaks and street rituals</p>
          </div>
        </div>

        {/* Discussion Channel Selector */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-5 border-b border-neutral-900 scrollbar-none">
          <button
            onClick={() => setSelectedTargetId("general")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedTargetId === "general"
                ? 'bg-neutral-800 text-white'
                : 'bg-neutral-950/40 text-neutral-400 hover:text-white border border-neutral-900'
            }`}
          >
            🔊 General Council
          </button>
          <button
            onClick={() => setSelectedTargetId("chapter-1")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedTargetId === "chapter-1"
                ? 'bg-neutral-800 text-white'
                : 'bg-neutral-950/40 text-neutral-400 hover:text-white border border-neutral-900'
            }`}
          >
            📜 Nairobi Myths
          </button>
          {releases.map(release => (
            <button
              key={release.id}
              onClick={() => setSelectedTargetId(release.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedTargetId === release.id
                  ? 'bg-neutral-800 text-white'
                  : 'bg-neutral-950/40 text-neutral-400 hover:text-white border border-neutral-900'
              }`}
            >
              💿 {release.title.substring(0, 15)}...
            </button>
          ))}
        </div>

        {/* List of Comments */}
        <div className="space-y-4 max-h-[420px] overflow-y-auto mb-6 pr-2">
          {filteredComments.length === 0 ? (
            <div className="py-12 text-center">
              <Sparkles className="w-8 h-8 mx-auto text-neutral-600 mb-2" />
              <p className="text-xs text-neutral-500 italic">No frequency transmissions yet are recorded here.</p>
              <p className="text-[10px] text-neutral-600 mt-1">Be the first to project your wave!</p>
            </div>
          ) : (
            filteredComments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 bg-black/40 border border-neutral-900 rounded-xl hover:border-neutral-800 transition flex gap-3.5 items-start"
              >
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                  className="w-10 h-10 object-cover rounded-full border border-neutral-800"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-neutral-200">{comment.userName}</span>
                      {comment.isInnerCircle && (
                        <span
                          className="px-1.5 py-0.5 rounded text-[8px] font-bold text-black uppercase"
                          style={{ backgroundColor: themeAccent }}
                        >
                          INNER CIRCLE
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed select-text">{comment.content}</p>
                  
                  {/* Heart engagement counter */}
                  <div className="flex items-center gap-4 mt-3 pt-2 border-t border-neutral-950">
                    <button
                      onClick={() => onLikeComment(comment.id)}
                      className="flex items-center gap-1 text-neutral-500 hover:text-red-500 transition text-[11px] group cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 group-hover:scale-125 transition duration-150" />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment input form */}
        <form onSubmit={handleSend} className="flex gap-3 items-center border-t border-neutral-800 pt-4">
          <input
            type="text"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder={currentUser ? "Broadcast to the Ghetto Sage Council..." : "Sign in / Use Sandbox to comment..."}
            className="flex-1 bg-neutral-950 border border-neutral-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-neutral-700/80 transition"
          />
          <button
            type="submit"
            className="p-3 bg-white text-black rounded-xl hover:opacity-95 active:scale-95 transition cursor-pointer flex items-center justify-center"
            style={{ backgroundColor: themeColor }}
          >
            <Send className="w-4 h-4 text-black" />
          </button>
        </form>
      </div>

      {/* Hero Achievement / Rank sidebar card */}
      <div className="bg-neutral-900/60 backdrop-blur-md rounded-2xl border border-neutral-800/80 p-5 md:p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
          <Award className="w-5 h-5" style={{ color: themeAccent }} />
          <div>
            <h2 className="text-sm font-bold text-white">Sage Resonance Stats</h2>
            <p className="text-[10px] text-neutral-400">Unlock ancestral ranks on East African waves</p>
          </div>
        </div>

        {/* Fan Status Header */}
        <div className="text-center p-4 bg-black/40 border border-neutral-900 rounded-xl">
          <div className="relative mx-auto w-16 h-16 mb-3">
            <img
              src={activeProfile.avatarUrl}
              alt={activeProfile.displayName}
              className="w-full h-full object-cover rounded-full border-2 border-dashed"
              style={{ borderColor: themeColor }}
              referrerPolicy="no-referrer"
            />
            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-black border shadow-sm"
              style={{ backgroundColor: themeColor }}
            >
              {activeProfile.level}
            </div>
          </div>
          <h4 className="text-xs font-bold text-white">{activeProfile.displayName}</h4>
          <span className="text-[9px] text-neutral-400 tracking-wider uppercase">{activeProfile.role} profile</span>

          {/* XP Progress Bar */}
          <div className="mt-4 text-left">
            <div className="flex justify-between items-center text-[9px] text-neutral-500 mb-1">
              <span>XP Alignment</span>
              <span>{activeProfile.xp} / 500</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600 transition-all duration-500"
                style={{ width: `${(activeProfile.xp / 500) * 100}%`, backgroundColor: themeColor }}
              />
            </div>
          </div>
        </div>

        {/* Completed Achievements badging list */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-yellow-500" />
            Signatures Unlocked
          </h4>
          <div className="space-y-2">
            {activeProfile.badges.map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-3 py-2 bg-black/20 border border-neutral-950 rounded-lg"
              >
                <div className="p-1 rounded bg-neutral-900 border border-neutral-800">
                  <Flame className="w-3 h-3" style={{ color: themeColor }} />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-semibold text-neutral-200">{badge}</p>
                  <p className="text-[9px] text-neutral-500 leading-none">Resonates at 432Hz</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inner Circle CTA */}
        {!currentUser?.isInnerCircle && (
          <div className="p-4 bg-gradient-to-r from-red-950/20 to-purple-950/20 border border-neutral-800 rounded-xl text-center space-y-3">
            <Shield className="w-6 h-6 mx-auto text-amber-400" />
            <div className="text-xs font-bold text-white">Join the Inner Circle</div>
            <p className="text-[10px] text-neutral-400 leading-normal">
              Authorize as admin, artist, or inner circle VIP fan to view high-resolution STEMS, unreleased masters, and draft campaign releases.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
