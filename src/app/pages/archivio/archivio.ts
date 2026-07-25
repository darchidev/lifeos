import { Component, inject, signal } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { AddNoteModal } from '../../shared/add-note-modal.component';

@Component({
  selector: 'app-archivio',
  imports: [AddNoteModal],
  templateUrl: './archivio.html',
})
export class Archivio {
  protected readonly data = inject(DataService);
  private readonly toast = inject(ToastService);

  readonly showAddModal = signal(false);

  get notes() { return this.data.notes; }

  addNote(e: { title: string; content: string }): void {
    this.data.addNote({ title: e.title, content: e.content, updated: 'Oggi' });
    this.showAddModal.set(false);
    this.toast.show(`Nota "${e.title}" salvata`, 'success');
  }
}
