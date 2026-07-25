import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-note-modal',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="modal-overlay" (click)="close()" role="dialog" aria-modal="true" aria-label="Nuova nota">
      <div class="modal-panel" (click)="$event.stopPropagation()">
        <h2>📝 Nuova nota</h2>
        <label for="nt-title">Titolo</label>
        <input id="nt-title" [(ngModel)]="title" placeholder="Titolo nota" autofocus />
        <label for="nt-content">Contenuto</label>
        <input id="nt-content" [(ngModel)]="content" placeholder="Testo della nota..." />
        <div class="modal-actions">
          <button class="btn-secondary" (click)="close()">Annulla</button>
          <button class="btn-primary" [disabled]="!title" (click)="confirm()">Aggiungi</button>
        </div>
      </div>
    </div>
  `
})
export class AddNoteModal {
  readonly saved = output<{ title: string; content: string }>();
  readonly dismissed = output();

  title = '';
  content = '';

  confirm(): void {
    if (!this.title) return;
    this.saved.emit({ title: this.title, content: this.content });
  }

  close(): void {
    this.dismissed.emit();
  }
}
