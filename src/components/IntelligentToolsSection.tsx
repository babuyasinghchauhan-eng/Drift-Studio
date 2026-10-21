import React, { useState } from 'react';
import { RefreshCw, Scissors, Sparkles, Calendar, Check, Copy } from 'lucide-react';
import { Tone } from '../types';
import { TONE_OPTIONS } from '../constants';
import { StorageService } from '../services/storage';
import { RevealSection } from './RevealSection';

interface IntelligentToolsSectionProps {
  savedCampaignsCount?: number;
  savedDraftsCount?: number;
  onOpenBoard?: () => void;
}

export const IntelligentToolsSection: React.FC<IntelligentToolsSectionProps> = ({
  savedCampaignsCount = 2,
  savedDraftsCount = 7,
  onOpenBoard,
}) => {
  const [selectedTone, setSelectedTone] = useState<Tone>('contrarian');
  const [isCondensed, setIsCondensed] = useState<boolean>(true);
  const [copiedHookIdx, setCopiedHookIdx] = useState<number | null>(null);

  const getHookForTone = (tone: Tone) => {
    switch (tone) {
      case 'contrarian':
        return 'Stop posting every day. The builders winning attention in 2026 publish once a week — with undeniable proof of craft.';
      case 'punchy':
        return 'Volume exhausts. Craft compounds. Pick your game.';
      case 'playful':
        return 'Confession: I spent three weeks color-coding a content calendar before writing a single useful post.';
      case 'storytelling':
        return 'At 11:45 PM on a Tuesday, staring at four unfinished drafts, we decided to automate the formatting step forever.';
      case 'educational':
        return 'The 3-part creator flywheel: Capture the raw build note, adapt the angle per platform, schedule the week in one pass.';
      default:
        return 'Here is the exact workflow we use to turn one rough project update into a full week of platform-native drafts.';
    }
  };

  const hooksList = [
    {
      label: 'Question Angle',
      text: 'Why do 80% of open-source developer tools stall right after launch week?',
    },
    {
      label: 'Benchmark Angle',
      text: 'We replaced 4,000 lines of ORM boilerplate with a 380ms zero-dependency CLI.',
    },
    {
      label: 'Narrative Angle',
      text: 'The day we deleted our complex state manager was the day our shipping velocity doubled.',
    },
  ];

  const handleCopyHook = async (text: string, idx: number) => {
    const ok = await StorageService.copyToClipboard(text);
    if (ok) {
      setCopiedHookIdx(idx);
      setTimeout(() => setCopiedHookIdx(null), 1800);
    }
  };

  return (
    <section
      id="scene-tools"
      className="py-20 sm:py-28 bg-[#F7F6FA] dark:bg-[#12101C] transition-colors border-b border-[#19171F]/10 dark:border-white/10"
    >
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-[0.16em] text-[#5515E8] dark:text-[#7886F8] uppercase mb-3">
            02 · INTELLIGENT CONTENT TOOLS
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold tracking-[-0.03em] text-[#19171F] dark:text-white leading-[1.08] text-balance">
            Purpose-built tools for
            <br />
            sharper social writing.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#777481] dark:text-[#9E9AA8] font-normal leading-relaxed">
            No generic chat prompts. Drift gives you focused editorial controls for tone shifting, hook exploration, length compression, and weekly scheduling.
          </p>
        </div>

        {/* Asymmetric Bento Grid (Single-elevation cards with hairline borders) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Bento Card 1 (7 cols): Interactive Tone Modulation */}
          <div className="lg:col-span-7 bg-white dark:bg-[#181526] rounded-[24px] p-6 sm:p-8 border border-[#19171F]/10 dark:border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs font-bold tracking-wider text-[#5515E8] dark:text-[#7886F8] uppercase mb-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Tone & Cadence Modulation
                </span>
                <span className="font-mono text-[#777481] dark:text-[#9E9AA8]">6 PRESETS</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#19171F] dark:text-white">
                Shift your voice without losing your point
              </h3>
              <p className="text-sm text-[#777481] dark:text-[#9E9AA8] mt-1.5 leading-relaxed">
                Test how your core idea reads as a candid build log, a punchy minimal statement, or a contrarian industry take.
              </p>

              {/* Interactive Tone Selector Buttons */}
              <div className="mt-5 flex flex-wrap gap-2">
                {TONE_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTone(t.id)}
                    className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-colors whitespace-nowrap ${
                      selectedTone === t.id
                        ? 'bg-[#5515E8] text-white'
                        : 'bg-[#F7F6FA] dark:bg-[#12101C] text-[#777481] dark:text-[#9E9AA8] hover:text-[#19171F] dark:hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Output Preview */}
            <div className="mt-6 pt-5 border-t border-[#19171F]/10 dark:border-white/10">
              <div className="text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8]">
                Live Adapted Output ({selectedTone}):
              </div>
              <p className="mt-2 font-display text-base sm:text-lg font-bold text-[#19171F] dark:text-white leading-snug">
                “{getHookForTone(selectedTone)}”
              </p>
            </div>
          </div>

          {/* Bento Card 2 (5 cols): Alternative Hook Generator */}
          <div className="lg:col-span-5 bg-white dark:bg-[#181526] rounded-[24px] p-6 sm:p-8 border border-[#19171F]/10 dark:border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold tracking-wider text-[#FF4FA3] uppercase mb-2">
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4" />
                  Alternate Hook Angles
                </span>
                <span className="font-mono text-[#777481] dark:text-[#9E9AA8]">CLICK TO COPY</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#19171F] dark:text-white">
                Never settle for your first opening line
              </h3>
              <p className="text-sm text-[#777481] dark:text-[#9E9AA8] mt-1.5 leading-relaxed">
                Generate three distinct opening angles for every post so you can pick the strongest entry point.
              </p>

              <div className="mt-5 divide-y divide-[#19171F]/10 dark:divide-white/10 border-t border-b border-[#19171F]/10 dark:border-white/10">
                {hooksList.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCopyHook(item.text, idx)}
                    className="w-full py-3 text-left flex items-start justify-between gap-3 group hover:bg-[#F7F6FA]/60 dark:hover:bg-white/5 transition-colors px-2 rounded-lg"
                  >
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#5515E8] dark:text-[#7886F8]">
                        {item.label}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-[#19171F] dark:text-white mt-0.5 leading-snug">
                        “{item.text}”
                      </div>
                    </div>
                    <span className="mt-1 text-[#777481] group-hover:text-[#5515E8] shrink-0">
                      {copiedHookIdx === idx ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bento Card 3 (6 cols): Interactive Density Shortener + Illustrative Pacing Chart */}
          <div className="lg:col-span-6 bg-white dark:bg-[#181526] rounded-[24px] p-6 sm:p-8 border border-[#19171F]/10 dark:border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs font-bold tracking-wider text-[#FF7A30] uppercase mb-2">
                <span className="flex items-center gap-1.5">
                  <Scissors className="w-4 h-4" />
                  Density & Length Optimizer
                </span>
                <button
                  onClick={() => setIsCondensed(!isCondensed)}
                  className="px-2.5 py-1 rounded-md bg-[#FF7A30]/15 text-[#FF7A30] font-bold hover:bg-[#FF7A30] hover:text-white transition-colors"
                >
                  {isCondensed ? 'Show Verbose Original' : 'Compress Draft'}
                </button>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#19171F] dark:text-white">
                Strip throat-clearing filler in one click
              </h3>
              <p className="text-sm text-[#777481] dark:text-[#9E9AA8] mt-1.5 leading-relaxed">
                Automatically trims redundant qualifiers and converts dense paragraphs into scannable bullets.
              </p>

              <div className="mt-5 pt-4 border-t border-[#19171F]/10 dark:border-white/10">
                <div className="flex items-center justify-between text-xs text-[#777481] dark:text-[#9E9AA8] mb-2">
                  <span>{isCondensed ? 'Compressed High-Signal Version' : 'Unedited First Draft'}</span>
                  <span className="font-mono tabular-nums font-bold text-[#19171F] dark:text-white">
                    {isCondensed ? '112 chars (-58%)' : '268 chars'}
                  </span>
                </div>
                <p className="text-sm font-medium text-[#19171F] dark:text-white leading-relaxed">
                  {isCondensed
                    ? '“We replaced 4,000 lines of complex WebSocket state with an 80-line polling queue. Server costs dropped 65% overnight.”'
                    : '“In today’s post I wanted to take a moment to share some thoughts on why our engineering team decided to refactor our real-time WebSocket infrastructure into a simpler polling approach that reduced costs.”'}
                </p>

                {/* Illustrative Visual Bar Comparison (Explicitly labelled as illustrative example) */}
                <div className="mt-4 pt-3 border-t border-[#19171F]/10 dark:border-white/10 space-y-2">
                  <div className="text-[11px] text-[#777481] dark:text-[#9E9AA8]">
                    Illustrative example · Reading time & filler ratio
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-[#F7F6FA] dark:bg-[#12101C] overflow-hidden flex">
                    <div
                      className="h-full bg-[#5515E8] transition-all duration-300"
                      style={{ width: isCondensed ? '42%' : '92%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 4 (6 cols): Live Local Workspace Counts & Weekly Planner */}
          <div className="lg:col-span-6 bg-white dark:bg-[#181526] rounded-[24px] p-6 sm:p-8 border border-[#19171F]/10 dark:border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs font-bold tracking-wider text-[#5515E8] dark:text-[#7886F8] uppercase mb-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Local Board & Weekly Planner
                </span>
                <span className="font-mono text-[#777481] dark:text-[#9E9AA8]">LIVE WORKSPACE DATA</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#19171F] dark:text-white">
                Move from rough draft to scheduled week
              </h3>
              <p className="text-sm text-[#777481] dark:text-[#9E9AA8] mt-1.5 leading-relaxed">
                Track every post from Idea → Draft → Review → Ready and assign local publishing dates on your weekly calendar.
              </p>

              {/* Actual Saved Project Counts from Local Storage */}
              <div className="mt-5 pt-4 border-t border-[#19171F]/10 dark:border-white/10 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-[#777481] dark:text-[#9E9AA8]">Saved Campaigns</div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#19171F] dark:text-white tabular-nums mt-0.5">
                    {savedCampaignsCount}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#777481] dark:text-[#9E9AA8]">Saved Drafts</div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#5515E8] dark:text-[#7886F8] tabular-nums mt-0.5">
                    {savedDraftsCount}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#777481] dark:text-[#9E9AA8]">Board Stages</div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#19171F] dark:text-white tabular-nums mt-0.5">
                    4
                  </div>
                </div>
              </div>
            </div>

            {onOpenBoard && (
              <div className="mt-5 pt-4 border-t border-[#19171F]/10 dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#777481] dark:text-[#9E9AA8]">
                  Stored locally in your browser · Zero cloud account required
                </span>
                <button
                  onClick={onOpenBoard}
                  className="font-bold text-[#5515E8] dark:text-[#7886F8] hover:underline"
                >
                  Open Board →
                </button>
              </div>
            )}
          </div>

        </div>

      </RevealSection>
    </section>
  );
};
