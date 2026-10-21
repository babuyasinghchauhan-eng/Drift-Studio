# Drift Studio — Open-AI Social Content Workspace

> **"Less posting. More creating."**  
> One idea in. A week of cohesive, platform-tailored content out. Let open AI handle the busywork so you can focus on making what matters.

[![Built with React 19](https://img.shields.io/badge/React-19.0.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Open-Weight AI](https://img.shields.io/badge/Open--AI-SmolLM2--135M-7886F8)](https://huggingface.co/HuggingFaceTB/SmolLM2-135M-Instruct)

---

## Overview

**Drift Studio** is a modern social content planning and execution workspace. Built around open-weight artificial intelligence, Drift Studio rejects the generic, bloated "AI wrapper" model in favor of an editorial, human-first workflow that treats social copy as a craft.

From a single raw idea, brief, or product update, Drift Studio instantly generates multi-angle drafts tailored to specific platform cultures (X/Twitter, LinkedIn, Instagram, Threads, Reddit, YouTube Shorts), categorizes them into an interactive visual board, and schedules them across an editorial calendar.

---

## Key Features

### 1. High-Fidelity Editorial Landing Experience
* **Editorial Typography & Hierarchy**: Designed with *Bricolage Grotesque* display headlines and *Plus Jakarta Sans* body typography with generous whitespace and intentional asymmetry.
* **Sculptural Violet Visual Moments**: Original vector art, playful dimensional characters, and layered geometric forms that give the brand a distinct, memorable aesthetic.
* **Interactive Live Demonstrations**:
  * **Product in Action**: Interactive angle switcher demonstrating how one core premise shifts across six social platforms.
  * **Campaign Pipeline Breakdown**: Live before-and-after comparison of messy drafts vs. polished, platform-native posts.
  * **Interactive Tools Showcase**: Direct preview into tone selection, campaign hooks, and live saved draft counters.
* **Interactive FAQ**: Keyboard-accessible, animated accordion answering privacy, licensing, model architectures, and export questions.

### 2. Full-Featured Content Studio Workspace
* **Command Dashboard**: Real-time metrics tracking total campaigns, active drafts, ready-to-publish queue, and platform distribution.
* **Smart Campaign Creator**:
  * Configurable marketing objectives (*Awareness, Engagement, Community, Product Launch, Educational, Lead Generation*).
  * 6 distinct editorial tones (*Authentic, Punchy, Educational, Playful, Storytelling, Contrarian*).
  * Multi-platform target selector with per-network character limits, hashtag strategies, and customized calls to action.
* **Visual Kanban Content Board**:
  * 4 distinct pipeline stages: `Idea` &rarr; `Draft` &rarr; `In Review` &rarr; `Ready to Publish`.
  * Drag-and-drop style stage advancement, instant draft cloning, and live status updates.
* **Interactive Editorial Calendar**:
  * Monthly and weekly calendar views for scheduling content drops.
  * One-click date assignment, slot previews, and visual platform badges.
* **Draft Inspector & Modal Editor**:
  * Full in-place editing of hooks, body content, hashtags, and CTAs.
  * Live character counters with platform-specific limit indicators.
  * One-click clipboard copying and direct status toggling.
* **Genuine Data Portability & Exports**:
  * Export campaigns and drafts to **JSON**, **CSV** spreadsheet, or formatted **TXT** digest.
  * Instant clipboard copy with zero lock-in.

### 3. Open-Weight AI Architecture
* **SmolLM2-135M-Instruct ONNX Architecture**: Powered by lightweight, open-weight models designed for fast text generation.
* **WebGPU Hardware Acceleration**: Automatically detects local WebGPU adapters to run inference locally in the browser with fallback to WebAssembly and high-speed demo generation.
* **Engine Status Modal**: Full transparency into runtime status, device capabilities, model weights cache, memory footprint, and privacy guarantees.
* **Privacy-First**: No personal drafts, confidential product notes, or campaign ideas are sent to third-party surveillance queues.

### 4. Seamless Dark / Light Mode
* **Tailwind CSS v4 `@custom-variant`**: Uses `@custom-variant dark (&:where(.dark, .dark *, [data-theme="dark"], [data-theme="dark"] *));` for class-based theme toggling.
* **Zero Theme Flashing (FOUC)**: Pre-hydration inline script in `<head>` immediately matches stored user preferences or OS settings.
* **Synchronized Everywhere**: Available from the top navigation bar, the mobile drawer, and the studio workspace header.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) with `@tailwindcss/vite` |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with CSS variables and custom dark variant |
| **Motion & Animation** | [Motion](https://motion.dev/) (`motion/react`) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Confetti & Delight** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **AI / ML Integration** | [@google/genai](https://www.npmjs.com/package/@google/genai) & [@huggingface/transformers](https://huggingface.co/docs/transformers.js) |
| **State & Persistence** | LocalStorage persistence with resilient initial schema seeding |

---

## Project Structure

```
├── index.html                   # HTML entry point with anti-FOUC theme detector & typography
├── metadata.json                # AI Studio application metadata and capabilities
├── package.json                 # Project dependencies and npm scripts
├── tsconfig.json                # TypeScript compiler configuration (ES2022 / React JSX)
├── vite.config.ts               # Vite configuration with Tailwind CSS v4 plugin
├── public/                      # Static assets & brand vectors
└── src/
    ├── main.tsx                 # React application DOM entry point
    ├── App.tsx                  # Root controller (Landing vs. Studio router & global state)
    ├── index.css                # Global styles, Tailwind v4 imports, design tokens, animations
    ├── types.ts                 # Core TypeScript interfaces (Campaign, Draft, Platform, Tone)
    ├── constants.ts             # Platform configs, default seeds, and editorial copy
    ├── components/              # Landing page visual scenes (A to J)
    │   ├── Navbar.tsx           # Sticky navigation with theme toggle & mobile drawer
    │   ├── HeroSection.tsx      # Scene A: Editorial headline, CTA, and real workspace glimpse
    │   ├── HeroArtwork.tsx      # Custom vector sculptural artwork and dimensional badges
    │   ├── MomentumSection.tsx  # Scene B: Electric-violet visual moment
    │   ├── ProductInActionSection.tsx # Scene C: Multi-angle post transformer
    │   ├── IntelligentToolsSection.tsx# Scene D: Content tools & live draft counts
    │   ├── IntegrationsExportSection.tsx # Scene E: TXT, CSV, JSON data ownership
    │   ├── WorkflowSection.tsx  # Scene F: Three-step creative workflow
    │   ├── OpenAiSection.tsx    # Scene G: Open-weight AI explainer & runtime badge
    │   ├── InsideCampaignSection.tsx # Scene H: Before & after showcase
    │   ├── FaqSection.tsx       # Scene I: Accessible accordion FAQ
    │   ├── CtaSection.tsx       # Scene J: Electric-violet closing call to action
    │   ├── Footer.tsx           # Site footer & project links
    │   └── RevealSection.tsx    # Scroll reveal container with prefers-reduced-motion check
    ├── services/                # Business logic and persistence
    │   ├── aiEngine.ts          # Open-AI generator, WebGPU adapter checker, & pipeline runner
    │   └── storage.ts           # LocalStorage database, export formats (JSON, CSV, TXT)
    └── studio/                  # Interactive studio application views
        ├── StudioLayout.tsx     # Studio shell, navigation tabs, and system status triggers
        ├── DashboardView.tsx    # Campaign metrics, health overview, and quick launchpad
        ├── CampaignCreatorView.tsx # Multi-step campaign & prompt generator
        ├── ContentBoardView.tsx # 4-column visual Kanban content board
        ├── CalendarView.tsx     # Monthly / weekly editorial schedule grid
        ├── SavedDraftsView.tsx  # Filterable draft archive with platform preview cards
        ├── DraftModal.tsx       # Comprehensive in-place draft editor & character counter
        └── EngineStatusModal.tsx# Open-AI runtime inspector & WebGPU diagnostics
```

---

## Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   cd drift-studio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (optional):
   ```bash
   cp .env.example .env
   ```
   *Note: Drift Studio features built-in client-side open-AI demo modes and WebGPU pipelines, so it runs completely out of the box without requiring external API keys.*

4. Start the development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

5. Build for production:
   ```bash
   npm run build
   ```

6. Lint & type check:
   ```bash
   npm run lint
   ```

---

## Design System & Anti-Slop Principles

Drift Studio was crafted with strict design principles:
* **No Pill Metadata**: Zero arbitrary pill capsule tags for non-interactive metadata. Tags are semantic, high-contrast, and rectangular with subtle rounded corners (`rounded-lg` or `rounded-xl`).
* **Deliberate Typography**: No generic sans-serif monotony. Enormous display headlines set in *Bricolage Grotesque* paired with clean *Plus Jakarta Sans* and monospace accents for numeric statistics.
* **Original Vector Artwork**: No generic gradient blobs or stock photo placeholders. Original SVG dimensional illustrations with floating physics and subtle depth.
* **Respect for User Motion**: All animations strictly obey `@media (prefers-reduced-motion: reduce)` to guarantee an inclusive and accessible experience.
* **Full Data Ownership**: You are never locked in. One click exports all campaigns, drafts, and schedules to standard JSON or CSV.

---

## License

This project is licensed under the Apache-2.0 License. See the LICENSE file for details.
