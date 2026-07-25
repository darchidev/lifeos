import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { DashboardConfigService } from '../../services/dashboard-config.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected readonly data = inject(DataService);
  protected readonly dashConfig = inject(DashboardConfigService);

  protected budgetPercentage(): number {
    const b = this.data.finances.monthlyBudget;
    return b.total > 0 ? Math.round((b.spent / b.total) * 100) : 0;
  }

  protected toggleTask(id: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.data.updateTask(id, checked);
  }
}
