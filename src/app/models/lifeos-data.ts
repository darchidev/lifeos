import type { User } from './user';
import type { AgendaItem } from './agenda-item';
import type { Task } from './task';
import type { Finances } from './finances';
import type { Deadline } from './deadline';
import type { Document } from './document';
import type { Recipe } from './recipe';
import type { Meals } from './meals';
import type { House } from './house';
import type { Health } from './health';
import type { Activity } from './activity';
import type { Note } from './note';

export interface LifeOSData {
  user: User;
  agenda: AgendaItem[];
  tasks: Task[];
  finances: Finances;
  deadlines: Deadline[];
  documents: Document[];
  recipes: Recipe[];
  meals: Meals;
  house: House;
  health: Health;
  activities: Activity[];
  notes: Note[];
}
