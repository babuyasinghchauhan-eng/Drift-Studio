import { Campaign, Draft } from '../types';
import { INITIAL_CAMPAIGNS, INITIAL_DRAFTS } from '../constants';

const CAMPAIGNS_KEY = 'drift_studio_campaigns_v1';
const DRAFTS_KEY = 'drift_studio_drafts_v1';
const THEME_KEY = 'drift_studio_theme_v1';

export class StorageService {
  public static getTheme(): 'light' | 'dark' {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // Fallback
    }
    return 'light';
  }

  public static setTheme(theme: 'light' | 'dark'): void {
    try {
      localStorage.setItem(THEME_KEY, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // Ignore in private storage
    }
  }

  public static loadCampaigns(): Campaign[] {
    try {
      const raw = localStorage.getItem(CAMPAIGNS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not parse campaigns from localStorage, using initial seed.', e);
    }
    this.saveCampaigns(INITIAL_CAMPAIGNS);
    return INITIAL_CAMPAIGNS;
  }

  public static saveCampaigns(campaigns: Campaign[]): void {
    try {
      localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
    } catch (e) {
      console.error('Failed to save campaigns to localStorage', e);
    }
  }

  public static loadDrafts(): Draft[] {
    try {
      const raw = localStorage.getItem(DRAFTS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not parse drafts from localStorage, using initial seed.', e);
    }
    this.saveDrafts(INITIAL_DRAFTS);
    return INITIAL_DRAFTS;
  }

  public static saveDrafts(drafts: Draft[]): void {
    try {
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    } catch (e) {
      console.error('Failed to save drafts to localStorage', e);
    }
  }

  public static exportToJSON(campaigns: Campaign[], drafts: Draft[]): void {
    const data = {
      app: 'Drift Studio',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      campaigns,
      drafts,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    this.downloadBlob(blob, `drift-studio-backup-${new Date().toISOString().slice(0, 10)}.json`);
  }

  public static exportDraftsToCSV(drafts: Draft[]): void {
    const headers = ['ID', 'Campaign', 'Platform', 'Status', 'Scheduled Date', 'Scheduled Time', 'Hook', 'Body', 'Hashtags', 'Call To Action', 'Created At'];
    
    const rows = drafts.map((d) => [
      d.id,
      d.campaignName,
      d.platform,
      d.status,
      d.scheduledDate || '',
      d.scheduledTime || '',
      `"${(d.hook || '').replace(/"/g, '""')}"`,
      `"${(d.body || '').replace(/"/g, '""')}"`,
      `"${(d.hashtags || []).join(' ')}"`,
      `"${(d.callToAction || '').replace(/"/g, '""')}"`,
      d.createdAt,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    this.downloadBlob(blob, `drift-drafts-${new Date().toISOString().slice(0, 10)}.csv`);
  }

  public static exportDraftsToText(drafts: Draft[]): void {
    let output = `DRIFT STUDIO — EXPORTED SOCIAL DRAFTS\nGenerated on: ${new Date().toLocaleString()}\nTotal Drafts: ${drafts.length}\n${'='.repeat(60)}\n\n`;

    drafts.forEach((d, idx) => {
      output += `[#${idx + 1}] CAMPAIGN: ${d.campaignName}\n`;
      output += `PLATFORM: ${d.platform.toUpperCase()} | STATUS: ${d.status.toUpperCase()}${d.scheduledDate ? ` | PLANNED: ${d.scheduledDate} ${d.scheduledTime || ''}` : ''}\n`;
      output += `HOOK: ${d.hook}\n`;
      output += `-`.repeat(40) + '\n';
      output += `${d.body}\n\n`;
      if (d.hashtags && d.hashtags.length > 0) {
        output += `TAGS: ${d.hashtags.join(' ')}\n`;
      }
      if (d.callToAction) {
        output += `CTA: ${d.callToAction}\n`;
      }
      output += `\n${'='.repeat(60)}\n\n`;
    });

    const blob = new Blob([output], { type: 'text/plain;charset=utf-8;' });
    this.downloadBlob(blob, `drift-studio-drafts-${new Date().toISOString().slice(0, 10)}.txt`);
  }

  private static downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  public static async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        return successful;
      }
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      return false;
    }
  }
}
