import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.html',
})
export class Tasks {
  protected readonly data = inject(DataService);

  protected toggleTask(id: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.data.updateTask(id, checked);
  }

  protected addTask(input: HTMLInputElement): void {
    const title = input.value.trim();
    if (!title) return;
    this.data.addTask(title);
    input.value = '';
  }
}
