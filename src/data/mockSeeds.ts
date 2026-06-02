import { Artist, Release, MythologyChapter, VaultAsset, BroadcastCampaign, ThemePreset } from '../types';

export const SEED_ARTISTS: Artist[] = [
  {
    id: "kinyan-mc",
    name: "Kinyan MC",
    role: "Lead lyricist & Orator",
    bio: "Hailing from Nairobi's concrete labyrinth, Kinyan MC fuses ancient folklore from the Mount Kenya foothills with raw, dynamic boom-bap architecture. Under the moniker 'Orator of the Ghetto Sages,' his verses are a blueprint for spiritual resistance.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    stats: {
      monthlyListeners: 145000,
      followers: 48000,
      mythRating: 4.9,
      tracksCount: 24
    },
    socials: {
      spotify: "https://spotify.com/kinyan-mc",
      instagram: "https://instagram.com/kinyanmc",
      youtube: "https://youtube.com/kinyanmc"
    },
    gallery: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=600"
    ]
  },
  {
    id: "shujaa-sultan",
    name: "Shujaa Sultan",
    role: "Tribal Trap Pioneer",
    bio: "Shujaa Sultan is the architect of East Africa's modern rhythm, bringing coastal Swahili chants and heavy 808 sub-bass elements to represent the pulse of Mombasa. Known for carrying a brass shield during mythic ceremonies.",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
    stats: {
      monthlyListeners: 210000,
      followers: 82000,
      mythRating: 4.8,
      tracksCount: 18
    },
    socials: {
      spotify: "https://spotify.com/shujaa-sultan",
      instagram: "https://instagram.com/shujaasultan",
      bandcamp: "https://shujaasultan.bandcamp.com"
    },
    gallery: [
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600"
    ]
  },
  {
    id: "kadogo-queen",
    name: "Kadogo Queen",
    role: "Afro-Futurist Empress",
    bio: "A visionary multi-instrumentalist from Kampala, Uganda. Kadogo Queen explores electronic industrial hip-hop mixed with ancient Buganda royal drums. Her voice oscillates between haunting whispers and lightning-fast double-tempo drill verses.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    stats: {
      monthlyListeners: 189000,
      followers: 67000,
      mythRating: 5.0,
      tracksCount: 15
    },
    socials: {
      spotify: "https://spotify.com/kadogo-queen",
      instagram: "https://instagram.com/kadogoqueen",
      youtube: "https://youtube.com/kadogoqueen"
    },
    gallery: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=600"
    ]
  }
];

export const SEED_RELEASES: Release[] = [
  {
    id: "nairobi-concrete",
    title: "Nairobi Concrete Sagas",
    type: "LP",
    releaseDate: "2026-03-15",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400",
    description: "The critically acclaimed magnum opus mapping the tribal warfare, neon skyscrapers, and historical narratives of Nairobi's underworld rhythm.",
    artistIds: ["kinyan-mc"],
    isPremium: false,
    status: "released",
    tracks: [
      {
        id: "concrete-intro",
        title: "Concrete Introit: The Sages Awaken",
        duration: "2:45",
        previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        lyrics: "Beats hitting concrete pavements, ancient steps in leather boots. We rise from the Nairobi dust, reclaiming our ancestors' roots.",
        plays: 45200
      },
      {
        id: "matatu-rhapsody",
        title: "Matatu Rhapsody (The Neon Hustle)",
        duration: "4:12",
        previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        lyrics: "Super-charged engines roaring down Ngong road, neon green outlines, urban legends in the making. Bass booming, sub-woofer trembling.",
        plays: 125000
      },
      {
        id: "rift-valley-wind",
        title: "Rift Valley Winds feat. Kadogo Queen",
        duration: "3:58",
        previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        lyrics: "Wind blowing through the red clay gorges, Kampala drums matching Nairobi flows. She reigns from the mountains, we conquer the concrete.",
        plays: 98000
      }
    ]
  },
  {
    id: "monarch-drum",
    title: "The Monarch Beats",
    type: "EP",
    releaseDate: "2026-05-10",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400",
    description: "Coastal Swahili riddims meet future Kampala bass trap. Multi-national compilation illustrating the divine royalty of Afro-Beat Hip-Hop.",
    artistIds: ["shujaa-sultan", "kadogo-queen"],
    isPremium: true,
    status: "released",
    tracks: [
      {
        id: "monarch-drum-intro",
        title: "Royal Buganda Anthem (The Swahili Trap)",
        duration: "3:20",
        previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        lyrics: "Mombasa tide rolling, royal Kampala drums pounding. Stand tall like a warrior, bow down to the true kings.",
        plays: 87000
      },
      {
        id: "shield-fire",
        title: "Shield of Fire (Mombasa Ritual)",
        duration: "3:45",
        previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        lyrics: "We carry the heavy shield of brass, gold linings on the blood-red sands. Coastline trap beats with deep bass shaking the foundations.",
        plays: 64100
      }
    ]
  },
  {
    id: "rift-myth-leak",
    title: "Rift Valley Legacy (Restricted Master Vault)",
    type: "Single",
    releaseDate: "2026-07-01",
    coverUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=400",
    description: "The ultimate unreleased master stem compilation containing hidden audio mythology codes. Exclusive to the Hood Authority Inner Circle.",
    artistIds: ["kinyan-mc", "shujaa-sultan", "kadogo-queen"],
    isPremium: true,
    status: "scheduled",
    isScheduled: true,
    scheduledAt: "2026-07-01T20:00:00Z",
    tracks: [
      {
        id: "rift-leak-stems",
        title: "The Master Rift Riddim (Raw VIP Stereo)",
        duration: "5:04",
        previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        lyrics: "Strictly secure stems. Not for external duplication. Hear the spirits screaming inside the synthesizers.",
        plays: 504
      }
    ]
  }
];

