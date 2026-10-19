# RELEAF

**Print Smarter. Reuse More. Waste Less.**

RELEAF is a smart paper restoration and reuse concept — combining intelligent document editing, AI assistance, and paper-reuse workflows. It provides the software infrastructure for a future product that pairs with physical de-inking hardware to enable paper to be reused rather than discarded.

> ⚠️ **Prototype Notice:** Physical de-inking technology is under development. All features labelled "SIMULATION" are software demonstrations only — no actual ink removal occurs. Environmental impact figures are demo data only.

---

## Live Demo

[releaf.vercel.app](https://releaf.vercel.app) *(after deployment)*

---

## Features

| Feature | Status |
|---|---|
| 3D Paper Restoration Hero (React Three Fiber) | ✅ |
| Responsive Navigation & Footer | ✅ |
| Document Upload & Viewer (PDF / PNG / JPG) | ✅ |
| AI Document Assistant — demo mode | ✅ |
| DocumentGuard Security Scenarios | ✅ |
| De-Inking Simulation Workflow | ✅ SIMULATION |
| Paper Compatibility Selector | ✅ |
| Environmental Dashboard | ✅ Demo data |
| How It Works, Features, About pages | ✅ |
| Help & FAQ | ✅ |
| Privacy Policy & Terms | ✅ |
| WCAG 2.2 AA accessible patterns | ✅ |
| Mobile responsive (320 px – 1440 px+) | ✅ |
| Production build — all 17 routes pass | ✅ |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16, App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme inline`) |
| 3D | Three.js, React Three Fiber, Drei |
| Animation | Framer Motion |
| Icons | Lucide React |
| Validation | Zod (prepared) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install & Run

```bash
git clone https://github.com/<your-username>/releaf-smart-paper.git
cd releaf-smart-paper
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in any values you have:

```bash
cp .env.example .env.local
```

See [`.env.example`](./.env.example) for all available variables.

> **Security:** Never commit `.env.local` or any real API keys. The `.gitignore` excludes it by default.

---

## Project Structure

```
releaf/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout (fonts, metadata, viewport)
│   ├── globals.css                 # Design system — Tailwind v4 @theme tokens
│   ├── sitemap.ts                  # Next.js sitemap
│   ├── robots.ts                   # robots.txt
│   ├── about/page.tsx
│   ├── assistant/page.tsx          # AI assistant (demo mode)
│   ├── dashboard/page.tsx
│   ├── documentguard/page.tsx      # Security scenario demos
│   ├── features/page.tsx
│   ├── help/page.tsx
│   ├── how-it-works/page.tsx
│   ├── paper-compatibility/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── workspace/page.tsx          # Full document workspace
│
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx          # Responsive, accessible nav bar
│   │   └── Footer.tsx
│   ├── hero/
│   │   └── HomeContent.tsx         # Full homepage — Hero, How It Works, Features, Demo, CTA
│   ├── three/
│   │   ├── PaperScene.tsx          # 3D React Three Fiber scene
│   │   └── PaperSceneLoader.tsx    # SSR-safe dynamic loader
│   └── workspace/
│       └── WorkspaceClient.tsx     # Upload, viewer, AI panel, DocumentGuard, de-inking
│
└── public/
    └── manifest.json               # PWA manifest
```

---

## Deployment on Vercel

1. Push this repository to GitHub.
2. Import at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Next.js.
3. Add environment variables from `.env.example` in **Settings → Environment Variables**.
4. Click **Deploy**.

For a custom domain add it under **Settings → Domains**.

---

## Honest Limitations

- **No real de-inking hardware exists yet.** All de-inking steps are visual simulations.
- **AI assistant runs in demo mode** without `RELEAF_AI_KEY`. Sample responses only.
- **Documents are processed client-side.** Nothing is sent to a server in the prototype.
- **Dashboard shows zero / demo values.** Real data requires hardware integration.
- **DocumentGuard is client-side only.** Production must enforce rules server-side.

---

## Licence

MIT

---

*RELEAF — Give Every Sheet Another Life.*
