'use client';

import React, { useState, useEffect } from 'react';
import { X, Coins, Clock, CheckCircle2, Sparkles, ChevronRight, Zap } from 'lucide-react';

interface RoundTempoTickerProps {
  isOpen: boolean;
  onClose: () => void;
  playSfx: (type: 'click' | 'tab' | 'gold' | 'hover' | 'open') => void;
}

interface TempoStage {
  stage: string;
  level: string;
  desc: string;
  notes: string;
  augment?: string;
  goldBenchmark: string;
}

const TEMPO_STAGES: TempoStage[] = [
  {
    stage: 'Stage 2-1',
    level: 'Lvl 4',
    desc: 'Winstreak push or loss econ',
    notes: 'Push Level 4 if you have 2-star units or a strong 3-cost pair to maintain a 5-winstreak. Stay L3 and loss-streak if weak.',
    augment: 'Augment 1 (2-1)',
    goldBenchmark: '10g at 2-3',
  },
  {
    stage: 'Stage 2-5',
    level: 'Lvl 5',
    desc: 'Protect winstreak / Build econ',
    notes: 'Level to 5 after carousel to protect winstreak; otherwise naturally level at 2-6 while hoarding gold.',
    goldBenchmark: '20g at 2-6',
  },
  {
    stage: 'Stage 3-2',
    level: 'Lvl 6',
    desc: 'Standard level up & soft stabilize',
    notes: 'Level to 6 and roll 10-20g if bleeding HP. Upgrade frontline 2-stars to preserve HP going into Stage 3.',
    augment: 'Augment 2 (3-2)',
    goldBenchmark: '30g-40g after leveling',
  },
  {
    stage: 'Stage 4-1 / 4-2',
    level: 'Lvl 8',
    desc: 'Fast 8 Rolldown milestone',
    notes: 'Push Level 8 on 4-2 (or 4-1 with high economy). Roll down to 20-10g to lock in your main 4-cost carries and 4-cost frontline.',
    augment: 'Augment 3 (4-2)',
    goldBenchmark: '30g-40g available to roll',
  },
  {
    stage: 'Stage 5-1 / 5-2',
    level: 'Lvl 9',
    desc: 'Late game capped legendary board',
    notes: 'Once 4-cost board is 2-starred and stable, push Level 9 to add high-value 5-cost legendaries and secure Top 2.',
    goldBenchmark: '50g+ excess gold',
  },
];

