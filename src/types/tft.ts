export type CompTier = 'S+' | 'S' | 'A' | 'B';
export type CompStyle = 'Fast 8' | 'Fast 9' | 'Slow Roll (Lvl 6)' | 'Slow Roll (Lvl 7)' | '1-Cost Reroll' | 'Flex';

export interface MetaComp {
  id: string;
  name: string;
  tier: CompTier;
  playRate: number; // e.g. 14.2%
  avgPlacement: number; // e.g. 3.82
  top4Rate: number; // e.g. 58.4%
  difficulty: 'Easy' | 'Medium' | 'Hard';
  style: CompStyle;
  carryUnit: string;
  tankUnit: string;
  secondaryCarry?: string;
  units: { name: string; cost: number; items?: string[]; stars?: number; isCarry?: boolean; isTank?: boolean }[];
  traits: { name: string; count: number; tier: 'bronze' | 'silver' | 'gold' | 'prismatic' }[];
  positioning: { row: number; col: number; unit: string }[];
  earlyHolders: string[];
  isContested: boolean;
  contestedAdvice: string;
  stageGuide: {
    stage2: string;
    stage3: string;
    stage4: string;
    stage5: string;
  };
}

export interface ArtifactOrEmblem {
  id: string;
  name: string;
  category: 'Artifact' | 'Emblem' | 'Support';
  icon?: string;
  stats: string;
  bestHolders: { unit: string; cost: number; synergyReason: string; delta: number }[];
  directComp: string;
  directCompUnits: string[];
  whyDirect: string;
  transitionTip: string;
}

export interface EarlyOpener {
  id: string;
  name: string;
  stage: 'Stage 2 (2-1 to 2-5)' | 'Stage 3 (3-1 to 3-5)';
  powerScore: number; // 0 to 100
  winstreakTier: 'S' | 'A' | 'B' | 'Lose-Streak Pivot';
  frontline: string[];
  backline: string[];
  activeTraits: string[];
  idealSlams: string[];
  transitionComps: string[];
  coachTips: string;
}

export interface LevelingTempo {
  round: string;
  level: number;
  expectedGold: string;
  tempoType: 'Standard Fast 8' | 'Aggressive Tempo' | 'Slow Roll Lvl 6' | 'Slow Roll Lvl 7' | 'Greed / Lose Streak' | 'Fast 9 Cap' | string;
  action: string;
  bunnyMuffinsNote: string;
}

export interface AugmentInfo {
  id: string;
  name: string;
  stage: '2-1' | '3-2' | '4-2' | 'Any';
  tier: 'Silver' | 'Gold' | 'Prismatic';
  grade: 'S+' | 'S' | 'A' | 'B' | 'Trap';
  delta: number;
  bestComps: string[];
  tip: string;
}

export interface TFTTool {
  id: string;
  name: string;
  url: string;
  badge: string;
  category: 'Decision & Emblems' | 'Meta & Stats' | 'Text Guides' | 'Calculators' | 'Overlays';
  description: string;
  whyUse: string;
  tags: string[];
  supportsIframe: boolean;
}
