import dotenv from 'dotenv';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

const envPaths = [
  resolve(import.meta.dirname, '../atlas-credentials.env'),
  resolve(process.cwd(), 'atlas-credentials.env'),
];
for (const p of envPaths) {
  if (existsSync(p)) { dotenv.config({ path: p }); break; }
}

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from './server/db';
import { getDocument, pushToArray } from './server/models/lifeos.model';
import { findUser, createUser } from './server/models/user.model';

const JWT_SECRET = process.env['JWT_SECRET'] || 'lifeos-dev-secret-change-in-production';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

/* ───────── Auth Middleware ───────── */

function authMiddleware(req: any, _res: any, next: any) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return _res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as { email: string };
    req.userEmail = payload.email;
    next();
  } catch {
    return _res.status(401).json({ error: 'Invalid token' });
  }
}

/* ───────── Auth Routes ───────── */

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    await connectDB();
    const { email, password, name } = req.body;
    if (!email || !password || !name) return res.status(400).json({ error: 'email, password, name required' });
    const existing = await findUser(email);
    if (existing) return res.status(409).json({ error: 'Email già registrata' });
    const hashed = await bcrypt.hash(password, 10);
    await createUser(email, hashed, name);
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '30d' });
    return res.json({ token, user: { email, name } });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    await connectDB();
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email e password richiesti' });
    const user = await findUser(email);
    if (!user) return res.status(401).json({ error: 'Email o password errati' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Email o password errati' });
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '30d' });
    return res.json({ token, user: { email, name: user.name } });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
});

// GET /api/auth/me — returns current user info
app.get('/api/auth/me', authMiddleware, async (req: any, res) => {
  try {
    await connectDB();
    const user = await findUser(req.userEmail);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ email: user.email, name: user.name });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
});

/* ───────── API Auth Middleware ───────── */
// Protegge tutte le rotte /api/* tranne /api/auth/*
app.use(/^\/api\/(?!auth\/).*/, authMiddleware);

/* ───────── API Routes ───────── */

// Helper: ensure data exists
async function ensureData() {
  await connectDB();
  const doc = await getDocument();
  if (!doc) {
    const { seedDB } = await import('./server/seed');
    await seedDB();
    return (await getDocument())!;
  }
  return doc;
}

// GET /api/data — full dataset
app.get('/api/data', async (_req, res) => {
  try {
    const doc = await ensureData();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// PATCH /api/data — partial update
app.patch('/api/data', async (req, res) => {
  try {
    const { upsertDocument } = await import('./server/models/lifeos.model');
    await connectDB();
    await upsertDocument(req.body);
    const doc = await getDocument();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// POST /api/tasks
app.post('/api/tasks', async (req, res) => {
  try {
    const doc = await ensureData();
    const tasks = doc.tasks as Array<{ id: number }>;
    const maxId = tasks.reduce((max: number, t: any) => Math.max(max, t.id ?? 0), 0);
    const newTask = { id: maxId + 1, ...req.body };
    await pushToArray('tasks', newTask);
    const updated = await getDocument();
    res.json(updated?.tasks ?? []);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// PATCH /api/tasks/:id
app.patch('/api/tasks/:id', async (req, res) => {
  try {
    await connectDB();
    const { getDB } = await import('./server/db');
    const db = getDB();
    const taskId = Number(req.params.id);
    await db.collection('lifeos_data').updateOne(
      { userId: 'default', 'tasks.id': taskId },
      { $set: Object.fromEntries(Object.entries(req.body).map(([k, v]) => [`tasks.$.${k}`, v])) },
    );
    const doc = await getDocument();
    res.json(doc?.tasks ?? []);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// POST /api/events
app.post('/api/events', async (req, res) => {
  try {
    const doc = await ensureData();
    const events = doc.agenda as Array<{ id: number }>;
    const maxId = events.reduce((max: number, e: any) => Math.max(max, e.id ?? 0), 0);
    await pushToArray('agenda', { id: maxId + 1, ...req.body });
    const updated = await getDocument();
    res.json(updated?.agenda ?? []);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// POST /api/expenses
app.post('/api/expenses', async (req, res) => {
  try {
    await connectDB();
    const { getDB } = await import('./server/db');
    const db = getDB();
    const doc = await ensureData();
    const expenses = doc.finances?.recentExpenses as Array<{ id: number }> | undefined;
    const maxId = expenses?.reduce((max: number, ex: any) => Math.max(max, ex.id ?? 0), 0) ?? 0;
    const newExpense = { id: maxId + 1, ...req.body };
    await db.collection('lifeos_data').updateOne(
      { userId: 'default' },
      {
        $push: { 'finances.recentExpenses': newExpense },
        $inc: { 'finances.monthlyBudget.spent': req.body.amount ?? 0 },
      },
    );
    const updated = await getDocument();
    res.json(updated?.finances ?? {});
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// POST /api/documents
app.post('/api/documents', async (req, res) => {
  try {
    const doc = await ensureData();
    const docs = doc.documents as Array<{ id: number }>;
    const maxId = docs.reduce((max: number, d: any) => Math.max(max, d.id ?? 0), 0);
    await pushToArray('documents', { id: maxId + 1, ...req.body });
    const updated = await getDocument();
    res.json(updated?.documents ?? []);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// POST /api/recipes
app.post('/api/recipes', async (req, res) => {
  try {
    const doc = await ensureData();
    const recipes = doc.recipes as Array<{ id: number }>;
    const maxId = recipes.reduce((max: number, r: any) => Math.max(max, r.id ?? 0), 0);
    await pushToArray('recipes', { id: maxId + 1, ...req.body, favorite: false });
    const updated = await getDocument();
    res.json(updated?.recipes ?? []);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// POST /api/notes
app.post('/api/notes', async (req, res) => {
  try {
    const doc = await ensureData();
    const notes = doc.notes as Array<{ id: number }>;
    const maxId = notes.reduce((max: number, n: any) => Math.max(max, n.id ?? 0), 0);
    await pushToArray('notes', { id: maxId + 1, ...req.body });
    const updated = await getDocument();
    res.json(updated?.notes ?? []);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
