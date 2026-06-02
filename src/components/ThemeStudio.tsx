import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Palette, Play, Eye, Layers, ShieldAlert, Check } from 'lucide-react';
import { ThemePreset } from '../types';
import { SEED_THEMES } from '../data/mockSeeds';

interface ThemeStudioProps {
  currentTheme: ThemePreset;
  onThemeSelect: (theme: ThemePreset) => void;
  isAdmin: boolean;
  onSaveThemePreset?: (theme: ThemePreset) => void;
}

export default function ThemeStudio({
  currentTheme,
  onThemeSelect,
  isAdmin,
  onSaveThemePreset
}: ThemeStudioProps) {
  const [themes, setThemes] = useState<ThemePreset[]>(SEED_THEMES);
  const [customColors, setCustomColors] = useState(currentTheme.colors);
  const [successMsg, setSuccessMsg] = useState('');

  const handleColorChange = (key: keyof typeof currentTheme.colors, value: string) => {
    const updatedColors = { ...customColors, [key]: value };
    setCustomColors(updatedColors);

    // Dynamic propagation to temporary layout state
    onThemeSelect({
      ...currentTheme,
      colors: updatedColors
    });
  };

  const saveToCatalog = () => {
    const freshPreset: ThemePreset = {
      id: "theme-custom-" + Date.now(),
      name: `Custom Lab Preset (${themes.length + 1})`,
      isActive: true,
      colors: customColors
    };
    
    setThemes(prev => [...prev.map(t => ({ ...t, isActive: false })), freshPreset]);
    onThemeSelect(freshPreset);

    if (isAdmin && onSaveThemePreset) {
      onSaveThemePreset(freshPreset);
    }

    setSuccessMsg('Preset compiled successfully to Theme Engine!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="bg-neutral-900/60 backdrop-blur-md rounded-2xl border border-neutral-800/80 p-6 max-w-4xl mx-auto shadow-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-800 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-bold font-sans tracking-tight text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-red-500 animate-pulse" style={{ color: currentTheme.colors.primary }} />
            OS Theme Studio
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Re-engineer the cinematic operating system's palette, colors, and glow emitters.
          </p>
        </div>
        {!isAdmin && (
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] text-amber-400">
            <ShieldAlert className="w-3.5 h-3.5" />
            Sandbox Mode: Presets persist locally
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Presets Grid */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-300 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Active Mythological Presets
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {themes.map((theme) => {
              const isSelected = currentTheme.id === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onThemeSelect(theme);
                    setCustomColors(theme.colors);
                  }}
                  className={`relative group flex flex-col items-start text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-800 border-neutral-700 shadow-md scale-[1.02]'
                      : 'bg-neutral-950/50 border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/30'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-xs font-semibold text-white truncate max-w-[120px]">{theme.name}</span>
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                  </div>
                  {/* Color preview swatches */}
                  <div className="flex gap-1.5 mt-1.5">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.colors.primary }} />
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.colors.accent }} />
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.colors.bgGradStart }} />
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: theme.colors.bgGradEnd }} />
                  </div>
                  {isSelected && (
                    <motion.div
                      layoutId="activeThemeGlow"
                      className="absolute inset-0 border border-red-500/50 rounded-xl pointer-events-none"
                      style={{ borderColor: theme.colors.primary }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Architect Controls */}
        <div className="bg-black/40 border border-neutral-900 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-neutral-300 mb-5 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Frequency Shader Labs
          </h3>
          <div className="space-y-4">
            {/* Primary Colour */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <label className="text-xs text-neutral-300 block font-medium">Primary Frequency (Glow)</label>
                <span className="text-[10px] text-neutral-500 uppercase font-mono">{customColors.primary}</span>
              </div>
              <input
                type="color"
                value={customColors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
            </div>

            {/* Accent Sovereign Colour */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <label className="text-xs text-neutral-300 block font-medium">Sovereign Accent (Gold/Highlight)</label>
                <span className="text-[10px] text-neutral-500 uppercase font-mono">{customColors.accent}</span>
              </div>
              <input
                type="color"
                value={customColors.accent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
            </div>

            {/* BG Dark Gradient Start */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <label className="text-xs text-neutral-300 block font-medium">Abyss Start (Background Left)</label>
                <span className="text-[10px] text-neutral-500 uppercase font-mono">{customColors.bgGradStart}</span>
              </div>
              <input
                type="color"
                value={customColors.bgGradStart}
                onChange={(e) => handleColorChange('bgGradStart', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
            </div>

            {/* BG Dark Gradient End */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <label className="text-xs text-neutral-300 block font-medium">Abyss Finish (Background Right)</label>
                <span className="text-[10px] text-neutral-500 uppercase font-mono">{customColors.bgGradEnd}</span>
              </div>
              <input
                type="color"
                value={customColors.bgGradEnd}
                onChange={(e) => handleColorChange('bgGradEnd', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-neutral-900 flex justify-end">
            <button
              onClick={saveToCatalog}
              className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity active:scale-95 cursor-pointer flex items-center gap-1.5"
              style={{ backgroundColor: currentTheme.colors.primary, color: '#000000' }}
            >
              <Check className="w-3.5 h-3.5" />
              Compile Theme Preset
            </button>
          </div>
          {successMsg && (
            <p className="text-[11px] text-green-400 font-mono mt-3 text-right">
              ✓ {successMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
