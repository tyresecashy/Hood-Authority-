import { useState } from 'react';
import { Cloud, Lock, Search, Download, FileText, Music, Image, HelpCircle, CheckCircle } from 'lucide-react';
import { VaultAsset } from '../types';

interface DigitalVaultProps {
  assets: VaultAsset[];
  isInnerCircle: boolean;
  themeColor: string;
}

export default function DigitalVault({
  assets,
  isInnerCircle,
  themeColor
}: DigitalVaultProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  // Search filter
  const filteredAssets = assets.filter(asset => 
    asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const triggerDownload = (id: string, fileName: string) => {
    setDownloadedId(id);
    // Simulate raw packet download trigger
    setTimeout(() => {
      setDownloadedId(null);
      alert(`Successfully downloaded Master Stem file: ${fileName}. Secure stream intact.`);
    }, 1500);
  };

  const getIcon = (type: VaultAsset['type']) => {
    switch(type) {
      case 'master':
        return Music;
      case 'stems':
        return Music;
      case 'artwork':
        return Image;
      case 'press-kit':
        return FileText;
      default:
        return HelpCircle;
    }
  };

  if (!isInnerCircle) {
    return (
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto text-center space-y-5 shadow-2xl">
        <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
          <Lock className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Sovereign Encryption Vault</h2>
          <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
            The Digital Vault contains 24-bit studio stems, high-contrast promotional prints, and raw rehearsal clips of Kinyan MC and Shujaa Sultan. Access is locked strictly behind the **Hood Authority Inner Circle Clearance**.
          </p>
        </div>
        <div className="p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md text-left space-y-2.5">
          <span className="text-[10px] uppercase font-mono text-neutral-400 tracking-wider">How to authenticate:</span>
          <p className="text-[11px] text-neutral-300">
            Use the 🚨 **Role Switcher** in the main user nav block (top of the page) to toggle status role to **Admin**, **Artist** or manually activate the **Inner Circle** flag. This will bypass the local security gate!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Cloud className="w-5 h-5 text-sky-400" />
            Inner Circle Cyber Vault
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Download raw stems, master WAV tapes, and premium vector graphics files directly.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search stems or categories..."
            className="w-full bg-white/5 backdrop-blur-lg text-xs border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-white/20 transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map(asset => {
          const AssetIcon = getIcon(asset.type);
          const isDownloading = downloadedId === asset.id;
          return (
            <div
              key={asset.id}
              className="p-5 bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 rounded-2xl flex flex-col justify-between hover:scale-[1.01] transition-transform shadow-md"
            >
              <div className="space-y-3.5 text-left">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-white/5 border border-white/10 rounded-lg">
                    <AssetIcon className="w-4 h-4 text-sky-400" style={{ color: themeColor }} />
                  </div>
                  <span className="text-[10px] font-bold text-neutral-300 bg-white/5 px-2 py-0.5 border border-white/10 rounded uppercase">
                    {asset.fileSize}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-neutral-100 line-clamp-1">{asset.title}</h3>
                  <p className="text-[11px] text-neutral-400 mt-1.5 leading-relaxed line-clamp-2">
                    {asset.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {asset.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-[4px] text-[8px] font-mono text-neutral-450"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                disabled={isDownloading}
                onClick={() => triggerDownload(asset.id, asset.title)}
                className="w-full mt-5 py-2 rounded-xl text-xs font-semibold cursor-pointer border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center gap-1.5 transition disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 animate-pulse" />
                    <span>Synchronizing...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Master</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
