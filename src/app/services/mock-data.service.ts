import { Injectable, signal } from '@angular/core';
import type { LifeOSData, AgendaItem, Expense, Document, Note, Recipe } from '../models';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly state = signal<LifeOSData>(this.buildData());

  get data(): LifeOSData { return this.state(); }
  get user() { return this.data.user; }
  get agenda() { return this.data.agenda; }
  get tasks() { return this.data.tasks; }
  get finances() { return this.data.finances; }
  get deadlines() { return this.data.deadlines; }
  get documents() { return this.data.documents; }
  get recipes() { return this.data.recipes; }
  get meals() { return this.data.meals; }
  get house() { return this.data.house; }
  get health() { return this.data.health; }
  get activities() { return this.data.activities; }
  get notes() { return this.data.notes; }

  getData(): LifeOSData {
    return this.state();
  }

  private nextId(items: Array<{ id: number }>): number {
    return items.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  }

  updateTask(id: number, completed: boolean): void {
    this.state.update(d => {
      const task = d.tasks.find(t => t.id === id);
      if (task) task.completed = completed;
      return { ...d };
    });
  }

  addTask(title: string): void {
    this.state.update(d => {
      d.tasks.push({ id: this.nextId(d.tasks), title, completed: false, priority: 'medium' });
      return { ...d };
    });
  }

  addEvent(event: Omit<AgendaItem, 'id'>): void {
    this.state.update(d => {
      d.agenda.push({ ...event, id: this.nextId(d.agenda) });
      return { ...d };
    });
  }

  addExpense(expense: Omit<Expense, 'id'>): void {
    this.state.update(d => {
      d.finances.recentExpenses.push({ ...expense, id: this.nextId(d.finances.recentExpenses) });
      d.finances.monthlyBudget.spent += expense.amount;
      return { ...d };
    });
  }

  addDocument(doc: Omit<Document, 'id'>): void {
    this.state.update(d => {
      d.documents.push({ ...doc, id: this.nextId(d.documents) });
      return { ...d };
    });
  }

  addRecipe(recipe: Omit<Recipe, 'favorite' | 'id'>): void {
    this.state.update(d => {
      d.recipes.push({ ...recipe, id: this.nextId(d.recipes), favorite: false });
      return { ...d };
    });
  }

  addNote(note: Omit<Note, 'id'>): void {
    this.state.update(d => {
      d.notes.push({ ...note, id: this.nextId(d.notes) });
      return { ...d };
    });
  }

  get events() {
    return this.agenda;
  }

  private buildData(): LifeOSData {
    const now = new Date();
    const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const greeting = now.getHours() < 12 ? 'Buongiorno' : now.getHours() < 18 ? 'Buon pomeriggio' : 'Buonasera';

    return {
      user: {
        name: 'Dac',
        avatar: 'D',
        greeting,
        date: `${dayName} ${day} ${month}`,
      },
      agenda: [
        { id: 1, time: '09:00', title: 'Dentista', location: 'Studio Rossi', type: 'health' },
        { id: 2, time: '14:00', title: 'Fare la spesa', location: 'Supermercato', type: 'personal' },
        { id: 3, time: '19:30', title: 'Cena con Marco', location: 'Centro città', type: 'social' },
      ],
      tasks: [
        { id: 1, title: 'Pagare assicurazione auto', completed: false, priority: 'high' },
        { id: 2, title: 'Fare backup NAS', completed: false, priority: 'medium' },
        { id: 3, title: 'Ordinare filtri climatizzatore', completed: false, priority: 'low' },
        { id: 4, title: 'Chiamare commercialista', completed: true, priority: 'medium' },
      ],
      finances: {
        balance: 13580,
        monthlyBudget: { total: 1500, spent: 1080, remaining: 420 },
        accounts: [
          { name: 'Conto principale', amount: 8500, type: 'bank' },
          { name: 'Carta', amount: 420, type: 'card' },
          { name: 'Contanti', amount: 80, type: 'cash' },
        ],
        recentExpenses: [
          { id: 1, title: 'Ikea', category: 'Casa', amount: 48, date: 'Ieri' },
          { id: 2, title: 'Esselunga', category: 'Spesa', amount: 76, date: '22 Luglio' },
          { id: 3, title: 'Netflix', category: 'Abbonamento', amount: 13.99, date: '20 Luglio' },
        ],
        subscriptions: [
          { name: 'Netflix', amount: 13.99, frequency: 'mensile' },
          { name: 'Spotify', amount: 10.99, frequency: 'mensile' },
        ],
      },
      deadlines: [
        { title: 'Assicurazione Auto', date: '28 Luglio', amount: '€540', urgency: 'danger' },
        { title: 'Bollo Auto', date: '10 Agosto', amount: '€214', urgency: 'warning' },
        { title: 'Carta identità', date: 'Novembre', amount: null, urgency: 'normal' },
      ],
      documents: [
        { id: 1, name: 'Patente.pdf', category: 'Personali', updated: 'Ieri', icon: '🚗' },
        { id: 2, name: 'Contratto Casa.pdf', category: 'Casa', updated: '5 giorni fa', icon: '🏠' },
        { id: 3, name: 'Libretto Auto.pdf', category: 'Auto', updated: '12 giorni fa', icon: '📄' },
        { id: 4, name: 'Esami Sangue.pdf', category: 'Salute', updated: '1 mese fa', icon: '🩺' },
      ],
      recipes: [
        { id: 1, title: 'Pasta al pesto', category: 'Primi', time: '20 min', favorite: true },
        { id: 2, title: 'Pollo e verdure', category: 'Secondi', time: '35 min', favorite: false },
        { id: 3, title: 'Tiramisù', category: 'Dolci', time: '45 min', favorite: true },
      ],
      meals: {
        breakfast: 'Yogurt + Frutta',
        lunch: 'Pasta al pesto',
        dinner: 'Pollo e Verdure',
      },
      house: {
        maintenance: [
          { title: 'Pulizia filtro condizionatore', date: '01 Agosto', status: 'pending' },
          { title: 'Controllo caldaia', date: 'Ottobre', status: 'planned' },
        ],
        warranties: [
          { item: 'Lavatrice', expires: '2027' },
          { item: 'Frigorifero', expires: '2028' },
        ],
      },
      health: {
        heartRate: 72,
        steps: 8942,
        sleep: '7h 18m',
        appointments: [
          { title: 'Dentista', date: '25 Luglio' },
        ],
      },
      notes: [
        { id: 1, title: 'Idee per il sito web', content: 'Refactoring completo con Angular 22 e Tailwind 4', updated: '2 giorni fa' },
        { id: 2, title: 'Password importanti', content: 'Cloud: admin/xxx — DB: root/xxx', updated: '1 settimana fa' },
      ],
      activities: [
        { icon: '💰', title: 'Registrata nuova spesa', detail: 'Ikea · €48' },
        { icon: '🍝', title: 'Aggiunta nuova ricetta', detail: 'Lasagne' },
        { icon: '📄', title: 'Caricato documento', detail: 'Contratto Energia.pdf' },
        { icon: '✅', title: 'Task completato', detail: 'Pagata assicurazione' },
      ],
    };
  }
}
