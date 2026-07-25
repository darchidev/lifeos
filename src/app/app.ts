import { Component, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar/sidebar';
import { Topbar } from './layout/topbar/topbar';
import { MobileNav } from './layout/mobile-nav/mobile-nav';
import { ToastContainerComponent } from './shared/toast-container.component';
import { GlobalSearchComponent } from './shared/global-search.component';
import { ThemeService } from './services/theme.service';
import { ShortcutService } from './services/shortcut.service';
import { LiveClockService } from './services/live-clock.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Topbar, MobileNav, ToastContainerComponent, GlobalSearchComponent],
  templateUrl: './app.html',
})
export class App {
  private readonly themeService = inject(ThemeService);
  readonly shortcuts = inject(ShortcutService);
  readonly clock = inject(LiveClockService);

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('dark', this.themeService.theme() === 'dark');
    });
  }
}
