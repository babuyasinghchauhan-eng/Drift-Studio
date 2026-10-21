import React from 'react';
import { Zap, Sparkles, MoveRight } from 'lucide-react';

interface MomentumSectionProps {
  onOpenStudio: () => void;
}

export const MomentumSection: React.FC<MomentumSectionProps> = ({ onOpenStudio }) => {
  return (
    <section className="relative py-16 sm:py-24 bg-white dark:bg-[#0C0B12] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-Width Immersive Violet Sculptural Container */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#2E0B7A] via-[#4812B8] to-[#1F0757] text-white p-8 sm:p-14 md:p-20 overflow-hidden shadow-2xl border border-[#7886F8]/20">
          
          {/* Dimensional SVG Background Flow Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
            viewBox="0 0 1200 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M-100,300 C200,100 400,500 700,300 C1000,100 1100,450 1300,200"
              stroke="url(#momentumGradient)"
              strokeWidth="4"
              strokeDasharray="12 14"
            />
            <path
              d="M-50,450 C300,600 500,200 850,450 C1100,600 1250,250 1350,350"
              stroke="rgba(255, 79, 163, 0.4)"
              strokeWidth="2"
            />
            <circle cx="380" cy="220" r="140" stroke="rgba(248, 232, 76, 0.2)" strokeWidth="1.5" />
            <circle cx="920" cy="380" r="180" stroke="rgba(120, 134, 248, 0.25)" strokeWidth="1.5" />
            <defs>
              <linearGradient id="momentumGradient" x1="0" y1="300" x2="1200" y2="300" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F8E84C" />
                <stop offset="0.5" stopColor="#FF4FA3" />
                <stop offset="1" stopColor="#7886F8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Grid Layout: Left Column Narrative + Right Column Sculptural "Momentum Agent" */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#F8E84C] uppercase">
                <Zap className="w-3.5 h-3.5" />
                <span>Creative Velocity</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-white">
                Your ideas don’t need another meeting.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8E84C] via-[#FF7A30] to-[#FF4FA3]">
                  They need a little momentum.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-white/80 max-w-xl font-normal leading-relaxed">
                Most creative projects stall between the rough idea in your notes and the actual publishing calendar. Drift Studio acts as an open-weight conveyor belt — transforming a raw 3-sentence spark into 5 platform-authentic drafts in seconds.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenStudio}
                  className="px-6 py-3 text-sm font-bold text-[#19171F] bg-[#F8E84C] hover:bg-white active:scale-95 rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Put an idea into motion</span>
                  <MoveRight className="w-4 h-4" />
                </button>
                <div className="text-xs text-white/60 font-medium">
                  Average initial draft generation: ~950ms
                </div>
              </div>
            </div>

            {/* Right Column: Sculptural "Momentum" Graphic Artwork */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Outer stage backdrop */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl bg-black/25 backdrop-blur-md border border-white/15 p-6 flex flex-col justify-between shadow-2xl">
                
                {/* Top header status */}
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-[#F8E84C]" />
                    DRIFT ENGINE
                  </span>
                  <span className="font-mono text-[#F8E84C] text-[11px]">ACTIVE</span>
                </div>

                {/* Central dynamic sculptural flow */}
                <div className="relative my-auto flex items-center justify-center">
                  {/* Glowing core sphere */}
                  <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#FF7A30] via-[#FF4FA3] to-[#5515E8] shadow-[0_0_50px_rgba(255,79,163,0.6)] flex items-center justify-center animate-pulse">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white shadow-md" />
                    </div>
                  </div>

                  {/* Radiating orbital satellites */}
                  <div className="absolute -top-3 -right-2 px-3 py-1 rounded-lg bg-[#19171F]/90 border border-white/20 text-[11px] font-mono text-[#7886F8] shadow-md">
                    X / LinkedIn / IG
                  </div>
                  <div className="absolute -bottom-2 -left-2 px-3 py-1 rounded-lg bg-[#19171F]/90 border border-white/20 text-[11px] font-mono text-[#F8E84C] shadow-md">
                    Format Adapted
                  </div>
                </div>

                {/* Bottom step progress */}
                <div className="space-y-1.5 pt-3 border-t border-white/10 text-xs">
                  <div className="flex justify-between text-white/80 text-[11px]">
                    <span>Idea Transformation</span>
                    <span className="font-mono text-[#F8E84C]">100% Ready</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-[#F8E84C] to-[#FF4FA3]" />
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
