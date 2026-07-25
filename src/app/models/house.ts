export interface Maintenance {
  title: string;
  date: string;
  status: 'pending' | 'planned';
}

export interface Warranty {
  item: string;
  expires: string;
}

export interface House {
  maintenance: Maintenance[];
  warranties: Warranty[];
}
