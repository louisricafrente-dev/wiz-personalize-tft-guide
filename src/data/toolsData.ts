export interface TFTSubRoute {
  id: string;
  name: string;
  url: string;
  desc: string;
}

export interface TFTTargetSite {
  id: string;
  name: string;
  badge: string;
  category: string;
  defaultUrl: string;
  description: string;
  exactFeature: string;
  iconName: string;
  routes: TFTSubRoute[];
}

export const TFT_SITES: TFTTargetSite[] = [
  {
    id: 'tftflow',
    name: 'TFT Flow',
    badge: 'Decisions & Emblems',
    category: 'Decision Engine',
    defaultUrl: 'https://tftflow.com',
    description: 'Decision trees based on your opener, components, emblems, and artifacts.',
    exactFeature: 'Fast comp direction and flowchart pivots based on your current board.',
    iconName: 'GitBranch',
    routes: [
      { id: 'main', name: 'Main Flowchart Engine', url: 'https://tftflow.com', desc: 'Flowchart decision maker' },
    ],
  },
  {
    id: 'metatft',
    name: 'MetaTFT',
    badge: 'Live Meta Comps',
    category: 'Meta & Stats',
    defaultUrl: 'https://www.metatft.com/comps',
    description: 'Real-time highest win-rate comps, item holders, and live meta statistics.',
    exactFeature: 'Top win-rate comps and optimal itemization.',
    iconName: 'Trophy',
    routes: [
      { id: 'comps', name: 'Meta Comps Tier List', url: 'https://www.metatft.com/comps', desc: 'Live S/A tier meta comps' },
      { id: 'items', name: 'Items & Artifact Stats', url: 'https://www.metatft.com/items', desc: 'Artifact & Ornn items' },
      { id: 'tables', name: 'Bag Sizes & Level Tables', url: 'https://www.metatft.com/tables', desc: 'Pool sizes & XP curves' },
    ],
  },
  {
    id: 'tacticstools',
    name: 'Tactics.tools',
    badge: 'Popularity & Augments',
    category: 'Stats & Radar',
    defaultUrl: 'https://tactics.tools/comps',
    description: 'Playrate % to spot contested comps and augment placement delta ratings.',
    exactFeature: 'Lobby contested tracker and augment win rates.',
    iconName: 'ShieldAlert',
    routes: [
      { id: 'comps', name: 'Comps & Playrate %', url: 'https://tactics.tools/comps', desc: 'Check contested & playrates' },
      { id: 'augments', name: 'Augments Delta Tier List', url: 'https://tactics.tools/augments', desc: 'Augment placement deltas' },
      { id: 'units', name: 'Units & Positioning Heatmaps', url: 'https://tactics.tools/units', desc: 'Optimal hex positioning' },
      { id: 'items', name: 'Item & Emblem Holders', url: 'https://tactics.tools/items', desc: 'Best unit holders' },
    ],
  },
  {
    id: 'bunnymuffins',
    name: 'BunnyMuffins',
    badge: 'Text Guides & Tempo',
    category: 'Text Guides',
    defaultUrl: 'https://bunnymuffins.lol/tft-leveling-guide/',
    description: 'Comprehensive text guides, leveling curves (Fast 8), slow roll timings, and cheat sheets.',
    exactFeature: 'Text-based guides, leveling intervals, and gold economy rules.',
    iconName: 'BookOpen',
    routes: [
      { id: 'leveling', name: 'Leveling & Roll Guide', url: 'https://bunnymuffins.lol/tft-leveling-guide/', desc: 'Exact round roll & level curve' },
      { id: 'meta', name: 'Weekly Meta Snapshot', url: 'https://bunnymuffins.lol/meta/', desc: 'Written comp walkthroughs' },
    ],
  },
  {
    id: 'tftacademy',
    name: 'TFT Academy',
    badge: 'Pro Curated',
    category: 'Challenger Comps',
    defaultUrl: 'https://tftacademy.com/tierlist/comps',
    description: 'Challenger-curated comps by World Champions Dishsoap and Frodan.',
    exactFeature: 'High-ELO standard boards without raw stat traps.',
    iconName: 'Crown',
    routes: [
      { id: 'tierlist', name: 'Tier List & Comps', url: 'https://tftacademy.com/tierlist/comps', desc: 'Pro vetted tier list' },
    ],
  },
  {
    id: 'mobalytics',
    name: 'Mobalytics TFT',
    badge: 'Stage Walkthroughs',
    category: 'Text Guides',
    defaultUrl: 'https://mobalytics.gg/tft/comps-tier-list',
    description: '30+ comps with step-by-step written stage guides (Early, Mid, Late).',
    exactFeature: 'Stage-by-stage written instructions for meta compositions.',
    iconName: 'ListOrdered',
    routes: [
      { id: 'comps', name: 'Comps Tier List', url: 'https://mobalytics.gg/tft/comps-tier-list', desc: '30+ written stage comps' },
      { id: 'builder', name: 'Team Builder', url: 'https://mobalytics.gg/tft/team-builder', desc: 'Comp planner' },
    ],
  },
  {
    id: 'lolchess',
    name: 'LoLCHESS',
    badge: 'Builder & Scout',
    category: 'Tools',
    defaultUrl: 'https://lolchess.gg/builder',
    description: 'Fast team builder, synergy validator, and lobby scouting.',
    exactFeature: 'Quick board mockup and lobby scouting.',
    iconName: 'Grid',
    routes: [
      { id: 'builder', name: 'Team Builder Grid', url: 'https://lolchess.gg/builder', desc: 'Instant board synergy builder' },
      { id: 'meta', name: 'Meta Trends', url: 'https://lolchess.gg/meta', desc: 'Visual comp snapshots' },
    ],
  },
  {
    id: 'datatft',
    name: 'DataTFT',
    badge: 'Roll Odds Math',
    category: 'Calculators',
    defaultUrl: 'https://datatft.com',
    description: 'Probability calculator to check your odds of hitting 2-star/3-star units with your gold.',
    exactFeature: 'Exact rolling math and champion pool odds.',
    iconName: 'Calculator',
    routes: [
      { id: 'simulator', name: 'Rolldown Calculator', url: 'https://datatft.com', desc: 'Hit probability calculator' },
    ],
  },
];

