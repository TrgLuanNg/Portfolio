# Whimsical Portfolio (Josh W. Comeau Style • Pure CSR)

A tactile, playful, and physics-driven personal portfolio inspired by [joshwcomeau.com](https://www.joshwcomeau.com/), built exclusively with **Client-Side Rendering (CSR)** using Vite, React 19, TypeScript, Tailwind CSS, and Framer Motion.

---

## 🎨 Custom Triad Theme
Configured around your exact color triad:
- `--color-1: #2A7820;` (Forest Emerald)
- `--color-2: #422078;` (Deep Mystic Violet)
- `--color-3: #782056;` (Rich Berry Magenta)

These tokens power the dynamic dark/light mode, animated gradient typography, chromatic aurora glows, twinkling sparkles, and celebratory particle bursts.

---

## 🔗 Modifying GitHub & External Links
All your social handles, GitHub repositories, project metadata, and biographical info are centralized in a single configuration file:

👉 [`src/config/siteConfig.ts`](file:///C:/Stuffs/Portfolio/src/config/siteConfig.ts)

Whenever you are ready to update your links:
1. Open [`src/config/siteConfig.ts`](file:///C:/Stuffs/Portfolio/src/config/siteConfig.ts).
2. Edit `siteConfig.author.links`:
   ```typescript
   links: {
     github: "https://github.com/your-username",
     twitter: "https://twitter.com/your-username",
     linkedin: "https://linkedin.com/in/your-username",
     email: "your-email@example.com",
   }
   ```
3. Update project repositories under `siteConfig.projects`. All navigation, cards, footer icons, and the Command Palette will automatically reflect your changes.

---

## ✨ Features & Whimsical Highlights

1. **Zero-Dependency Web Audio Synth (`src/audio/soundEngine.ts`)**:
   - Generates tactile wooden bubble pops, mechanical clicks, pentatonic bell sparkles, and milestone fanfares mathematically using browser `AudioContext`.
   - Zero audio file downloads, zero latency, runs 100% offline.
   - Header sound toggle with persistent mute state in `localStorage`.

2. **Spring Physics Micro-Interactions (`useBoop.ts` & `<Boop />`)**:
   - Josh W. Comeau's famous bouncy spring physics on hover, focus, and gestures with reduced-motion accessibility support.

3. **3D Tilt Cards (`<TiltCard />`)**:
   - Perspective 3D rotation tracking mouse coordinates with real-time specular reflection sheen.

4. **Sparkles Text (`<Sparkles />`)**:
   - Twinkling, randomized SVG stars in your triad colors that dynamically sparkle around highlighted words and badges.

5. **Command Palette (`Cmd+K` / `Ctrl+K`)**:
   - Keyboard-first command palette powered by `cmdk` for instant searching, route jumps, theme toggling, sound muting, and Easter eggs.

6. **Interactive Laboratories (`/playgrounds`)**:
   - **Triad Aurora Mesh Generator**: Live interactive sandbox manipulating your exact `#2A7820`, `#422078`, `#782056` colors with one-click CSS export.
   - **Spring Physics Laboratory**: Real-time sliders for tension, friction, and mass with live Framer Motion code output.
   - **Synthesizer Pentatonic Keyboard**: Clickable keys generating musical frequencies.

7. **Celebratory Claps & Confetti (`<ConfettiButton />`)**:
   - Interactive milestone claps with floating indicators, fanfare audio, and canvas confetti in your triad colors.

---

## 🚀 Getting Started

### Development
```powershell
npm run dev
```
Starts the Vite dev server with instant Hot Module Replacement (HMR).

### Production Build
```powershell
npm run build
```
Typechecks and compiles optimized static assets into `dist/`.

### Preview Static Build
```powershell
npm run preview
```
Runs a local web server to preview the production build.

---

## 📦 Deployment (Pure CSR)
Because this is built 100% with Client-Side Rendering, you can deploy the `dist/` directory to any static hosting provider:
- **GitHub Pages**
- **Vercel**
- **Netlify**
- **Cloudflare Pages**
- **AWS S3 / CloudFront**
