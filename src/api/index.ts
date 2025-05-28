import axios from "axios";
import { ITransactions, IUser } from "../Types";


const api = axios.create({
  baseURL: "http://localhost:5000"
});

export const getUser = async (): Promise<IUser[]> => {
  const { data } = await api.get<IUser[]>("/users");
  return data;
}

export const createUser = async (user: Omit<IUser, "id">): Promise<IUser> => {
  const { data } = await api.post<IUser>("/users", user);
  return data;
}

export const getTransactions = async (): Promise<ITransactions[]> => {
  const { data } = await api.get<ITransactions[]>("/transactions");
  return data;
}

export const createTransactions = async (transactions: Omit<ITransactions, "id">): Promise<ITransactions> => {
  const { data } = await api.post<ITransactions>("/transactions", transactions);
  return data;
}