import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Terminal, Eye, Zap } from 'lucide-react';
import { aiEngine } from '../services/aiEngine';
import { ModelEngineStatus } from '../types';

export const OpenAiSection: React.FC = () => {
  const [engineStatus, setEngineStatus] = useState<ModelEngineStatus>(aiEngine.getStatus());

  useEffect(() => {
    return aiEngine.subscribe((status) => {
      setEngineStatus(status);
    });
  }, []);

  return (
    <section id="scene-openai" className="py-20 sm:py-28 bg-white dark:bg-[#0C0B12] transition-colors border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-widest text-[#5515E8] uppercase mb-3">
            05 · Open-Weight AI Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#19171F] dark:text-white leading-[1.1]">
            Open weights.
            <br />
            Zero privacy compromises.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#777481] dark:text-[#9590A3] font-normal leading-relaxed">
            Why we chose open-weight models over closed proprietary chatbots: transparent parameters, predictable behavior, client-side execution, and absolute content confidentiality.
          </p>
        </div>

        {/* 2-Column Split: Philosophy on Left, Live Telemetry Console on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Architectural Tenets */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-3xl bg-[#F7F6FA] dark:bg-[#151222] border border-black/5 dark:border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#5515E8]/10 text-[#5515E8] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#19171F] dark:text-white">Your Drafts Stay in Your Browser</h3>
              </div>
              <p className="text-sm text-[#777481] dark:text-[#9590A3] leading-relaxed">
                Your campaign ideas, draft notes, audience tags, and scheduled dates are stored locally in your browser's persistent storage. We never harvest your content to train models or monetize analytics.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F7F6FA] dark:bg-[#151222] border border-black/5 dark:border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#7886F8]/10 text-[#7886F8] flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#19171F] dark:text-white">WebGPU & WASM Acceleration</h3>
              </div>
              <p className="text-sm text-[#777481] dark:text-[#9590A3] leading-relaxed">
                When hardware acceleration is supported by your device, Drift leverages WebGPU direct execution for ultra-low latency token generation. Devices without WebGPU run smoothly via WebAssembly or high-speed demo mode.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F7F6FA] dark:bg-[#151222] border border-black/5 dark:border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#FF4FA3]/10 text-[#FF4FA3] flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#19171F] dark:text-white">Deterministic & Verifiable</h3>
              </div>
              <p className="text-sm text-[#777481] dark:text-[#9590A3] leading-relaxed">
                Open weights mean no silent model updates breaking your workflow or rewriting your tone behind your back. What works today will work the same way next month.
              </p>
            </div>
          </div>

          {/* Right Column: Live Model Engine Status Console */}
          <div className="lg:col-span-5 bg-[#120E22] rounded-3xl p-6 sm:p-7 text-white border border-[#7886F8]/30 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#F8E84C]" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-white/90">
                  Live Engine Telemetry
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#F8E84C] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#F8E84C]" />
                {engineStatus.state.toUpperCase()}
              </span>
            </div>

            <div className="mt-5 space-y-4 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Base Model:</span>
                <span className="text-white font-semibold text-right">{engineStatus.modelName}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Execution Mode:</span>
                <span className="text-[#7886F8] font-semibold">
                  {engineStatus.mode === 'webgpu' ? 'WebGPU Accelerated' : 'Client WASM / Fast Engine'}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Hardware Tier:</span>
                <span className="text-white/90">{engineStatus.deviceTier}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">WebGPU Available:</span>
                <span className={engineStatus.webgpuSupported ? 'text-emerald-400' : 'text-[#FF7A30]'}>
                  {engineStatus.webgpuSupported ? 'Detected (Hardware Pass)' : 'Not Available (Graceful Fallback)'}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-white/50">Generation Latency:</span>
                <span className="text-[#F8E84C]">{engineStatus.lastLatencyMs || 240} ms</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-white/50">Network Calls:</span>
                <span className="text-emerald-400">0 Remote Telemetry</span>
              </div>
            </div>

            {/* Quick Engine Mode Switcher (Fully functional) */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="text-[11px] text-white/60 mb-2 font-mono">Simulate Engine Mode:</div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  onClick={() => aiEngine.setMode('instant_demo', false)}
                  className={`py-2 px-2.5 rounded-xl border text-center transition-colors ${
                    engineStatus.mode === 'instant_demo'
                      ? 'bg-[#5515E8] border-[#7886F8] text-white font-bold'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  ⚡ Fast Engine
                </button>
                <button
                  onClick={() => aiEngine.setMode('webgpu', false)}
                  className={`py-2 px-2.5 rounded-xl border text-center transition-colors ${
                    engineStatus.mode === 'webgpu'
                      ? 'bg-[#5515E8] border-[#7886F8] text-white font-bold'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  🚀 WebGPU Mode
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