export interface LayoutPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  panels: {
    siteId: string;
    routeId?: string;
    customTitle?: string;
  }[];
}

export const LAYOUT_PRESETS: LayoutPreset[] = [
  {
    id: 'in-game-match',
    name: 'In-Game Tri-View (Recommended)',
    description: 'TFTFlow (Decisions & Emblems) + MetaTFT (Top Comps) + Tactics.tools (Augments & Contested)',
    icon: 'LayoutGrid',
    panels: [
      { siteId: 'tftflow', routeId: 'main', customTitle: 'TFT Flow • Decisions & Emblems' },
      { siteId: 'metatft', routeId: 'comps', customTitle: 'MetaTFT • Top Win-Rate Comps' },
      { siteId: 'tacticstools', routeId: 'augments', customTitle: 'Tactics.tools • Augment Deltas & Contested' },
    ],
  },
  {
    id: 'quad-split',
    name: 'Quad Screen (4 Tools)',
    description: 'TFTFlow + MetaTFT + Tactics.tools + BunnyMuffins Leveling',
    icon: 'Grid',
    panels: [
      { siteId: 'tftflow', routeId: 'main', customTitle: 'TFT Flow' },
      { siteId: 'metatft', routeId: 'comps', customTitle: 'MetaTFT Comps' },
      { siteId: 'tacticstools', routeId: 'comps', customTitle: 'Tactics.tools Playrate' },
      { siteId: 'bunnymuffins', routeId: 'leveling', customTitle: 'BunnyMuffins Leveling' },
    ],
  },
  {
    id: 'dual-split',
    name: 'Dual Focus (50/50 Split)',
    description: 'TFTFlow Decision Engine + MetaTFT Live Comps',
    icon: 'Columns',
    panels: [
      { siteId: 'tftflow', routeId: 'main', customTitle: 'TFT Flow' },
      { siteId: 'metatft', routeId: 'comps', customTitle: 'MetaTFT Comps' },
    ],
  },
  {
    id: 'study-guides',
    name: 'Guides & Strategy',
    description: 'BunnyMuffins Leveling Curve + TFT Academy Pro Comps + Mobalytics Walkthroughs',
    icon: 'BookOpen',
    panels: [
      { siteId: 'bunnymuffins', routeId: 'leveling', customTitle: 'BunnyMuffins Leveling' },
      { siteId: 'tftacademy', routeId: 'tierlist', customTitle: 'TFT Academy (Dishsoap & Frodan)' },
      { siteId: 'mobalytics', routeId: 'comps', customTitle: 'Mobalytics Stage Walkthroughs' },
    ],
  },
];
