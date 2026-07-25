export interface Deadline {
  title: string;
  date: string;
  amount: string | null;
  urgency: 'danger' | 'warning' | 'normal';
}
