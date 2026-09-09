'use client';

import { useState, useCallback, useEffect } from 'react';

export function useLeagueAudio() {
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem('wiz_tft_audio');
    if (saved !== null) {
      setAudioEnabled(saved === 'true');
    }
  }, []);

  const toggleAudio = useCallback(() => {
    setAudioEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('wiz_tft_audio', String(next));
      return next;
    });
  }, []);

  // Play synthesized Hextech client UI sounds using Web Audio API
  const playSfx = useCallback(
    (type: 'click' | 'tab' | 'gold' | 'hover' | 'open') => {
      if (!audioEnabled || typeof window === 'undefined') return;

      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) return;

        const ctx = new AudioContextClass();
        const now = ctx.currentTime;

        if (type === 'click') {
          // Sharp hextech metallic click
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);
          osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);

          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.08);
        } else if (type === 'tab') {
          // League client smooth glass tab transition
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = 'triangle';
          osc1.frequency.setValueAtTime(320, now);
          osc1.frequency.exponentialRampToValueAtTime(560, now + 0.12);

          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(640, now);
          osc2.frequency.exponentialRampToValueAtTime(960, now + 0.12);

          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.14);
          osc2.stop(now + 0.14);
        } else if (type === 'gold' || type === 'open') {
          // Majestic Hextech resonant chime
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, now); // C5
          osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
          osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
          osc.frequency.setValueAtTime(1046.5, now + 0.18); // C6

          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.4);
        } else if (type === 'hover') {
          // Subtle airy hover tone
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(750, now + 0.03);

          gain.gain.setValueAtTime(0.02, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.03);
        }
      } catch {
        // Ignore audio context errors gracefully
      }
    },
    [audioEnabled]
  );

  return { audioEnabled, toggleAudio, playSfx };
}
