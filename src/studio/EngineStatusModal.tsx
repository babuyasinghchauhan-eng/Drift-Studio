import React, { useState, useEffect } from 'react';
import { X, Cpu, ShieldAlert, Check, RefreshCw, Download } from 'lucide-react';
import { aiEngine } from '../services/aiEngine';
import { ModelEngineStatus } from '../types';

interface EngineStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EngineStatusModal: React.FC<EngineStatusModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<ModelEngineStatus>(aiEngine.getStatus());

  useEffect(() => {
    return aiEngine.subscribe((s) => setStatus(s));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getReadableState = (s: ModelEngineStatus['state']) => {
    switch (s) {
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#141121] rounded-[24px] border border-[#19171F]/10 dark:border-white/10 shadow-2xl text-[#19171F] dark:text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="engine-modal-title"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#19171F]/10 dark:border-white/10 flex items-center justify-between bg-[#F7F6FA] dark:bg-[#1A162B]">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-[#5515E8] dark:text-[#7886F8]" />
            <h2 id="engine-modal-title" className="font-display text-base sm:text-lg font-bold">
              Open-Weight Model & Runtime Status
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#777481] hover:text-[#19171F] dark:text-[#9E9AA8] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Live Telemetry Summary */}
          <div className="p-4 rounded-2xl bg-[#19171F] text-white font-mono text-xs space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-white/60">Current Status:</span>
              <span className="text-[#F8E84C] font-bold">{getReadableState(status.state)}</span>
            </div>

            <div className="flex justify-between gap-2">
              <span className="text-white/60">Model Checkpoint:</span>
              <span className="text-white font-semibold text-right">{status.modelCheckpoint}</span>
            </div>

            <div className="flex justify-between gap-2">
              <span className="text-white/60">Inference Mode:</span>
              <span className="text-[#7886F8] font-semibold text-right">
                {status.isDemoMode
                  ? 'Demo Mode (Deterministic Sample Engine)'
                  : status.mode === 'webgpu'
                  ? 'Local Browser Inference (WebGPU)'
                  : 'Local Browser Inference (WASM CPU)'}
              </span>
            </div>

            <div className="flex justify-between gap-2">
              <span className="text-white/60">WebGPU Support:</span>
              <span className={status.webgpuSupported ? 'text-emerald-400 font-bold' : 'text-[#FF7A30]'}>
                {status.webgpuSupported ? 'Detected' : 'Not detected (WASM / Demo fallback)'}
              </span>
            </div>

            {typeof status.lastLatencyMs === 'number' && (
              <div className="flex justify-between gap-2">
                <span className="text-white/60">Last Synthesis Latency:</span>
                <span className="text-[#F8E84C] tabular-nums">{status.lastLatencyMs} ms</span>
              </div>
            )}
          </div>

          {/* Progress Bar if Loading */}
          {status.state === 'loading' && (
            <div className="p-4 rounded-2xl bg-[#F0EDFF] dark:bg-[#201B36] space-y-2">
              <div className="flex justify-between text-xs font-mono font-bold text-[#5515E8] dark:text-[#7886F8]">
                <span>{status.downloadStatusText || 'Downloading model weights...'}</span>
                <span className="tabular-nums">{status.downloadProgress || 0}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-[#5515E8] transition-all duration-300"
                  style={{ width: `${status.downloadProgress || 10}%` }}
                />
              </div>
            </div>
          )}

          {/* Error Notice if Model Failed */}
          {status.errorMessage && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300">
              {status.errorMessage}
            </div>
          )}

          {/* Mode Selection */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#777481] dark:text-[#9E9AA8] mb-3">
              Select Active Runtime Mode
            </div>

            <div className="space-y-3">
              {/* Option 1: Demo Mode */}
              <button
                type="button"
                onClick={() => aiEngine.setMode('instant_demo', true)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  status.isDemoMode
                    ? 'border-[#5515E8] bg-[#F0EDFF]/60 dark:bg-[#5515E8]/15'
                    : 'border-[#19171F]/10 dark:border-white/10 hover:border-[#5515E8]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-display font-bold text-sm flex items-center gap-2">
                    <span>Demo Mode (Predetermined & Structured Synthesis)</span>
                    {status.isDemoMode && <Check className="w-4 h-4 text-[#5515E8]" />}
                  </div>
                  <span className="text-[11px] font-mono text-[#5515E8] dark:text-[#7886F8] font-bold">
                    0 MB Download
                  </span>
                </div>
                <p className="text-xs text-[#777481] dark:text-[#9E9AA8] mt-1 leading-relaxed">
                  Explorable immediately on any device. Uses deterministic templates and predetermined sample campaigns clearly labelled as Demo Mode.
                </p>
              </button>

              {/* Option 2: Local Open-Weight Transformers.js */}
              <button
                type="button"
                onClick={() => void aiEngine.initializeLocalModel()}
                disabled={status.state === 'loading'}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  !status.isDemoMode && status.isModelLoaded
                    ? 'border-[#5515E8] bg-[#F0EDFF]/60 dark:bg-[#5515E8]/15'
                    : 'border-[#19171F]/10 dark:border-white/10 hover:border-[#5515E8]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-display font-bold text-sm flex items-center gap-2">
                    {status.state === 'loading' ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-[#5515E8]" />
                    ) : (
                      <Download className="w-4 h-4 text-[#5515E8]" />
                    )}
                    <span>Local Browser Inference (SmolLM2-135M-Instruct)</span>
                    {!status.isDemoMode && status.isModelLoaded && (
                      <Check className="w-4 h-4 text-[#5515E8]" />
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-[#777481] dark:text-[#9E9AA8]">
                    {status.webgpuSupported ? 'WebGPU' : 'WASM CPU'}
                  </span>
                </div>
                <p className="text-xs text-[#777481] dark:text-[#9E9AA8] mt-1 leading-relaxed">
                  Downloads quantized ONNX weights via Hugging Face Transformers.js (requires internet access on initial load) and runs inference inside your browser.
                </p>
              </button>
            </div>
          </div>

          {/* Honest Disclosure */}
          <div className="p-4 rounded-2xl bg-[#F7F6FA] dark:bg-[#1A162B] border border-[#19171F]/10 dark:border-white/10 text-xs text-[#777481] dark:text-[#9E9AA8] leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#5515E8] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#19171F] dark:text-white block mb-0.5">
                Privacy & Runtime Transparency:
              </strong>
              Campaigns and drafts are stored in your browser’s local storage. Initial model downloads fetch public weights from Hugging Face Hub.
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#19171F]/10 dark:border-white/10 flex justify-end bg-[#F7F6FA] dark:bg-[#1A162B]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#5515E8] hover:bg-[#35108F] rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
