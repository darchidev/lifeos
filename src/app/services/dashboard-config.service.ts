import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface WidgetDef {
  id: string;
  label: string;
  visible: boolean;
}

@Injectable({ providedIn: 'root' })
export class DashboardConfigService {
  private readonly STORAGE_KEY = 'lifeos-dashboard-widgets';
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly widgets = signal<WidgetDef[]>(this.load());

  toggle(id: string): void {
    this.widgets.update(list => {
      const next = list.map(w => w.id === id ? { ...w, visible: !w.visible } : w);
      this.persist(next);
      return next;
    });
  }

  setVisible(id: string, visible: boolean): void {
    this.widgets.update(list => {
      const next = list.map(w => w.id === id ? { ...w, visible } : w);
      this.persist(next);
      return next;
    });
  }

  visible(): WidgetDef[] {
    return this.widgets().filter(w => w.visible);
  }

  private persist(list: WidgetDef[]): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
  }

  private load(): WidgetDef[] {
    if (this.isBrowser) {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        try { return JSON.parse(raw); } catch { /* fall through */ }
      }
    }
    return [
      { id: 'agenda', label: 'Agenda', visible: true },
      { id: 'tasks', label: 'Tasks', visible: true },
      { id: 'budget', label: 'Budget', visible: true },
      { id: 'deadlines', label: 'Scadenze', visible: true },
      { id: 'meals', label: 'Meal Planner', visible: true },
      { id: 'documents', label: 'Documenti', visible: true },
      { id: 'house', label: 'Casa', visible: true },
      { id: 'health', label: 'Salute', visible: true },
      { id: 'activity', label: 'Attività', visible: true },
    ];
  }
}
