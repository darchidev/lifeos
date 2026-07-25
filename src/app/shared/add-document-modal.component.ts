import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-document-modal',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="modal-overlay" (click)="close()" role="dialog" aria-modal="true" aria-label="Nuovo documento">
      <div class="modal-panel" (click)="$event.stopPropagation()">
        <h2>📄 Nuovo documento</h2>
        <label for="doc-name">Nome file</label>
        <input id="doc-name" [(ngModel)]="name" placeholder="Es. Contratto.pdf" autofocus />
        <label for="doc-category">Categoria</label>
        <input id="doc-category" [(ngModel)]="category" placeholder="Es. Casa" />
        <label for="doc-icon">Icona</label>
        <input id="doc-icon" [(ngModel)]="icon" placeholder="📄" maxlength="2" />
        <div class="modal-actions">
          <button class="btn-secondary" (click)="close()">Annulla</button>
          <button class="btn-primary" [disabled]="!name" (click)="confirm()">Aggiungi</button>
        </div>
      </div>
    </div>
  `
})
export class AddDocumentModal {
  readonly saved = output<{ name: string; category: string; icon: string; updated: string }>();
  readonly dismissed = output();

  name = '';
  category = '';
  icon = '📄';

  confirm(): void {
    if (!this.name) return;
    this.saved.emit({ name: this.name, category: this.category || 'Altro', icon: this.icon, updated: 'Oggi' });
  }

  close(): void {
    this.dismissed.emit();
  }
}
