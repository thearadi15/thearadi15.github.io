# z3r0ru135.me — Digital Universe

A futuristic fullstack personal website with fully animated 3D UI, built with Next.js 14, React, Three.js, Framer Motion, and TailwindCSS.

## 🎨 Design System

- **Font Display**: [Syncopate](https://fonts.google.com/specimen/Syncopate) — ultra-wide geometric, rarely used
- **Font Body**: [Syne](https://fonts.google.com/specimen/Syne) — distinctive grotesque with personality
- **Font Mono**: [DM Mono](https://fonts.google.com/specimen/DM+Mono) — characterful monospace
- **Font Numbers**: [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) — bold display numerals
- **Primary Color**: `#C8FF00` Acid Lime — unique, vivid, memorable
- **Secondary**: `#FF2D78` Plasma Pink · `#00E5FF` Ion Cyan · `#7B61FF` Ghost Violet · `#FF6B1A` Ember Orange

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## 🗂 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── aria/route.ts       # AI Assistant API
│   │   ├── projects/route.ts   # Projects data API
│   │   └── blog/route.ts       # Blog posts API
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── 3d/
│   │   └── Scene3D.tsx         # Three.js R3F scene
│   ├── ai/
│   │   └── AIAssistant.tsx     # Floating ARIA chatbot
│   ├── sections/
│   │   ├── HeroSection.tsx     # Landing with portals
│   │   ├── ProjectsSection.tsx # Project cards
│   │   ├── CyberLabSection.tsx # Security research hub
│   │   ├── PlaygroundSection.tsx # Interactive experiments
│   │   ├── BlogSection.tsx     # Article cards
│   │   └── AboutSection.tsx    # Timeline & skills
│   ├── terminal/
│   │   └── Terminal.tsx        # Hacker terminal (Ctrl+`)
│   └── ui/
│       ├── Cursor.tsx          # Custom cursor FX
│       ├── LoadingScreen.tsx   # Boot sequence
│       ├── Navbar.tsx          # Navigation
│       └── SecretOverlay.tsx   # Easter egg
└── styles/
    └── globals.css             # Full design system
```

## 🎮 Features

| Feature | Details |
|---------|---------|
| **3D Scene** | R3F + Three.js particles, wireframe icosahedrons, floating tori, star field — all mouse-reactive |
| **Terminal** | `Ctrl+`` to open · commands: `help`, `whoami`, `projects`, `cyberlab`, `skills`, `contact`, `blog`, `matrix`, `secret`, `clear` · history with ↑↓ · tab autocomplete |
| **AI Assistant** | ARIA chatbot with keyword-based replies + `/api/aria` backend route |
| **Playground** | Matrix rain (5-color cycle), Password Forge (crypto.getRandomValues), ASCII Art generator, SHA Hash inspector |
| **Easter Egg** | Click `[ CLASSIFIED ]` in footer · or type `secret` in terminal |
| **Custom Cursor** | Lagging ring + dot cursor with hover states |
| **Animations** | Framer Motion page load, scroll-triggered sections, hover lifts, glitch text |

## 🔌 API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/aria` | POST `{ message }` | AI assistant response |
| `/api/aria` | GET | Status check |
| `/api/projects` | GET | All 6 projects |
| `/api/blog` | GET | All 4 blog posts |

## 🌐 Deploy

```bash
# Vercel (recommended)
npx vercel

# Or Docker
docker build -t z3r0ru135 .
docker run -p 3000:3000 z3r0ru135
```

## 📝 License

MIT — build on it, break it, make it yours.
