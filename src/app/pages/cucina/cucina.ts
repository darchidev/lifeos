import { Component, inject, signal } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { AddRecipeModal } from '../../shared/add-recipe-modal.component';

@Component({
  selector: 'app-cucina',
  imports: [AddRecipeModal],
  templateUrl: './cucina.html',
})
export class Cucina {
  protected readonly data = inject(DataService);
  private readonly toast = inject(ToastService);

  readonly showAddModal = signal(false);

  addRecipe(e: { title: string; category: string; time: string }): void {
    this.data.addRecipe(e);
    this.showAddModal.set(false);
    this.toast.show(`Ricetta "${e.title}" aggiunta`, 'success');
  }
}
