import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Plus, Info } from 'lucide-react';
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
  // Current viewing date anchor (defaults to Oct 21, 2026 or current system date)
  const [currentDate, setCurrentDate] = useState<Date>(new Date('2026-10-21'));

  // Calculate the Monday of the current viewing week
  const getMonday = (d: Date) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const monday = getMonday(currentDate);

  // Generate 7 days for the week
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
      isToday: day.toISOString().slice(0, 10) === '2026-10-21',
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

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Calendar Controls & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5 dark:border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#19171F] dark:text-white flex items-center gap-2">
            Weekly Content Calendar
          </h1>
          <p className="text-xs sm:text-sm text-[#777481] dark:text-[#9590A3] mt-0.5">
            Local publishing plan. Keeps your release cadence organized without third-party bots.
          </p>
        </div>

        {/* Date Navigation Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetToday}
            className="px-3 py-1.5 text-xs font-bold rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#151222] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Today
          </button>

          <button
            onClick={prevWeek}
            aria-label="Previous week"
            className="p-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#151222] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs sm:text-sm font-bold text-[#19171F] dark:text-white px-2">
            {weekRangeLabel}
          </span>

          <button
            onClick={nextWeek}
            aria-label="Next week"
            className="p-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#151222] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Honest Local Planning Disclosure Banner */}
      <div className="p-3.5 rounded-2xl bg-[#F0EDFF] dark:bg-[#1A162B] border border-[#5515E8]/20 flex items-center gap-2 text-xs text-[#5515E8] dark:text-[#B197FC]">
        <Info className="w-4 h-4 shrink-0" />
        <span>
          <strong>Local Editorial Calendar:</strong> Dates and times represent your personal planning schedule. Drift does not automatically transmit posts to third-party social networks.
        </span>
      </div>

      {/* 7-Day Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {weekDays.map((day) => {
          const dayDrafts = drafts.filter((d) => d.scheduledDate === day.dateString);

          return (
            <div
              key={day.dateString}
              className={`rounded-3xl p-3.5 border flex flex-col min-h-[380px] transition-all ${
                day.isToday
                  ? 'bg-white dark:bg-[#1B172C] border-[#5515E8] shadow-md shadow-[#5515E8]/10'
                  : 'bg-[#F7F6FA] dark:bg-[#141121] border-black/5 dark:border-white/10'
              }`}
            >
              {/* Day Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/5 dark:border-white/5">
                <div>
                  <span className="text-xs font-bold text-[#777481] dark:text-[#9590A3] uppercase">
                    {day.dayName}
                  </span>
                  <div className={`text-lg font-black ${day.isToday ? 'text-[#5515E8]' : 'text-[#19171F] dark:text-white'}`}>
                    {day.dayNumber}
                  </div>
                </div>

                <button
                  onClick={() => onCreateDraftForDate(day.dateString)}
                  title="Plan post for this day"
                  className="p-1 rounded-lg text-[#777481] hover:text-[#5515E8] hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Day Drafts List */}
              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {dayDrafts.map((draft) => {
                  const cfg = PLATFORM_CONFIGS[draft.platform];
                  return (
                    <div
                      key={draft.id}
                      onClick={() => onOpenDraft(draft)}
                      className="p-3 rounded-2xl bg-white dark:bg-[#161224] border border-black/5 dark:border-white/5 shadow-sm hover:border-[#5515E8] cursor-pointer transition-all space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold flex items-center gap-1 text-[#19171F] dark:text-white">
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.textColor}`} />
                          {cfg.shortLabel}
                        </span>
                        {draft.scheduledTime && (
                          <span className="text-[#777481] dark:text-[#9590A3] font-mono text-[10px]">
                            {draft.scheduledTime}
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-semibold text-[#19171F] dark:text-white line-clamp-2 leading-snug">
                        "{draft.hook}"
                      </p>

                      <div className="text-[10px] text-[#5515E8] font-medium pt-1 border-t border-black/5 dark:border-white/5">
                        {draft.status.toUpperCase()}
                      </div>
                    </div>
                  );
                })}

                {dayDrafts.length === 0 && (
                  <div className="h-full flex items-center justify-center text-[11px] text-[#777481]/60 dark:text-[#9590A3]/60 italic">
                    No posts planned
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
