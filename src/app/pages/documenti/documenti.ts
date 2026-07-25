import { Component, inject, signal } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { AddDocumentModal } from '../../shared/add-document-modal.component';

@Component({
  selector: 'app-documenti',
  imports: [AddDocumentModal],
  templateUrl: './documenti.html',
})
export class Documenti {
  protected readonly data = inject(DataService);
  private readonly toast = inject(ToastService);

  readonly showAddModal = signal(false);

  addDocument(e: { name: string; category: string; icon: string; updated: string }): void {
    this.data.addDocument({ name: e.name, category: e.category, icon: e.icon, updated: e.updated });
    this.showAddModal.set(false);
    this.toast.show(`Documento "${e.name}" aggiunto`, 'success');
  }
}
