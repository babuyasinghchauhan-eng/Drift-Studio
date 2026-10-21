import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cpu, Terminal, Eye, Download, RefreshCw } from 'lucide-react';
import { aiEngine } from '../services/aiEngine';
import { ModelEngineStatus } from '../types';
import { RevealSection } from './RevealSection';

export const OpenAiSection: React.FC = () => {
  const [engineStatus, setEngineStatus] = useState<ModelEngineStatus>(aiEngine.getStatus());

  useEffect(() => {
    return aiEngine.subscribe((status) => {
      setEngineStatus(status);
    });
  }, []);

  const getReadableStateLabel = (state: ModelEngineStatus['state']) => {
    switch (state) {
      case 'loading':
        return 'Loading model';
      case 'ready':
        return 'Model ready';
      case 'generating':
        return 'Generating';
      case 'unavailable':
        return 'Local inference unavailable';
      case 'error':
        return 'Generation failed';
      case 'demo':
      default:
        return 'Demo mode';
    }
  };

  return (
    <section
      id="scene-openai"
      className="py-20 sm:py-28 bg-white dark:bg-[#0D0B14] transition-colors border-b border-[#19171F]/10 dark:border-white/10"
    >
      <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-[0.16em] text-[#5515E8] dark:text-[#7886F8] uppercase mb-3">
            05 · OPEN AI, OPEN POSSIBILITIES
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold tracking-[-0.03em] text-[#19171F] dark:text-white leading-[1.08] text-balance">
            Open weights.
            <br />
            Transparent processing.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#777481] dark:text-[#9E9AA8] font-normal leading-relaxed">
            Built for Hacktoberfest’s Open-Source AI Challenge. Drift separates the inference adapter from the workspace UI so you always know which model is running and where your data lives.
          </p>
        </div>

        {/* 2-Column Split: Architectural Principles + Live Model-Status Component */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 cols): Why Open-Weight Matters */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-6 sm:p-7 rounded-[24px] bg-[#F7F6FA] dark:bg-[#151221] border border-[#19171F]/10 dark:border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#5515E8]/10 text-[#5515E8] dark:text-[#7886F8] flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#19171F] dark:text-white">
                  Browser-Compatible Open-Weight Runtime
                </h3>
              </div>
              <p className="text-sm text-[#777481] dark:text-[#9E9AA8] leading-relaxed">
                Drift integrates Hugging Face Transformers.js (`HuggingFaceTB/SmolLM2-135M-Instruct` Q4 ONNX) with WebGPU acceleration when supported by your browser, falling back cleanly to WebAssembly CPU or instant Demo Mode.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-[24px] bg-[#F7F6FA] dark:bg-[#151221] border border-[#19171F]/10 dark:border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#7886F8]/15 text-[#5515E8] dark:text-[#7886F8] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#19171F] dark:text-white">
                  Honest Network & Storage Disclosures
                </h3>
              </div>
              <p className="text-sm text-[#777481] dark:text-[#9E9AA8] leading-relaxed">
                Your campaigns, drafts, and calendar dates are stored in local browser storage. Initial open-weight model downloads require internet access to fetch quantized weights from Hugging Face Hub; Demo Mode requires zero model download.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-[24px] bg-[#F7F6FA] dark:bg-[#151221] border border-[#19171F]/10 dark:border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#FF4FA3]/10 text-[#FF4FA3] flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#19171F] dark:text-white">
                  No Silent Model Swaps or Fake AI Claims
                </h3>
              </div>
              <p className="text-sm text-[#777481] dark:text-[#9E9AA8] leading-relaxed">
                Predetermined sample campaigns and instant synthesis are always clearly labelled as Demo Mode, never disguised as live neural inference.
              </p>
            </div>
          </div>

          {/* Right Column (5 cols): Live Model-Status Inspector */}
          <div className="lg:col-span-5 bg-[#19171F] rounded-[28px] p-6 sm:p-7 text-white border border-white/15 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#F8E84C]" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
                  Live Model Status
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#F8E84C]">
                {getReadableStateLabel(engineStatus.state)}
              </span>
            </div>

            <div className="mt-5 space-y-3.5 font-mono text-xs">
              <div className="flex justify-between gap-3 py-1.5 border-b border-white/10">
                <span className="text-white/60">Checkpoint:</span>
                <span className="text-white font-semibold text-right">{engineStatus.modelCheckpoint}</span>
              </div>

              <div className="flex justify-between gap-3 py-1.5 border-b border-white/10">
                <span className="text-white/60">Active Mode:</span>
                <span className="text-[#7886F8] font-semibold text-right">
                  {engineStatus.isDemoMode
                    ? 'Demo Mode (Sample / Deterministic)'
                    : engineStatus.mode === 'webgpu'
                    ? 'Local WebGPU Inference'
                    : 'Local WASM CPU Inference'}
                </span>
              </div>

              <div className="flex justify-between gap-3 py-1.5 border-b border-white/10">
                <span className="text-white/60">WebGPU Hardware:</span>
                <span className={engineStatus.webgpuSupported ? 'text-emerald-400' : 'text-[#FF7A30]'}>
                  {engineStatus.webgpuSupported ? 'Supported' : 'Unavailable (WASM/Demo)'}
                </span>
              </div>

              <div className="flex justify-between gap-3 py-1.5 border-b border-white/10">
                <span className="text-white/60">Weights Status:</span>
                <span className="text-white/90 text-right">
                  {engineStatus.downloadStatusText || (engineStatus.isModelLoaded ? 'Loaded' : 'Not downloaded')}
                </span>
              </div>

              {typeof engineStatus.lastLatencyMs === 'number' && (
                <div className="flex justify-between gap-3 py-1.5 border-b border-white/10">
                  <span className="text-white/60">Last Synthesis Time:</span>
                  <span className="text-[#F8E84C] tabular-nums">{engineStatus.lastLatencyMs} ms</span>
                </div>
              )}
            </div>

            {/* Download Progress Bar when loading */}
            {engineStatus.state === 'loading' && (
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-[#F8E84C]">
                  <span>Downloading ONNX weights...</span>
                  <span className="tabular-nums">{engineStatus.downloadProgress || 0}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#F8E84C] transition-all duration-300"
                    style={{ width: `${engineStatus.downloadProgress || 10}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error / Fallback notice */}
            {engineStatus.errorMessage && (
              <div className="mt-4 p-3 rounded-xl bg-[#FF7A30]/15 border border-[#FF7A30]/40 text-xs text-[#F8E84C]">
                {engineStatus.errorMessage}
              </div>
            )}

            {/* Interactive Controls to Load Real Model or Use Demo Mode */}
            <div className="mt-6 pt-4 border-t border-white/10 space-y-2.5">
              <div className="text-[11px] text-white/60 font-mono">
                Runtime Adapter Control:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => aiEngine.setMode('instant_demo', true)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-colors ${
                    engineStatus.isDemoMode
                      ? 'bg-[#5515E8] border-[#7886F8] text-white'
                      : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10'
                  }`}
                >
                  Demo Mode (Instant)
                </button>

                <button
                  onClick={() => void aiEngine.initializeLocalModel()}
                  disabled={engineStatus.state === 'loading'}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                    !engineStatus.isDemoMode && engineStatus.isModelLoaded
                      ? 'bg-emerald-600 border-emerald-400 text-white'
                      : 'bg-white text-[#19171F] border-white hover:bg-[#F8E84C]'
                  }`}
                >
                  {engineStatus.state === 'loading' ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : engineStatus.isModelLoaded && !engineStatus.isDemoMode ? (
                    <span>Live Model Active</span>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Load Local Model</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Note: Loading the local model downloads ~85MB of quantized weights from Hugging Face Hub into browser cache.
              </p>
            </div>

          </div>

        </div>

      </RevealSection>
    </section>
  );
};
