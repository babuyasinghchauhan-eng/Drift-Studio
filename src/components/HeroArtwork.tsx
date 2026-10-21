import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, Heart, MessageSquare, Repeat } from 'lucide-react';

export const HeroArtwork: React.FC = () => {
  const [activeCard, setActiveCard] = useState<'x' | 'linkedin' | 'ig'>('x');

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-8 select-none">
      {/* Background Dimensional Ambient Glow */}
      <div 
        className="absolute inset-0 -top-12 bg-gradient-to-b from-[#5515E8]/18 via-[#FF4FA3]/10 to-transparent blur-3xl pointer-events-none rounded-3xl"
        aria-hidden="true"
      />

      {/* Main Artwork Stage */}
      <div className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] bg-gradient-to-br from-[#1C0D45] via-[#2A1166] to-[#0E0624] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center">
        
        {/* Orbital Curved Paths (SVG vector layer) */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40" 
          viewBox="0 0 1000 600" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Orbital path 1 */}
          <ellipse cx="500" cy="300" rx="380" ry="180" stroke="url(#orbitalGradient1)" strokeWidth="1.5" strokeDasharray="6 8" />
          {/* Orbital path 2 */}
          <ellipse cx="500" cy="300" rx="460" ry="240" stroke="url(#orbitalGradient2)" strokeWidth="1" />
          {/* Wave line */}
          <path d="M 50,450 C 300,550 400,200 650,280 C 850,340 920,180 980,240" stroke="rgba(248, 232, 76, 0.3)" strokeWidth="2" strokeLinecap="round" />
          
          <defs>
            <linearGradient id="orbitalGradient1" x1="120" y1="120" x2="880" y2="480" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7886F8" stopOpacity="0.8" />
              <stop offset="0.5" stopColor="#FF4FA3" stopOpacity="0.6" />
              <stop offset="1" stopColor="#F8E84C" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="orbitalGradient2" x1="0" y1="300" x2="1000" y2="300" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5515E8" stopOpacity="0.1" />
              <stop offset="0.5" stopColor="#7886F8" stopOpacity="0.5" />
              <stop offset="1" stopColor="#FF7A30" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Central Sculptural Core: The "Idea" Orb */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Outer floating decorative rings */}
          <div className="absolute w-72 h-72 rounded-full border border-[#7886F8]/30 animate-spin-slow pointer-events-none" />
          <div className="absolute w-84 h-84 rounded-full border border-dashed border-[#FF4FA3]/25 pointer-events-none" />

          {/* Central Sphere with multi-layer radial gradient */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-[#35108F] via-[#5515E8] to-[#9965FF] shadow-[0_0_80px_rgba(85,21,232,0.7),inset_0_-15px_30px_rgba(0,0,0,0.6),inset_0_15px_25px_rgba(255,255,255,0.4)] flex items-center justify-center transition-transform duration-500 hover:scale-105 group cursor-pointer">
            {/* Inner creative spark motif */}
            <div className="relative text-center p-6 text-white">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md mb-2 shadow-inner border border-white/20">
                <Sparkles className="w-6 h-6 text-[#F8E84C]" />
              </div>
              <div className="text-xs font-semibold tracking-wider uppercase text-white/80">Input Idea</div>
              <div className="text-sm sm:text-base font-bold text-white leading-tight mt-0.5">
                "One spark → 5 platforms"
              </div>
            </div>

            {/* Glowing specular highlight on sphere */}
            <div className="absolute top-4 left-6 w-16 h-10 bg-white/30 rounded-full blur-md transform -rotate-45 pointer-events-none" />
          </div>

          {/* Core base shadow */}
          <div className="w-48 h-6 bg-black/50 blur-lg rounded-full mt-6" />
        </div>

        {/* Floating Social Draft Card 1: X / Twitter (Top Left) */}
        <div 
          onClick={() => setActiveCard('x')}
          className={`absolute top-8 left-4 sm:left-10 md:left-14 w-64 sm:w-72 bg-[#120D24]/90 backdrop-blur-xl border ${activeCard === 'x' ? 'border-[#5515E8] shadow-[0_0_30px_rgba(85,21,232,0.4)]' : 'border-white/10'} p-4 rounded-2xl text-white cursor-pointer transition-all duration-300 transform animate-float hover:scale-105 z-20`}
        >
          <div className="flex items-center justify-between text-xs text-white/60 mb-2">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#7886F8]" />
              X Thread Hook
            </span>
            <span className="text-[11px] text-[#F8E84C] font-mono">240 chars</span>
          </div>
          <p className="text-xs sm:text-sm text-white/90 font-medium leading-snug line-clamp-2">
            "Most teams waste 8 hours a week reformatting the same message. Here is how we automated it."
          </p>
          <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-white/50">
            <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-[#FF4FA3]" /> 1.2k</span>
            <span className="flex items-center gap-1"><Repeat className="w-3 h-3 text-[#7886F8]" /> 284</span>
            <span className="text-[#F8E84C] flex items-center gap-0.5 font-medium">Ready <ArrowUpRight className="w-3 h-3" /></span>
          </div>
        </div>

        {/* Floating Social Draft Card 2: LinkedIn Narrative (Top Right) */}
        <div 
          onClick={() => setActiveCard('linkedin')}
          className={`absolute top-12 right-4 sm:right-10 md:right-12 w-64 sm:w-76 bg-[#120D24]/90 backdrop-blur-xl border ${activeCard === 'linkedin' ? 'border-[#7886F8] shadow-[0_0_30px_rgba(120,134,248,0.4)]' : 'border-white/10'} p-4 rounded-2xl text-white cursor-pointer transition-all duration-300 transform animate-float-delayed hover:scale-105 z-20`}
        >
          <div className="flex items-center justify-between text-xs text-white/60 mb-2">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0077B5]" />
              LinkedIn Narrative
            </span>
            <span className="text-[11px] text-white/50 font-mono">Structured</span>
          </div>
          <p className="text-xs sm:text-sm text-white/90 font-medium leading-snug line-clamp-3">
            "We audited 40 creative founders this month. The ones shipping consistently have one system in common..."
          </p>
          <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-white/50">
            <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3 text-[#7886F8]" /> 42 comments</span>
            <span className="text-[#FF7A30] font-medium">In Review</span>
          </div>
        </div>

        {/* Floating Social Draft Card 3: Instagram Carousel (Bottom Left/Center) */}
        <div 
          onClick={() => setActiveCard('ig')}
          className={`absolute bottom-6 left-6 sm:left-16 md:left-24 w-60 sm:w-68 bg-[#120D24]/90 backdrop-blur-xl border ${activeCard === 'ig' ? 'border-[#FF4FA3] shadow-[0_0_30px_rgba(255,79,163,0.4)]' : 'border-white/10'} p-3.5 rounded-2xl text-white cursor-pointer transition-all duration-300 transform animate-float-slow hover:scale-105 z-20`}
        >
          <div className="flex items-center justify-between text-xs text-white/60 mb-1.5">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF4FA3]" />
              IG Carousel
            </span>
            <span className="text-[11px] text-[#F8E84C] font-mono">5 Slides</span>
          </div>
          <p className="text-xs text-white/90 font-medium line-clamp-2">
            Slide 1: Why 90% of creators burn out in month 3 (and the studio fix).
          </p>
        </div>

        {/* Floating Playful Geometric Accents */}
        {/* Tangerine Cube/Disc */}
        <div className="absolute top-28 left-1/4 w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF7A30] to-[#E0530A] shadow-lg transform rotate-12 animate-float pointer-events-none" />
        {/* Sunshine Yellow Diamond */}
        <div className="absolute bottom-20 right-1/4 w-9 h-9 rounded-md bg-[#F8E84C] shadow-[0_0_20px_rgba(248,232,76,0.6)] transform rotate-45 animate-float-delayed pointer-events-none" />
        {/* Hot Pink Sphere */}
        <div className="absolute bottom-24 right-12 w-6 h-6 rounded-full bg-[#FF4FA3] shadow-[0_0_15px_rgba(255,79,163,0.7)] animate-float-slow pointer-events-none" />
        {/* Periwinkle Pill */}
        <div className="absolute top-16 right-1/3 w-10 h-4 rounded-full bg-[#7886F8]/60 blur-[1px] transform -rotate-12 pointer-events-none" />
      </div>

      {/* Natural visual invitation to scroll */}
      <div className="flex items-center justify-center mt-3 text-xs text-[#777481] dark:text-[#9590A3]">
        <span>Interactive preview · Click cards to highlight platform drafts</span>
      </div>
    </div>
  );
};
