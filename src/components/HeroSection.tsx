import React from 'react';
import { ArrowRight, Play, Cpu, CheckCircle2 } from 'lucide-react';
import { HeroArtwork } from './HeroArtwork';

interface HeroSectionProps {
  onStartPlan: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartPlan, onExplore }) => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow / Category Identifier (Unboxed text with zero-pill discipline) */}
        <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-[#5515E8] uppercase mb-4">
          <Cpu className="w-3.5 h-3.5" />
          <span>YOUR OPEN-AI CONTENT STUDIO</span>
          <span aria-hidden="true">·</span>
          <span>HACKTOBERFEST 2026</span>
        </div>

        {/* Oversized Editorial Headline with responsive clamp and balance */}
        <h1 className="text-center font-black tracking-tight text-[#19171F] dark:text-white leading-[1.05] text-[clamp(2.5rem,6.5vw,5.5rem)] max-w-4xl mx-auto">
          Less posting.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5515E8] via-[#FF4FA3] to-[#FF7A30]">
            More creating.
          </span>
        </h1>

        {/* Supporting statement */}
        <p className="mt-6 text-center text-base sm:text-lg md:text-xl text-[#777481] dark:text-[#9590A3] max-w-2xl mx-auto font-normal leading-relaxed text-balance">
          One idea in. A week of content out. Let open AI handle the repetitive work of planning, adapting, and formatting while you focus on what matters.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onStartPlan}
            className="w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-[#5515E8] hover:bg-[#35108F] active:scale-95 rounded-2xl shadow-lg shadow-[#5515E8]/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Create my first plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-semibold text-[#19171F] dark:text-white bg-[#F7F6FA] dark:bg-[#1E1B28] hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 rounded-2xl border border-black/10 dark:border-white/10 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>See how it works</span>
          </button>
        </div>

        {/* Supporting indicators (clean unboxed text with bullets) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#777481] dark:text-[#9590A3]">
          <span className="flex items-center gap-1.5 text-[#19171F] dark:text-white font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#5515E8]" />
            Powered by open-weight AI
          </span>
          <span aria-hidden="true">·</span>
          <span>Zero account required</span>
          <span aria-hidden="true">·</span>
          <span>Local client-side execution</span>
          <span aria-hidden="true">·</span>
          <span>CSV & JSON instant export</span>
        </div>

        {/* Bespoke Multidimensional Artwork */}
        <HeroArtwork />

      </div>
    </section>
  );
};
