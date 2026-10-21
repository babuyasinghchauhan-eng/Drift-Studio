import React, { useState } from 'react';
import { Clock, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { RevealSection } from './RevealSection';

interface InsideCampaignSectionProps {
  onOpenStudio?: () => void;
}

export const InsideCampaignSection: React.FC<InsideCampaignSectionProps> = ({ onOpenStudio }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section className="py-20 sm:py-28 bg-[#F7F6FA] dark:bg-[#12101C] transition-colors border-b border-[#19171F]/10 dark:border-white/10">
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-[0.16em] text-[#5515E8] dark:text-[#7886F8] uppercase mb-3">
            06 · INSIDE A CAMPAIGN
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold tracking-[-0.03em] text-[#19171F] dark:text-white leading-[1.08] text-balance">
            Before and after:
            <br />
            One brief, five days of posts.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#777481] dark:text-[#9E9AA8] font-normal leading-relaxed">
            Instead of invented customer testimonials, inspect an actual sample brief moving from raw note to platform-specific drafts and local schedule.
          </p>
        </div>

        {/* Interactive Stage Switcher */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-8">
          {[
            { id: 1, title: '01. The Raw Input Brief' },
            { id: 2, title: '02. Multi-Platform Adaptation' },
            { id: 3, title: '03. Weekly Calendar Schedule' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveStep(s.id)}
              className={`px-5 py-3 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap shrink-0 transition-colors ${
                activeStep === s.id
                  ? 'bg-[#5515E8] text-white'
                  : 'bg-white dark:bg-[#181526] text-[#777481] dark:text-[#9E9AA8] hover:text-[#19171F] dark:hover:text-white border border-[#19171F]/10 dark:border-white/10'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Single-Elevation Stage Container */}
        <div className="bg-white dark:bg-[#181526] rounded-[28px] p-6 sm:p-10 border border-[#19171F]/10 dark:border-white/10">
          {activeStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#5515E8] dark:text-[#7886F8]">
                  Before · Unstructured Note
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#19171F] dark:text-white">
                  A two-sentence engineering note jotted down after shipping.
                </h3>
                <p className="text-sm sm:text-base text-[#777481] dark:text-[#9E9AA8] leading-relaxed">
                  No hashtag research or thread templates. Just the core insight: replacing a 4,000-line WebSocket state layer with an 80-line polling queue.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#777481] dark:text-[#9E9AA8] pt-2">
                  <Clock className="w-4 h-4 text-[#5515E8]" />
                  <span>Input time: ~45 seconds · Demo sample brief</span>
                </div>
              </div>

              <div className="lg:col-span-7 lg:pl-8 lg:border-l border-[#19171F]/10 dark:border-white/10 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8]">
                  RAW_BRIEF_INPUT.TXT
                </div>
                <blockquote className="font-display text-lg sm:text-xl font-bold text-[#19171F] dark:text-white leading-snug">
                  “Why we threw away 4,000 lines of complex WebSocket state management and replaced it with a simple 80-line optimistic polling queue. Our server cost dropped 65% and bug reports went to zero.”
                </blockquote>
                <div className="pt-4 border-t border-[#19171F]/10 dark:border-white/10 flex flex-wrap items-center gap-2 text-xs text-[#777481] dark:text-[#9E9AA8]">
                  <span>Target: Senior Engineers & Founders</span>
                  <span aria-hidden="true">·</span>
                  <span>Tone: Authentic & Candid</span>
                  <span aria-hidden="true">·</span>
                  <span>Channels: X · LinkedIn · Reddit · Threads</span>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#FF4FA3]">
                  After · Tailored Variations
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#19171F] dark:text-white">
                  Structured for how each community actually reads.
                </h3>
                <p className="text-sm sm:text-base text-[#777481] dark:text-[#9E9AA8] leading-relaxed">
                  Instead of cross-posting identical text, Drift creates a high-density hook for X, a reflective lesson for LinkedIn, and a peer-review technical breakdown for Reddit.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#FF4FA3] font-semibold pt-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Each draft remains 100% inline-editable</span>
                </div>
              </div>

              <div className="lg:col-span-7 lg:pl-8 lg:border-l border-[#19171F]/10 dark:border-white/10 divide-y divide-[#19171F]/10 dark:divide-white/10">
                <div className="pb-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#19171F] dark:text-white">X (Twitter) Draft</span>
                    <span className="font-mono text-[#5515E8] dark:text-[#7886F8]">Hook + 3 Bullets</span>
                  </div>
                  <p className="text-sm text-[#777481] dark:text-[#9E9AA8]">
                    “4,000 lines of WebSockets → 80 lines of optimistic polling. Why simpler architectures win when scaling:”
                  </p>
                </div>

                <div className="py-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#19171F] dark:text-white">LinkedIn Narrative</span>
                    <span className="font-mono text-[#FF7A30]">Architecture Lesson</span>
                  </div>
                  <p className="text-sm text-[#777481] dark:text-[#9E9AA8]">
                    “We spent three months maintaining complex connection state before asking a simple question: does this screen actually need sub-second push?”
                  </p>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#19171F] dark:text-white">Reddit / Community</span>
                    <span className="font-mono text-[#FF4FA3]">Technical Retrospective</span>
                  </div>
                  <p className="text-sm text-[#777481] dark:text-[#9E9AA8]">
                    “Sharing our benchmark notes after replacing our WebSocket cluster with an 80-line optimistic polling queue. Open to critique.”
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#FF7A30]">
                  Cadence · Local Weekly Plan
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#19171F] dark:text-white">
                  Organized across your week, ready to copy or export.
                </h3>
                <p className="text-sm sm:text-base text-[#777481] dark:text-[#9E9AA8] leading-relaxed">
                  Drafts move from Review to Ready on the Kanban board and slot into your local weekly calendar so you never wonder what to share next.
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Local planning schedule · CSV & JSON exportable</span>
                </div>
              </div>

              <div className="lg:col-span-7 lg:pl-8 lg:border-l border-[#19171F]/10 dark:border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-[#F7F6FA] dark:bg-[#12101C] border border-[#19171F]/10 dark:border-white/10">
                    <div className="text-xs font-bold uppercase text-[#5515E8] dark:text-[#7886F8]">Thursday</div>
                    <div className="font-display text-base font-bold text-[#19171F] dark:text-white mt-1">
                      X Launch Hook
                    </div>
                    <div className="text-xs font-mono text-[#777481] dark:text-[#9E9AA8] mt-2 tabular-nums">
                      09:30 · Ready
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F7F6FA] dark:bg-[#12101C] border border-[#19171F]/10 dark:border-white/10">
                    <div className="text-xs font-bold uppercase text-[#FF7A30]">Friday</div>
                    <div className="font-display text-base font-bold text-[#19171F] dark:text-white mt-1">
                      LinkedIn Essay
                    </div>
                    <div className="text-xs font-mono text-[#777481] dark:text-[#9E9AA8] mt-2 tabular-nums">
                      13:00 · Ready
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F7F6FA] dark:bg-[#12101C] border border-[#19171F]/10 dark:border-white/10">
                    <div className="text-xs font-bold uppercase text-[#FF4FA3]">Saturday</div>
                    <div className="font-display text-base font-bold text-[#19171F] dark:text-white mt-1">
                      Reddit Deep-Dive
                    </div>
                    <div className="text-xs font-mono text-[#777481] dark:text-[#9E9AA8] mt-2 tabular-nums">
                      15:45 · Review
                    </div>
                  </div>
                </div>

                {onOpenStudio && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={onOpenStudio}
                      className="text-xs sm:text-sm font-bold text-[#5515E8] dark:text-[#7886F8] hover:underline flex items-center gap-1.5"
                    >
                      <span>Explore this campaign in the live workspace</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </RevealSection>
    </section>
  );
};
