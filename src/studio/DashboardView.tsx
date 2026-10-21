import React from 'react';
import { Plus, Sparkles, CheckCircle2, Clock, Calendar, ArrowRight, LayoutGrid } from 'lucide-react';
import { Campaign, Draft, Platform } from '../types';
import { PLATFORM_CONFIGS } from '../constants';

interface DashboardViewProps {
  campaigns: Campaign[];
  drafts: Draft[];
  onCreateNewPlan: () => void;
  onOpenDraft: (draft: Draft) => void;
  onNavigateTab: (tab: 'board' | 'calendar' | 'create') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  campaigns,
  drafts,
  onCreateNewPlan,
  onOpenDraft,
  onNavigateTab,
}) => {
  // Real metrics calculated from active local state
  const totalDraftsCount = drafts.length;
  const reviewCount = drafts.filter((d) => d.status === 'review').length;
  const readyCount = drafts.filter((d) => d.status === 'ready').length;
  const scheduledDrafts = drafts
    .filter((d) => Boolean(d.scheduledDate))
    .sort((a, b) => (a.scheduledDate || '').localeCompare(b.scheduledDate || ''));

  const awaitingReviewDrafts = drafts.filter((d) => d.status === 'review').slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Welcome Bar + Primary CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/5 dark:border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#19171F] dark:text-white">
            Studio Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9590A3] mt-1">
            Transform one campaign idea into structured platform drafts and weekly schedules.
          </p>
        </div>

        <button
          onClick={onCreateNewPlan}
          className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#5515E8] hover:bg-[#35108F] active:scale-95 rounded-xl shadow-md shadow-[#5515E8]/20 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Content Plan</span>
        </button>
      </div>

      {/* Real Local Metrics Cards (Calculated directly from stored drafts) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-[#151222] border border-black/5 dark:border-white/10 shadow-sm">
          <div className="text-xs font-semibold text-[#777481] dark:text-[#9590A3]">Active Campaigns</div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-[#19171F] dark:text-white tabular-nums">
            {campaigns.length}
          </div>
          <div className="mt-2 text-[11px] text-[#5515E8] font-medium">Local workspace</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#151222] border border-black/5 dark:border-white/10 shadow-sm">
          <div className="text-xs font-semibold text-[#777481] dark:text-[#9590A3]">Total Saved Drafts</div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-[#19171F] dark:text-white tabular-nums">
            {totalDraftsCount}
          </div>
          <div className="mt-2 text-[11px] text-[#7886F8] font-medium">Platform adapted</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#151222] border border-black/5 dark:border-white/10 shadow-sm">
          <div className="text-xs font-semibold text-[#777481] dark:text-[#9590A3]">Awaiting Review</div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-[#FF7A30] tabular-nums">
            {reviewCount}
          </div>
          <div className="mt-2 text-[11px] text-[#777481] dark:text-[#9590A3]">Needs approval</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#151222] border border-black/5 dark:border-white/10 shadow-sm">
          <div className="text-xs font-semibold text-[#777481] dark:text-[#9590A3]">Ready to Publish</div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
            {readyCount}
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Ready for export</div>
        </div>

      </div>

      {/* Main Grid: Drafts Awaiting Review & Upcoming Local Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Drafts Awaiting Review (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#151222] rounded-3xl p-6 border border-black/5 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FF7A30]" />
              <h2 className="text-base font-bold text-[#19171F] dark:text-white">
                Drafts Awaiting Review ({reviewCount})
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('board')}
              className="text-xs font-semibold text-[#5515E8] hover:underline flex items-center gap-1"
            >
              <span>View Board</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {awaitingReviewDrafts.length > 0 ? (
            <div className="space-y-3">
              {awaitingReviewDrafts.map((d) => {
                const config = PLATFORM_CONFIGS[d.platform];
                return (
                  <div
                    key={d.id}
                    onClick={() => onOpenDraft(d)}
                    className="p-4 rounded-2xl bg-[#F7F6FA] dark:bg-[#1C182B] hover:border-[#5515E8]/40 border border-black/5 dark:border-white/5 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-[#19171F] dark:text-white flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${config.textColor}`} />
                        {config.name}
                      </span>
                      <span className="text-[11px] text-[#777481] dark:text-[#9590A3] truncate max-w-[140px]">
                        {d.campaignName}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-[#19171F] dark:text-white group-hover:text-[#5515E8] transition-colors line-clamp-2">
                      "{d.hook}"
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-[#777481] dark:text-[#9590A3]">
              No drafts currently in review. All items are either finalized or in drafting!
            </div>
          )}
        </div>

        {/* Right Column: Upcoming Local Publishing Plan (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#151222] rounded-3xl p-6 border border-black/5 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#5515E8]" />
              <h2 className="text-base font-bold text-[#19171F] dark:text-white">
                Upcoming Local Schedule
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('calendar')}
              className="text-xs font-semibold text-[#5515E8] hover:underline flex items-center gap-1"
            >
              <span>Weekly View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {scheduledDrafts.length > 0 ? (
            <div className="space-y-3">
              {scheduledDrafts.slice(0, 5).map((d) => {
                const config = PLATFORM_CONFIGS[d.platform];
                return (
                  <div
                    key={d.id}
                    onClick={() => onOpenDraft(d)}
                    className="p-3.5 rounded-2xl bg-[#F7F6FA] dark:bg-[#1C182B] border border-black/5 dark:border-white/5 cursor-pointer hover:border-[#7886F8]/40 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#19171F] dark:text-white truncate">
                        {config.name}: {d.hook.slice(0, 36)}...
                      </div>
                      <div className="text-[11px] text-[#777481] dark:text-[#9590A3] mt-0.5">
                        Planned: {d.scheduledDate} {d.scheduledTime ? `· ${d.scheduledTime}` : ''}
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-[#5515E8] shrink-0">Edit</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-[#777481] dark:text-[#9590A3]">
              No dates scheduled yet. Open a draft to assign it to your weekly calendar.
            </div>
          )}
        </div>

      </div>

      {/* Recent Campaigns Section */}
      <div className="bg-white dark:bg-[#151222] rounded-3xl p-6 sm:p-8 border border-black/5 dark:border-white/10 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/10 mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#19171F] dark:text-white">Recent Campaigns</h2>
            <p className="text-xs text-[#777481] dark:text-[#9590A3] mt-0.5">
              Source briefs stored in your local browser instance.
            </p>
          </div>

          <button
            onClick={onCreateNewPlan}
            className="px-4 py-2 text-xs font-bold text-[#5515E8] bg-[#5515E8]/10 hover:bg-[#5515E8] hover:text-white rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Campaign</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-5 rounded-2xl bg-[#F7F6FA] dark:bg-[#1C182B] border border-black/5 dark:border-white/5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm sm:text-base text-[#19171F] dark:text-white">
                  {camp.name}
                </h3>
                {/* Zero-pill metadata */}
                <span className="text-xs font-mono text-[#777481] dark:text-[#9590A3]">
                  {camp.draftsCount} drafts
                </span>
              </div>

              <p className="text-xs text-[#777481] dark:text-[#9590A3] line-clamp-2 leading-relaxed">
                {camp.brief}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-black/5 dark:border-white/5 text-xs text-[#777481] dark:text-[#9590A3]">
                <span>Audience: {camp.audience}</span>
                <span className="capitalize font-semibold text-[#5515E8]">Tone: {camp.tone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
