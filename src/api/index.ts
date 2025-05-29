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

export const updateUser = async (id: string, datas: Partial<IUser>): Promise<IUser> => {
  const { data } = await api.patch(`/users/${id}`, datas);
  return data;
}

export const getTransactions = async (): Promise<ITransactions[]> => {
  const { data } = await api.get<ITransactions[]>("/transactions");
  return data;
}

export const createTransactions = async (
  transactions: Omit<ITransactions, "id" | "userId">,
  user: Omit<IUser, "name">
): Promise<{ transaction: ITransactions, newDailyBudget: number }> => {
  const transactionById = {
    ...transactions, userId: user.id,
  };
  const { data } = await api.post<ITransactions>("/transactions", transactionById);

  const allTransactions = await getTransactions();
  const balance = calculateBalance(allTransactions);
  const baseDailyBudget = user.income / 30;
  const balanceAdjustment = balance / 30;
  const newDailyBudget = baseDailyBudget + balanceAdjustment;
  await updateUser(user.id, {
    dailyBudget: newDailyBudget
  }).catch(error => console.error(error));

  return { transaction: data, newDailyBudget };
}

const calculateBalance = (transactions: ITransactions[]): number => {
  return transactions.reduce((total, transaction) => {
    return transaction.type === "revenue"
      ? total + transaction.amount
      : total - transaction.amount;
  }, 0);
}