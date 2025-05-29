import { useMemo } from "react";
import { useAppContext } from "../context/AppContext";

const useExpensesByCategory = () => {
  const { transactions } = useAppContext();
  const expensesByCategory = useMemo(() => {
    return transactions
      .filter((transactions) => transactions.type === "expense")
      .reduce<Record<string, number>>((total, transactions) => {
        total[transactions.category] =
          (total[transactions.category] || 0) + transactions.amount;
        return total;
      }, {});
  }, [transactions]);

  return expensesByCategory;
};

export default useExpensesByCategory;
