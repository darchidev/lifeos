import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardConfigService } from '../../services/dashboard-config.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="dashboard-grid">
      <div style="grid-column:1/-1">
        <h2 style="font-size:1.5rem;font-weight:700;margin-bottom:0.25rem">Impostazioni</h2>
        <p style="color:var(--text-secondary);font-size:0.9rem">Personalizza la tua LifeOS</p>
      </div>

      <!-- Tema -->
      <article class="card wide">
        <div class="card-header"><h3>🎨 Tema</h3></div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0">
          <div>
            <strong>Modalità scura</strong>
            <p style="color:var(--text-tertiary);font-size:0.85rem;margin-top:2px">
              @if (theme.theme() === 'dark') {
                Attualmente: scuro
              } @else {
                Attualmente: chiaro
              }
              · usa il toggle nella topbar o premi <kbd style="background:var(--bg-hover,#f3f4f6);padding:0.1rem 0.4rem;border-radius:4px;font-size:0.8rem">D</kbd>
            </p>
          </div>
          <span style="font-size:1.5rem">{{ theme.theme() === 'dark' ? '🌙' : '☀️' }}</span>
        </div>
      </article>

      <!-- Widget dashboard -->
      <article class="card wide">
        <div class="card-header"><h3>📊 Widget dashboard</h3></div>
        <p style="color:var(--text-tertiary);font-size:0.85rem;margin-bottom:1rem">
          Scegli quali pannelli mostrare nella dashboard.
        </p>
        @for (w of dashConfig.widgets(); track w.id) {
          <label class="setting-row" [class.active]="w.visible">
            <div class="setting-info">
              <strong>{{ w.label }}</strong>
            </div>
            <div class="toggle" [class.on]="w.visible" (click)="dashConfig.toggle(w.id)" role="switch" [attr.aria-checked]="w.visible" tabindex="0" (keydown.enter)="dashConfig.toggle(w.id)">
              <div class="toggle-knob"></div>
            </div>
          </label>
        }
      </article>

      <!-- Shortcuts -->
      <article class="card wide">
        <div class="card-header"><h3>⌨️ Scorciatoie</h3></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;padding:0.5rem 0">
          @for (s of shortcuts; track s.key) {
            <div style="display:flex;justify-content:space-between;align-items:center;padding:0.35rem 0">
              <span style="color:var(--text-secondary);font-size:0.9rem">{{ s.label }}</span>
              <kbd style="background:var(--bg-hover,#f3f4f6);padding:0.2rem 0.5rem;border-radius:6px;font-size:0.8rem;font-family:inherit;font-weight:600">{{ s.key }}</kbd>
            </div>
          }
        </div>
      </article>

      <!-- Info -->
      <article class="card wide">
        <div class="card-header"><h3>ℹ️ Info</h3></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;padding:0.5rem 0;color:var(--text-secondary);font-size:0.9rem">
          <span>Versione</span><span style="text-align:right;font-weight:500">1.0.0</span>
          <span>Framework</span><span style="text-align:right;font-weight:500">Angular 22</span>
          <span>Persistenza</span><span style="text-align:right;font-weight:500">localStorage</span>
        </div>
      </article>

      <div style="grid-column:1/-1;display:flex;gap:1rem;flex-wrap:wrap">
        <a routerLink="/dashboard" class="btn-primary" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.75rem 1.5rem;border-radius:12px;background:var(--primary);color:white;text-decoration:none;font-weight:600">
          ← Torna alla dashboard
        </a>
      </div>
    </section>
  `,
  styles: [`
    .setting-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.75rem 0; border-bottom: 1px solid var(--border);
      cursor: pointer; transition: opacity 0.15s;
    }
    .setting-row:last-child { border-bottom: none; }
    .setting-row:not(.active) { opacity: 0.5; }
    .setting-info strong { font-size: 0.95rem; }
    .toggle {
      width: 44px; height: 24px; border-radius: 12px;
      background: var(--border); position: relative;
      transition: background 0.2s; cursor: pointer; flex-shrink: 0;
    }
    .toggle.on { background: var(--primary); }
    .toggle-knob {
      width: 20px; height: 20px; border-radius: 50%;
      background: white; position: absolute; top: 2px; left: 2px;
      transition: transform 0.2s var(--ease-spring);
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }
    .toggle.on .toggle-knob { transform: translateX(20px); }
    .dark .toggle { background: #4b5563; }
    .dark .toggle.on { background: var(--primary); }
    kbd { border: 1px solid var(--border); }
  `]
})
export class Settings {
  protected readonly dashConfig = inject(DashboardConfigService);
  protected readonly theme = inject(ThemeService);

  protected readonly shortcuts = [
    { key: '/', label: 'Cerca' },
    { key: 'D', label: 'Toggle tema' },
    { key: 'N', label: 'Vai a Tasks' },
    { key: '1-9', label: 'Naviga sezioni' },
    { key: 'Esc', label: 'Chiudi sidebar / overlay' },
  ];
}
