import styled from "styled-components";

export const ItemTransaction = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--padding-m);
  border-bottom: 1px solid var(--cor-neutra-medium);
  margin-top: 24px;
  &:nth-child(1) {
    margin-top: 0;
  }
`;

interface TitleTransactionProps {
  $type: string;
}

export const TitleTransaction = styled.div<TitleTransactionProps>`
  color: ${(props) =>
    props.$type === "receita"
      ? "var(--cor-secundaria-receita)"
      : "var(--cor-secundaria-despesa)"};
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: var(--gap-xs);

  & > h3 {
    margin: 0;
    text-align: start;
  }
`;

export const BalanceTransaction = styled.div`
  text-align: start;
  color: var(--cor-neutra-light);
  & > p {
    margin: 0;
    margin-bottom: 8px;
  }
`;

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

interface TransactionProps {
  type: string;
  name: string;
  amount: number;
  date: string;
}

const Transaction = ({ type, name, amount, date }: TransactionProps) => {
  return (
    <ItemTransaction>
      <TitleTransaction $type={type}>
        <h3>{name}</h3>
        <span>{formatter.format(amount)}</span>
      </TitleTransaction>
      <BalanceTransaction>
        <p>{formatDate(date)}</p>
      </BalanceTransaction>
    </ItemTransaction>
  );
};

export default Transaction;
