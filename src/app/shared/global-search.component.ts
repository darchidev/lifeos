import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-global-search',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    @if (ui.searchOpen()) {
      <div class="search-overlay" (click)="close()" role="dialog" aria-modal="true" aria-label="Ricerca globale">
        <div class="search-panel" (click)="$event.stopPropagation()" role="search">
          <div class="search-header">
            <span class="search-icon">🔍</span>
            <input
              #input
              type="search"
              [(ngModel)]="query"
              (keydown.escape)="close()"
              placeholder="Cerca task, documenti, ricette, note..."
              class="search-input"
              autofocus
              aria-label="Termine di ricerca"
            />
            <button class="search-close" (click)="close()" aria-label="Chiudi ricerca">✕</button>
          </div>
          <div class="search-results" role="listbox">
            @if (!query) {
              <div class="search-hint">Inizia a digitare per cercare...</div>
            } @else if (results.length === 0) {
              <div class="search-empty">Nessun risultato per "{{ query }}"</div>
            } @else {
              @for (r of results; track r.id + r.type) {
                <a
                  class="search-result-item"
                  [routerLink]="r.link"
                  (click)="close()"
                  role="option"
                  [attr.aria-label]="r.title"
                >
                  <span class="result-icon">{{ r.icon }}</span>
                  <div class="result-body">
                    <span class="result-title">{{ r.title }}</span>
                    <span class="result-type">{{ r.type }}</span>
                  </div>
                </a>
              }
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .search-overlay {
      position: fixed; inset: 0; z-index: 9998;
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(4px);
      display: flex; justify-content: center;
      padding: 2rem 1rem;
    }
    .search-panel {
      width: 100%; max-width: 36rem; max-height: 80vh;
      background: var(--bg-primary);
      border-radius: 1rem;
      display: flex; flex-direction: column;
      box-shadow: 0 16px 48px rgba(0,0,0,0.2);
      animation: slideDown 0.2s ease-out;
    }
    @keyframes slideDown {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .search-header {
      display: flex; align-items: center;
      gap: 0.75rem; padding: 1rem;
      border-bottom: 1px solid var(--border);
    }
    .search-icon { font-size: 1.25rem; }
    .search-input {
      flex: 1; border: none; outline: none;
      font-size: 1.1rem; background: transparent;
      color: var(--text-primary);
      font-family: inherit;
    }
    .search-input::placeholder { color: var(--text-tertiary); }
    .search-close {
      background: none; border: none; font-size: 1.25rem;
      cursor: pointer; padding: 0.25rem; color: var(--text-secondary);
      border-radius: 0.5rem;
    }
    .search-close:hover { background: var(--bg-hover); }
    .search-results {
      flex: 1; overflow-y: auto; padding: 0.5rem;
    }
    .search-hint, .search-empty {
      padding: 2rem; text-align: center; color: var(--text-tertiary);
    }
    .search-result-item {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0.75rem; border-radius: 0.75rem;
      text-decoration: none; color: inherit;
      transition: background 0.15s;
    }
    .search-result-item:hover, .search-result-item:focus-visible {
      background: var(--bg-hover); outline: none;
    }
    .result-icon { font-size: 1.25rem; width: 2rem; text-align: center; }
    .result-body { display: flex; flex-direction: column; gap: 0.125rem; }
    .result-title { font-weight: 500; color: var(--text-primary); }
    .result-type { font-size: 0.75rem; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em; }
  `]
})
export class GlobalSearchComponent {
  readonly data = inject(DataService);
  readonly ui = inject(UiService);

  query = '';

  get results(): Array<{ id: string; type: string; icon: string; title: string; link: string }> {
    const q = this.query.toLowerCase().trim();
    if (!q) return [];
    const r: Array<{ id: string; type: string; icon: string; title: string; link: string }> = [];
    for (const t of this.data.tasks) {
      if (t.title.toLowerCase().includes(q)) {
        r.push({ id: String(t.id), type: 'Task', icon: '☑️', title: t.title, link: '/tasks' });
      }
    }
    for (const e of this.data.events) {
      if (e.title.toLowerCase().includes(q)) {
        r.push({ id: String(e.id), type: 'Evento', icon: '📅', title: e.title, link: '/agenda' });
      }
    }
    for (const d of this.data.documents) {
      if (d.name.toLowerCase().includes(q)) {
        r.push({ id: String(d.id), type: 'Documento', icon: '📄', title: d.name, link: '/documenti' });
      }
    }
    for (const rcp of this.data.recipes) {
      if (rcp.title.toLowerCase().includes(q)) {
        r.push({ id: String(rcp.id), type: 'Ricetta', icon: '🍳', title: rcp.title, link: '/cucina' });
      }
    }
    for (const n of this.data.notes) {
      if (n.title.toLowerCase().includes(q)) {
        r.push({ id: String(n.id), type: 'Nota', icon: '📝', title: n.title, link: '/archivio' });
      }
    }
    return r;
  }

  close(): void {
    this.ui.closeSearch();
    this.query = '';
  }
}
