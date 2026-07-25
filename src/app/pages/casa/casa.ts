import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-casa',
  imports: [],
  templateUrl: './casa.html',
})
export class Casa {
  protected readonly data = inject(DataService);
}
