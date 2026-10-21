import React from 'react';
import { Plus, Clock, Calendar, ArrowRight, KanbanSquare } from 'lucide-react';
import { Campaign, Draft, ContentStatus } from '../types';
import { PLATFORM_CONFIGS } from '../constants';

interface DashboardViewProps {
  campaigns: Campaign[];
  drafts: Draft[];
  onCreateNewPlan: () => void;
  onOpenDraft: (draft: Draft) => void;
  onNavigateTab: (tab: 'board' | 'calendar' | 'create' | 'drafts') => void;
}

const BOARD_STAGE_SUMMARY: { id: ContentStatus; label: string }[] = [
  { id: 'idea', label: '01. Idea' },
  { id: 'draft', label: '02. Draft' },
  { id: 'review', label: '03. Review' },
  { id: 'ready', label: '04. Ready' },
];

export const DashboardView: React.FC<DashboardViewProps> = ({
  campaigns,
  drafts,
  onCreateNewPlan,
  onOpenDraft,
  onNavigateTab,
}) => {
  const totalDraftsCount = drafts.length;
  const reviewCount = drafts.filter((d) => d.status === 'review').length;
  const readyCount = drafts.filter((d) => d.status === 'ready').length;
  const scheduledDrafts = drafts
    .filter((d) => Boolean(d.scheduledDate))
    .sort((a, b) => (a.scheduledDate || '').localeCompare(b.scheduledDate || ''));

  const awaitingReviewDrafts = drafts.filter((d) => d.status === 'review').slice(0, 4);

  return (
    <div className="space-y-8">
      
      {/* Top Greeting Bar + Prominent "New content plan" Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#19171F]/10 dark:border-white/10">
        <div>
          <div className="text-xs font-bold tracking-[0.14em] text-[#5515E8] dark:text-[#7886F8] uppercase mb-1">
            CONTENT WORKSPACE
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#19171F] dark:text-white">
            Welcome back to Drift Studio
          </h1>
          <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9E9AA8] mt-1">
            Your campaigns, platform drafts, and weekly schedule — stored locally in your browser.
          </p>
        </div>

        <button
          onClick={onCreateNewPlan}
          className="min-h-[44px] px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#5515E8] hover:bg-[#35108F] active:translate-y-px rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New content plan</span>
        </button>
      </div>

      {/* Real Local Application Data Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#151221] border border-[#19171F]/10 dark:border-white/10">
          <div className="text-xs font-semibold text-[#777481] dark:text-[#9E9AA8]">Saved Campaigns</div>
          <div className="font-display mt-2 text-2xl sm:text-3xl font-extrabold text-[#19171F] dark:text-white tabular-nums">
            {campaigns.length}
          </div>
          <div className="mt-1.5 text-[11px] text-[#777481] dark:text-[#9E9AA8]">Active in local storage</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#151221] border border-[#19171F]/10 dark:border-white/10">
          <div className="text-xs font-semibold text-[#777481] dark:text-[#9E9AA8]">Total Saved Drafts</div>
          <div className="font-display mt-2 text-2xl sm:text-3xl font-extrabold text-[#5515E8] dark:text-[#7886F8] tabular-nums">
            {totalDraftsCount}
          </div>
          <div className="mt-1.5 text-[11px] text-[#777481] dark:text-[#9E9AA8]">Across all platforms</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#151221] border border-[#19171F]/10 dark:border-white/10">
          <div className="text-xs font-semibold text-[#777481] dark:text-[#9E9AA8]">Awaiting Review</div>
          <div className="font-display mt-2 text-2xl sm:text-3xl font-extrabold text-[#FF7A30] tabular-nums">
            {reviewCount}
          </div>
          <div className="mt-1.5 text-[11px] text-[#777481] dark:text-[#9E9AA8]">Ready for editorial pass</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#151221] border border-[#19171F]/10 dark:border-white/10">
          <div className="text-xs font-semibold text-[#777481] dark:text-[#9E9AA8]">Locally Scheduled</div>
          <div className="font-display mt-2 text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
            {scheduledDrafts.length}
          </div>
          <div className="mt-1.5 text-[11px] text-[#777481] dark:text-[#9E9AA8]">{readyCount} marked Ready</div>
        </div>
      </div>

      {/* Content Board Preview Strip */}
      <div className="bg-white dark:bg-[#151221] rounded-[24px] p-6 border border-[#19171F]/10 dark:border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#19171F]/10 dark:border-white/10 mb-5">
          <div className="flex items-center gap-2">
            <KanbanSquare className="w-4 h-4 text-[#5515E8] dark:text-[#7886F8]" />
            <h2 className="font-display text-base sm:text-lg font-bold text-[#19171F] dark:text-white">
              Content Board Preview
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('board')}
            className="text-xs font-bold text-[#5515E8] dark:text-[#7886F8] hover:underline flex items-center gap-1"
          >
            <span>Open Full Board</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BOARD_STAGE_SUMMARY.map((stage) => {
            const stageItems = drafts.filter((d) => d.status === stage.id);
            return (
              <div
                key={stage.id}
                className="p-4 rounded-xl bg-[#F7F6FA] dark:bg-[#1C182B] border border-[#19171F]/10 dark:border-white/10 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#19171F] dark:text-white pb-2 border-b border-[#19171F]/10 dark:border-white/10">
                  <span>{stage.label}</span>
                  <span className="font-mono tabular-nums text-[#5515E8] dark:text-[#7886F8]">
                    {stageItems.length}
                  </span>
                </div>

                {stageItems.length > 0 ? (
                  <div className="mt-3 space-y-2">
                    {stageItems.slice(0, 2).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onOpenDraft(item)}
                        className="w-full text-left text-xs text-[#19171F] dark:text-gray-200 hover:text-[#5515E8] dark:hover:text-[#7886F8] truncate block font-medium"
                      >
                        • {PLATFORM_CONFIGS[item.platform].shortLabel}: {item.hook}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3 text-xs text-[#777481] dark:text-[#9E9AA8]">Empty stage</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Split: Drafts Awaiting Review & Upcoming Local Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Drafts Awaiting Review */}
        <div className="lg:col-span-7 bg-white dark:bg-[#151221] rounded-[24px] p-6 border border-[#19171F]/10 dark:border-white/10">
          <div className="flex items-center justify-between pb-4 border-b border-[#19171F]/10 dark:border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FF7A30]" />
              <h2 className="font-display text-base sm:text-lg font-bold text-[#19171F] dark:text-white">
                Drafts Awaiting Review ({reviewCount})
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('board')}
              className="text-xs font-bold text-[#5515E8] dark:text-[#7886F8] hover:underline flex items-center gap-1"
            >
              <span>Review on Board</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {awaitingReviewDrafts.length > 0 ? (
            <div className="divide-y divide-[#19171F]/10 dark:divide-white/10">
              {awaitingReviewDrafts.map((d) => {
                const config = PLATFORM_CONFIGS[d.platform];
                return (
                  <button
                    key={d.id}
                    onClick={() => onOpenDraft(d)}
                    className="w-full text-left py-4 first:pt-1 last:pb-1 hover:bg-[#F7F6FA]/60 dark:hover:bg-white/5 px-2 rounded-xl transition-colors group"
                  >
                    <div className="flex items-center justify-between text-xs text-[#777481] dark:text-[#9E9AA8] mb-1">
                      <span>
                        <strong className="text-[#19171F] dark:text-white">{config.name}</strong> · {d.campaignName}
                      </span>
                      <span className="font-bold text-[#5515E8] dark:text-[#7886F8]">Inspect →</span>
                    </div>
                    <p className="text-sm font-bold text-[#19171F] dark:text-white group-hover:text-[#5515E8] dark:group-hover:text-[#7886F8] transition-colors line-clamp-2">
                      “{d.hook}”
                    </p>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center space-y-3">
              <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9E9AA8]">
                No drafts are currently waiting in the Review stage.
              </p>
              <button
                onClick={onCreateNewPlan}
                className="px-4 py-2 text-xs font-bold text-[#5515E8] bg-[#F0EDFF] rounded-lg"
              >
                Create a new campaign plan
              </button>
            </div>
          )}
        </div>

        {/* Right Column (5 cols): Upcoming Locally Scheduled Content */}
        <div className="lg:col-span-5 bg-white dark:bg-[#151221] rounded-[24px] p-6 border border-[#19171F]/10 dark:border-white/10">
          <div className="flex items-center justify-between pb-4 border-b border-[#19171F]/10 dark:border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#5515E8] dark:text-[#7886F8]" />
              <h2 className="font-display text-base sm:text-lg font-bold text-[#19171F] dark:text-white">
                Upcoming Local Schedule
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('calendar')}
              className="text-xs font-bold text-[#5515E8] dark:text-[#7886F8] hover:underline flex items-center gap-1"
            >
              <span>Weekly Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {scheduledDrafts.length > 0 ? (
            <div className="divide-y divide-[#19171F]/10 dark:divide-white/10">
              {scheduledDrafts.slice(0, 5).map((d) => {
                const config = PLATFORM_CONFIGS[d.platform];
                return (
                  <button
                    key={d.id}
                    onClick={() => onOpenDraft(d)}
                    className="w-full text-left py-3.5 first:pt-1 last:pb-1 hover:bg-[#F7F6FA]/60 dark:hover:bg-white/5 px-2 rounded-xl transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#19171F] dark:text-white truncate">
                        {config.shortLabel} · {d.hook}
                      </div>
                      <div className="text-[11px] font-mono text-[#777481] dark:text-[#9E9AA8] mt-0.5 tabular-nums">
                        Planned: {d.scheduledDate} {d.scheduledTime ? `at ${d.scheduledTime}` : ''}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#5515E8] dark:text-[#7886F8] shrink-0">Edit</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center space-y-3">
              <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9E9AA8]">
                No local dates assigned yet. Open any draft or visit the Weekly Calendar to plan your week.
              </p>
              <button
                onClick={() => onNavigateTab('calendar')}
                className="px-4 py-2 text-xs font-bold text-[#5515E8] bg-[#F0EDFF] rounded-lg"
              >
                Open Weekly Calendar
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Recent Campaigns Section */}
      <div className="bg-white dark:bg-[#151221] rounded-[24px] p-6 sm:p-8 border border-[#19171F]/10 dark:border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#19171F]/10 dark:border-white/10 mb-6">
          <div>
            <h2 className="font-display text-lg font-bold text-[#19171F] dark:text-white">
              Recent Campaigns
            </h2>
            <p className="text-xs text-[#777481] dark:text-[#9E9AA8] mt-0.5">
              Campaign briefs persisted in your browser storage.
            </p>
          </div>

          <button
            onClick={onCreateNewPlan}
            className="px-4 py-2 text-xs font-bold text-[#5515E8] dark:text-[#7886F8] bg-[#F0EDFF] dark:bg-[#5515E8]/20 hover:bg-[#5515E8] hover:text-white rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Campaign</span>
          </button>
        </div>

        {campaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className="p-5 rounded-2xl bg-[#F7F6FA] dark:bg-[#1C182B] border border-[#19171F]/10 dark:border-white/10 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-base text-[#19171F] dark:text-white">
                      {camp.name}
                    </h3>
                    <span className="text-xs font-mono tabular-nums text-[#5515E8] dark:text-[#7886F8] font-bold">
                      {camp.draftsCount} drafts
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9E9AA8] line-clamp-2 leading-relaxed mt-1.5">
                    {camp.brief}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#19171F]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#777481] dark:text-[#9E9AA8]">
                  <span>Audience: {camp.audience}</span>
                  <span className="capitalize font-semibold text-[#19171F] dark:text-white">
                    Tone: {camp.tone}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center space-y-3">
            <p className="text-sm text-[#777481] dark:text-[#9E9AA8]">
              No campaigns created yet. Start your first content plan to generate platform-specific drafts.
            </p>
            <button
              onClick={onCreateNewPlan}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#5515E8] rounded-xl"
            >
              Create my first plan
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
