import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  KanbanSquare,
  Calendar as CalendarIcon,
  FolderOpen,
  Cpu,
  Download,
  ArrowLeft,
  Sun,
  Moon,
  Sparkles,
  Check,
  RotateCcw,
} from 'lucide-react';
import { Campaign, Draft, ContentStatus, ModelEngineStatus, ToastMessage } from '../types';
import { StorageService } from '../services/storage';
import { aiEngine } from '../services/aiEngine';
import { DashboardView } from './DashboardView';
import { CampaignCreatorView } from './CampaignCreatorView';
import { ContentBoardView } from './ContentBoardView';
import { CalendarView } from './CalendarView';
import { SavedDraftsView } from './SavedDraftsView';
import { DraftModal } from './DraftModal';
import { EngineStatusModal } from './EngineStatusModal';

interface StudioLayoutProps {
  initialTab?: string;
  onExitToLanding: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({
  initialTab = 'dashboard',
  onExitToLanding,
  theme,
  onToggleTheme,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
  const [isEngineModalOpen, setIsEngineModalOpen] = useState(false);
  const [engineStatus, setEngineStatus] = useState<ModelEngineStatus>(aiEngine.getStatus());
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Load from persistent local storage on mount
  useEffect(() => {
    const loadedCampaigns = StorageService.loadCampaigns();
    const loadedDrafts = StorageService.loadDrafts();
    setCampaigns(loadedCampaigns);
    setDrafts(loadedDrafts);

    const unsub = aiEngine.subscribe((s) => setEngineStatus(s));
    return unsub;
  }, []);

  const showToast = (title: string, description?: string, undoAction?: () => void) => {
    const id = Math.random().toString();
    setToast({ id, type: 'success', title, description, undoAction });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 4000);
  };

  const handleCampaignCreated = (newCampaign: Campaign, newDrafts: Draft[]) => {
    const updatedCampaigns = [newCampaign, ...campaigns];
    const updatedDrafts = [...newDrafts, ...drafts];
    setCampaigns(updatedCampaigns);
    setDrafts(updatedDrafts);
    StorageService.saveCampaigns(updatedCampaigns);
    StorageService.saveDrafts(updatedDrafts);
    showToast(
      'Campaign generated!',
      `${newDrafts.length} platform drafts added to your board.`
    );
    setActiveTab('board');
  };

  const handleSaveDraft = (updated: Draft) => {
    const updatedDrafts = drafts.map((d) => (d.id === updated.id ? updated : d));
    setDrafts(updatedDrafts);
    StorageService.saveDrafts(updatedDrafts);
    showToast('Draft updated successfully');
  };

  const handleDeleteDraft = (id: string) => {
    const deletedDraft = drafts.find((d) => d.id === id);
    const updatedDrafts = drafts.filter((d) => d.id !== id);
    setDrafts(updatedDrafts);
    StorageService.saveDrafts(updatedDrafts);
    setSelectedDraft(null);

    // Provide undo action!
    if (deletedDraft) {
      showToast('Draft deleted', undefined, () => {
        const restored = [...drafts];
        setDrafts(restored);
        StorageService.saveDrafts(restored);
      });
    }
  };

  const handleDuplicateDraft = (d: Draft) => {
    const duplicated: Draft = {
      ...d,
      id: `draft_${Date.now()}_copy`,
      hook: `${d.hook} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedDrafts = [duplicated, ...drafts];
    setDrafts(updatedDrafts);
    StorageService.saveDrafts(updatedDrafts);
    showToast('Draft duplicated');
    setSelectedDraft(duplicated);
  };

  const handleUpdateDraftStatus = (id: string, newStatus: ContentStatus) => {
    const updatedDrafts = drafts.map((d) =>
      d.id === id ? { ...d, status: newStatus, updatedAt: new Date().toISOString() } : d
    );
    setDrafts(updatedDrafts);
    StorageService.saveDrafts(updatedDrafts);
    showToast(`Draft moved to ${newStatus}`);
  };

  const handleRescheduleDraft = (id: string, date: string, time?: string) => {
    const updatedDrafts = drafts.map((d) =>
      d.id === id ? { ...d, scheduledDate: date, scheduledTime: time } : d
    );
    setDrafts(updatedDrafts);
    StorageService.saveDrafts(updatedDrafts);
    showToast('Scheduled date updated');
  };

  const handleCreateDraftInStage = (stage: ContentStatus) => {
    const newDraft: Draft = {
      id: `draft_${Date.now()}`,
      campaignId: campaigns[0]?.id || 'camp_manual',
      campaignName: campaigns[0]?.name || 'Direct Draft',
      platform: 'x',
      hook: 'New draft concept...',
      body: 'Write your content here...',
      hashtags: [],
      callToAction: '',
      angleExplanation: 'Manually drafted',
      status: stage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newDraft, ...drafts];
    setDrafts(updated);
    StorageService.saveDrafts(updated);
    setSelectedDraft(newDraft);
  };

  const handleCreateDraftForDate = (date: string) => {
    const newDraft: Draft = {
      id: `draft_${Date.now()}`,
      campaignId: campaigns[0]?.id || 'camp_manual',
      campaignName: campaigns[0]?.name || 'Planned Release',
      platform: 'x',
      hook: 'Planned content idea...',
      body: 'Content for scheduled release...',
      hashtags: [],
      callToAction: '',
      angleExplanation: 'Planned in weekly calendar',
      status: 'draft',
      scheduledDate: date,
      scheduledTime: '10:00',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newDraft, ...drafts];
    setDrafts(updated);
    StorageService.saveDrafts(updated);
    setSelectedDraft(newDraft);
  };

  return (
    <div className="min-h-screen bg-[#F7F6FA] dark:bg-[#0C0B12] text-[#19171F] dark:text-white flex flex-col transition-colors">
      
      {/* Studio Header Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-[#120F1F]/90 backdrop-blur-md border-b border-black/5 dark:border-white/10 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand + Exit to Showcase */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExitToLanding}
            className="p-2 rounded-xl text-[#777481] hover:text-[#19171F] dark:text-[#9590A3] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Return to Landing Page"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Showcase</span>
          </button>

          <div className="h-4 w-px bg-black/10 dark:bg-white/10 hidden sm:block" />

          <div className="text-base sm:text-lg font-black tracking-tight text-[#19171F] dark:text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5515E8]" />
            <span>Drift Studio</span>
          </div>
        </div>

        {/* Center: Navigation Tabs (Clean segmented control buttons) */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-[#F7F6FA] dark:bg-[#1C182B] rounded-2xl border border-black/5 dark:border-white/5 text-xs font-semibold text-[#777481] dark:text-[#9590A3]">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'create', label: 'New Plan', icon: PlusCircle },
            { id: 'board', label: 'Board', icon: KanbanSquare },
            { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
            { id: 'drafts', label: 'Drafts', icon: FolderOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-white dark:bg-[#2A2342] text-[#5515E8] dark:text-white shadow-sm font-bold'
                    : 'hover:text-[#19171F] dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Engine Status Pill + Exports + Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Live Engine Diagnostic Trigger */}
          <button
            onClick={() => setIsEngineModalOpen(true)}
            className="px-2.5 py-1.5 rounded-xl bg-[#5515E8]/10 text-[#5515E8] dark:text-[#B197FC] hover:bg-[#5515E8]/20 transition-colors text-xs font-mono font-semibold flex items-center gap-1.5"
            title="Click for AI engine telemetry & settings"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{engineStatus.mode === 'webgpu' ? 'WebGPU' : 'Fast Engine'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {/* Quick Export Dropdown */}
          <button
            onClick={() => StorageService.exportToJSON(campaigns, drafts)}
            className="p-2 rounded-xl text-[#777481] hover:text-[#19171F] dark:text-[#9590A3] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors hidden sm:flex items-center gap-1 text-xs font-semibold"
            title="Download JSON Workspace Backup"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-[#777481] hover:text-[#19171F] dark:text-[#9590A3] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

      </header>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden bg-white dark:bg-[#120F1F] border-b border-black/5 dark:border-white/10 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'create', label: '+ New Plan' },
          { id: 'board', label: 'Board' },
          { id: 'calendar', label: 'Calendar' },
          { id: 'drafts', label: 'Drafts' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap shrink-0 ${
              activeTab === tab.id
                ? 'bg-[#5515E8] text-white font-bold'
                : 'bg-[#F7F6FA] dark:bg-[#1C182B] text-[#777481] dark:text-[#9590A3]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Studio Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            campaigns={campaigns}
            drafts={drafts}
            onCreateNewPlan={() => setActiveTab('create')}
            onOpenDraft={(d) => setSelectedDraft(d)}
            onNavigateTab={(t) => setActiveTab(t)}
          />
        )}

        {activeTab === 'create' && (
          <CampaignCreatorView
            onCampaignCreated={handleCampaignCreated}
            onCancel={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'board' && (
          <ContentBoardView
            drafts={drafts}
            onOpenDraft={(d) => setSelectedDraft(d)}
            onUpdateDraftStatus={handleUpdateDraftStatus}
            onDeleteDraft={handleDeleteDraft}
            onDuplicateDraft={handleDuplicateDraft}
            onCreateDraftInStage={handleCreateDraftInStage}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView
            drafts={drafts}
            onOpenDraft={(d) => setSelectedDraft(d)}
            onRescheduleDraft={handleRescheduleDraft}
            onCreateDraftForDate={handleCreateDraftForDate}
          />
        )}

        {activeTab === 'drafts' && (
          <SavedDraftsView
            drafts={drafts}
            onOpenDraft={(d) => setSelectedDraft(d)}
            onDeleteDraft={handleDeleteDraft}
            onCreateNewPlan={() => setActiveTab('create')}
          />
        )}
      </main>

      {/* Full Draft Editor Modal */}
      {selectedDraft && (
        <DraftModal
          draft={selectedDraft}
          isOpen={Boolean(selectedDraft)}
          onClose={() => setSelectedDraft(null)}
          onSave={handleSaveDraft}
          onDelete={handleDeleteDraft}
          onDuplicate={handleDuplicateDraft}
        />
      )}

      {/* Model Diagnostics Modal */}
      <EngineStatusModal
        isOpen={isEngineModalOpen}
        onClose={() => setIsEngineModalOpen(false)}
      />

      {/* Accessible Toast Notification with Undo */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-2xl bg-[#19171F] dark:bg-white text-white dark:text-[#19171F] shadow-2xl border border-white/10 dark:border-black/10 text-xs animate-in slide-in-from-bottom-5">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <div className="font-bold">{toast.title}</div>
            {toast.description && <div className="text-white/70 dark:text-black/70 text-[11px] mt-0.5">{toast.description}</div>}
          </div>
          {toast.undoAction && (
            <button
              onClick={() => {
                toast.undoAction?.();
                setToast(null);
              }}
              className="ml-2 px-2.5 py-1 rounded-lg bg-white/20 dark:bg-black/10 hover:bg-white/30 text-xs font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Undo</span>
            </button>
          )}
        </div>
      )}

    </div>
  );
};
