import React from 'react';
import { PenTool, Cpu, KanbanSquare, ArrowRight } from 'lucide-react';

interface WorkflowSectionProps {
  onStartWorkflow: () => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onStartWorkflow }) => {
  return (
    <section id="scene-workflow" className="py-20 sm:py-28 bg-[#F7F6FA] dark:bg-[#12101C] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-widest text-[#5515E8] uppercase mb-3">
            04 · The Three-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#19171F] dark:text-white leading-[1.1]">
            How Drift handles
            <br />
            the busywork.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#777481] dark:text-[#9590A3] font-normal leading-relaxed">
            From the initial spark to your weekly calendar in less than three minutes.
          </p>
        </div>

        {/* 3 Distinct Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 01: Capture an idea */}
          <div className="relative bg-white dark:bg-[#1A1728] rounded-3xl p-8 border border-black/10 dark:border-white/10 shadow-sm flex flex-col justify-between overflow-hidden">
            {/* Oversized editorial number */}
            <div className="text-6xl sm:text-7xl font-black text-[#5515E8]/15 dark:text-[#5515E8]/25 select-none leading-none mb-4">
              01
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#5515E8] uppercase mb-2">
                <PenTool className="w-4 h-4" />
                <span>The Input</span>
              </div>
              <h3 className="text-2xl font-bold text-[#19171F] dark:text-white">
                Capture an idea.
              </h3>
              <p className="mt-3 text-sm text-[#777481] dark:text-[#9590A3] leading-relaxed">
                Enter your raw notes, project milestone, or contrarian thesis. Select your target platforms, tone, and audience. No prompt engineering needed.
              </p>
            </div>

            {/* Visual Mini Graphic */}
            <div className="mt-6 p-4 rounded-2xl bg-[#F0EDFF] dark:bg-[#251F3D] border border-[#5515E8]/20 text-xs font-mono text-[#5515E8] dark:text-[#B197FC]">
              input.brief = "Open-source CLI for type-safe SQL migrations"
            </div>
          </div>

          {/* Step 02: Let open AI build the first draft */}
          <div className="relative bg-white dark:bg-[#1A1728] rounded-3xl p-8 border border-[#FF4FA3]/30 dark:border-[#FF4FA3]/30 shadow-md flex flex-col justify-between overflow-hidden">
            {/* Oversized editorial number */}
            <div className="text-6xl sm:text-7xl font-black text-[#FF4FA3]/15 dark:text-[#FF4FA3]/25 select-none leading-none mb-4">
              02
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#FF4FA3] uppercase mb-2">
                <Cpu className="w-4 h-4" />
                <span>Open-Weight Synthesis</span>
              </div>
              <h3 className="text-2xl font-bold text-[#19171F] dark:text-white">
                Build the first draft.
              </h3>
              <p className="mt-3 text-sm text-[#777481] dark:text-[#9590A3] leading-relaxed">
                The open-weight model adapts the core message into platform-native formats: punchy X hooks, structured LinkedIn narratives, or IG carousel outlines.
              </p>
            </div>

            {/* Visual Mini Graphic */}
            <div className="mt-6 p-4 rounded-2xl bg-[#FF4FA3]/10 text-xs font-mono text-[#FF4FA3] flex items-center justify-between">
              <span>inference: complete</span>
              <span className="font-bold">5 drafts ready</span>
            </div>
          </div>

          {/* Step 03: Review, organize, and move on */}
          <div className="relative bg-white dark:bg-[#1A1728] rounded-3xl p-8 border border-black/10 dark:border-white/10 shadow-sm flex flex-col justify-between overflow-hidden">
            {/* Oversized editorial number */}
            <div className="text-6xl sm:text-7xl font-black text-[#FF7A30]/15 dark:text-[#FF7A30]/25 select-none leading-none mb-4">
              03
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#FF7A30] uppercase mb-2">
                <KanbanSquare className="w-4 h-4" />
                <span>The Cadence</span>
              </div>
              <h3 className="text-2xl font-bold text-[#19171F] dark:text-white">
                Review & organize.
              </h3>
              <p className="mt-3 text-sm text-[#777481] dark:text-[#9590A3] leading-relaxed">
                Edit inline, tweak hooks, move cards across your board (Idea → Draft → Review → Ready), schedule to your weekly planner, and export.
              </p>
            </div>

            {/* Visual Mini Graphic */}
            <div className="mt-6 p-4 rounded-2xl bg-[#FF7A30]/10 text-xs font-mono text-[#FF7A30] flex items-center justify-between">
              <span>calendar: scheduled</span>
              <span className="font-bold">Next: Wed 09:30</span>
            </div>
          </div>

        </div>

        {/* Bottom CTA trigger */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartWorkflow}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-[#19171F] dark:bg-white dark:text-[#19171F] hover:bg-[#5515E8] dark:hover:bg-[#5515E8] dark:hover:text-white rounded-2xl transition-all shadow-md"
          >
            <span>Run the 3-step workflow now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
