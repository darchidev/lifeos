export interface AgendaItem {
  id: number;
  time: string;
  title: string;
  location: string;
  type: 'health' | 'personal' | 'social' | 'work';
}
