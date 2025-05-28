import axios from "axios";
import { ITransactions, IUser } from "../Types";


const api = axios.create({
  baseURL: "http://localhost:5000"
});

export const getUser = async (): Promise<IUser[]> => {
  const { data } = await api.get<IUser[]>("/users");
  return data;
}

export const createUser = async (user: Omit<IUser, "id" | "dailyBudget">): Promise<IUser> => {
  const userDailyBudget = {
    ...user, dailyBudget: user.income / 30,
  };
  const { data } = await api.post<IUser>("/users", userDailyBudget);
  return data;
}

export const updateUser = async (id: string, datas: IUser): Promise<IUser> => {
  const { data } = await api.patch(`/users/${id}`, datas);
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