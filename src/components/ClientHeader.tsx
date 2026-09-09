'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Plus, Grid, LayoutGrid, Columns, BookOpen, RefreshCw, Maximize2, ShieldAlert, GitBranch, Trophy, Crown, ListOrdered, Calculator, ExternalLink, Clock } from 'lucide-react';
import { TFT_SITES, LAYOUT_PRESETS, LayoutPreset, TFTTargetSite } from '@/data/toolsData';

interface ClientHeaderProps {
  currentPresetId: string;
  onSelectPreset: (preset: LayoutPreset) => void;
  onAddWindow: (siteId: string) => void;
  onResetLayout: () => void;
  onToggleTempoDrawer: () => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
  playSfx: (type: 'click' | 'tab' | 'gold' | 'hover' | 'open') => void;
  windowCount: number;
}

export function ClientHeader({
  currentPresetId,
  onSelectPreset,
  onAddWindow,
  onResetLayout,
  onToggleTempoDrawer,
  audioEnabled,
  toggleAudio,
  playSfx,
  windowCount,
}: ClientHeaderProps) {
  const [showAddMenu, setShowAddMenu] = useState<boolean>(false);
  const [showPresetMenu, setShowPresetMenu] = useState<boolean>(false);

  const activePreset = LAYOUT_PRESETS.find((p) => p.id === currentPresetId) || LAYOUT_PRESETS[0];

  const handlePresetChange = (preset: LayoutPreset) => {
    playSfx('tab');
    onSelectPreset(preset);
    setShowPresetMenu(false);
  };

  const handleAddSite = (siteId: string) => {
    playSfx('gold');
    onAddWindow(siteId);
    setShowAddMenu(false);
  };

  const renderPresetIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutGrid':
        return <LayoutGrid className="w-3.5 h-3.5 text-[#0AC8B9]" />;
      case 'Grid':
        return <Grid className="w-3.5 h-3.5 text-[#C8AA6E]" />;
      case 'Columns':
        return <Columns className="w-3.5 h-3.5 text-[#0AC8B9]" />;
      case 'BookOpen':
        return <BookOpen className="w-3.5 h-3.5 text-[#A055FF]" />;
      default:
        return <Grid className="w-3.5 h-3.5 text-[#C8AA6E]" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#091428]/95 backdrop-blur-md border-b border-[#1E282D] select-none">
      {/* Top Gold Metallic Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C8AA6E] to-transparent" />

      <div className="w-full px-3 sm:px-6 flex items-center justify-between h-14 sm:h-16 gap-2">
        {/* Left: Branding & Status */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-[#F0E6D2] via-[#C8AA6E] to-[#785A28] p-[1.5px] shadow-[0_0_15px_rgba(200,170,110,0.4)]">
              <div className="w-full h-full bg-[#091428] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#C8AA6E]" />
              </div>
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-bold tracking-wider text-[#F0E6D2] font-serif uppercase truncate max-w-[180px] sm:max-w-none">
                Wiz TFT Multi-Window Hub
              </h1>
              <div className="flex items-center space-x-1.5 text-[9px] sm:text-[10px] text-[#0AC8B9] font-mono tracking-wider">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0AC8B9] animate-pulse" />
                <span>{windowCount} LIVE WINDOWS SYNCED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Layout Presets Selector */}
        <div className="flex items-center space-x-2">
          {/* Preset Buttons for Desktop */}
          <div className="hidden md:flex items-center space-x-1.5 bg-[#010A13] p-1 rounded-sm border border-[#1E282D]">
            {LAYOUT_PRESETS.map((preset) => {
              const isActive = preset.id === currentPresetId;
              return (
                <button
                  key={preset.id}
                  onClick={() => handlePresetChange(preset)}
                  onMouseEnter={() => playSfx('hover')}
                  className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-[#C8AA6E] text-[#010A13] font-bold shadow-[0_0_10px_rgba(200,170,110,0.4)]'
                      : 'text-[#A09B8C] hover:text-[#F0E6D2] hover:bg-[#091428]'
                  }`}
                >
                  {renderPresetIcon(preset.icon)}
                  <span className="truncate">{preset.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Preset Dropdown */}
          <div className="md:hidden relative">
            <button
              onClick={() => {
                playSfx('click');
                setShowPresetMenu(!showPresetMenu);
                setShowAddMenu(false);
              }}
              className="px-2.5 py-1.5 bg-[#010A13] border border-[#C8AA6E] text-[#C8AA6E] text-xs font-bold uppercase rounded-sm flex items-center space-x-1"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Presets</span>
            </button>

            {showPresetMenu && (
              <div className="absolute left-0 top-full mt-1 w-64 z-50 bg-[#091428] border-2 border-[#C8AA6E] shadow-[0_0_25px_rgba(0,0,0,0.9)] rounded-sm p-1">
                {LAYOUT_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetChange(preset)}
                    className="w-full text-left p-2 text-xs rounded hover:bg-[#010A13] text-[#F0E6D2] flex flex-col space-y-0.5"
                  >
                    <span className="font-bold text-[#C8AA6E] uppercase">{preset.name}</span>
                    <span className="text-[10px] text-[#A09B8C] leading-tight">{preset.description}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Tempo & Gold, + Add Window Button, Audio & Reset */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Tempo & Gold Drawer Button */}
          <button
            onClick={() => {
              playSfx('click');
              onToggleTempoDrawer();
            }}
            onMouseEnter={() => playSfx('hover')}
            title="Open Round Tempo & Gold Interest Calculator"
            className="px-2.5 sm:px-3 py-1.5 bg-[#010A13] border border-[#C8AA6E]/70 hover:border-[#C8AA6E] text-[#C8AA6E] hover:bg-[#C8AA6E] hover:text-[#010A13] font-bold text-xs uppercase tracking-wider rounded-sm transition-all flex items-center space-x-1.5 shadow-sm"
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tempo & Gold</span>
          </button>

          {/* Add Live Window Button */}
          <div className="relative">
            <button
              onClick={() => {
                playSfx('click');
                setShowAddMenu(!showAddMenu);
                setShowPresetMenu(false);
              }}
              onMouseEnter={() => playSfx('hover')}
              className="px-3 py-1.5 bg-gradient-to-r from-[#785A28] via-[#C8AA6E] to-[#463714] text-[#010A13] font-bold text-xs uppercase tracking-wider rounded-sm shadow-[0_0_12px_rgba(200,170,110,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span className="hidden sm:inline">Add Live Window</span>
              <span className="sm:hidden">Add</span>
            </button>

            {/* Add Tool Dropdown Menu */}
            {showAddMenu && (
              <div className="absolute right-0 top-full mt-1 w-72 z-50 bg-[#091428] border-2 border-[#C8AA6E] shadow-[0_0_30px_rgba(0,0,0,0.9)] rounded-sm py-1.5">
                <div className="px-3 py-1.5 text-[10px] uppercase font-mono text-[#C8AA6E] font-bold border-b border-[#1E282D]">
                  Select Live TFT Tool to Open:
                </div>
                <div className="max-h-80 overflow-y-auto py-1">
                  {TFT_SITES.map((site) => (
                    <button
                      key={site.id}
                      onClick={() => handleAddSite(site.id)}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-[#010A13] transition-colors flex items-start justify-between gap-2 border-b border-[#1E282D]/40"
                    >
                      <div>
                        <div className="font-bold text-[#F0E6D2] font-serif uppercase">{site.name}</div>
                        <div className="text-[10px] text-[#A09B8C] leading-snug">{site.exactFeature}</div>
                      </div>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#0AC8B9]/15 text-[#0AC8B9] border border-[#0AC8B9]/30 flex-shrink-0">
                        {site.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reset Layout */}
          <button
            onClick={() => {
              playSfx('click');
              onResetLayout();
            }}
            title="Reset to Default Tri-View Layout"
            className="p-1.5 rounded-sm border border-[#1E282D] bg-[#010A13] text-[#A09B8C] hover:text-[#C8AA6E] hover:border-[#C8AA6E] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Audio Toggle */}
          <button
            onClick={() => {
              playSfx('click');
              toggleAudio();
            }}
            title={audioEnabled ? 'Mute Client Audio SFX' : 'Enable Client Audio SFX'}
            className="p-1.5 rounded-sm border border-[#1E282D] bg-[#010A13] text-[#C8AA6E] hover:border-[#C8AA6E] transition-colors"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-[#A09B8C]" />}
          </button>
        </div>
      </div>
    </header>
  );
}
