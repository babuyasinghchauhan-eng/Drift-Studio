import React, { useState } from 'react';
import { Plus, Search, Filter, Copy, Check, MoreVertical, Edit3, Trash2, ArrowRight } from 'lucide-react';
import { Draft, ContentStatus, Platform } from '../types';
import { PLATFORM_CONFIGS } from '../constants';
import { StorageService } from '../services/storage';

interface ContentBoardViewProps {
  drafts: Draft[];
  onOpenDraft: (draft: Draft) => void;
  onUpdateDraftStatus: (id: string, newStatus: ContentStatus) => void;
  onDeleteDraft: (id: string) => void;
  onDuplicateDraft: (draft: Draft) => void;
  onCreateDraftInStage: (stage: ContentStatus) => void;
}

const STAGES: { id: ContentStatus; label: string; color: string }[] = [
  { id: 'idea', label: 'Idea Stage', color: 'border-t-[#7886F8]' },
  { id: 'draft', label: 'Drafting', color: 'border-t-[#5515E8]' },
  { id: 'review', label: 'In Review', color: 'border-t-[#FF7A30]' },
  { id: 'ready', label: 'Ready to Publish', color: 'border-t-emerald-500' },
];

export const ContentBoardView: React.FC<ContentBoardViewProps> = ({
  drafts,
  onOpenDraft,
  onUpdateDraftStatus,
  onDeleteDraft,
  onDuplicateDraft,
  onCreateDraftInStage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredDrafts = drafts.filter((d) => {
    const matchesSearch =
      d.hook.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.campaignName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || d.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  const handleCopy = async (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    const success = await StorageService.copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header and Search/Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/5 dark:border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#19171F] dark:text-white">
            Content Board
          </h1>
          <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9590A3] mt-0.5">
            Progress drafts through editorial review: Idea → Draft → Review → Ready.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#777481] dark:text-[#9590A3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drafts..."
              className="pl-8 pr-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#151222] text-xs focus:outline-none focus:ring-2 focus:ring-[#5515E8] w-48"
            />
          </div>

          {/* Platform filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#151222] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
          >
            <option value="all">All Platforms</option>
            <option value="x">X (Twitter)</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
            <option value="threads">Threads</option>
            <option value="youtube_shorts">Shorts/Reels</option>
            <option value="reddit">Reddit</option>
          </select>
        </div>
      </div>

      {/* 4-Stage Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
        {STAGES.map((stage) => {
          const stageDrafts = filteredDrafts.filter((d) => d.status === stage.id);

          return (
            <div
              key={stage.id}
              className={`bg-[#F7F6FA] dark:bg-[#141121] rounded-3xl p-4 border border-black/5 dark:border-white/10 border-t-4 ${stage.color} flex flex-col min-h-[500px]`}
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#19171F] dark:text-white">
                    {stage.label}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white dark:bg-[#1C182B] text-[#777481] dark:text-[#9590A3] font-semibold">
                    {stageDrafts.length}
                  </span>
                </div>

                <button
                  onClick={() => onCreateDraftInStage(stage.id)}
                  title={`Add card to ${stage.label}`}
                  className="p-1 rounded-lg text-[#777481] hover:text-[#5515E8] dark:hover:text-white hover:bg-white dark:hover:bg-[#1C182B] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Cards in Column */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[680px]">
                {stageDrafts.map((draft) => {
                  const cfg = PLATFORM_CONFIGS[draft.platform];
                  return (
                    <div
                      key={draft.id}
                      onClick={() => onOpenDraft(draft)}
                      className="p-4 rounded-2xl bg-white dark:bg-[#1B172C] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md hover:border-[#5515E8]/40 cursor-pointer transition-all space-y-3 group"
                    >
                      {/* Card Top: Platform & Actions */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold flex items-center gap-1.5 text-[#19171F] dark:text-white">
                          <span className={`w-2 h-2 rounded-full ${cfg.textColor}`} />
                          {cfg.shortLabel}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => handleCopy(e, draft.body, draft.id)}
                            title="Copy draft"
                            className="p-1 rounded-md text-[#777481] hover:text-[#19171F] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                          >
                            {copiedId === draft.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Hook & Snippet */}
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-[#19171F] dark:text-white group-hover:text-[#5515E8] transition-colors leading-snug line-clamp-2">
                          "{draft.hook}"
                        </div>
                        <p className="text-xs text-[#777481] dark:text-[#9590A3] line-clamp-3 mt-1 leading-relaxed">
                          {draft.body}
                        </p>
                      </div>

                      {/* Campaign Name */}
                      <div className="text-[11px] text-[#777481] dark:text-[#9590A3] truncate">
                        {draft.campaignName}
                      </div>

                      {/* Card Bottom: Quick Stage Mover (Accessible alternative to drag-and-drop) */}
                      <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs" onClick={(e) => e.stopPropagation()}>
                        <span className="text-[11px] text-[#777481] dark:text-[#9590A3]">Move:</span>
                        <select
                          value={draft.status}
                          onChange={(e) => onUpdateDraftStatus(draft.id, e.target.value as ContentStatus)}
                          className="px-2 py-0.5 rounded-lg border border-black/10 dark:border-white/10 bg-[#F7F6FA] dark:bg-[#141121] text-[11px] font-semibold text-[#19171F] dark:text-white"
                        >
                          <option value="idea">Idea</option>
                          <option value="draft">Draft</option>
                          <option value="review">Review</option>
                          <option value="ready">Ready</option>
                        </select>
                      </div>
                    </div>
                  );
                })}

                {stageDrafts.length === 0 && (
                  <div className="py-12 text-center text-xs text-[#777481] dark:text-[#9590A3]">
                    No drafts in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
