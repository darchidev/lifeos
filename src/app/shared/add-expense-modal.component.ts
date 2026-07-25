import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-expense-modal',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="modal-overlay" (click)="close()" role="dialog" aria-modal="true" aria-label="Nuova spesa">
      <div class="modal-panel" (click)="$event.stopPropagation()">
        <h2>💰 Nuova spesa</h2>
        <label for="ex-title">Titolo</label>
        <input id="ex-title" [(ngModel)]="title" placeholder="Es. Ikea" autofocus />
        <label for="ex-category">Categoria</label>
        <input id="ex-category" [(ngModel)]="category" placeholder="Es. Casa" />
        <label for="ex-amount">Importo (€)</label>
        <input id="ex-amount" type="number" step="0.01" [(ngModel)]="amount" placeholder="0.00" />
        <div class="modal-actions">
          <button class="btn-secondary" (click)="close()">Annulla</button>
          <button class="btn-primary" [disabled]="!title || !amount" (click)="confirm()">Aggiungi</button>
        </div>
      </div>
    </div>
  `
})
export class AddExpenseModal {
  readonly saved = output<{ title: string; category: string; amount: number; date: string }>();
  readonly dismissed = output();

  title = '';
  category = '';
  amount = 0;

  confirm(): void {
    if (!this.title || !this.amount) return;
    const days = ['Oggi', 'Ieri'];
    this.saved.emit({ title: this.title, category: this.category || 'Altro', amount: this.amount, date: days[0] });
  }

  close(): void {
    this.dismissed.emit();
  }
}
