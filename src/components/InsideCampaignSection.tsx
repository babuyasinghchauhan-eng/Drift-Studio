import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Clock, Share2, Sparkles } from 'lucide-react';

export const InsideCampaignSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section className="py-20 sm:py-28 bg-[#F7F6FA] dark:bg-[#12101C] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-widest text-[#5515E8] uppercase mb-3">
            06 · Proof of Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#19171F] dark:text-white leading-[1.1]">
            Inside a real campaign:
            <br />
            From raw idea to 5 drafts.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#777481] dark:text-[#9590A3] font-normal leading-relaxed">
            A step-by-step walkthrough of how Drift processed an authentic indie builder brief without fabricated testimonials or vanity stats.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {[
            { id: 1, title: '1. The Raw Input Note' },
            { id: 2, title: '2. Open AI Platform Adaptation' },
            { id: 3, title: '3. Weekly Calendar Placement' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveStep(s.id)}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-2xl whitespace-nowrap shrink-0 transition-all ${
                activeStep === s.id
                  ? 'bg-[#5515E8] text-white shadow-md shadow-[#5515E8]/20'
                  : 'bg-white dark:bg-[#1A1728] text-[#777481] dark:text-[#9590A3] hover:text-[#19171F] dark:hover:text-white border border-black/5 dark:border-white/5'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Dynamic Showcase Stage */}
        <div className="bg-white dark:bg-[#1A1728] rounded-3xl p-6 sm:p-10 border border-black/10 dark:border-white/10 shadow-lg">
          {activeStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5515E8]">The User’s Spark</span>
                <h3 className="text-2xl font-black text-[#19171F] dark:text-white">
                  A 30-second mobile voice memo or typed thought.
                </h3>
                <p className="text-sm text-[#777481] dark:text-[#9590A3] leading-relaxed">
                  The founder didn't spend 2 hours researching hashtag algorithms. They simply typed what they solved today: fixing production WebSocket latency by replacing it with a clean optimistic polling queue.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#777481] dark:text-[#9590A3]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Time taken: 45 seconds</span>
                </div>
              </div>

              <div className="md:col-span-7 bg-[#F7F6FA] dark:bg-[#12101C] p-6 rounded-2xl border border-black/5 dark:border-white/5 font-mono text-xs text-[#19171F] dark:text-gray-300 space-y-2">
                <div className="text-[11px] font-bold text-[#5515E8] uppercase tracking-wider">CAMPAIGN_SEED.TXT</div>
                <div className="p-4 bg-white dark:bg-[#1A1728] rounded-xl border border-black/5 dark:border-white/5 text-sm font-sans font-medium text-[#19171F] dark:text-white">
                  "Why we threw away 4,000 lines of complex WebSocket state management and replaced it with a simple 80-line optimistic polling queue. Our server cost dropped 65% and bug reports went to zero."
                </div>
                <div className="text-[11px] text-[#777481] dark:text-[#9590A3]">
                  Selected platforms: X · LinkedIn · Reddit · Threads
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF4FA3]">The Transformation</span>
                <h3 className="text-2xl font-black text-[#19171F] dark:text-white">
                  Synthesized into native formats.
                </h3>
                <p className="text-sm text-[#777481] dark:text-[#9590A3] leading-relaxed">
                  Instead of copying and pasting the exact same text, Drift formatted each draft to match user expectations on every channel: technical depth for Reddit, executive story for LinkedIn, punchy hook for X.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#FF4FA3]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>4 tailored variations created</span>
                </div>
              </div>

              <div className="md:col-span-7 space-y-3">
                <div className="p-4 bg-[#F7F6FA] dark:bg-[#12101C] rounded-2xl border border-black/5 dark:border-white/5">
                  <div className="text-xs font-bold text-[#19171F] dark:text-white flex items-center justify-between mb-1">
                    <span>X Post Angle:</span>
                    <span className="text-[11px] text-[#5515E8] font-mono">Hook + 3 Bullets</span>
                  </div>
                  <p className="text-xs text-[#777481] dark:text-[#9590A3]">
                    "4,000 lines of WebSockets → 80 lines of optimistic polling. Here is why simpler architectures win:"
                  </p>
                </div>

                <div className="p-4 bg-[#F7F6FA] dark:bg-[#12101C] rounded-2xl border border-black/5 dark:border-white/5">
                  <div className="text-xs font-bold text-[#19171F] dark:text-white flex items-center justify-between mb-1">
                    <span>LinkedIn Angle:</span>
                    <span className="text-[11px] text-[#0077B5] font-mono">Executive Lesson</span>
                  </div>
                  <p className="text-xs text-[#777481] dark:text-[#9590A3]">
                    "We spent 3 months maintaining complex connection infrastructure before asking: does our user actually need sub-second updates?"
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A30]">The Final Board</span>
                <h3 className="text-2xl font-black text-[#19171F] dark:text-white">
                  Assigned, scheduled, and ready.
                </h3>
                <p className="text-sm text-[#777481] dark:text-[#9590A3] leading-relaxed">
                  Drafts move through the Kanban board into the local weekly calendar. When it's time to publish, copy with 1 click or download a clean CSV for your scheduling tool.
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Stored locally with zero remote data lock-in</span>
                </div>
              </div>

              <div className="md:col-span-7 bg-[#F7F6FA] dark:bg-[#12101C] p-6 rounded-2xl border border-black/5 dark:border-white/5">
                <div className="text-xs font-bold text-[#19171F] dark:text-white mb-3">Planned Schedule:</div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 bg-white dark:bg-[#1A1728] rounded-xl border border-black/5 dark:border-white/5">
                    <div className="font-bold text-[#5515E8]">Thursday</div>
                    <div className="text-[11px] text-[#777481] dark:text-[#9590A3] mt-1">09:30 AM · X Post</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-[#1A1728] rounded-xl border border-black/5 dark:border-white/5">
                    <div className="font-bold text-[#0077B5]">Friday</div>
                    <div className="text-[11px] text-[#777481] dark:text-[#9590A3] mt-1">11:00 AM · LinkedIn</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-[#1A1728] rounded-xl border border-black/5 dark:border-white/5">
                    <div className="font-bold text-[#7886F8]">Sunday</div>
                    <div className="text-[11px] text-[#777481] dark:text-[#9590A3] mt-1">16:00 PM · Reddit</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
