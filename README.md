# 🌟 Wiz Personalize TFT Guide (Modern League Client Hub)

A centralized, all-in-one Teamfight Tactics (TFT) Command Center and Pop-Up Viewer inspired by the **Modern League of Legends Client UI** (Hextech glassmorphism, gold borders, synthesized client sound effects, and smart in-app modal viewers).

---

## 🚀 Key Features

1. **Top Navigation & League Client Aesthetic**:
   - Built with deep navy backgrounds, metallic gold bevels, and Web Audio API synthesized League sound effects (toggleable audio).
2. **Stage 2 & 3 Early Game Winstreak Matrix**:
   - Interactive board evaluator: Calculates power score (0-100), winstreak vs. lose-streak advice, frontline-backline pairings, and instant early item slams.
3. **Meta & Contested Lobby Radar**:
   - Real-time S-Tier & A-Tier comps with playrate meters, average placement, and active "Contested Risk" warnings to avoid contested lobbies.
4. **Emblem & Artifact Direct Comp Solver (TFTFlow-style)**:
   - Select any Artifact (e.g. *Sniper's Focus, Zhonya's, Fishbones*) or Emblem and get the exact 8-unit direct comp, best champion holders with delta ratings, and transition tips.
5. **BunnyMuffins Text Guides & Cheat Sheets**:
   - Standard Fast 8 leveling curve (2-1 Lvl 4, 2-5 Lvl 5, 3-2 Lvl 6, 4-2 Lvl 8), 1/2/3-cost slow-roll milestones, and augment delta tier lists.
6. **Smart In-App Popup Viewer & Shortcuts Hub**:
   - 1-click modal popups and speed-dial launchers for:
     - **TFTFlow** (`https://tftflow.com`)
     - **MetaTFT** (`https://www.metatft.com`)
     - **Tactics.tools** (`https://tactics.tools`)
     - **BunnyMuffins** (`https://bunnymuffins.lol`)
     - **TFT Academy** (`https://tftacademy.com`)
     - **Mobalytics** (`https://mobalytics.gg/tft`)
     - **LoLCHESS** (`https://lolchess.gg`)
     - **DataTFT** (`https://datatft.com`)

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## 🌐 Deploy to Vercel

### Option A: Via GitHub (Recommended)
1. Push this project folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of Wiz Personalize TFT Guide"
   git remote add origin https://github.com/your-username/wiz-personalize-tft-guide.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository and click **Deploy**. Vercel will automatically detect Next.js and build it.

### Option B: Via Vercel CLI
```bash
# In the project directory:
npx vercel
```
