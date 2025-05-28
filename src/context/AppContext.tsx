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
  addUser: (user: Omit<IUser, "id">) => Promise<void>;
  transactions: ITransactions[];
  addTransaction: (newTransaction: Omit<ITransactions, "id">) => Promise<void>;
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

  const addUser = async (user: Omit<IUser, "id">) => {
    try {
      const newUser = await createUser(user);
      setUser(newUser);
    } catch (err) {
      console.log(err);
    }
  };

  const addTransaction = async (newTransaction: Omit<ITransactions, "id">) => {
    try {
      const transactionCreated = await createTransactions(newTransaction);
      setTransactions((prev) => [...prev, transactionCreated]);
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
