import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'lifeos-theme';
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly systemDark = this.isBrowser
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

  readonly theme = signal<Theme>(this.loadTheme());

  constructor() {
    if (this.systemDark) {
      this.systemDark.addEventListener('change', e => {
        if (this.isBrowser && !localStorage.getItem(this.STORAGE_KEY)) {
          this.theme.set(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  toggle(): void {
    this.theme.update(t => {
      const next = t === 'light' ? 'dark' : 'light';
      if (this.isBrowser) localStorage.setItem(this.STORAGE_KEY, next);
      return next;
    });
  }

  private loadTheme(): Theme {
    if (!this.isBrowser) return 'dark';
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return this.systemDark?.matches ? 'dark' : 'light';
  }
}
