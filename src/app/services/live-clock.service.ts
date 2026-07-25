import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LiveClockService {
  readonly now = signal(new Date());

  constructor() {
    if (typeof window === 'undefined') return;
    const tick = () => this.now.set(new Date());
    tick();
    setInterval(tick, 60_000);
  }

  get greeting(): string {
    const h = this.now().getHours();
    return h < 12 ? 'Buongiorno' : h < 18 ? 'Buon pomeriggio' : 'Buonasera';
  }

  get dateString(): string {
    const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    const d = this.now();
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
  }

  get timeString(): string {
    const d = this.now();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }
}
