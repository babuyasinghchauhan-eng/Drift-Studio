import React from 'react';
import { ArrowRight } from 'lucide-react';
import { RevealSection } from './RevealSection';

interface WorkflowSectionProps {
  onStartWorkflow: () => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onStartWorkflow }) => {
  return (
    <section
      id="scene-workflow"
      className="py-20 sm:py-28 bg-[#F7F6FA] dark:bg-[#12101C] transition-colors border-b border-[#19171F]/10 dark:border-white/10"
    >
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="text-xs font-bold tracking-[0.16em] text-[#5515E8] dark:text-[#7886F8] uppercase mb-3">
            04 · THE THREE-STEP WORKFLOW
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold tracking-[-0.03em] text-[#19171F] dark:text-white leading-[1.08] text-balance">
            Think of the idea once.
            <br />
            Move on in three steps.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#777481] dark:text-[#9E9AA8] font-normal leading-relaxed">
            Each stage of Drift is built to keep you in creative flow rather than managing spreadsheets.
          </p>
        </div>

        {/* Distinct Visual Steps Layout */}
        <div className="space-y-8">
          
          {/* STEP 01: Pale Lavender Horizontal Split Card with Custom Spark Geometry */}
          <div className="rounded-[28px] bg-[#F0EDFF] dark:bg-[#1C1733] border border-[#5515E8]/15 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-5xl sm:text-6xl font-extrabold text-[#5515E8] dark:text-[#7886F8] tabular-nums leading-none">
                  01
                </span>
                <span className="text-xs font-bold tracking-[0.14em] uppercase text-[#5515E8] dark:text-[#7886F8]">
                  INPUT BRIEF
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#19171F] dark:text-white">
                01 — Capture an idea.
              </h3>
              <p className="text-sm sm:text-base text-[#19171F]/80 dark:text-gray-200 max-w-xl leading-relaxed">
                Drop in a rough paragraph, release note, or project lesson. Pick your target audience, preferred tone, and the social platforms you care about.
              </p>
            </div>

            {/* Step 01 Custom Geometric Illustration */}
            <div className="lg:col-span-5 bg-white dark:bg-[#141122] rounded-2xl p-5 border border-[#19171F]/10 dark:border-white/10">
              <svg className="w-full h-36" viewBox="0 0 360 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="12" y="16" width="210" height="98" rx="14" fill="#F7F6FA" stroke="#5515E8" strokeWidth="2" />
                <rect x="28" y="34" width="90" height="10" rx="5" fill="#5515E8" />
                <rect x="28" y="54" width="160" height="8" rx="4" fill="#19171F" fillOpacity="0.2" />
                <rect x="28" y="70" width="130" height="8" rx="4" fill="#19171F" fillOpacity="0.2" />
                <circle cx="295" cy="65" r="42" fill="#F8E84C" />
                <path d="M295 40 L302 58 L320 65 L302 72 L295 90 L288 72 L270 65 L288 58 Z" fill="#19171F" />
              </svg>
              <div className="mt-2 flex items-center justify-between text-xs text-[#777481] dark:text-[#9E9AA8]">
                <span>Audience · Tone · Objective</span>
                <span className="font-mono text-[#5515E8] dark:text-[#7886F8]">30s setup</span>
              </div>
            </div>
          </div>

          {/* STEP 02: Electric Violet & Deep Violet Asymmetric Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Step 02 (7 cols): Saturated Electric Violet Card */}
            <div className="lg:col-span-7 rounded-[28px] bg-[#5515E8] text-white p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-5xl sm:text-6xl font-extrabold text-[#F8E84C] tabular-nums leading-none">
                    02
                  </span>
                  <span className="text-xs font-bold tracking-[0.14em] uppercase text-[#F8E84C]">
                    OPEN-WEIGHT SYNTHESIS
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  02 — Let open AI build the first draft.
                </h3>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  The model generates tailored variations for X, LinkedIn, Instagram, Threads, Shorts, or Reddit — complete with hooks, body copy, and angle notes.
                </p>
              </div>

              {/* Step 02 Multi-Draft Fan Graphic */}
              <div className="relative z-10 mt-8 pt-5 border-t border-white/20 grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white text-[#19171F]">
                  <div className="font-bold text-[#5515E8]">X Thread</div>
                  <div className="text-[11px] text-[#777481] mt-0.5">240 chars</div>
                </div>
                <div className="p-3 rounded-xl bg-white text-[#19171F]">
                  <div className="font-bold text-[#FF4FA3]">IG Slides</div>
                  <div className="text-[11px] text-[#777481] mt-0.5">5-slide arc</div>
                </div>
                <div className="p-3 rounded-xl bg-white text-[#19171F]">
                  <div className="font-bold text-[#FF7A30]">LinkedIn</div>
                  <div className="text-[11px] text-[#777481] mt-0.5">Story lesson</div>
                </div>
              </div>
            </div>

            {/* Step 03 (5 cols): Crisp White Card with Tangerine & Yellow Kanban Geometry */}
            <div className="lg:col-span-5 rounded-[28px] bg-white dark:bg-[#181526] border border-[#19171F]/10 dark:border-white/10 p-6 sm:p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-5xl sm:text-6xl font-extrabold text-[#FF7A30] tabular-nums leading-none">
                    03
                  </span>
                  <span className="text-xs font-bold tracking-[0.14em] uppercase text-[#FF7A30]">
                    BOARD & CALENDAR
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#19171F] dark:text-white">
                  03 — Review, organize, and move on.
                </h3>
                <p className="text-sm sm:text-base text-[#777481] dark:text-[#9E9AA8] leading-relaxed">
                  Edit inline, test alternate hooks, drag across your board, assign dates on your weekly calendar, and export clean CSV or JSON files.
                </p>
              </div>

              {/* Step 03 Visual Stage Progression */}
              <div className="mt-8 pt-5 border-t border-[#19171F]/10 dark:border-white/10">
                <div className="flex items-center justify-between text-xs font-bold text-[#19171F] dark:text-white">
                  <span>Idea</span>
                  <span>→</span>
                  <span>Draft</span>
                  <span>→</span>
                  <span>Review</span>
                  <span>→</span>
                  <span className="text-[#5515E8] dark:text-[#7886F8]">Ready</span>
                </div>
                <div className="mt-2.5 h-2.5 w-full rounded-full bg-[#F7F6FA] dark:bg-[#12101C] overflow-hidden flex gap-1">
                  <div className="w-1/4 h-full bg-[#7886F8]" />
                  <div className="w-1/4 h-full bg-[#5515E8]" />
                  <div className="w-1/4 h-full bg-[#FF7A30]" />
                  <div className="w-1/4 h-full bg-[#F8E84C]" />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartWorkflow}
            className="min-h-[48px] inline-flex items-center gap-2 px-8 py-3.5 text-sm sm:text-base font-bold text-white bg-[#19171F] dark:bg-white dark:text-[#19171F] hover:bg-[#5515E8] dark:hover:bg-[#5515E8] dark:hover:text-white rounded-xl transition-colors"
          >
            <span>Start your first campaign plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </RevealSection>
    </section>
  );
};
