import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-event-modal',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="modal-overlay" (click)="close()" role="dialog" aria-modal="true" aria-label="Nuovo evento">
      <div class="modal-panel" (click)="$event.stopPropagation()">
        <h2>📅 Nuovo evento</h2>
        <label for="ev-title">Titolo</label>
        <input id="ev-title" [(ngModel)]="title" placeholder="Es. Dentista" autofocus />
        <label for="ev-time">Ora</label>
        <input id="ev-time" [(ngModel)]="time" placeholder="14:00" />
        <label for="ev-location">Luogo</label>
        <input id="ev-location" [(ngModel)]="location" placeholder="Es. Studio Rossi" />
        <label for="ev-type">Tipo</label>
        <select id="ev-type" [(ngModel)]="type">
          <option value="personal">Personale</option>
          <option value="health">Salute</option>
          <option value="social">Sociale</option>
          <option value="work">Lavoro</option>
        </select>
        <div class="modal-actions">
          <button class="btn-secondary" (click)="close()">Annulla</button>
          <button class="btn-primary" [disabled]="!title" (click)="confirm()">Aggiungi</button>
        </div>
      </div>
    </div>
  `
})
export class AddEventModal {
  readonly saved = output<{ title: string; time: string; location: string; type: string }>();
  readonly dismissed = output();

  title = '';
  time = '';
  location = '';
  type = 'personal';

  confirm(): void {
    if (!this.title) return;
    this.saved.emit({ title: this.title, time: this.time, location: this.location, type: this.type });
  }

  close(): void {
    this.dismissed.emit();
  }
}
