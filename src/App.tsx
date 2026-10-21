import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MomentumSection } from './components/MomentumSection';
import { ProductInActionSection } from './components/ProductInActionSection';
import { IntelligentToolsSection } from './components/IntelligentToolsSection';
import { IntegrationsExportSection } from './components/IntegrationsExportSection';
import { WorkflowSection } from './components/WorkflowSection';
import { OpenAiSection } from './components/OpenAiSection';
import { InsideCampaignSection } from './components/InsideCampaignSection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { StudioLayout } from './studio/StudioLayout';
import { StorageService } from './services/storage';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'studio'>('landing');
  const [studioInitialTab, setStudioInitialTab] = useState<string>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [savedCounts, setSavedCounts] = useState<{ campaigns: number; drafts: number }>({
    campaigns: 2,
    drafts: 7,
  });

  useEffect(() => {
    const savedTheme = StorageService.getTheme();
    setTheme(savedTheme);
    StorageService.setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (currentView === 'landing') {
      const camps = StorageService.loadCampaigns();
      const drs = StorageService.loadDrafts();
      setSavedCounts({ campaigns: camps.length, drafts: drs.length });
    }
  }, [currentView]);

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    StorageService.setTheme(next);
  };

  const handleNavigate = (view: 'landing' | 'studio', studioTab: string = 'dashboard') => {
    setCurrentView(view);
    setStudioInitialTab(studioTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToProduct = () => {
    const el = document.getElementById('scene-product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentView === 'studio') {
    return (
      <StudioLayout
        initialTab={studioInitialTab}
        onExitToLanding={() => handleNavigate('landing')}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-white dark:bg-[#0D0B14] text-[#19171F] dark:text-white transition-colors`}>
      {/* Top Bar Contract (Wordmark, single-line links, primary action) */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Sections (Scenes A through J) */}
      <main>
        {/* Scene A: Hero with editorial headlines and electric-violet artwork */}
        <HeroSection
          onStartPlan={() => handleNavigate('studio', 'create')}
          onExplore={handleScrollToProduct}
        />

        {/* Scene B: Immersive violet visual moment with original sculptural character */}
        <MomentumSection onOpenStudio={() => handleNavigate('studio', 'create')} />

        {/* Scene C: The product in action demonstrating one idea becoming multiple posts */}
        <ProductInActionSection onOpenStudio={() => handleNavigate('studio', 'board')} />

        {/* Scene D: Intelligent content tools with interactive controls & live saved counts */}
        <IntelligentToolsSection
          savedCampaignsCount={savedCounts.campaigns}
          savedDraftsCount={savedCounts.drafts}
          onOpenBoard={() => handleNavigate('studio', 'board')}
        />

        {/* Scene E: Genuine exports and data ownership (TXT, CSV, JSON, Clipboard) */}
        <IntegrationsExportSection />

        {/* Scene F: Three-step workflow with distinct compositions */}
        <WorkflowSection onStartWorkflow={() => handleNavigate('studio', 'create')} />

        {/* Scene G: Open AI, open possibilities with live model-status component */}
        <OpenAiSection />

        {/* Scene H: Inside a campaign before/after showcase */}
        <InsideCampaignSection onOpenStudio={() => handleNavigate('studio', 'board')} />

        {/* Scene I: Accessible expandable FAQ */}
        <FaqSection />

        {/* Scene J: Dramatic violet final CTA */}
        <CtaSection onStartCreating={() => handleNavigate('studio', 'create')} />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
