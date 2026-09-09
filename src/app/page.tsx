'use client';

import React, { useState, useEffect } from 'react';
import { ClientHeader } from '@/components/ClientHeader';
import { MultiWindowPanel, WindowInstance } from '@/components/MultiWindowPanel';
import { RoundTempoTicker } from '@/components/RoundTempoTicker';
import { TFT_SITES, LAYOUT_PRESETS, LayoutPreset, TFTSubRoute } from '@/data/toolsData';
import { useLeagueAudio } from '@/hooks/useLeagueAudio';
import { Sparkles, Plus, RefreshCw, LayoutGrid } from 'lucide-react';

export default function Home() {
  const [currentPresetId, setCurrentPresetId] = useState<string>('in-game-match');
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [maximizedWindowId, setMaximizedWindowId] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showTempoDrawer, setShowTempoDrawer] = useState<boolean>(false);

  const { audioEnabled, toggleAudio, playSfx } = useLeagueAudio();

  // Initialize from default preset or localStorage
  useEffect(() => {
    const savedWindows = localStorage.getItem('wiz_tft_windows');
    const savedPreset = localStorage.getItem('wiz_tft_preset');

    if (savedWindows) {
      try {
        setWindows(JSON.parse(savedWindows));
        if (savedPreset) setCurrentPresetId(savedPreset);
        return;
      } catch {
        // Fallback to preset
      }
    }

    loadPreset(LAYOUT_PRESETS[0]);
  }, []);

  // Save to localStorage
  const saveState = (newWindows: WindowInstance[], presetId?: string) => {
    setWindows(newWindows);
    localStorage.setItem('wiz_tft_windows', JSON.stringify(newWindows));
    if (presetId) {
      setCurrentPresetId(presetId);
      localStorage.setItem('wiz_tft_preset', presetId);
    }
  };

  const loadPreset = (preset: LayoutPreset) => {
    const newWindows: WindowInstance[] = preset.panels.map((panel, idx) => {
      const site = TFT_SITES.find((s) => s.id === panel.siteId) || TFT_SITES[0];
      const route = site.routes.find((r) => r.id === panel.routeId) || site.routes[0];
      return {
        id: `win-${Date.now()}-${idx}`,
        siteId: site.id,
        currentUrl: route.url,
        routeId: route.id,
        title: panel.customTitle || site.name,
      };
    });

    saveState(newWindows, preset.id);
  };

  const handleAddWindow = (siteId: string) => {
    const site = TFT_SITES.find((s) => s.id === siteId) || TFT_SITES[0];
    const newWindow: WindowInstance = {
      id: `win-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      siteId: site.id,
      currentUrl: site.routes[0].url,
      routeId: site.routes[0].id,
      title: site.name,
    };
    saveState([...windows, newWindow]);
  };

  const handleCloseWindow = (windowId: string) => {
    const updated = windows.filter((w) => w.id !== windowId);
    saveState(updated);
    if (maximizedWindowId === windowId) setMaximizedWindowId(null);
  };

  const handleChangeSite = (windowId: string, newSiteId: string) => {
    const site = TFT_SITES.find((s) => s.id === newSiteId) || TFT_SITES[0];
    const updated = windows.map((w) => {
      if (w.id === windowId) {
        return {
          ...w,
          siteId: site.id,
          currentUrl: site.routes[0].url,
          routeId: site.routes[0].id,
          title: site.name,
        };
      }
      return w;
    });
    saveState(updated);
  };

  const handleChangeRoute = (windowId: string, route: TFTSubRoute) => {
    const updated = windows.map((w) => {
      if (w.id === windowId) {
        return {
          ...w,
          currentUrl: route.url,
          routeId: route.id,
        };
      }
      return w;
    });
    saveState(updated);
  };

  const handleMaximizeToggle = (windowId: string) => {
    setMaximizedWindowId(maximizedWindowId === windowId ? null : windowId);
  };

  const handleMoveWindow = (windowId: string, direction: 'left' | 'right') => {
    const index = windows.findIndex((w) => w.id === windowId);
    if (index === -1) return;
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= windows.length) return;

    playSfx('tab');
    const newWindows = [...windows];
    const [moved] = newWindows.splice(index, 1);
    newWindows.splice(targetIndex, 0, moved);
    saveState(newWindows);
  };

  const handleSwapWindows = (sourceIndex: number, targetIndex: number) => {
    if (
      sourceIndex === targetIndex ||
      sourceIndex < 0 ||
      targetIndex < 0 ||
      sourceIndex >= windows.length ||
      targetIndex >= windows.length
    ) {
      return;
    }
    playSfx('gold');
    const newWindows = [...windows];
    const temp = newWindows[sourceIndex];
    newWindows[sourceIndex] = newWindows[targetIndex];
    newWindows[targetIndex] = temp;
    saveState(newWindows);
  };

  const handleReset = () => {
    loadPreset(LAYOUT_PRESETS[0]);
  };

  // Determine dynamic grid layout class based on window count (Full Viewport Height)
  const getGridClass = () => {
    const count = windows.length;
    if (count === 1) return 'grid-cols-1 h-[calc(100vh-4.5rem)]';
    if (count === 2) return 'grid-cols-1 md:grid-cols-2 h-[calc(100vh-4.5rem)]';
    if (count === 3) return 'grid-cols-1 md:grid-cols-3 h-[calc(100vh-4.5rem)]';
    if (count === 4) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 h-[calc(100vh-4.5rem)]';
    if (count >= 5) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-h-[calc(100vh-4.5rem)]';
    return 'grid-cols-1 h-[calc(100vh-4.5rem)]';
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#010A13] text-[#F0E6D2]">
      {/* Top Header with Multi-Window Controls */}
      <ClientHeader
        currentPresetId={currentPresetId}
        onSelectPreset={loadPreset}
        onAddWindow={handleAddWindow}
        onResetLayout={handleReset}
        onToggleTempoDrawer={() => setShowTempoDrawer(!showTempoDrawer)}
        audioEnabled={audioEnabled}
        toggleAudio={toggleAudio}
        playSfx={playSfx}
        windowCount={windows.length}
      />

      {/* Main Multi-Window Workspace Grid - Full Page Height */}
      <div className="flex-1 w-full p-2 sm:p-3 overflow-y-auto">
        {windows.length === 0 ? (
          <div className="w-full h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#C8AA6E]/20 border-2 border-[#C8AA6E] flex items-center justify-center shadow-[0_0_30px_rgba(200,170,110,0.3)]">
              <LayoutGrid className="w-8 h-8 text-[#C8AA6E]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#F0E6D2] font-serif uppercase tracking-wider">
                No Active Windows
              </h2>
              <p className="text-xs text-[#A09B8C]">
                Select a layout preset or add a live TFT tool to get started:
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-[#C8AA6E] text-[#010A13] font-bold text-xs uppercase tracking-wider rounded-sm shadow-[0_0_15px_rgba(200,170,110,0.4)] hover:brightness-110 transition-all flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Load Tri-View Preset</span>
            </button>
          </div>
        ) : (
          <div className={`grid gap-2.5 ${getGridClass()}`}>
            {windows.map((win, index) => (
              <MultiWindowPanel
                key={win.id}
                panel={win}
                index={index}
                totalWindows={windows.length}
                isMaximized={maximizedWindowId === win.id}
                isDragging={draggedIndex !== null}
                onMaximizeToggle={handleMaximizeToggle}
                onClose={handleCloseWindow}
                onChangeSite={handleChangeSite}
                onChangeRoute={handleChangeRoute}
                onMove={handleMoveWindow}
                onSwap={handleSwapWindows}
                onDragStart={(idx) => setDraggedIndex(idx)}
                onDragEnd={() => setDraggedIndex(null)}
                playSfx={playSfx}
              />
            ))}
          </div>
        )}
      </div>

      {/* Slide-over Round Tempo Drawer (Overlay - does not reduce window page height) */}
      <RoundTempoTicker
        isOpen={showTempoDrawer}
        onClose={() => setShowTempoDrawer(false)}
        playSfx={playSfx}
      />
    </main>
  );
}
