export interface IUser {
  id: string;
  name: string;
  income: number;
}

export interface ITransactions {
  id: string;
  name: string;
  amount: number;
  type: "revenue" | "expense";
  category: string;
  date: string;
}