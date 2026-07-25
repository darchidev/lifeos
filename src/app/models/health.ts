export interface Appointment {
  title: string;
  date: string;
}

export interface Health {
  heartRate: number;
  steps: number;
  sleep: string;
  appointments: Appointment[];
}
