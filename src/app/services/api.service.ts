import { Injectable, signal, inject } from '@angular/core';
import type { LifeOSData, AgendaItem, Task, Expense, Document, Recipe, Note } from '../models';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly auth = inject(AuthService);
  private readonly state = signal<LifeOSData | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  private authHeaders(): HeadersInit {
    const t = this.auth.token();
    return t ? { 'Authorization': `Bearer ${t}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
  }

  get data(): LifeOSData | null { return this.state(); }
  get tasks(): Task[] { return this.state()?.tasks ?? []; }
  get events(): AgendaItem[] { return this.state()?.agenda ?? []; }
  get documents(): Document[] { return this.state()?.documents ?? []; }
  get recipes(): Recipe[] { return this.state()?.recipes ?? []; }
  get notes(): Note[] { return this.state()?.notes ?? []; }
  get finances() { return this.state()?.finances; }
  get deadlines() { return this.state()?.deadlines ?? []; }
  get agenda() { return this.state()?.agenda ?? []; }
  get meals() { return this.state()?.meals; }
  get house() { return this.state()?.house; }
  get health() { return this.state()?.health; }
  get activities() { return this.state()?.activities ?? []; }
  get user() { return this.state()?.user; }

  async fetchData(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const res = await fetch('/api/data', { headers: this.authHeaders() });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      this.state.set(data);
    } catch (err) {
      this.error.set(String(err));
      console.error('ApiService.fetchData failed:', err);
    } finally {
      this.loading.set(false);
    }
  }

  private async update(body: Partial<LifeOSData>): Promise<void> {
    const res = await fetch('/api/data', {
      method: 'PATCH',
      headers: this.authHeaders(),
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const data = await res.json();
      this.state.set(data);
    }
  }

  async updateTask(id: number, completed: boolean): Promise<void> {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: this.authHeaders(),
      body: JSON.stringify({ completed }),
    });
    if (res.ok) {
      const tasks = await res.json();
      this.state.update(d => d ? { ...d, tasks } : d);
    }
  }

  async addTask(title: string): Promise<void> {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: this.authHeaders(),
      body: JSON.stringify({ title, completed: false, priority: 'medium' }),
    });
    if (res.ok) {
      const tasks = await res.json();
      this.state.update(d => d ? { ...d, tasks } : d);
    }
  }

  async addEvent(event: Omit<AgendaItem, 'id'>): Promise<void> {
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: this.authHeaders(),
      body: JSON.stringify(event),
    });
    if (res.ok) {
      const agenda = await res.json();
      this.state.update(d => d ? { ...d, agenda } : d);
    }
  }

  async addExpense(expense: Omit<Expense, 'id'>): Promise<void> {
    const res = await fetch('/api/expenses', {
      method: 'POST',
      headers: this.authHeaders(),
      body: JSON.stringify(expense),
    });
    if (res.ok) {
      const data = await res.json();
      this.state.update(d => d ? { ...d, finances: data } : d);
    }
  }

  async addDocument(doc: Omit<Document, 'id'>): Promise<void> {
    const res = await fetch('/api/documents', {
      method: 'POST',
      headers: this.authHeaders(),
      body: JSON.stringify(doc),
    });
    if (res.ok) {
      const documents = await res.json();
      this.state.update(d => d ? { ...d, documents } : d);
    }
  }

  async addRecipe(recipe: Omit<Recipe, 'id' | 'favorite'>): Promise<void> {
    const res = await fetch('/api/recipes', {
      method: 'POST',
      headers: this.authHeaders(),
      body: JSON.stringify(recipe),
    });
    if (res.ok) {
      const recipes = await res.json();
      this.state.update(d => d ? { ...d, recipes } : d);
    }
  }

  async addNote(note: Omit<Note, 'id'>): Promise<void> {
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: this.authHeaders(),
      body: JSON.stringify(note),
    });
    if (res.ok) {
      const notes = await res.json();
      this.state.update(d => d ? { ...d, notes } : d);
    }
  }
}
