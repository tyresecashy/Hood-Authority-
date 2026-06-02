import { Sparkles, Shield, Heart, Music, Flame, Award } from 'lucide-react';

export interface LoreArtifact {
  id: string;
  keyword: string;
  title: string;
  category: "Cultural Documentation" | "Artist Inspiration" | "Visual Asset";
  essence: string;
  culturalDoc: string;
  artistInspiration: string;
  visualAssetUrl: string;
  visualAssetAlt: string;
  relatedTrackId?: string; // id of track in SEED_RELEASES to trigger playback!
  relatedReleaseId?: string;
  audioSnippetUrl?: string;
}

export const LORE_ARTIFACTS_BY_CHAPTER: Record<string, LoreArtifact[]> = {
  "chapter-1": [
    {
      id: "ghetto-sages",
      keyword: "Ghetto Sages",
      title: "The Ghetto Sages Order",
      category: "Cultural Documentation",
      essence: "Modern guardians of oral chronicles who encode anti-colonial resistance into modern booming-bap frequencies.",
      culturalDoc: "In East African urban centers, the traditional 'Griot' or oral historian evolves. The Sages are high-frequency street orators. Instead of acoustic lutes, they command customized sound compression algorithms and subwoofers to keep community history alive in Sheng dialects, bypassing corporate filtration systems.",
      artistInspiration: "Kinyan MC's primary moniker is 'Orator of the Ghetto Sages.' His vocal recording filters are designed to replicate the acoustic echo of empty steel shipping containers in Kibera, establishing a metallic signature.",
      visualAssetUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600",
      visualAssetAlt: "Industrial concrete container with glowing audio transmitters",
      relatedTrackId: "concrete-intro",
      relatedReleaseId: "nairobi-concrete",
      audioSnippetUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      id: "matatus",
      keyword: "Matatus",
      title: "Ngong Road Custom Matatus",
      category: "Visual Asset",
      essence: "Holographic custom transport systems executing acoustic sub-bass sweeps to clear high-frequency corporate mind dampeners.",
      culturalDoc: "Matatus are highly customized private transit buses in Nairobi, internationally famous for their loud subwoofers, excessive lights, and graffiti. In the 2042 corporate resistance movement, these mobile transponders were equipped with heavy marine battery configurations to act as mobile EMP and low-frequency emitters.",
      artistInspiration: "Inspired directly by the track 'Matatu Rhapsody.' Shujaa Sultan mixed authentic multi-cylinder heavy diesel starter engines into the rhythm snare patterns.",
      visualAssetUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=600",
      visualAssetAlt: "Cybernetic glowing neon purple transport bus in a dark rainy street",
      relatedTrackId: "matatu-rhapsody",
      relatedReleaseId: "nairobi-concrete",
      audioSnippetUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      id: "reclamation",
      keyword: "Hood Authority reclamation",
      title: "The Great Reclamation of 2042",
      category: "Cultural Documentation",
      essence: "The historic digital sovereign break-out led by high-frequency street orators.",
      culturalDoc: "When corporate telecommunication syndicates introduced static to block physical community congregation, youth gathered around Matatu stations, tuning their standard receivers to 432Hz. This created a shared resonance that physically vibrated corporate antennas until the local grids collapsed, starting the reclaim.",
      artistInspiration: "The 'Rift Valley Wind' track layout models this cascade, starting with simple solo chanting and layering up to a massive multi-vocal coastal crescendo.",
      visualAssetUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=600",
      visualAssetAlt: "Deep twilight cityscape under neon pink and black smog",
      relatedTrackId: "rift-valley-wind",
      relatedReleaseId: "nairobi-concrete",
      audioSnippetUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
  ],
  "chapter-2": [
    {
      id: "sultan-vault",
      keyword: "Vault of the Sultan",
      title: "The Mombasa Marine Vault",
      category: "Cultural Documentation",
      essence: "Sub-oceanic stone vault beneath Fort Jesus guarding the original 432Hz sound matrix tuning preset.",
      culturalDoc: "Located thirty meters below the coastal reef trenches of Mombasa, this limestone chamber withstood centuries of colonial assaults. The high density of dry salt crystal acts as an acoustic perfect-seal, preserving three ancient brass sheets carrying Swahili poetic metric codes.",
      artistInspiration: "Shujaa Sultan's rhythmic patterns use 432Hz tuning directly derived from the proportional layout of the ocean coral pillars inside the vault.",
      visualAssetUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600",
      visualAssetAlt: "Submarine coral arches surrounding golden runic plaques",
      relatedTrackId: "monarch-drum-intro",
      relatedReleaseId: "monarch-drum",
      audioSnippetUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
      id: "golden-shield",
      keyword: "Golden Swahili Shield",
      title: "The 432Hz Golden Output Preset",
      category: "Artist Inspiration",
      essence: "An impenetrable harmonic shield frequency acting as total immunity against mind control static.",
      culturalDoc: "The Shield is not an object of iron and wood, but a specialized digital algorithm that vibrates at exactly 432Hz. In local coastal mythology, this frequency matches the heartbeat of deep-sea whales, returning the human neural nervous system to natural harmonic resonance.",
      artistInspiration: "Track 'Shield of Fire (Mombasa Ritual)' integrates these authentic whale sounds recorded on Mombasa marine sensors, disguised inside the analog synthesizer background sweeps.",
      visualAssetUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600",
      visualAssetAlt: "Polished brass shield radiating cosmic light waves inside Fort Jesus",
      relatedTrackId: "shield-fire",
      relatedReleaseId: "monarch-drum",
      audioSnippetUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    }
  ],
  "chapter-3": [
    {
      id: "buganda-drum",
      keyword: "copper Buganda drums",
      title: "The Lightning Royal Drum Matrix",
      category: "Visual Asset",
      essence: "Traditional wood and leather royal drum shells laced with copper wiring to capture Rift Valley storm charges.",
      culturalDoc: "In Ugandan culture, royal drums are symbols of absolute sovereign authority. By lacing the organic animal skins with high-grade copper wires, Kadogo Queen created a capacitor drum. When struck during lightning storms, it transforms voltage spikes into ultra-heavy synth bursts, releasing high-voltage acoustic energy.",
      artistInspiration: "Kadogo Queen's double-tempo drill rhythms are mathematically modeled around the lightning recurrence intervals observed over Lake Victoria.",
      visualAssetUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=600",
      visualAssetAlt: "Dark copper drums glowing with bright purple electrical currents",
      relatedTrackId: "rift-valley-wind",
      relatedReleaseId: "nairobi-concrete",
      audioSnippetUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
      id: "lightning-chant",
      keyword: "electro-industrial lightning chant",
      title: "The Spark Transmission Code",
      category: "Artist Inspiration",
      essence: "Self-powering high-voltage mesh frequencies broadcasting Hood Authority channels directly to fan minds.",
      culturalDoc: "By encoding multi-track vocal streams directly into static electric fields, the Ghetto resistance created an absolute off-grid web. Each fan's standard wireless headphones act as a minor relay point, scaling the broadcast capacity exponentially with every active listener.",
      artistInspiration: "This is the core foundation of the 'Monarch Beats' EP design: decentralized digital transmissions carrying raw coastal Swahili rhythms.",
      visualAssetUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
      visualAssetAlt: "Storm clouds flashing with majestic neon purple energy",
      relatedTrackId: "monarch-drum-intro",
      relatedReleaseId: "monarch-drum",
      audioSnippetUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    }
  ]
};
