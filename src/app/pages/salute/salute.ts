import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-salute',
  imports: [DecimalPipe],
  templateUrl: './salute.html',
})
export class Salute {
  protected readonly data = inject(DataService);
}
