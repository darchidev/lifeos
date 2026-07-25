import { Injectable, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from './theme.service';
import { UiService } from './ui.service';

@Injectable({ providedIn: 'root' })
export class ShortcutService {
  private readonly router = inject(Router);
  private readonly theme = inject(ThemeService);
  private readonly ui = inject(UiService);

  constructor() {
    if (typeof window === 'undefined') return;
    window.addEventListener('keydown', e => this.handle(e));
  }

  private handle(e: KeyboardEvent): void {
    const target = e.target as HTMLElement;
    const isInput = target.matches('input, textarea, [contenteditable]');
    if (isInput && e.key !== 'Escape') return;

    switch (e.key) {
      case '/':
        if (!isInput) {
          e.preventDefault();
          document.querySelector<HTMLInputElement>('.search-box input')?.focus();
        }
        break;
      case 'd':
      case 'D':
        if (!isInput) { this.theme.toggle(); }
        break;
      case 'n':
      case 'N':
        if (!isInput) { this.router.navigate(['/tasks']); }
        break;
      case 'Escape':
        if (this.ui.sidebarOpen()) this.ui.closeSidebar();
        break;
      case '1': if (!isInput) this.router.navigate(['/dashboard']); break;
      case '2': if (!isInput) this.router.navigate(['/agenda']); break;
      case '3': if (!isInput) this.router.navigate(['/tasks']); break;
      case '4': if (!isInput) this.router.navigate(['/finanze']); break;
      case '5': if (!isInput) this.router.navigate(['/documenti']); break;
      case '6': if (!isInput) this.router.navigate(['/casa']); break;
      case '7': if (!isInput) this.router.navigate(['/cucina']); break;
      case '8': if (!isInput) this.router.navigate(['/salute']); break;
      case '9': if (!isInput) this.router.navigate(['/archivio']); break;
    }
  }
}
