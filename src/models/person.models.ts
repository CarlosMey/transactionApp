export interface Person {
    id: string;
    name: string;
    lastname: string;
    bod: Date;
    phone: string;
    email: string;
    address: string;
    payments: number;
    total: number;
    transactions: any[];
}
export type User = {
  id: number;
  name: string;
  lastname: string;
  bod: string;
  phone: string;
  email: string;
  address: string;
  transactions: Transactions[];
}
export type Transactions = {
  id: number;
  user_id: number;
  transaction: number;
  amount: number;
  date: string;
  status: boolean;
}
export interface HandleSubmit {
  schema: Object;
}