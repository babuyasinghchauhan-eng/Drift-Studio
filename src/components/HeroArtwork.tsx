import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Check, Calendar, Layers } from 'lucide-react';

interface HeroArtworkProps {
  onOpenStudio?: () => void;
}

const HERO_SAMPLES = [
  {
    id: 'x',
    platform: 'X Thread',
    schedule: 'Thu · 09:30',
    accent: '#5515E8',
    hook: 'Most database migration tools feel like moving a mountain just to add one column.',
    meta: '240 chars · Hook + 4 bullets · Ready',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn Essay',
    schedule: 'Fri · 13:00',
    accent: '#FF7A30',
    hook: 'We spent 9 months building a CLI that intentionally does less than every competitor.',
    meta: '1,180 chars · Story arc · In Review',
  },
  {
    id: 'instagram',
    platform: 'Carousel Script',
    schedule: 'Mon · 11:00',
    accent: '#FF4FA3',
    hook: 'Slide 1: Why 90% of indie creators burn out in month 3 — and the studio fix.',
    meta: '5 slides · Visual outline · Draft',
  },
];

export const HeroArtwork: React.FC<HeroArtworkProps> = ({ onOpenStudio }) => {
  const [selectedId, setSelectedId] = useState<string>('x');

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-10 sm:mt-14 select-none">
      {/* Main Electric-Violet Sculptural Stage */}
      <div className="relative w-full rounded-[28px] sm:rounded-[36px] bg-[#5515E8] text-white p-5 sm:p-8 md:p-12 shadow-[0_28px_70px_-15px_rgba(85,21,232,0.42)] overflow-hidden border border-[#7886F8]/40">
        
        {/* Bespoke Multidimensional SVG Artwork Layer (Pointer-events-none) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 680"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Deep Violet Architectural Curves */}
          <circle cx="600" cy="340" r="460" fill="#35108F" fillOpacity="0.45" />
          <circle cx="600" cy="340" r="320" fill="#4612C4" fillOpacity="0.65" />

          {/* Orbital Paths */}
          <ellipse
            cx="600"
            cy="340"
            rx="520"
            ry="230"
            transform="rotate(-8 600 340)"
            stroke="#7886F8"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeDasharray="8 10"
          />
          <ellipse
            cx="600"
            cy="340"
            rx="390"
            ry="175"
            transform="rotate(6 600 340)"
            stroke="#F0EDFF"
            strokeOpacity="0.3"
            strokeWidth="1.2"
          />

          {/* Sculptural Hot-Pink Ribbon */}
          <path
            d="M-60 520 C 180 390, 340 610, 590 430 C 830 260, 990 470, 1260 280"
            stroke="#FF4FA3"
            strokeWidth="28"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />

          {/* Sunshine Yellow Kinetic Wave */}
          <path
            d="M 80 120 C 290 240, 460 40, 740 160 C 960 250, 1080 90, 1240 170"
            stroke="#F8E84C"
            strokeWidth="10"
            strokeLinecap="round"
            strokeOpacity="0.9"
          />

          {/* Dimensional Geometric Accents */}
          {/* Top-left Tangerine Arch */}
          <rect
            x="64"
            y="58"
            width="68"
            height="68"
            rx="20"
            transform="rotate(-14 64 58)"
            fill="#FF7A30"
          />
          {/* Top-right Sunshine Starburst Spark */}
          <path
            d="M1080 70 L1092 104 L1126 116 L1092 128 L1080 162 L1068 128 L1034 116 L1068 104 Z"
            fill="#F8E84C"
          />
          {/* Bottom-right Periwinkle Disc */}
          <circle cx="1095" cy="545" r="44" fill="#7886F8" />
          <circle cx="1095" cy="545" r="20" fill="#F0EDFF" />
        </svg>

        {/* Foreground Structured Composition: Idea Core + Floating Platform Cards */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left / Center Column (5 cols on desktop): The Sculptural "Idea Core" */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#35108F]/90 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/20 shadow-xl">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider text-[#F8E84C]">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Raw Campaign Spark
                </span>
                <span>01 / INPUT</span>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-white text-[#19171F] shadow-md">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#5515E8]">
                  Founder Note · 1 Sentence
                </div>
                <p className="mt-1.5 font-display text-base sm:text-lg font-bold leading-snug text-[#19171F]">
                  “We built HyperSchema 1.0 to generate type-safe SQL migrations in 400ms without an ORM.”
                </p>
                <div className="mt-3 pt-2.5 border-t border-[#19171F]/10 flex flex-wrap items-center gap-2 text-xs text-[#777481]">
                  <span>Audience: Engineers</span>
                  <span aria-hidden="true">·</span>
                  <span>Tone: Punchy</span>
                  <span aria-hidden="true">·</span>
                  <span>3 Channels</span>
                </div>
              </div>
            </div>

            {/* Sculptural Transformation Connector */}
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/25" />
              <div className="px-3.5 py-1.5 rounded-lg bg-[#F8E84C] text-[#19171F] text-xs font-extrabold tracking-tight flex items-center gap-1.5 shadow-sm">
                <Layers className="w-3.5 h-3.5" />
                <span>Open-Weight Synthesis</span>
              </div>
              <div className="h-px flex-1 bg-white/25" />
            </div>

            <div className="flex items-center justify-between text-xs text-white/85">
              <span>SmolLM2 / WebGPU Ready</span>
              {onOpenStudio && (
                <button
                  onClick={onOpenStudio}
                  className="font-bold text-[#F8E84C] hover:underline flex items-center gap-1"
                >
                  <span>Try with your idea</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Column (7 cols on desktop): Floating Dimensional Social Post Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {HERO_SAMPLES.map((card, index) => {
              const isSelected = selectedId === card.id;
              const spanFullOnDesktop = index === 0 ? 'sm:col-span-2' : 'sm:col-span-1';

              return (
                <div
                  key={card.id}
                  onClick={() => setSelectedId(card.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedId(card.id);
                    }
                  }}
                  className={`${spanFullOnDesktop} text-left bg-white text-[#19171F] rounded-2xl p-5 sm:p-6 transition-all cursor-pointer border-2 ${
                    isSelected
                      ? 'border-[#F8E84C] shadow-[0_18px_40px_rgba(25,23,31,0.28)] -translate-y-0.5'
                      : 'border-transparent shadow-lg hover:-translate-y-0.5'
                  } ${index === 1 ? 'animate-float' : index === 2 ? 'animate-float-delayed' : ''}`}
                >
                  {/* Top metadata line (Zero-pill discipline: clean inline text) */}
                  <div className="flex items-center justify-between gap-2 text-xs text-[#777481] mb-2.5">
                    <div className="font-bold text-[#19171F] flex items-center gap-2">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-sm"
                        style={{ backgroundColor: card.accent }}
                        aria-hidden="true"
                      />
                      <span>{card.platform}</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[11px] text-[#5515E8]">
                      <Calendar className="w-3 h-3" />
                      <span>{card.schedule}</span>
                    </div>
                  </div>

                  {/* Draft Hook */}
                  <p className="font-display text-sm sm:text-base font-bold text-[#19171F] leading-snug">
                    “{card.hook}”
                  </p>

                  {/* Footer metadata */}
                  <div className="mt-4 pt-3 border-t border-[#19171F]/10 flex items-center justify-between text-xs text-[#777481]">
                    <span>{card.meta}</span>
                    <span className="font-bold text-[#5515E8] flex items-center gap-1">
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Active</span>
                        </>
                      ) : (
                        <span>Inspect</span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Workspace Status Strip inside the Hero Artwork */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/90">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-[#F8E84C]">Weekly Board Preview</span>
            <span aria-hidden="true">·</span>
            <span>Idea → Draft → Review → Ready</span>
            <span aria-hidden="true">·</span>
            <span>Export to CSV, JSON, or Plain Text</span>
          </div>
          {onOpenStudio && (
            <button
              onClick={onOpenStudio}
              className="font-bold text-white bg-white/15 hover:bg-white/25 px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Open in full workspace</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
