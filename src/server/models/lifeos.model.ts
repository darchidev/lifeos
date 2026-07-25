import { getDB } from '../db';

const COLLECTION = 'lifeos_data';

export interface LifeOSDocument {
  userId: string;
  user: any;
  agenda: any[];
  tasks: any[];
  finances: any;
  deadlines: any[];
  documents: any[];
  recipes: any[];
  meals: any;
  house: any;
  health: any;
  activities: any[];
  notes: any[];
}

export async function getDocument(): Promise<LifeOSDocument | null> {
  const db = getDB();
  return db.collection<LifeOSDocument>(COLLECTION).findOne({ userId: 'default' });
}

export async function upsertDocument(data: Partial<LifeOSDocument>): Promise<void> {
  const db = getDB();
  await db.collection<LifeOSDocument>(COLLECTION).updateOne(
    { userId: 'default' },
    { $set: data },
    { upsert: true },
  );
}

export async function pushToArray(field: string, item: any): Promise<void> {
  const db = getDB();
  await db.collection(COLLECTION).updateOne(
    { userId: 'default' },
    { $push: { [field]: item } },
  );
}
