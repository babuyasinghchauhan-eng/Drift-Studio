import React, { useState } from 'react';
import { RefreshCw, Scissors, Sparkles, Calendar, Layers, Check } from 'lucide-react';
import { Tone } from '../types';
import { TONE_OPTIONS } from '../constants';

export const IntelligentToolsSection: React.FC = () => {
  const [selectedTone, setSelectedTone] = useState<Tone>('contrarian');
  const [sampleHook, setSampleHook] = useState(
    'Why 90% of content creators burn out in month 3.'
  );

  const getHookForTone = (tone: Tone) => {
    switch (tone) {
      case 'contrarian':
        return 'Stop posting every day. The creators winning in 2026 post once a fortnight — but with undeniable proof of craft.';
      case 'punchy':
        return 'Volume exhausts. Craft compounds. Choose one.';
      case 'playful':
        return 'Confession: I spent 3 weeks optimizing posting times before realizing nobody reads boring content anyway 😅';
      case 'storytelling':
        return 'At 2 AM on a Tuesday, looking at our zero-conversion dashboard, we decided to break every standard social media rule.';
      case 'educational':
        return 'The 3-stage content flywheel: Document the build, extract the architectural lesson, schedule the post once.';
      default:
        return 'Here is the exact framework we used to turn 1 rough note into a week of published content.';
    }
  };

  return (
    <section id="scene-tools" className="py-20 sm:py-28 bg-[#F7F6FA] dark:bg-[#12101C] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-widest text-[#5515E8] uppercase mb-3">
            02 · Content Toolkit
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#19171F] dark:text-white leading-[1.1]">
            Intelligent tools.
            <br />
            Zero creative compromise.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#777481] dark:text-[#9590A3] font-normal leading-relaxed">
            Every feature in Drift is designed to remove formatting friction so you can focus on the quality of your underlying thesis.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1 (Large - Col 7): Interactive Tone & Hook Transformer */}
          <div className="md:col-span-7 bg-white dark:bg-[#1A1728] rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#5515E8] uppercase mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Instant Tone Modulation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#19171F] dark:text-white">
                Re-anchor your message for any audience
              </h3>
              <p className="text-sm text-[#777481] dark:text-[#9590A3] mt-2 leading-relaxed">
                Switch between candid founder reflections, punchy minimal takes, or deep educational structures without rewriting from scratch.
              </p>

              {/* Interactive Tone Buttons */}
              <div className="mt-6 flex flex-wrap gap-2">
                {TONE_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTone(t.id);
                      setSampleHook(getHookForTone(t.id));
                    }}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                      selectedTone === t.id
                        ? 'bg-[#5515E8] text-white shadow-sm'
                        : 'bg-[#F7F6FA] dark:bg-[#12101C] text-[#777481] dark:text-[#9590A3] hover:text-[#19171F] dark:hover:text-white border border-black/5 dark:border-white/5'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Transformed Result Preview */}
              <div className="mt-6 p-5 rounded-2xl bg-[#F7F6FA] dark:bg-[#12101C] border border-black/5 dark:border-white/5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#777481] dark:text-[#9590A3] mb-1.5">
                  Generated Hook Preview:
                </div>
                <div className="text-base sm:text-lg font-bold text-[#19171F] dark:text-white leading-snug">
                  "{sampleHook}"
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-[#5515E8]">
                  <Check className="w-3.5 h-3.5" />
                  <span>Model tailored for {selectedTone} cadence</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 (Col 5): Alternative Hooks Engine */}
          <div className="md:col-span-5 bg-white dark:bg-[#1A1728] rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#FF4FA3] uppercase mb-2">
                <RefreshCw className="w-4 h-4" />
                <span>Hook Variations</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#19171F] dark:text-white">
                3 Alternative Angles
              </h3>
              <p className="text-sm text-[#777481] dark:text-[#9590A3] mt-2 leading-relaxed">
                Stuck on the first sentence? Generate 3 completely different psychological hooks for any draft with one click.
              </p>

              <div className="mt-5 space-y-2.5">
                <div className="p-3 bg-[#F7F6FA] dark:bg-[#12101C] rounded-xl border border-black/5 dark:border-white/5 text-xs text-[#19171F] dark:text-white font-medium">
                  <strong>Angle A (Question):</strong> "Why do 80% of open-source projects fail to gain developer traction?"
                </div>
                <div className="p-3 bg-[#F7F6FA] dark:bg-[#12101C] rounded-xl border border-black/5 dark:border-white/5 text-xs text-[#19171F] dark:text-white font-medium">
                  <strong>Angle B (Data):</strong> "We tracked 40 launches this month. One pattern determined every success."
                </div>
                <div className="p-3 bg-[#F7F6FA] dark:bg-[#12101C] rounded-xl border border-black/5 dark:border-white/5 text-xs text-[#19171F] dark:text-white font-medium">
                  <strong>Angle C (Story):</strong> "The day we deleted our roadmap was the day our velocity tripled."
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 (Col 6): One-Click Shortener */}
          <div className="md:col-span-6 bg-white dark:bg-[#1A1728] rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#FF7A30] uppercase mb-2">
              <Scissors className="w-4 h-4" />
              <span>Density Optimizer</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#19171F] dark:text-white">
              Make it concise & punchy
            </h3>
            <p className="text-sm text-[#777481] dark:text-[#9590A3] mt-2 leading-relaxed">
              Strips passive voice, eliminates throat-clearing intro lines, and formats bullet points for maximum mobile screen readability.
            </p>
            <div className="mt-5 p-4 rounded-xl bg-[#F7F6FA] dark:bg-[#12101C] border border-black/5 dark:border-white/5 text-xs text-[#777481] dark:text-[#9590A3]">
              <span className="text-[#19171F] dark:text-white font-semibold">Before (140 words):</span> "In this article I would like to talk about why..."<br />
              <span className="text-[#5515E8] font-semibold mt-1 inline-block">After (35 words):</span> "Three rules that cut our cloud bill by 65% in 48 hours."
            </div>
          </div>

          {/* Card 4 (Col 6): Local Weekly Board & Calendar */}
          <div className="md:col-span-6 bg-white dark:bg-[#1A1728] rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#7886F8] uppercase mb-2">
              <Calendar className="w-4 h-4" />
              <span>Local Content Board</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#19171F] dark:text-white">
              Idea → Draft → Review → Ready
            </h3>
            <p className="text-sm text-[#777481] dark:text-[#9590A3] mt-2 leading-relaxed">
              Organize campaigns on an interactive kanban board or weekly schedule. All data stays entirely in your browser with zero remote trackers.
            </p>
            <div className="mt-5 grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-[#F7F6FA] dark:bg-[#12101C] font-semibold text-[#19171F] dark:text-white">Idea</div>
              <div className="p-2 rounded-lg bg-[#5515E8]/10 text-[#5515E8] font-semibold">Draft</div>
              <div className="p-2 rounded-lg bg-[#FF7A30]/10 text-[#FF7A30] font-semibold">Review</div>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 font-semibold">Ready</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
