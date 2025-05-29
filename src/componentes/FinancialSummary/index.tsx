import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { Cartao, CartaoCabecalho, CartaoCorpo } from "../Cartao";
import styled from "styled-components";
import useExpensesByCategory from "../../hooks/useExpensesByCategory";

export const AreaChart = styled.div`
  padding: var(--padding-xs);
`;

const FinancialSummary = () => {
  const expensesByCategory = useExpensesByCategory();
  const data = Object.entries(expensesByCategory).map(
    ([category, expense]) => ({
      category,
      expense,
    })
  );
  return (
    <Cartao>
      <CartaoCabecalho>Gastos por categoria</CartaoCabecalho>
      <CartaoCorpo>
        <AreaChart>
          <BarChart width={730} height={250} data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="expense" fill="#f87828" />
          </BarChart>
        </AreaChart>
      </CartaoCorpo>
    </Cartao>
  );
};
export default FinancialSummary;
