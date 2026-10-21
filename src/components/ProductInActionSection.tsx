import React, { useState } from 'react';
import { Copy, Check, ArrowRight, Sparkles } from 'lucide-react';
import { Platform } from '../types';
import { PLATFORM_CONFIGS, INITIAL_DRAFTS, INITIAL_CAMPAIGNS } from '../constants';
import { StorageService } from '../services/storage';
import { RevealSection } from './RevealSection';

interface ProductInActionSectionProps {
  onOpenStudio: () => void;
}

export const ProductInActionSection: React.FC<ProductInActionSectionProps> = ({ onOpenStudio }) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(INITIAL_CAMPAIGNS[0].id);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('x');
  const [copiedDraftId, setCopiedDraftId] = useState<string | null>(null);

  const activeCampaign =
    INITIAL_CAMPAIGNS.find((c) => c.id === selectedCampaignId) || INITIAL_CAMPAIGNS[0];

  const campaignDrafts = INITIAL_DRAFTS.filter((d) => d.campaignId === activeCampaign.id);
  const activeDraft =
    campaignDrafts.find((d) => d.platform === selectedPlatform) ||
    INITIAL_DRAFTS.find((d) => d.platform === selectedPlatform) ||
    campaignDrafts[0];

  const config = PLATFORM_CONFIGS[activeDraft.platform];

  const handleCopy = async (text: string, id: string) => {
    const success = await StorageService.copyToClipboard(text);
    if (success) {
      setCopiedDraftId(id);
      setTimeout(() => setCopiedDraftId(null), 2000);
    }
  };

  const platformsList: Platform[] = ['x', 'linkedin', 'instagram', 'threads', 'youtube_shorts', 'reddit'];

  return (
    <section
      id="scene-product"
      className="py-20 sm:py-28 bg-white dark:bg-[#0D0B14] transition-colors border-b border-[#19171F]/10 dark:border-white/10"
    >
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-[0.16em] text-[#5515E8] dark:text-[#7886F8] uppercase mb-3">
            01 · THE PRODUCT IN ACTION
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold tracking-[-0.03em] text-[#19171F] dark:text-white leading-[1.08] text-balance">
            One rough idea.
            <br />
            Adapted for every channel.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#777481] dark:text-[#9E9AA8] font-normal leading-relaxed text-balance">
            Explore how Drift transforms an authentic founder brief into structured, platform-specific drafts with native hooks, pacing, and character budgets.
          </p>
        </div>

        {/* Interactive Split Workspace Preview (Single-level elevation with hairline dividers) */}
        <div className="rounded-[28px] bg-[#F7F6FA] dark:bg-[#151221] border border-[#19171F]/10 dark:border-white/10 overflow-hidden shadow-lg">
          
          {/* Top Workspace Toolbar: Campaign Switcher + Platform Tabs */}
          <div className="px-6 py-4 bg-white dark:bg-[#1A162B] border-b border-[#19171F]/10 dark:border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Campaign Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8] mr-1">
                Sample Brief:
              </span>
              {INITIAL_CAMPAIGNS.map((camp) => (
                <button
                  key={camp.id}
                  onClick={() => setSelectedCampaignId(camp.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                    selectedCampaignId === camp.id
                      ? 'bg-[#19171F] text-white dark:bg-white dark:text-[#19171F]'
                      : 'bg-[#F7F6FA] dark:bg-[#151221] text-[#777481] dark:text-[#9E9AA8] hover:text-[#19171F] dark:hover:text-white'
                  }`}
                >
                  {camp.name}
                </button>
              ))}
            </div>

            {/* Platform Segmented Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              {platformsList.map((p) => {
                const pConfig = PLATFORM_CONFIGS[p];
                const isActive = selectedPlatform === p;
                return (
                  <button
                    key={p}
                    onClick={() => setSelectedPlatform(p)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#5515E8] text-white'
                        : 'text-[#777481] dark:text-[#9E9AA8] hover:text-[#19171F] dark:hover:text-white hover:bg-[#F7F6FA] dark:hover:bg-white/5'
                    }`}
                  >
                    {pConfig.shortLabel}
                  </button>
                );
              })}
            </div>

          </div>

          {/* 2-Column Split: Source Brief on Left, Adapted Platform Output on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#19171F]/10 dark:divide-white/10">
            
            {/* Left Column (5 cols): Source Campaign Brief */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between text-xs text-[#777481] dark:text-[#9E9AA8]">
                  <span className="font-bold uppercase tracking-wider text-[#5515E8] dark:text-[#7886F8] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Input Campaign Brief
                  </span>
                  <span className="font-mono">STEP 01</span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-[#19171F] dark:text-white">
                    {activeCampaign.name}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#19171F] dark:text-gray-200 leading-relaxed">
                    “{activeCampaign.brief}”
                  </p>
                </div>

                {/* Unboxed Metadata Details */}
                <div className="pt-4 border-t border-[#19171F]/10 dark:border-white/10 space-y-2 text-xs text-[#777481] dark:text-[#9E9AA8]">
                  <div>
                    <strong className="text-[#19171F] dark:text-white">Target Audience:</strong> {activeCampaign.audience}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span>
                      <strong className="text-[#19171F] dark:text-white">Tone:</strong> {activeCampaign.tone}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      <strong className="text-[#19171F] dark:text-white">Objective:</strong> {activeCampaign.objective}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      <strong className="text-[#19171F] dark:text-white">Drafts:</strong> {activeCampaign.draftsCount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#19171F]/10 dark:border-white/10">
                <button
                  onClick={onOpenStudio}
                  className="w-full py-3 px-4 rounded-xl bg-[#19171F] dark:bg-white text-white dark:text-[#19171F] hover:bg-[#5515E8] dark:hover:bg-[#7886F8] dark:hover:text-white text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Open this campaign in Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column (7 cols): Platform-Specific Adapted Draft */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-white dark:bg-[#120F1D] flex flex-col justify-between">
              <div>
                {/* Header with metadata and actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#19171F]/10 dark:border-white/10">
                  <div>
                    <div className="font-display text-lg sm:text-xl font-bold text-[#19171F] dark:text-white">
                      {config.name} Version
                    </div>
                    <div className="text-xs text-[#777481] dark:text-[#9E9AA8] mt-1 flex flex-wrap items-center gap-2">
                      <span className="tabular-nums">
                        {activeDraft.body.length} / {config.charLimit} chars
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Status: {activeDraft.status.toUpperCase()}</span>
                      {activeDraft.scheduledDate && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">Planned: {activeDraft.scheduledDate}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(activeDraft.body, activeDraft.id)}
                      className="px-3.5 py-2 text-xs font-bold rounded-lg bg-[#F7F6FA] dark:bg-[#1A162B] hover:bg-[#F0EDFF] text-[#19171F] dark:text-white border border-[#19171F]/10 dark:border-white/10 transition-colors flex items-center gap-1.5 whitespace-nowrap"
                    >
                      {copiedDraftId === activeDraft.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied to clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Draft</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Opening Hook Callout */}
                <div className="mt-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#5515E8] dark:text-[#7886F8]">
                    Platform Hook
                  </div>
                  <p className="mt-1 font-display text-base sm:text-lg font-bold text-[#19171F] dark:text-white leading-snug">
                    “{activeDraft.hook}”
                  </p>
                </div>

                {/* Full Draft Body */}
                <div className="mt-4 pt-4 border-t border-[#19171F]/10 dark:border-white/10 whitespace-pre-line text-sm sm:text-base text-[#19171F] dark:text-gray-200 leading-relaxed">
                  {activeDraft.body}
                </div>
              </div>

              {/* Footer Angle Note & Hashtags */}
              <div className="mt-6 pt-4 border-t border-[#19171F]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#777481] dark:text-[#9E9AA8]">
                <span>
                  <strong className="text-[#19171F] dark:text-white">Editorial Angle:</strong> {activeDraft.angleExplanation}
                </span>
                {activeDraft.hashtags.length > 0 && (
                  <span className="font-mono text-[#5515E8] dark:text-[#7886F8]">
                    {activeDraft.hashtags.join(' ')}
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>

      </RevealSection>
    </section>
  );
};
