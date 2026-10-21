import React from 'react';
import { MoveRight } from 'lucide-react';
import { RevealSection } from './RevealSection';

interface MomentumSectionProps {
  onOpenStudio: () => void;
}

export const MomentumSection: React.FC<MomentumSectionProps> = ({ onOpenStudio }) => {
  return (
    <section className="relative py-20 sm:py-28 bg-[#35108F] text-white overflow-hidden">
      {/* Full-Bleed Architectural Geometric Backdrop */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 720"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Oversized Electric-Violet Archway */}
        <path
          d="M 760 720 L 760 260 C 760 110, 1080 110, 1080 260 L 1080 720 Z"
          fill="#5515E8"
        />
        <path
          d="M 1020 720 L 1020 340 C 1020 220, 1300 220, 1300 340 L 1300 720 Z"
          fill="#4312B8"
        />
        {/* Sweeping Periwinkle Conveyor Trajectory */}
        <path
          d="M -80 560 C 260 560, 440 240, 820 240 C 1120 240, 1240 460, 1520 460"
          stroke="#7886F8"
          strokeOpacity="0.4"
          strokeWidth="3"
          strokeDasharray="10 12"
        />
      </svg>

      <RevealSection className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column (6 cols): Editorial Headline & Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-bold tracking-[0.16em] text-[#F8E84C] uppercase">
              CREATIVE MOMENTUM
            </div>

            <h2 className="font-display text-[clamp(2.2rem,4.8vw,4rem)] font-extrabold tracking-[-0.03em] leading-[1.06] text-white text-balance">
              Your ideas don’t need another meeting.
              <br />
              <span className="text-[#F8E84C]">They need a little momentum.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#F0EDFF]/85 max-w-xl font-normal leading-relaxed">
              Most good ideas die in a backlog because adapting one thought into five different platform formats feels like busywork. Drift Studio turns a single rough note into a structured week of drafts so your work stays in motion.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-5">
              <button
                onClick={onOpenStudio}
                className="min-h-[48px] px-7 py-3.5 text-sm sm:text-base font-bold text-[#19171F] bg-[#F8E84C] hover:bg-white active:translate-y-px rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <span>Put an idea in motion</span>
                <MoveRight className="w-4 h-4" />
              </button>
              <span className="text-xs font-medium text-[#F0EDFF]/75">
                Think of the idea once · Drift handles the formatting
              </span>
            </div>
          </div>

          {/* Right Column (6 cols): Original Sculptural Character & Kinetic System Illustration */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[28px] bg-[#5515E8] border border-white/20 p-6 sm:p-8 shadow-2xl overflow-hidden">
              
              {/* Custom SVG Sculptural Figure: "The Drift Kinetic System" */}
              <svg
                className="w-full h-auto max-h-[340px]"
                viewBox="0 0 560 340"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Abstract geometric sculpture transforming a raw spark into organized platform cards"
              >
                {/* Background Grid Lines */}
                <line x1="0" y1="85" x2="560" y2="85" stroke="#FFFFFF" strokeOpacity="0.1" />
                <line x1="0" y1="170" x2="560" y2="170" stroke="#FFFFFF" strokeOpacity="0.1" />
                <line x1="0" y1="255" x2="560" y2="255" stroke="#FFFFFF" strokeOpacity="0.1" />
                <line x1="140" y1="0" x2="140" y2="340" stroke="#FFFFFF" strokeOpacity="0.1" />
                <line x1="280" y1="0" x2="280" y2="340" stroke="#FFFFFF" strokeOpacity="0.1" />
                <line x1="420" y1="0" x2="420" y2="340" stroke="#FFFFFF" strokeOpacity="0.1" />

                {/* Stage 1 (Left): Raw Unstructured Spark */}
                <g className="animate-float">
                  <rect x="28" y="118" width="96" height="96" rx="22" fill="#FF7A30" />
                  <circle cx="76" cy="166" r="24" fill="#F8E84C" />
                  <text x="45" y="238" fill="#F0EDFF" fontSize="11" fontWeight="700" fontFamily="Plus Jakarta Sans">
                    RAW SPARK
                  </text>
                </g>

                {/* Connecting Motion Arc 1 */}
                <path
                  d="M 128 166 C 165 130, 190 130, 218 166"
                  stroke="#F8E84C"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />

                {/* Stage 2 (Center): Playful Abstract Sculptural Character ("The Prism Weaver") */}
                <g>
                  {/* Sculptural Pedestal */}
                  <path d="M 225 270 L 335 270 L 315 210 L 245 210 Z" fill="#35108F" />
                  {/* Torso / Dimensional Prism */}
                  <rect x="232" y="102" width="96" height="112" rx="48" fill="#FF4FA3" />
                  {/* Expressive Cyclops / Studio Lens Visor */}
                  <rect x="250" y="128" width="60" height="28" rx="14" fill="#19171F" />
                  <circle cx="268" cy="142" r="6" fill="#F8E84C" />
                  <circle cx="292" cy="142" r="6" fill="#F8E84C" />
                  {/* Crown / Antenna Spark */}
                  <line x1="280" y1="102" x2="280" y2="74" stroke="#F8E84C" strokeWidth="4" />
                  <circle cx="280" cy="66" r="10" fill="#F8E84C" />
                  {/* Kinetic Balancing Arms */}
                  <circle cx="218" cy="166" r="12" fill="#7886F8" />
                  <circle cx="342" cy="166" r="12" fill="#F8E84C" />
                </g>

                {/* Connecting Motion Arcs 2 (Fanning out to 3 channels) */}
                <path d="M 354 154 C 380 110, 395 85, 420 75" stroke="#F8E84C" strokeWidth="2.5" />
                <path d="M 354 166 L 420 166" stroke="#FF4FA3" strokeWidth="2.5" />
                <path d="M 354 178 C 380 220, 395 245, 420 255" stroke="#7886F8" strokeWidth="2.5" />

                {/* Stage 3 (Right): Ordered Platform Draft Cards */}
                <g className="animate-float-delayed">
                  {/* Card A */}
                  <rect x="422" y="42" width="114" height="62" rx="12" fill="#FFFFFF" />
                  <rect x="434" y="54" width="38" height="8" rx="4" fill="#5515E8" />
                  <rect x="434" y="68" width="84" height="6" rx="3" fill="#19171F" fillOpacity="0.2" />
                  <rect x="434" y="80" width="64" height="6" rx="3" fill="#19171F" fillOpacity="0.2" />

                  {/* Card B */}
                  <rect x="422" y="135" width="114" height="62" rx="12" fill="#FFFFFF" />
                  <rect x="434" y="147" width="46" height="8" rx="4" fill="#FF4FA3" />
                  <rect x="434" y="161" width="84" height="6" rx="3" fill="#19171F" fillOpacity="0.2" />
                  <rect x="434" y="173" width="72" height="6" rx="3" fill="#19171F" fillOpacity="0.2" />

                  {/* Card C */}
                  <rect x="422" y="228" width="114" height="62" rx="12" fill="#FFFFFF" />
                  <rect x="434" y="240" width="42" height="8" rx="4" fill="#FF7A30" />
                  <rect x="434" y="254" width="84" height="6" rx="3" fill="#19171F" fillOpacity="0.2" />
                  <rect x="434" y="266" width="56" height="6" rx="3" fill="#19171F" fillOpacity="0.2" />
                </g>
              </svg>

              {/* Bottom Caption */}
              <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-[#F0EDFF]/90">
                <span>1 Brief Input → Multi-Angle Adaptation → Weekly Board</span>
                <span className="font-mono text-[#F8E84C]">SLOW & STEADY</span>
              </div>
            </div>
          </div>

        </div>
      </RevealSection>
    </section>
  );
};
