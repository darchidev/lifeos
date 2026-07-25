import { Component, inject, signal } from '@angular/core';
import { AddEventModal } from '../../shared/add-event-modal.component';
import { DataService } from '../../services/data.service';
import { LiveClockService } from '../../services/live-clock.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-agenda',
  imports: [AddEventModal],
  templateUrl: './agenda.html',
})
export class Agenda {
  protected readonly data = inject(DataService);
  protected readonly clock = inject(LiveClockService);
  private readonly toast = inject(ToastService);

  readonly showAddModal = signal(false);

  get events() { return this.data.events; }

  typeIcon(type: string): string {
    switch (type) {
      case 'health': return '🦷';
      case 'social': return '🍽️';
      case 'work': return '💼';
      default: return '📅';
    }
  }

  typeBadge(type: string): string {
    switch (type) {
      case 'health': return 'danger';
      case 'social': return 'success';
      case 'work': return 'primary';
      default: return 'warning';
    }
  }

  typeLabel(type: string): string {
    switch (type) {
      case 'health': return 'Salute';
      case 'social': return 'Sociale';
      case 'work': return 'Lavoro';
      default: return 'Personale';
    }
  }

  addEvent(e: { title: string; time: string; location: string; type: string }): void {
    this.data.addEvent({
      title: e.title,
      time: e.time || '00:00',
      location: e.location || '',
      type: e.type as any,
    });
    this.showAddModal.set(false);
    this.toast.show(`Evento "${e.title}" aggiunto`, 'success');
  }
}
