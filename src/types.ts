export interface Track {
  id: string;
  title: string;
  duration: string;
  previewUrl: string;
  lyrics?: string;
  plays?: number;
}

export interface Release {
  id: string;
  title: string;
  type: 'LP' | 'EP' | 'Single' | 'Mixtape';
  releaseDate: string;
  coverUrl: string;
  description: string;
  tracks: Track[];
  artistIds: string[];
  isPremium: boolean;
  status: 'draft' | 'scheduled' | 'released';
  isScheduled?: boolean;
  scheduledAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  stats: {
    monthlyListeners: number;
    followers: number;
    mythRating: number;
    tracksCount: number;
  };
  socials: {
    spotify?: string;
    instagram?: string;
    bandcamp?: string;
    youtube?: string;
  };
  gallery: string[];
}

export interface MythologyChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  narrativeHtml: string;
  bgVideoUrl: string;
  ambientAudioUrl: string;
}

export interface Comment {
  id: string;
  targetId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  isInnerCircle?: boolean;
  likes: number;
}

export interface MemberProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string;
  role: 'fan' | 'artist' | 'admin';
  isInnerCircle: boolean;
  level: number;
  xp: number;
  badges: string[];
  joinedAt: string;
}

export interface VaultAsset {
  id: string;
  title: string;
  type: 'master' | 'stems' | 'artwork' | 'press-kit' | 'other';
  fileUrl: string;
  fileSize: string;
  artistId?: string;
  description: string;
  tags: string[];
  createdAt: string;
}

export interface BroadcastCampaign {
  id: string;
  title: string;
  channel: 'Discord' | 'Email' | 'In-App' | 'Telegram' | 'Push';
  content: string;
  status: 'draft' | 'sent';
  sentAt?: string;
  recipientsCount: number;
}

export interface ThemeColors {
  primary: string; // Tailwinds primary or hex
  accent: string;
  bgGradStart: string;
  bgGradEnd: string;
  textMuted: string;
  textActive: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  colors: ThemeColors;
  isActive: boolean;
}

export interface AnalyticEvent {
  id: string;
  userId?: string;
  eventType: 'track_preview' | 'click' | 'view_myth' | 'scroll_depth' | 'theme_change';
  targetId?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}
