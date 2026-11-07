'use client';

import React, { useState } from 'react';
import { ExternalLink, RefreshCw, Maximize2, Minimize2, X, ChevronDown, Sparkles, ShieldAlert, GitBranch, Trophy, BookOpen, Crown, ListOrdered, Grid, Calculator, GripVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { TFT_SITES, TFTTargetSite, TFTSubRoute } from '@/data/toolsData';

export interface WindowInstance {
  id: string; // unique instance id
  siteId: string;
  currentUrl: string;
  routeId: string;
  title: string;
}

interface MultiWindowPanelProps {
  panel: WindowInstance;
  index: number;
  totalWindows: number;
  isMaximized: boolean;
  isDragging: boolean;
  onMaximizeToggle: (windowId: string) => void;
  onClose: (windowId: string) => void;
  onChangeSite: (windowId: string, newSiteId: string, newRouteId?: string) => void;
  onChangeRoute: (windowId: string, route: TFTSubRoute) => void;
  onMove: (windowId: string, direction: 'left' | 'right') => void;
  onSwap: (sourceIndex: number, targetIndex: number) => void;
  onDragStart: (sourceIndex: number) => void;
  onDragEnd: () => void;
  playSfx: (type: 'click' | 'tab' | 'gold' | 'hover' | 'open') => void;
}

export function MultiWindowPanel({
  panel,
  index,
  totalWindows,
  isMaximized,
  isDragging,
  onMaximizeToggle,
  onClose,
  onChangeSite,
  onChangeRoute,
  onMove,
  onSwap,
  onDragStart,
  onDragEnd,
  playSfx,
}: MultiWindowPanelProps) {
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [showSiteDropdown, setShowSiteDropdown] = useState<boolean>(false);
  const [showRouteDropdown, setShowRouteDropdown] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const site = TFT_SITES.find((s) => s.id === panel.siteId) || TFT_SITES[0];
  const activeRoute = site.routes.find((r) => r.id === panel.routeId) || site.routes[0];

  const handleRefresh = () => {
    playSfx('click');
    setIframeKey((prev) => prev + 1);
  };

  const handleOpenExternal = () => {
    playSfx('open');
    if (typeof window !== 'undefined') {
      window.open(panel.currentUrl || activeRoute.url, '_blank', 'noopener,noreferrer');
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'GitBranch':
        return <GitBranch className="w-3.5 h-3.5 text-[#0AC8B9]" />;
      case 'Trophy':
        return <Trophy className="w-3.5 h-3.5 text-[#C8AA6E]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-3.5 h-3.5 text-[#E84057]" />;
      case 'BookOpen':
        return <BookOpen className="w-3.5 h-3.5 text-[#A055FF]" />;
      case 'Crown':
        return <Crown className="w-3.5 h-3.5 text-[#C8AA6E]" />;
      case 'ListOrdered':
        return <ListOrdered className="w-3.5 h-3.5 text-[#0AC8B9]" />;
      case 'Grid':
        return <Grid className="w-3.5 h-3.5 text-[#0AC8B9]" />;
      case 'Calculator':
        return <Calculator className="w-3.5 h-3.5 text-[#0AC8B9]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#C8AA6E]" />;
    }
  };

  const handleStartDrag = (e: React.DragEvent) => {
    if (isMaximized) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('select')) {
      return;
    }
    playSfx('hover');
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(index);
  };

  return (
    <div
      onDragOver={(e) => {
        if (isMaximized) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (!isDragOver) setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        if (isMaximized) return;
        e.preventDefault();
        setIsDragOver(false);
        onDragEnd();
        const sourceIndexStr = e.dataTransfer.getData('text/plain');
        if (sourceIndexStr !== '') {
          const sourceIndex = parseInt(sourceIndexStr, 10);
          if (!isNaN(sourceIndex) && sourceIndex !== index) {
            onSwap(sourceIndex, index);
          }
        }
      }}
      className={`relative flex flex-col bg-[#091428] border transition-all duration-200 ${
        isDragOver
          ? 'border-[#0AC8B9] ring-2 ring-[#0AC8B9] scale-[0.99] shadow-[0_0_30px_rgba(10,200,185,0.5)]'
          : isDragging
          ? 'border-[#C8AA6E]/80 shadow-[0_0_20px_rgba(200,170,110,0.3)]'
          : 'border-[#C8AA6E]/60 shadow-[0_0_20px_rgba(0,0,0,0.6)]'
      } rounded-sm overflow-hidden ${
        isMaximized ? 'fixed inset-4 z-50 shadow-[0_0_50px_rgba(200,170,110,0.4)]' : 'w-full h-full min-h-[360px]'
      }`}
    >
      {/* Hextech Gold Top Border & Corner Decors */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#785A28] via-[#C8AA6E] to-[#785A28]" />
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#C8AA6E] pointer-events-none" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#C8AA6E] pointer-events-none" />

      {/* Window Header Bar - Entire header is draggable */}
      <div
        draggable={!isMaximized}
        onDragStart={handleStartDrag}
        onDragEnd={() => onDragEnd()}
        className={`flex items-center justify-between px-2.5 py-1.5 bg-gradient-to-r from-[#010A13] via-[#091428] to-[#010A13] border-b border-[#1E282D] select-none gap-2 ${
          !isMaximized ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
      >
        {/* Left: Drag Handle, Shift Arrows, Site Picker & Sub-route */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 min-w-0">
          {/* Drag Handle */}
          {!isMaximized && (
            <div
              title="Click and drag anywhere on this header to swap positions"
              className="p-1 rounded text-[#A09B8C] hover:text-[#C8AA6E] transition-colors flex items-center"
            >
              <GripVertical className="w-3.5 h-3.5" />
            </div>
          )}

          {/* Quick Shift Left / Right */}
          {!isMaximized && totalWindows > 1 && (
            <div className="flex items-center bg-[#010A13] border border-[#1E282D] rounded-sm p-0.5">
              <button
                disabled={index === 0}
                onClick={() => onMove(panel.id, 'left')}
                title="Shift position left"
                className={`p-0.5 rounded text-xs transition-colors ${
                  index === 0 ? 'text-[#1E282D] cursor-not-allowed' : 'text-[#A09B8C] hover:text-[#C8AA6E] hover:bg-[#091428]'
                }`}
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                disabled={index === totalWindows - 1}
                onClick={() => onMove(panel.id, 'right')}
                title="Shift position right"
                className={`p-0.5 rounded text-xs transition-colors ${
                  index === totalWindows - 1 ? 'text-[#1E282D] cursor-not-allowed' : 'text-[#A09B8C] hover:text-[#C8AA6E] hover:bg-[#091428]'
                }`}
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Site Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                playSfx('click');
                setShowSiteDropdown(!showSiteDropdown);
                setShowRouteDropdown(false);
              }}
              className="flex items-center space-x-1.5 px-2 py-1 rounded-sm bg-[#010A13] border border-[#1E282D] hover:border-[#C8AA6E] text-xs font-bold text-[#F0E6D2] font-serif uppercase tracking-wider transition-colors"
            >
              {renderIcon(site.iconName)}
              <span className="truncate max-w-[100px] sm:max-w-[130px]">{site.name}</span>
              <ChevronDown className="w-3 h-3 text-[#A09B8C]" />
            </button>

            {/* Site Dropdown Menu */}
            {showSiteDropdown && (
              <div className="absolute left-0 top-full mt-1 w-56 z-50 bg-[#091428] border-2 border-[#C8AA6E] shadow-[0_0_25px_rgba(0,0,0,0.8)] rounded-sm py-1 max-h-80 overflow-y-auto">
                <div className="px-3 py-1 text-[10px] uppercase font-mono text-[#A09B8C] border-b border-[#1E282D]">
                  Switch Live Tool:
                </div>
                {TFT_SITES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      playSfx('tab');
                      onChangeSite(panel.id, s.id);
                      setShowSiteDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#0A1A32] transition-colors ${
                      s.id === site.id ? 'text-[#0AC8B9] font-bold bg-[#010A13]' : 'text-[#F0E6D2]'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      {renderIcon(s.iconName)}
                      <span className="truncate">{s.name}</span>
                    </div>
                    <span className="text-[9px] font-mono uppercase text-[#A09B8C] ml-1">
                      {s.badge}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sub-Route Tab / Dropdown (if more than 1 route) */}
          {site.routes.length > 1 && (
            <div className="relative hidden sm:block">
              <button
                onClick={() => {
                  playSfx('click');
                  setShowRouteDropdown(!showRouteDropdown);
                  setShowSiteDropdown(false);
                }}
                className="flex items-center space-x-1 px-2 py-1 rounded-sm bg-[#0A1A32] border border-[#0AC8B9]/40 hover:border-[#0AC8B9] text-[11px] font-semibold text-[#0AC8B9] tracking-wider transition-colors truncate max-w-[130px]"
              >
                <span className="truncate">{activeRoute.name}</span>
                <ChevronDown className="w-2.5 h-2.5 text-[#0AC8B9]" />
              </button>

              {showRouteDropdown && (
                <div className="absolute left-0 top-full mt-1 w-52 z-50 bg-[#091428] border border-[#0AC8B9] shadow-[0_0_20px_rgba(0,0,0,0.8)] rounded-sm py-1">
                  <div className="px-3 py-1 text-[10px] uppercase font-mono text-[#0AC8B9] border-b border-[#1E282D]">
                    Target Feature / Section:
                  </div>
                  {site.routes.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        playSfx('tab');
                        onChangeRoute(panel.id, r);
                        setShowRouteDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#010A13] transition-colors ${
                        r.id === activeRoute.id ? 'text-[#0AC8B9] font-bold' : 'text-[#A09B8C] hover:text-[#F0E6D2]'
                      }`}
                    >
                      <div className="font-semibold">{r.name}</div>
                      <div className="text-[10px] text-[#A09B8C] truncate">{r.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Window Controls */}
        <div className="flex items-center space-x-1.5 flex-shrink-0">
          {/* Direct Pop-out Tab */}
          <button
            onClick={handleOpenExternal}
            title="Open in new browser tab"
            className="px-2 py-1 rounded-sm bg-[#C8AA6E] text-[#010A13] hover:brightness-110 text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1 shadow-sm transition-all"
          >
            <span>Pop-out</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          {/* Refresh Frame */}
          <button
            onClick={handleRefresh}
            title="Reload frame"
            className="p-1 rounded-sm border border-[#1E282D] bg-[#010A13] text-[#A09B8C] hover:text-[#C8AA6E] hover:border-[#C8AA6E] transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
          </button>

          {/* Maximize / Minimize Toggle */}
          <button
            onClick={() => {
              playSfx('click');
              onMaximizeToggle(panel.id);
            }}
            title={isMaximized ? 'Restore view' : 'Maximize panel'}
            className="p-1 rounded-sm border border-[#1E282D] bg-[#010A13] text-[#A09B8C] hover:text-[#0AC8B9] hover:border-[#0AC8B9] transition-colors"
          >
            {isMaximized ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          </button>

          {/* Close Window */}
          <button
            onClick={() => {
              playSfx('click');
              onClose(panel.id);
            }}
            title="Close window"
            className="p-1 rounded-sm border border-[#1E282D] bg-[#010A13] text-[#A09B8C] hover:text-[#E84057] hover:border-[#E84057] transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Frame / Live Screen */}
      <div className="relative flex-1 bg-[#010A13] overflow-hidden">
        <iframe
          key={iframeKey}
          src={panel.currentUrl || activeRoute.url}
          title={panel.title || site.name}
          className={`w-full h-full border-none ${isDragging ? 'pointer-events-none' : ''}`}
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-modals allow-top-navigation-by-user-activation"
          allow="clipboard-write *; clipboard-read *"
        />

        {/* Drag & Drop Target Overlay: Enables dropping anywhere across the entire window */}
        {isDragging && !isMaximized && (
          <div
            className={`absolute inset-0 z-30 flex flex-col items-center justify-center transition-all ${
              isDragOver
                ? 'bg-[#0AC8B9]/25 border-2 border-dashed border-[#0AC8B9]'
                : 'bg-[#010A13]/50 border border-[#C8AA6E]/30'
            }`}
          >
            <div
              className={`px-4 py-2.5 rounded-sm border shadow-2xl flex items-center space-x-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                isDragOver
                  ? 'bg-[#091428] border-[#0AC8B9] text-[#0AC8B9] scale-110 shadow-[0_0_30px_rgba(10,200,185,0.6)]'
                  : 'bg-[#091428]/95 border-[#C8AA6E]/70 text-[#F0E6D2]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#0AC8B9] animate-pulse" />
              <span>{isDragOver ? 'Release to swap window' : 'Drop anywhere to swap'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
