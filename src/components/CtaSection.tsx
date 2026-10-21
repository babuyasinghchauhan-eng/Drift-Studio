import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CtaSectionProps {
  onStartCreating: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartCreating }) => {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#0C0B12] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width dramatic periwinkle/violet banner */}
        <div className="relative rounded-3xl bg-gradient-to-tr from-[#35108F] via-[#5515E8] to-[#7886F8] p-10 sm:p-16 md:p-20 text-white overflow-hidden shadow-2xl border border-white/20 text-center">
          
          {/* Dimensional SVG Background Artwork */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
            viewBox="0 0 1000 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="500" cy="500" r="380" stroke="white" strokeWidth="1" strokeDasharray="6 8" />
            <circle cx="500" cy="500" r="280" stroke="rgba(248, 232, 76, 0.4)" strokeWidth="1.5" />
            <circle cx="500" cy="500" r="180" stroke="rgba(255, 79, 163, 0.4)" strokeWidth="2" />
            {/* Diagonal streak */}
            <path d="M 0,100 L 1000,400" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
          </svg>

          {/* Floating tactile accents */}
          <div className="absolute top-8 left-12 w-6 h-6 rounded-md bg-[#F8E84C] shadow-lg transform rotate-45 animate-float pointer-events-none" />
          <div className="absolute bottom-10 right-16 w-8 h-8 rounded-full bg-[#FF4FA3] shadow-lg animate-float-delayed pointer-events-none" />
          <div className="absolute top-12 right-20 w-5 h-5 rounded-lg bg-[#FF7A30] transform -rotate-12 animate-float-slow pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#F8E84C] uppercase bg-black/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE OPEN-AI SOCIAL WORKSPACE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Give your next idea
              <br />
              a head start.
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-xl mx-auto font-normal leading-relaxed text-balance">
              Spend less time preparing to create. Get back to creating.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onStartCreating}
                className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#19171F] bg-white hover:bg-[#F8E84C] active:scale-95 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>Start creating</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="text-xs text-white/70">
              Free & open source · Stored in local browser · Instant CSV/JSON export
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
