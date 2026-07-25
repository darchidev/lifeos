export interface MonthlyBudget {
  total: number;
  spent: number;
  remaining: number;
}

export interface Account {
  name: string;
  amount: number;
  type: 'bank' | 'card' | 'cash';
}

export interface Expense {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
}

export interface Subscription {
  name: string;
  amount: number;
  frequency: string;
}

export interface Finances {
  balance: number;
  monthlyBudget: MonthlyBudget;
  accounts: Account[];
  recentExpenses: Expense[];
  subscriptions: Subscription[];
}