export function RoundTempoTicker({ isOpen, onClose, playSfx }: RoundTempoTickerProps) {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(2); // Default to Stage 3-2
  const [goldInput, setGoldInput] = useState<number>(38);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Load saved active stage from localStorage
  useEffect(() => {
    const savedStage = localStorage.getItem('wiz_tft_active_stage');
    if (savedStage !== null) {
      setActiveStageIdx(parseInt(savedStage, 10));
    }
  }, []);

  if (!isOpen) return null;

  const handleSelectStage = (idx: number) => {
    playSfx('tab');
    setActiveStageIdx(idx);
    localStorage.setItem('wiz_tft_active_stage', idx.toString());
  };

  const handleAdjustGold = (delta: number) => {
    playSfx('click');
    setGoldInput((prev) => Math.max(0, Math.min(150, prev + delta)));
  };

  const handleSetQuickGold = (val: number) => {
    playSfx('gold');
    setGoldInput(val);
  };

  // Calculations
  const currentInterest = Math.min(5, Math.floor(goldInput / 10));
  const nextBreakpoint = (currentInterest + 1) * 10;
  const goldNeededForNext = currentInterest < 5 ? nextBreakpoint - goldInput : 0;

  const currentStage = TEMPO_STAGES[activeStageIdx];

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={() => {
          playSfx('click');
          onClose();
        }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-over Right Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md sm:max-w-lg z-50 bg-[#091428] border-l-2 border-[#C8AA6E] shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col text-xs select-none animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#010A13] via-[#091428] to-[#010A13] border-b border-[#1E282D]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-sm bg-[#C8AA6E]/20 border border-[#C8AA6E] flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#C8AA6E]" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-serif uppercase tracking-wider text-[#F0E6D2]">
                Round Tempo & Gold Calculator
              </h2>
              <p className="text-[10px] text-[#A09B8C] font-mono">
                Stage milestones, rolldowns, and interest math
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSfx('click');
              onClose();
            }}
            title="Close Drawer (Esc)"
            className="p-1.5 rounded border border-[#1E282D] bg-[#010A13] text-[#A09B8C] hover:text-[#E84057] hover:border-[#E84057] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Section 1: Stage Selector Pills */}
          <div>
            <div className="text-[11px] font-bold font-mono text-[#C8AA6E] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C8AA6E]" />
              <span>Select Current Stage:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {TEMPO_STAGES.map((s, idx) => {
                const isActive = idx === activeStageIdx;
                return (
                  <button
                    key={s.stage}
                    onClick={() => handleSelectStage(idx)}
                    className={`p-2 rounded-sm text-left transition-all border ${
                      isActive
                        ? 'bg-[#C8AA6E] border-[#C8AA6E] text-[#010A13] shadow-[0_0_15px_rgba(200,170,110,0.4)]'
                        : 'bg-[#010A13] border-[#1E282D] text-[#A09B8C] hover:text-[#F0E6D2] hover:border-[#C8AA6E]/40'
                    }`}
                  >
                    <div className="font-mono font-bold text-xs">{s.stage}</div>
                    <div className={`text-[10px] font-semibold uppercase ${isActive ? 'text-[#010A13]' : 'text-[#0AC8B9]'}`}>
                      {s.level}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Active Stage Details Card */}
          <div className="bg-[#010A13] border border-[#C8AA6E]/40 rounded-sm p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E282D]">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold font-serif text-[#F0E6D2] uppercase">
                  {currentStage.stage} Guide
                </span>
                <span className="px-2 py-0.5 rounded bg-[#0AC8B9]/20 border border-[#0AC8B9]/40 text-[#0AC8B9] font-mono font-bold text-[11px]">
                  Target: {currentStage.level}
                </span>
              </div>
              {currentStage.augment && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#A055FF]/20 text-[#A055FF] border border-[#A055FF]/40 font-semibold">
                  {currentStage.augment}
                </span>
              )}
            </div>

            <div className="text-xs text-[#F0E6D2] font-semibold leading-relaxed">
              {currentStage.desc}
            </div>

            <div className="text-xs text-[#A09B8C] leading-relaxed bg-[#091428] p-3 rounded border border-[#1E282D]">
              {currentStage.notes}
            </div>

            <div className="pt-2 border-t border-[#1E282D] flex items-center justify-between text-xs font-mono">
              <span className="text-[#A09B8C]">Gold Target:</span>
              <span className="text-[#C8AA6E] font-bold">{currentStage.goldBenchmark}</span>
            </div>
          </div>

          {/* Section 3: 1-Click Gold Interest & Sell-down Calculator */}
          <div className="bg-[#010A13] border border-[#C8AA6E]/40 rounded-sm p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E282D]">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#C8AA6E] uppercase font-serif">
                <Coins className="w-4 h-4 text-[#C8AA6E]" />
                <span>Gold Interest & Breakpoints</span>
              </div>
              <span className="text-[11px] font-mono text-[#0AC8B9] font-bold">
                +{currentInterest}g / round
              </span>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex items-center justify-between gap-1">
              {[10, 20, 30, 40, 50].map((tier) => (
                <button
                  key={tier}
                  onClick={() => handleSetQuickGold(tier)}
                  className={`flex-1 py-1 text-center font-mono font-bold text-xs rounded-sm border transition-colors ${
                    goldInput >= tier
                      ? 'bg-[#C8AA6E]/20 border-[#C8AA6E] text-[#C8AA6E]'
                      : 'bg-[#091428] border-[#1E282D] text-[#A09B8C] hover:text-[#F0E6D2]'
                  }`}
                >
                  {tier}g (+{tier / 10})
                </button>
              ))}
            </div>

            {/* Gold Stepper Input */}
            <div className="flex items-center justify-between bg-[#091428] p-2 rounded border border-[#1E282D]">
              <span className="text-xs text-[#A09B8C] font-mono">Your Current Gold:</span>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => handleAdjustGold(-5)}
                  className="px-2 py-1 rounded bg-[#010A13] border border-[#1E282D] text-[#A09B8C] hover:text-[#F0E6D2] text-xs font-mono"
                >
                  -5
                </button>
                <button
                  onClick={() => handleAdjustGold(-1)}
                  className="px-2 py-1 rounded bg-[#010A13] border border-[#1E282D] text-[#A09B8C] hover:text-[#F0E6D2] text-xs font-mono"
                >
                  -1
                </button>
                <span className="px-3 py-1 font-bold font-mono text-base text-[#C8AA6E] min-w-[48px] text-center">
                  {goldInput}g
                </span>
                <button
                  onClick={() => handleAdjustGold(1)}
                  className="px-2 py-1 rounded bg-[#010A13] border border-[#1E282D] text-[#A09B8C] hover:text-[#F0E6D2] text-xs font-mono"
                >
                  +1
                </button>
                <button
                  onClick={() => handleAdjustGold(5)}
                  className="px-2 py-1 rounded bg-[#010A13] border border-[#1E282D] text-[#A09B8C] hover:text-[#F0E6D2] text-xs font-mono"
                >
                  +5
                </button>
              </div>
            </div>

            {/* Breakpoint Advice / Sell-down hint */}
            <div className="p-3 rounded bg-[#091428] border border-[#1E282D]">
              {currentInterest === 5 ? (
                <div className="flex items-center space-x-2 text-[#0AC8B9]">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span className="font-semibold text-xs leading-relaxed">
                    Max interest reached (+5g)! Spend excess gold on levels or rolling down.
                  </span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A09B8C]">Next Breakpoint:</span>
                    <span className="font-bold text-[#C8AA6E]">{nextBreakpoint}g (+{currentInterest + 1} interest)</span>
                  </div>
                  <div className="text-xs text-[#0AC8B9] font-medium leading-relaxed">
                    💡 Sell <span className="font-bold text-[#F0E6D2]">{goldNeededForNext}g</span> worth of bench units before combat ends to reach {nextBreakpoint}g!
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Quick Leveling XP Reference */}
          <div className="bg-[#010A13] border border-[#1E282D] rounded-sm p-3">
            <div className="text-[10px] font-mono text-[#A09B8C] uppercase mb-2">
              Leveling XP Cost (Gold) Benchmarks:
            </div>
            <div className="grid grid-cols-5 gap-1.5 text-center font-mono text-xs">
              <div className="bg-[#091428] p-1.5 rounded border border-[#1E282D]">
                <div className="text-[#A09B8C] text-[10px]">L4</div>
                <div className="text-[#C8AA6E] font-bold">4g</div>
              </div>
              <div className="bg-[#091428] p-1.5 rounded border border-[#1E282D]">
                <div className="text-[#A09B8C] text-[10px]">L5</div>
                <div className="text-[#C8AA6E] font-bold">8g</div>
              </div>
              <div className="bg-[#091428] p-1.5 rounded border border-[#1E282D]">
                <div className="text-[#A09B8C] text-[10px]">L6</div>
                <div className="text-[#C8AA6E] font-bold">16g</div>
              </div>
              <div className="bg-[#091428] p-1.5 rounded border border-[#1E282D]">
                <div className="text-[#A09B8C] text-[10px]">L7</div>
                <div className="text-[#C8AA6E] font-bold">32g</div>
              </div>
              <div className="bg-[#091428] p-1.5 rounded border border-[#1E282D]">
                <div className="text-[#A09B8C] text-[10px]">L8</div>
                <div className="text-[#C8AA6E] font-bold">52g</div>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-[#010A13] border-t border-[#1E282D] flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#A09B8C]">Press Esc or click outside to close</span>
          <button
            onClick={() => {
              playSfx('click');
              onClose();
            }}
            className="px-4 py-1.5 bg-[#C8AA6E] text-[#010A13] font-bold text-xs uppercase tracking-wider rounded-sm hover:brightness-110 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
