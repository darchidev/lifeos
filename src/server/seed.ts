import { connectDB, getDB } from './db';

const seedData = {
  userId: 'default',
  user: {
    name: 'Dac',
    avatar: 'D',
    greeting: 'Buongiorno',
    date: '',
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
    appointments: [{ title: 'Dentista', date: '25 Luglio' }],
  },
  activities: [
    { icon: '💰', title: 'Registrata nuova spesa', detail: 'Ikea · €48' },
    { icon: '🍝', title: 'Aggiunta nuova ricetta', detail: 'Lasagne' },
    { icon: '📄', title: 'Caricato documento', detail: 'Contratto Energia.pdf' },
    { icon: '✅', title: 'Task completato', detail: 'Pagata assicurazione' },
  ],
  notes: [
    { id: 1, title: 'Idee per il sito web', content: 'Refactoring completo con Angular 22 e Tailwind 4', updated: '2 giorni fa' },
    { id: 2, title: 'Password importanti', content: 'Cloud: admin/xxx — DB: root/xxx', updated: '1 settimana fa' },
  ],
};

export async function seedDB(): Promise<void> {
  await connectDB();
  const db = getDB();
  const exists = await db.collection('lifeos_data').findOne({ userId: 'default' });
  if (!exists) {
    await db.collection('lifeos_data').insertOne(seedData);
    console.log('Database seeded');
  } else {
    console.log('Database already seeded');
  }
}
