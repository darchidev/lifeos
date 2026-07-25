import { getDB } from '../db';

export interface UserDoc {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

export async function findUser(email: string): Promise<UserDoc | null> {
  const db = getDB();
  return db.collection<UserDoc>('users').findOne({ email });
}

export async function createUser(email: string, password: string, name: string): Promise<void> {
  const db = getDB();
  await db.collection<UserDoc>('users').insertOne({
    email,
    password,
    name,
    createdAt: new Date(),
  });
}
