import React, { useState } from 'react';
import { Copy, Check, ArrowRight, Sparkles } from 'lucide-react';
import { Platform } from '../types';
import { PLATFORM_CONFIGS, INITIAL_DRAFTS } from '../constants';
import { StorageService } from '../services/storage';

interface ProductInActionSectionProps {
  onOpenStudio: () => void;
}

export const ProductInActionSection: React.FC<ProductInActionSectionProps> = ({ onOpenStudio }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('x');
  const [copiedDraftId, setCopiedDraftId] = useState<string | null>(null);

  // Find corresponding draft for demo
  const activeDraft = INITIAL_DRAFTS.find((d) => d.platform === selectedPlatform) || INITIAL_DRAFTS[0];
  const config = PLATFORM_CONFIGS[selectedPlatform];

  const handleCopy = async (text: string, id: string) => {
    const success = await StorageService.copyToClipboard(text);
    if (success) {
      setCopiedDraftId(id);
      setTimeout(() => setCopiedDraftId(null), 2000);
    }
  };

  const platformsList: Platform[] = ['x', 'linkedin', 'instagram', 'threads', 'youtube_shorts', 'reddit'];

  return (
    <section id="scene-product" className="py-20 sm:py-28 bg-white dark:bg-[#0C0B12] transition-colors border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-widest text-[#5515E8] uppercase mb-3">
            01 · Real Transformation
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#19171F] dark:text-white leading-[1.1]">
            One rough thought.
            <br />
            Every social format solved.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#777481] dark:text-[#9590A3] font-normal leading-relaxed text-balance">
            Watch how a single developer milestone brief is adapted into platform-native tone, structure, and pacing by the open-weight model.
          </p>
        </div>

        {/* Live Transformation Workspace Container */}
        <div className="bg-[#F7F6FA] dark:bg-[#14121F] rounded-3xl border border-black/10 dark:border-white/10 p-6 sm:p-10 shadow-xl">
          
          {/* Top Half: The Input Brief Card */}
          <div className="bg-white dark:bg-[#1C182B] rounded-2xl p-5 sm:p-6 border border-black/5 dark:border-white/10 shadow-sm mb-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9590A3]">
                <Sparkles className="w-3.5 h-3.5 text-[#5515E8]" />
                <span>Original Campaign Brief</span>
              </div>
              <div className="text-xs text-[#777481] dark:text-[#9590A3]">
                Audience: <strong className="text-[#19171F] dark:text-white">TypeScript & Backend Engineers</strong>
              </div>
            </div>
            <p className="text-sm sm:text-base text-[#19171F] dark:text-white font-medium leading-relaxed bg-[#F7F6FA] dark:bg-[#14121F] p-4 rounded-xl border border-black/5 dark:border-white/5">
              "We just released HyperSchema 1.0 — a zero-dependency CLI that generates type-safe database migrations in 400ms without bloated ORMs. Built in the open with Rust and TypeScript."
            </p>
          </div>

          {/* Interactive Platform Tabs (Allowed functional button tabs) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
            {platformsList.map((p) => {
              const pConfig = PLATFORM_CONFIGS[p];
              const isActive = selectedPlatform === p;
              return (
                <button
                  key={p}
                  onClick={() => setSelectedPlatform(p)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'bg-[#5515E8] text-white shadow-md shadow-[#5515E8]/20'
                      : 'bg-white dark:bg-[#1C182B] text-[#777481] dark:text-[#9590A3] hover:text-[#19171F] dark:hover:text-white border border-black/5 dark:border-white/5'
                  }`}
                >
                  {pConfig.name}
                </button>
              );
            })}
          </div>

          {/* Bottom Half: Platform-Adapted Output Card */}
          <div className="bg-white dark:bg-[#1C182B] rounded-2xl p-6 sm:p-8 border border-black/10 dark:border-white/10 shadow-md">
            
            {/* Header with platform name and metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-black/5 dark:border-white/10 mb-5">
              <div>
                <div className="text-lg font-bold text-[#19171F] dark:text-white flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${config.textColor}`} />
                  {config.name} Draft
                </div>
                {/* Zero-pill metadata */}
                <div className="text-xs text-[#777481] dark:text-[#9590A3] mt-0.5">
                  <span>Char Limit: {config.charLimit}</span>
                  <span className="mx-2">·</span>
                  <span>Angle: {activeDraft.angleExplanation}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(activeDraft.body, activeDraft.id)}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#F7F6FA] dark:bg-[#14121F] hover:bg-black/10 dark:hover:bg-white/10 text-[#19171F] dark:text-white border border-black/10 dark:border-white/10 transition-colors flex items-center gap-1.5"
                >
                  {copiedDraftId === activeDraft.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onOpenStudio}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#5515E8] hover:bg-[#35108F] text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Edit in Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Hook Highlight */}
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5515E8]">Opening Hook:</span>
              <p className="mt-1 text-base sm:text-lg font-bold text-[#19171F] dark:text-white leading-snug">
                "{activeDraft.hook}"
              </p>
            </div>

            {/* Draft Body Content */}
            <div className="whitespace-pre-line text-sm sm:text-base text-[#19171F] dark:text-gray-200 font-normal leading-relaxed bg-[#F7F6FA]/50 dark:bg-[#14121F]/50 p-4 rounded-xl border border-black/5 dark:border-white/5 font-sans">
              {activeDraft.body}
            </div>

            {/* Hashtags and CTA */}
            {activeDraft.hashtags && activeDraft.hashtags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono text-[#5515E8] dark:text-[#7886F8]">
                {activeDraft.hashtags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
