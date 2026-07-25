import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-recipe-modal',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="modal-overlay" (click)="close()" role="dialog" aria-modal="true" aria-label="Nuova ricetta">
      <div class="modal-panel" (click)="$event.stopPropagation()">
        <h2>🍳 Nuova ricetta</h2>
        <label for="rc-title">Titolo</label>
        <input id="rc-title" [(ngModel)]="title" placeholder="Es. Lasagne" autofocus />
        <label for="rc-category">Categoria</label>
        <select id="rc-category" [(ngModel)]="category">
          <option value="Primi">Primi</option>
          <option value="Secondi">Secondi</option>
          <option value="Dolci">Dolci</option>
          <option value="Antipasti">Antipasti</option>
          <option value="Contorni">Contorni</option>
        </select>
        <label for="rc-time">Tempo</label>
        <input id="rc-time" [(ngModel)]="time" placeholder="Es. 30 min" />
        <div class="modal-actions">
          <button class="btn-secondary" (click)="close()">Annulla</button>
          <button class="btn-primary" [disabled]="!title" (click)="confirm()">Aggiungi</button>
        </div>
      </div>
    </div>
  `
})
export class AddRecipeModal {
  readonly saved = output<{ title: string; category: string; time: string }>();
  readonly dismissed = output();

  title = '';
  category = 'Primi';
  time = '';

  confirm(): void {
    if (!this.title) return;
    this.saved.emit({ title: this.title, category: this.category, time: this.time || '—' });
  }

  close(): void {
    this.dismissed.emit();
  }
}
