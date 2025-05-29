import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ITransactions, IUser } from "../Types";
import {
  createTransactions,
  createUser,
  getTransactions,
  getUser,
} from "../api";

interface AppContextType {
  user: IUser | null;
  addUser: (user: Omit<IUser, "id" | "dailyBudget">) => Promise<void>;
  transactions: ITransactions[];
  addTransaction: (
    newTransaction: Omit<ITransactions, "id" | "userId">
  ) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [transactions, setTransactions] = useState<ITransactions[]>([]);

  const fetchUserData = async () => {
    try {
      const users = await getUser();
      const transactions = await getTransactions();
      if (users.length > 0) {
        setUser(users[0]);
        setTransactions(transactions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  });

  const addUser = async (user: Omit<IUser, "id" | "dailyBudget">) => {
    try {
      const newUser = await createUser(user);
      setUser(newUser);
    } catch (err) {
      console.log(err);
    }
  };

  const addTransaction = async (
    newTransaction: Omit<ITransactions, "id" | "userId">
  ) => {
    try {
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      const { transaction, newDailyBudget } = await createTransactions(
        newTransaction,
        user
      );
      setTransactions((prev) => [...prev, transaction]);
      setUser((prev) =>
        prev ? { ...prev, dailyBudget: newDailyBudget } : null
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        addUser,
        transactions,
        addTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de um Provider");
  }
  return context;
};
