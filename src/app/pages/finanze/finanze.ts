import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { AddExpenseModal } from '../../shared/add-expense-modal.component';

@Component({
  selector: 'app-finanze',
  imports: [DecimalPipe, AddExpenseModal],
  templateUrl: './finanze.html',
})
export class Finanze {
  protected readonly data = inject(DataService);
  private readonly toast = inject(ToastService);

  readonly showAddModal = signal(false);

  protected budgetPct(): number {
    const b = this.data.finances.monthlyBudget;
    return b.total > 0 ? Math.round((b.spent / b.total) * 100) : 0;
  }

  addExpense(e: { title: string; category: string; amount: number; date: string }): void {
    this.data.addExpense({ title: e.title, category: e.category, amount: e.amount, date: e.date });
    this.showAddModal.set(false);
    this.toast.show(`Spesa "${e.title}" registrata`, 'success');
  }
}
