import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Info } from 'lucide-react';
import { Draft } from '../types';
import { PLATFORM_CONFIGS } from '../constants';

interface CalendarViewProps {
  drafts: Draft[];
  onOpenDraft: (draft: Draft) => void;
  onRescheduleDraft: (id: string, date: string, time?: string) => void;
  onCreateDraftForDate: (date: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  drafts,
  onOpenDraft,
  onRescheduleDraft,
  onCreateDraftForDate,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date('2026-10-21'));

  const getMonday = (d: Date) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const monday = getMonday(currentDate);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    const dateString = day.toISOString().slice(0, 10);
    return {
      date: day,
      dateString,
      dayName: day.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: day.getDate(),
      monthName: day.toLocaleDateString('en-US', { month: 'short' }),
      isToday: dateString === '2026-10-21',
    };
  });

  const nextWeek = () => {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() + 7);
    setCurrentDate(next);
  };

  const prevWeek = () => {
    const prev = new Date(currentDate);
    prev.setDate(currentDate.getDate() - 7);
    setCurrentDate(prev);
  };

  const resetToday = () => {
    setCurrentDate(new Date('2026-10-21'));
  };

  const weekRangeLabel = `${weekDays[0].monthName} ${weekDays[0].dayNumber} – ${weekDays[6].monthName} ${weekDays[6].dayNumber}, ${weekDays[0].date.getFullYear()}`;
  const unscheduledDrafts = drafts.filter((d) => !d.scheduledDate);

  return (
    <div className="space-y-6">
      
      {/* Header & Week Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#19171F]/10 dark:border-white/10">
        <div>
          <div className="text-xs font-bold tracking-[0.14em] text-[#5515E8] dark:text-[#7886F8] uppercase mb-1">
            LOCAL SCHEDULE PLANNER
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#19171F] dark:text-white">
            Weekly Content Calendar
          </h1>
          <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9E9AA8] mt-0.5">
            Plan your weekly publishing cadence locally. Ordinary touch scrolling will never accidentally reschedule a post.
          </p>
        </div>

        {/* Date Navigation Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetToday}
            className="min-h-[40px] px-3.5 py-1.5 text-xs font-bold rounded-xl border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#151221] hover:bg-[#F7F6FA] dark:hover:bg-white/10 transition-colors"
          >
            Today
          </button>

          <button
            onClick={prevWeek}
            aria-label="Previous week"
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#151221] hover:bg-[#F7F6FA] dark:hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs sm:text-sm font-bold text-[#19171F] dark:text-white px-2 tabular-nums">
            {weekRangeLabel}
          </span>

          <button
            onClick={nextWeek}
            aria-label="Next week"
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#151221] hover:bg-[#F7F6FA] dark:hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Honest Local Planning Disclosure */}
      <div className="p-4 rounded-2xl bg-[#F0EDFF] dark:bg-[#1A162B] border border-[#5515E8]/20 flex items-center gap-2.5 text-xs text-[#19171F] dark:text-gray-200">
        <Info className="w-4 h-4 text-[#5515E8] dark:text-[#7886F8] shrink-0" />
        <span>
          <strong>Local Planning Feature:</strong> Dates represent your local editorial schedule stored in this browser. Posts are not automatically published to social platforms.
        </span>
      </div>

      {/* 7-Day Weekly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {weekDays.map((day) => {
          const dayDrafts = drafts.filter((d) => d.scheduledDate === day.dateString);

          return (
            <div
              key={day.dateString}
              className={`rounded-[22px] p-3.5 border flex flex-col min-h-[340px] ${
                day.isToday
                  ? 'bg-white dark:bg-[#1B172C] border-[#5515E8]'
                  : 'bg-[#F7F6FA] dark:bg-[#141121] border-[#19171F]/10 dark:border-white/10'
              }`}
            >
              {/* Day Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#19171F]/10 dark:border-white/10">
                <div>
                  <span className="text-xs font-bold text-[#777481] dark:text-[#9E9AA8] uppercase">
                    {day.dayName}
                  </span>
                  <div
                    className={`font-display text-lg font-extrabold tabular-nums ${
                      day.isToday ? 'text-[#5515E8] dark:text-[#7886F8]' : 'text-[#19171F] dark:text-white'
                    }`}
                  >
                    {day.monthName} {day.dayNumber}
                  </div>
                </div>

                <button
                  onClick={() => onCreateDraftForDate(day.dateString)}
                  title={`Plan post for ${day.dayName}`}
                  aria-label={`Plan post for ${day.dayName}`}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#777481] hover:text-[#5515E8] hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Day Drafts */}
              <div className="space-y-2.5 flex-1">
                {dayDrafts.map((draft) => {
                  const cfg = PLATFORM_CONFIGS[draft.platform];
                  return (
                    <div
                      key={draft.id}
                      onClick={() => onOpenDraft(draft)}
                      className="p-3 rounded-xl bg-white dark:bg-[#161224] border border-[#19171F]/10 dark:border-white/10 hover:border-[#5515E8] cursor-pointer transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#5515E8] dark:text-[#7886F8]">
                          {cfg.shortLabel}
                        </span>
                        {draft.scheduledTime && (
                          <span className="text-[#777481] dark:text-[#9E9AA8] font-mono tabular-nums text-[10px]">
                            {draft.scheduledTime}
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-bold text-[#19171F] dark:text-white line-clamp-2 leading-snug">
                        “{draft.hook}”
                      </p>

                      <div className="text-[10px] font-mono text-[#777481] dark:text-[#9E9AA8] uppercase">
                        Status: {draft.status}
                      </div>

                      {/* Explicit Rescheduling Control (Touch-safe) */}
                      <div
                        className="pt-2 border-t border-[#19171F]/10 dark:border-white/10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          aria-label={`Reschedule ${draft.hook}`}
                          value={draft.scheduledDate || ''}
                          onChange={(e) =>
                            onRescheduleDraft(draft.id, e.target.value, draft.scheduledTime || '10:00')
                          }
                          className="w-full px-2 py-1 rounded-md border border-[#19171F]/15 dark:border-white/15 bg-[#F7F6FA] dark:bg-[#141121] text-[10px] font-bold text-[#19171F] dark:text-white"
                        >
                          {weekDays.map((wd) => (
                            <option key={wd.dateString} value={wd.dateString}>
                              Move to {wd.dayName} ({wd.monthName} {wd.dayNumber})
                            </option>
                          ))}
                          <option value="">Unschedule</option>
                        </select>
                      </div>
                    </div>
                  );
                })}

                {dayDrafts.length === 0 && (
                  <div className="h-36 flex flex-col items-center justify-center text-center p-2">
                    <span className="text-[11px] text-[#777481] dark:text-[#9E9AA8]">No posts planned</span>
                    <button
                      onClick={() => onCreateDraftForDate(day.dateString)}
                      className="mt-1 text-[11px] font-bold text-[#5515E8] dark:text-[#7886F8] hover:underline"
                    >
                      + Plan draft
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Unscheduled Drafts Tray (Allows scheduling any unscheduled draft onto the current week) */}
      <div className="bg-white dark:bg-[#151221] rounded-[24px] p-6 border border-[#19171F]/10 dark:border-white/10">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#19171F]/10 dark:border-white/10">
          <div>
            <h2 className="font-display text-base font-bold text-[#19171F] dark:text-white">
              Unscheduled Drafts ({unscheduledDrafts.length})
            </h2>
            <p className="text-xs text-[#777481] dark:text-[#9E9AA8]">
              Assign any unscheduled draft to a day in the current week.
            </p>
          </div>
        </div>

        {unscheduledDrafts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unscheduledDrafts.map((d) => {
              const cfg = PLATFORM_CONFIGS[d.platform];
              return (
                <div
                  key={d.id}
                  className="p-4 rounded-xl bg-[#F7F6FA] dark:bg-[#1C182B] border border-[#19171F]/10 dark:border-white/10 flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-bold text-[#5515E8] dark:text-[#7886F8]">
                      {cfg.name} · {d.status.toUpperCase()}
                    </div>
                    <button
                      onClick={() => onOpenDraft(d)}
                      className="mt-1 text-left font-display text-sm font-bold text-[#19171F] dark:text-white hover:underline line-clamp-2"
                    >
                      “{d.hook}”
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#19171F]/10 dark:border-white/10">
                    <span className="text-[11px] text-[#777481] dark:text-[#9E9AA8]">Assign day:</span>
                    <select
                      aria-label={`Schedule ${d.hook}`}
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          onRescheduleDraft(d.id, e.target.value, '10:00');
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg border border-[#19171F]/15 dark:border-white/15 bg-white dark:bg-[#141121] text-xs font-bold text-[#19171F] dark:text-white"
                    >
                      <option value="">Select date...</option>
                      {weekDays.map((wd) => (
                        <option key={wd.dateString} value={wd.dateString}>
                          {wd.dayName}, {wd.monthName} {wd.dayNumber}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-xs text-[#777481] dark:text-[#9E9AA8]">
            All saved drafts currently have a planned date on the calendar.
          </div>
        )}
      </div>

    </div>
  );
};
