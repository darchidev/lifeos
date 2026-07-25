import { MongoClient, ServerApiVersion } from 'mongodb';

function getUri(): string {
  return process.env['MONGODB_URI'] || 'mongodb://localhost:27017/lifeos';
}

let client: MongoClient | null = null;
let connecting: Promise<MongoClient> | null = null;

export async function connectDB(): Promise<MongoClient> {
  if (client) return client;
  if (connecting) return connecting;
  connecting = (async () => {
    console.log('Connecting to MongoDB...');
    const c = new MongoClient(getUri(), {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    });
    await c.connect();
    await c.db('admin').command({ ping: 1 });
    client = c;
    console.log('Connected to MongoDB Atlas');
    return c;
  })();
  return connecting;
}

export function getDB() {
  if (!client) throw new Error('DB not connected. Call connectDB() first.');
  return client.db('lifeos');
}
