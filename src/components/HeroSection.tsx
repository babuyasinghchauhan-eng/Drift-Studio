import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { HeroArtwork } from './HeroArtwork';

interface HeroSectionProps {
  onStartPlan: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartPlan, onExplore }) => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-28 bg-white dark:bg-[#0D0B14] transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Short product-category eyebrow (clean unboxed text) */}
        <div className="text-center text-xs font-bold tracking-[0.16em] text-[#5515E8] dark:text-[#7886F8] uppercase mb-5">
          YOUR OPEN-AI CONTENT STUDIO
        </div>

        {/* Oversized Centered Editorial Headline */}
        <h1 className="font-display text-center font-extrabold tracking-[-0.035em] text-[#19171F] dark:text-white leading-[1.02] text-[clamp(2.65rem,7vw,5.75rem)] max-w-4xl mx-auto text-balance">
          Less posting.
          <br />
          <span className="text-[#5515E8] dark:text-[#7886F8]">More creating.</span>
        </h1>

        {/* Concise Supporting Statement */}
        <p className="mt-6 text-center text-base sm:text-lg md:text-xl text-[#777481] dark:text-[#9E9AA8] max-w-2xl mx-auto font-normal leading-relaxed text-balance">
          One idea in. A week of content out. Let open AI handle the repetitive work while you focus on what matters.
        </p>

        {/* Primary and Secondary CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          <button
            onClick={onStartPlan}
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 text-sm sm:text-base font-bold text-white bg-[#5515E8] hover:bg-[#35108F] active:translate-y-px rounded-xl shadow-[0_12px_28px_-6px_rgba(85,21,232,0.45)] transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Create my first plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExplore}
            className="w-full sm:w-auto min-h-[48px] px-7 py-3.5 text-sm sm:text-base font-bold text-[#19171F] dark:text-white bg-[#F7F6FA] dark:bg-[#151221] hover:bg-[#F0EDFF] dark:hover:bg-white/10 active:translate-y-px rounded-xl border border-[#19171F]/10 dark:border-white/10 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current text-[#5515E8] dark:text-[#7886F8]" />
            <span>See how it works</span>
          </button>
        </div>

        {/* Small Supporting Indicator (Unboxed text with typographic separators) */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-xs font-medium text-[#777481] dark:text-[#9E9AA8]">
          <span className="font-semibold text-[#19171F] dark:text-white">Powered by open-weight AI</span>
          <span aria-hidden="true">·</span>
          <span>Your ideas. Already in motion.</span>
          <span aria-hidden="true">·</span>
          <span>Local planning & instant export</span>
        </div>

        {/* Spectacular Hero Artwork */}
        <HeroArtwork onOpenStudio={onStartPlan} />

      </div>
    </section>
  );
};
