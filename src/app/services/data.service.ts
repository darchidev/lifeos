import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MockDataService } from './mock-data.service';
import { ApiService } from './api.service';
import type { LifeOSData, AgendaItem, Task, Expense, Document, Recipe, Note } from '../models';

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly mock = inject(MockDataService);
  private readonly api = inject(ApiService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly _ready = signal(false);

  constructor() {
    if (this.isBrowser) {
      this.api.fetchData().then(() => this._ready.set(true));
    }
  }

  private get source(): typeof this.mock {
    return this._ready() && this.api.data ? (this.api as any) : this.mock;
  }

  get data(): LifeOSData { return this.source.data; }
  get user() { return this.source.user; }
  get agenda() { return this.source.agenda; }
  get events() { return this.source.agenda; }
  get tasks() { return this.source.tasks; }
  get finances() { return this.source.finances; }
  get deadlines() { return this.source.deadlines; }
  get documents() { return this.source.documents; }
  get recipes() { return this.source.recipes; }
  get meals() { return this.source.meals; }
  get house() { return this.source.house; }
  get health() { return this.source.health; }
  get activities() { return this.source.activities; }
  get notes() { return this.source.notes; }

  async updateTask(id: number, completed: boolean): Promise<void> {
    if (this._ready() && this.api.data) {
      await this.api.updateTask(id, completed);
    } else {
      this.mock.updateTask(id, completed);
    }
  }

  async addTask(title: string): Promise<void> {
    if (this._ready() && this.api.data) {
      await this.api.addTask(title);
    } else {
      this.mock.addTask(title);
    }
  }

  async addEvent(event: Omit<AgendaItem, 'id'>): Promise<void> {
    if (this._ready() && this.api.data) {
      await this.api.addEvent(event);
    } else {
      this.mock.addEvent(event);
    }
  }

  async addExpense(expense: Omit<Expense, 'id'>): Promise<void> {
    if (this._ready() && this.api.data) {
      await this.api.addExpense(expense);
    } else {
      this.mock.addExpense(expense);
    }
  }

  async addDocument(doc: Omit<Document, 'id'>): Promise<void> {
    if (this._ready() && this.api.data) {
      await this.api.addDocument(doc);
    } else {
      this.mock.addDocument(doc);
    }
  }

  async addRecipe(recipe: Omit<Recipe, 'id' | 'favorite'>): Promise<void> {
    if (this._ready() && this.api.data) {
      await this.api.addRecipe(recipe);
    } else {
      this.mock.addRecipe(recipe);
    }
  }

  async addNote(note: Omit<Note, 'id'>): Promise<void> {
    if (this._ready() && this.api.data) {
      await this.api.addNote(note);
    } else {
      this.mock.addNote(note);
    }
  }
}
