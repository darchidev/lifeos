import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { UiService } from '../../services/ui.service';
import { LiveClockService } from '../../services/live-clock.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
})
export class Topbar {
  protected readonly themeService = inject(ThemeService);
  protected readonly ui = inject(UiService);
  protected readonly clock = inject(LiveClockService);
  protected readonly auth = inject(AuthService);

  protected readonly showMenu = signal(false);

  protected get initials(): string {
    const u = this.auth.user();
    if (!u?.name) return '?';
    return u.name.split(' ').map(s => s[0]).join('').toUpperCase().slice(0, 2);
  }
}
