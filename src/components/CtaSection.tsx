import React from 'react';
import { ArrowRight } from 'lucide-react';
import { RevealSection } from './RevealSection';

interface CtaSectionProps {
  onStartCreating: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartCreating }) => {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0B14] transition-colors">
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dramatic Periwinkle & Electric-Violet Final CTA Stage */}
        <div className="relative rounded-[32px] bg-[#5515E8] p-10 sm:p-16 md:p-24 text-white overflow-hidden shadow-[0_28px_70px_-15px_rgba(85,21,232,0.45)] border border-[#7886F8]/40 text-center">
          
          {/* Original Dimensional Artwork Layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 540"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Periwinkle & Deep Violet Concentric Horizon */}
            <circle cx="600" cy="560" r="440" fill="#35108F" fillOpacity="0.65" />
            <circle cx="600" cy="560" r="310" fill="#7886F8" fillOpacity="0.22" />
            <circle
              cx="600"
              cy="560"
              r="380"
              stroke="#F0EDFF"
              strokeOpacity="0.28"
              strokeWidth="1.5"
              strokeDasharray="8 10"
            />
            {/* Left Sculptural Ribbon & Spark */}
            <path
              d="M -40 420 C 140 310, 220 460, 360 360"
              stroke="#FF4FA3"
              strokeWidth="22"
              strokeLinecap="round"
            />
            <rect
              x="96"
              y="88"
              width="52"
              height="52"
              rx="14"
              transform="rotate(-15 96 88)"
              fill="#F8E84C"
            />
            {/* Right Sculptural Tangerine Prism & Star */}
            <rect
              x="1040"
              y="340"
              width="64"
              height="64"
              rx="18"
              transform="rotate(18 1040 340)"
              fill="#FF7A30"
            />
            <path
              d="M1045 84 L1055 112 L1083 122 L1055 132 L1045 160 L1035 132 L1007 122 L1035 112 Z"
              fill="#F8E84C"
            />
          </svg>

          {/* Foreground Content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="text-xs font-bold tracking-[0.16em] text-[#F8E84C] uppercase">
              YOUR IDEAS. ALREADY IN MOTION.
            </div>

            <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-extrabold tracking-[-0.035em] text-white leading-[1.04] text-balance">
              Give your next idea a head start.
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-[#F0EDFF]/90 max-w-xl mx-auto font-normal leading-relaxed text-balance">
              Spend less time preparing to create. Get back to creating.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onStartCreating}
                className="w-full sm:w-auto min-h-[52px] px-9 py-4 text-base font-bold text-[#19171F] bg-[#F8E84C] hover:bg-white active:translate-y-px rounded-xl shadow-xl transition-all flex items-center justify-center gap-2.5 group"
              >
                <span>Start creating</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="pt-2 text-xs text-[#F0EDFF]/75 flex flex-wrap items-center justify-center gap-2">
              <span>Powered by open-weight AI</span>
              <span aria-hidden="true">·</span>
              <span>Local browser storage</span>
              <span aria-hidden="true">·</span>
              <span>CSV, JSON & TXT export</span>
            </div>
          </div>

        </div>

      </RevealSection>
    </section>
  );
};
