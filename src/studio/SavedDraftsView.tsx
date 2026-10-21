import React, { useState } from 'react';
import { Search, Download, Trash2, Copy, Check, Plus } from 'lucide-react';
import { Draft } from '../types';
import { PLATFORM_CONFIGS } from '../constants';
import { StorageService } from '../services/storage';

interface SavedDraftsViewProps {
  drafts: Draft[];
  onOpenDraft: (draft: Draft) => void;
  onDeleteDraft: (id: string) => void;
  onCreateNewPlan: () => void;
}

export const SavedDraftsView: React.FC<SavedDraftsViewProps> = ({
  drafts,
  onOpenDraft,
  onDeleteDraft,
  onCreateNewPlan,
}) => {
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const filtered = drafts.filter((d) => {
    const matchesSearch =
      d.hook.toLowerCase().includes(search.toLowerCase()) ||
      d.body.toLowerCase().includes(search.toLowerCase()) ||
      d.campaignName.toLowerCase().includes(search.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || d.platform === platformFilter;
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const handleCopy = async (text: string, id: string) => {
    const success = await StorageService.copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const triggerExport = (format: 'csv' | 'txt' | 'json') => {
    if (format === 'csv') {
      StorageService.exportDraftsToCSV(filtered);
      setExportNotice(`Exported ${filtered.length} drafts as CSV`);
    } else if (format === 'txt') {
      StorageService.exportDraftsToText(filtered);
      setExportNotice(`Downloaded ${filtered.length} drafts as TXT`);
    } else if (format === 'json') {
      const campaigns = StorageService.loadCampaigns();
      StorageService.exportToJSON(campaigns, filtered);
      setExportNotice(`Exported ${filtered.length} drafts as JSON`);
    }
    setTimeout(() => setExportNotice(null), 2800);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Export Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#19171F]/10 dark:border-white/10">
        <div>
          <div className="text-xs font-bold tracking-[0.14em] text-[#5515E8] dark:text-[#7886F8] uppercase mb-1">
            DRAFTS REPOSITORY & EXPORTS
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#19171F] dark:text-white">
            Saved Drafts ({drafts.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9E9AA8] mt-0.5">
            Search, filter, edit, or export your drafts in CSV, JSON, or plain-text format.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => triggerExport('txt')}
            className="px-3.5 py-2 text-xs font-bold rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#151221] hover:bg-[#F7F6FA] dark:hover:bg-white/10 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>TXT</span>
          </button>

          <button
            onClick={() => triggerExport('csv')}
            className="px-3.5 py-2 text-xs font-bold rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#151221] hover:bg-[#F7F6FA] dark:hover:bg-white/10 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>

          <button
            onClick={() => triggerExport('json')}
            className="px-3.5 py-2 text-xs font-bold rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#151221] hover:bg-[#F7F6FA] dark:hover:bg-white/10 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>

          <button
            onClick={onCreateNewPlan}
            className="px-4 py-2 text-xs font-bold text-white bg-[#5515E8] hover:bg-[#35108F] rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Plan</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div
          role="status"
          className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-[#777481] dark:text-[#9E9AA8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Search all drafts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hooks, body copy, or campaign name..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#151221] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#5515E8]"
          />
        </div>

        <select
          aria-label="Filter by platform"
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#151221] text-xs sm:text-sm font-bold"
        >
          <option value="all">All Platforms</option>
          <option value="x">X (Twitter)</option>
          <option value="linkedin">LinkedIn</option>
          <option value="instagram">Instagram</option>
          <option value="threads">Threads</option>
          <option value="youtube_shorts">Shorts & Reels</option>
          <option value="reddit">Reddit</option>
        </select>

        <select
          aria-label="Filter by stage"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#151221] text-xs sm:text-sm font-bold"
        >
          <option value="all">All Stages</option>
          <option value="idea">Idea</option>
          <option value="draft">Draft</option>
          <option value="review">Review</option>
          <option value="ready">Ready</option>
        </select>
      </div>

      {/* Drafts List Table */}
      <div className="bg-white dark:bg-[#151221] rounded-[24px] border border-[#19171F]/10 dark:border-white/10 overflow-hidden">
        <div className="divide-y divide-[#19171F]/10 dark:divide-white/10">
          {filtered.map((d) => {
            const cfg = PLATFORM_CONFIGS[d.platform];
            return (
              <div
                key={d.id}
                onClick={() => onOpenDraft(d)}
                className="p-5 hover:bg-[#F7F6FA] dark:hover:bg-[#1B172C] transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#777481] dark:text-[#9E9AA8]">
                    <span className="font-bold text-[#5515E8] dark:text-[#7886F8]">
                      {cfg.name}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-[#19171F] dark:text-white truncate">
                      {d.campaignName}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono uppercase">{d.status}</span>
                    {d.scheduledDate && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">Planned: {d.scheduledDate}</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-display text-sm sm:text-base font-bold text-[#19171F] dark:text-white truncate">
                    “{d.hook}”
                  </h3>

                  <p className="text-xs text-[#777481] dark:text-[#9E9AA8] line-clamp-1">
                    {d.body}
                  </p>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleCopy(d.body, d.id)}
                    className="p-2 rounded-xl text-[#777481] hover:text-[#19171F] dark:text-[#9E9AA8] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    title="Copy draft"
                    aria-label="Copy draft"
                  >
                    {copiedId === d.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => onOpenDraft(d)}
                    className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-[#5515E8]/10 text-[#5515E8] dark:text-[#7886F8] hover:bg-[#5515E8] hover:text-white transition-colors"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDeleteDraft(d.id)}
                    className="p-2 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Delete draft"
                    aria-label="Delete draft"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="p-12 text-center text-xs sm:text-sm text-[#777481] dark:text-[#9E9AA8]">
              No drafts match your current search or filter criteria.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