export const SEED_MYTHOLOGY: MythologyChapter[] = [
  {
    id: "chapter-1",
    chapterNumber: 1,
    title: "The Nairobi Concrete Oracle",
    subtitle: "How the concrete slums channeled the voices of the Ghetto Sages",
    narrativeHtml: `<p>In the year 2042, when the great glass skyscrapers overbore the red clay of Nairobi, a silent war erupted. The corporate grids attempted to silence the historical lineages by introducing mechanical audio static across all local frequencies.</p>
    <p>But the Ghetto Sages discovered a hidden vulnerability. By using customized low-frequency sub-woofers installed in local custom mini-buses (Matatus), they could inject tribal drum loops. These rhythms carried ancient ancestral wisdom, coded directly inside the kick drum and vocal compression grids.</p>
    <p>Kinyan MC, then a young apprentice of the old Rift Valley griots, was the first to vocalize the Oracle. Standing atop a dusty metallic container in Kibera, his voice matched the low hum of the power-grid, disabling corporate drones and initiating the great Hood Authority reclamation.</p>`,
    bgVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-dark-cyberpunk-city-street-under-heavy-rain-41712-large.mp4",
    ambientAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  {
    id: "chapter-2",
    chapterNumber: 2,
    title: "The Golden Mombasa Shield",
    subtitle: "The coastal trap ritual and the retrieval of the Swahili brass plates",
    narrativeHtml: `<p>Beneath the fortresses of old Mombasa, where the Indian Ocean meets the black limestone, lies the Vault of the Sultan. For three centuries, the sacred brass lyric plates were guarded by the silent order of coastal drummers.</p>
    <p>When the corporate static weaponized high frequencies to wipe out organic acoustic resonance, Shujaa Sultan led a pilgrimage of three hundred Matatus. Armed with nothing but massive tribal wood drums and 808 subwoofers, they initiated a twelve-hour ritual. The constant earthquake-level bass cracked open the deep marine chambers, bringing the Golden Swahili Shield to the surface.</p>
    <p>Today, this shield is not physical—it is a production frequency preset, vibrating at exactly 432Hz inside the digital masters, offering total immunity to corporate mind-control algorithms.</p>`,
    bgVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-liquid-gold-dripping-from-a-surface-31422-large.mp4",
    ambientAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  },
  {
    id: "chapter-3",
    chapterNumber: 3,
    title: "The Royal Buganda Spark",
    subtitle: "Electro-industrial drill and the electronic lightning empress",
    narrativeHtml: `<p>Kadogo Queen did not study synthesis in Western universities. She captured lightning during Rift Valley storms, storing the electric charge inside copper Buganda drums.</p>
    <p>By routing the high-voltage discharges directly through dynamic vocal microphones, she created Uganda's first 'electro-industrial lightning chant'. This audio signature bypasses standard internet protocols, allowing the Hood Authority to broadcast live feeds directly to fan consciousness without central server routing.</p>
    <p>The Spark represents our ultimate trump card: a permanent, self-powering network fueled purely by the raw electronic energy of East African bass lines.</p>`,
    bgVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-lightning-flashes-in-the-dark-nocturnal-sky-33292-large.mp4",
    ambientAudioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
  }
];

export const SEED_VAULT: VaultAsset[] = [
  {
    id: "asset-1",
    title: "Matatu Rhapsody Master Stem-Pack (24-bit WAV)",
    type: "stems",
    fileUrl: "#matatu_rhapsody_stems_v1",
    fileSize: "682 MB",
    artistId: "kinyan-mc",
    description: "Contains raw separated files for the lead synth, Mt. Kenya traditional chants, industrial Matatu engine snare, and 808 sub bass lines.",
    tags: ["matatu", "kinyan-mc", "electronic", "stems"],
    createdAt: "2026-03-20T11:00:00Z"
  },
  {
    id: "asset-2",
    title: "Shield of Fire Raw Live Vocal Masters",
    type: "master",
    fileUrl: "#shield_vocals_raw",
    fileSize: "145 MB",
    artistId: "shujaa-sultan",
    description: "True 432Hz coastal marine vocal tracks recorded with Fort Jesus acoustic resonance chamber elements.",
    tags: ["shujaa-sultan", "432hz", "vocals", "mombasa"],
    createdAt: "2026-05-12T14:30:00Z"
  },
  {
    id: "asset-3",
    title: "Hood Authority Press-Kit (Winter 2026/27)",
    type: "press-kit",
    fileUrl: "#press_kit_doc",
    fileSize: "34 MB",
    description: "Complete cinematic bio documents, high-contrast imagery, vector banners, and audio reviews from Kampala and Nairobi streets.",
    tags: ["press-kit", "imagery", "corporate-resistance"],
    createdAt: "2026-06-01T08:00:00Z"
  }
];

export const SEED_CAMPAIGNS: BroadcastCampaign[] = [
  {
    id: "campaign-1",
    title: "Rift Valley Legacy Leak Broadcast",
    channel: "Discord",
    content: "⚠️ IMMINENT INTEL SHIELD INCOMING: The unreleased Rift Valley Legacy single stem pack has been uploaded into the Inner Circle Master Archives. Access key required.",
    status: "sent",
    sentAt: "2026-06-02T09:00:00Z",
    recipientsCount: 4500
  },
  {
    id: "campaign-2",
    title: "Mombasa Fort Jesus Audio Ritual Notification",
    channel: "Push",
    content: "Shujaa Sultan goes live with 432Hz Coastal Marine sub frequencies. Prepare your standard systems.",
    status: "draft",
    recipientsCount: 12800
  }
];

export const SEED_THEMES: ThemePreset[] = [
  {
    id: "theme-frosted",
    name: "Frosted Glass (Sovereign OS)",
    isActive: true,
    colors: {
      primary: "#C084FC", // Purple
      accent: "#EAB308", // Metallic Gold
      bgGradStart: "#050505", // Crisp deep background
      bgGradEnd: "#121214",
      textMuted: "#9CA3AF", // Gray-400
      textActive: "#F3F4F6"  // Gray-100
    }
  },
  {
    id: "theme-abyss",
    name: "Charcoal Abyss",
    isActive: false,
    colors: {
      primary: "#E63946", // Blood Red
      accent: "#FFD700", // Metallic Gold
      bgGradStart: "#0B0B0C",
      bgGradEnd: "#151619",
      textMuted: "#8E9099",
      textActive: "#FFFFFF"
    }
  },
  {
    id: "theme-royal-purple",
    name: "Mythic Purple Rain",
    isActive: false,
    colors: {
      primary: "#8A2BE2", // Indigo / Royal Purple
      accent: "#40E0D0", // Turquoise Accents
      bgGradStart: "#07030F",
      bgGradEnd: "#140D24",
      textMuted: "#9A92B0",
      textActive: "#FFFFFF"
    }
  },
  {
    id: "theme-neon-matatu",
    name: "Cyberpunk Maasai (Neon Green)",
    isActive: false,
    colors: {
      primary: "#39FF14", // Neon Green
      accent: "#FF4500", // Orange Red
      bgGradStart: "#020904",
      bgGradEnd: "#0A170F",
      textMuted: "#8FA395",
      textActive: "#FFFFFF"
    }
  },
  {
    id: "theme-blood-gold",
    name: "Sultan Emperor (Blood & Gold)",
    isActive: false,
    colors: {
      primary: "#FFD700", // Gold
      accent: "#8B0000", // Deep Crimson
      bgGradStart: "#0B0302",
      bgGradEnd: "#1C0D0A",
      textMuted: "#A38F8B",
      textActive: "#FCECD7"
    }
  }
];
