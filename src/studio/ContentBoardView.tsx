import React, { useState } from 'react';
import { Plus, Search, Copy, Check, Trash2, Files } from 'lucide-react';
import { Draft, ContentStatus } from '../types';
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

const STAGES: { id: ContentStatus; indexLabel: string; label: string }[] = [
  { id: 'idea', indexLabel: '01', label: 'Idea' },
  { id: 'draft', indexLabel: '02', label: 'Draft' },
  { id: 'review', indexLabel: '03', label: 'Review' },
  { id: 'ready', indexLabel: '04', label: 'Ready' },
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
    <div className="space-y-6">
      
      {/* Header and Search/Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#19171F]/10 dark:border-white/10">
        <div>
          <div className="text-xs font-bold tracking-[0.14em] text-[#5515E8] dark:text-[#7886F8] uppercase mb-1">
            WORKFLOW BOARD
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#19171F] dark:text-white">
            Content Board
          </h1>
          <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9E9AA8] mt-0.5">
            Move drafts across stages (Idea → Draft → Review → Ready) or click any card to edit inline.
          </p>
        </div>

        {/* Search & Platform Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#777481] dark:text-[#9E9AA8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Search drafts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drafts..."
              className="pl-9 pr-3 py-2 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#151221] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#5515E8] w-48 sm:w-56"
            />
          </div>

          <select
            aria-label="Filter by platform"
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#151221] text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
          >
            <option value="all">All Platforms</option>
            <option value="x">X (Twitter)</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
            <option value="threads">Threads</option>
            <option value="youtube_shorts">Shorts & Reels</option>
            <option value="reddit">Reddit / Community</option>
          </select>
        </div>
      </div>

      {/* 4-Stage Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
        {STAGES.map((stage) => {
          const stageDrafts = filteredDrafts.filter((d) => d.status === stage.id);

          return (
            <div
              key={stage.id}
              className="bg-[#F7F6FA] dark:bg-[#141121] rounded-[24px] p-4 border border-[#19171F]/10 dark:border-white/10 flex flex-col min-h-[480px]"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#19171F]/10 dark:border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-bold text-[#5515E8] dark:text-[#7886F8]">
                    {stage.indexLabel}
                  </span>
                  <h2 className="font-display font-bold text-base text-[#19171F] dark:text-white">
                    {stage.label}
                  </h2>
                  <span className="text-xs font-mono tabular-nums text-[#777481] dark:text-[#9E9AA8]">
                    ({stageDrafts.length})
                  </span>
                </div>

                <button
                  onClick={() => onCreateDraftInStage(stage.id)}
                  aria-label={`Add draft in ${stage.label} stage`}
                  title={`New draft in ${stage.label}`}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#777481] hover:text-[#5515E8] dark:hover:text-white hover:bg-white dark:hover:bg-[#1C182B] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Stage Cards */}
              <div className="space-y-3 flex-1">
                {stageDrafts.map((draft) => {
                  const cfg = PLATFORM_CONFIGS[draft.platform];
                  return (
                    <div
                      key={draft.id}
                      onClick={() => onOpenDraft(draft)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onOpenDraft(draft);
                        }
                      }}
                      className="p-4 rounded-2xl bg-white dark:bg-[#1B172C] border border-[#19171F]/10 dark:border-white/10 hover:border-[#5515E8] cursor-pointer transition-all space-y-2.5 group"
                    >
                      {/* Top Metadata Row + Quick Actions */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#5515E8] dark:text-[#7886F8]">
                          {cfg.shortLabel}
                        </span>

                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleCopy(e, draft.body, draft.id)}
                            title="Copy draft text"
                            aria-label="Copy draft text"
                            className="p-1.5 rounded-md text-[#777481] hover:text-[#19171F] dark:hover:text-white hover:bg-[#F7F6FA] dark:hover:bg-white/10"
                          >
                            {copiedId === draft.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <button
                            onClick={() => onDuplicateDraft(draft)}
                            title="Duplicate draft"
                            aria-label="Duplicate draft"
                            className="p-1.5 rounded-md text-[#777481] hover:text-[#19171F] dark:hover:text-white hover:bg-[#F7F6FA] dark:hover:bg-white/10"
                          >
                            <Files className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onDeleteDraft(draft.id)}
                            title="Delete draft"
                            aria-label="Delete draft"
                            className="p-1.5 rounded-md text-[#777481] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Hook & Body Preview */}
                      <div>
                        <div className="font-display text-sm font-bold text-[#19171F] dark:text-white group-hover:text-[#5515E8] dark:group-hover:text-[#7886F8] transition-colors leading-snug line-clamp-2">
                          “{draft.hook}”
                        </div>
                        <p className="text-xs text-[#777481] dark:text-[#9E9AA8] line-clamp-2 mt-1 leading-relaxed">
                          {draft.body}
                        </p>
                      </div>

                      {/* Campaign Metadata */}
                      <div className="text-[11px] text-[#777481] dark:text-[#9E9AA8] truncate">
                        {draft.campaignName}
                        {draft.scheduledDate ? ` · ${draft.scheduledDate}` : ''}
                      </div>

                      {/* Accessible Stage Mover Control */}
                      <div
                        className="pt-2.5 border-t border-[#19171F]/10 dark:border-white/10 flex items-center justify-between text-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <label
                          htmlFor={`stage-select-${draft.id}`}
                          className="text-[11px] text-[#777481] dark:text-[#9E9AA8]"
                        >
                          Stage:
                        </label>
                        <select
                          id={`stage-select-${draft.id}`}
                          value={draft.status}
                          onChange={(e) => onUpdateDraftStatus(draft.id, e.target.value as ContentStatus)}
                          className="px-2.5 py-1 rounded-lg border border-[#19171F]/15 dark:border-white/15 bg-[#F7F6FA] dark:bg-[#141121] text-xs font-bold text-[#19171F] dark:text-white"
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
                  <div className="py-12 px-4 text-center space-y-2">
                    <p className="text-xs text-[#777481] dark:text-[#9E9AA8]">No drafts in {stage.label}</p>
                    <button
                      onClick={() => onCreateDraftInStage(stage.id)}
                      className="text-xs font-bold text-[#5515E8] dark:text-[#7886F8] hover:underline"
                    >
                      + Add draft here
                    </button>
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
