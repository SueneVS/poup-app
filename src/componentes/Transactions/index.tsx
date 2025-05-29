import { useRef, useState } from "react";
import MoneyIcon from "../Icones/MoneyIcon";
import Transaction from "../Transaction";
import { Cartao, CartaoCabecalho, CartaoCorpo } from "../Cartao";
import Button from "../Button";
import styled from "styled-components";
import Modal, { ModalHandle } from "../Modal";
import { Form } from "react-router";
import Label from "../Label";
import CampoTexto from "../CampoTexto";
import Fieldset from "../Fieldset";
import { SelectGroup, SelectOption } from "../Select";
import { useAppContext } from "../../context/AppContext";
import { ITransactions } from "../../Types";

export const Container = styled(CartaoCorpo)`
  padding: var(--padding-l) var(--padding-m);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const ListaMovimentacoes = styled.ul`
  list-style: none;
  color: var(--cor-primaria);
  margin: 0;
  padding-left: 0px;
  padding-bottom: var(--padding-m);
  width: 100%;
  height: 535px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const Transactions = () => {
  const modalRef = useRef<ModalHandle>(null);

  const { transactions, addTransaction } = useAppContext();

  const [newTransaction, setNewTransaction] = useState<
    Omit<ITransactions, "id" | "userId">
  >({
    name: "",
    amount: 0,
    type: "revenue",
    category: "",
    date: "",
  });

  const handleChange = (
    input: keyof typeof newTransaction,
    value: string | number
  ) => {
    setNewTransaction((prev) => ({ ...prev, [input]: value }));
  };

  const handleAddTransaction = async () => {
    try {
      await addTransaction(newTransaction);
      setNewTransaction({
        name: "",
        amount: 0,
        type: "revenue",
        category: "",
        date: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Cartao>
      <CartaoCabecalho>Movimentação financeira</CartaoCabecalho>
      <Container>
        <ListaMovimentacoes>
          {transactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              type={transaction.type}
              name={transaction.name}
              amount={transaction.amount}
              date={transaction.date}
            />
          ))}
        </ListaMovimentacoes>
        <Button $variante="neutro" onClick={() => modalRef.current?.open()}>
          <MoneyIcon />
          Adicionar transação
        </Button>
        <Modal
          ref={modalRef}
          onOutsideClick
          title="Adicionar transação"
          icon={<MoneyIcon />}
          handleClick={handleAddTransaction}
        >
          <Form>
            <Fieldset>
              <Label htmlFor="nameTransaction">Nome da transação</Label>
              <CampoTexto
                type="text"
                id="nameTransaction"
                placeholder="Ex: Compra na padaria"
                value={newTransaction.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange("name", e.target.value);
                }}
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="value">Valor</Label>
              <CampoTexto
                type="number"
                id="value"
                placeholder="10"
                value={newTransaction.amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange("amount", parseFloat(e.target.value));
                }}
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="type">Tipo</Label>
              <SelectGroup
                id="type"
                value={newTransaction.type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleChange("type", e.target.value);
                }}
              >
                <SelectOption value="">Selecione o tipo</SelectOption>
                <SelectOption value="revenue">Receita</SelectOption>
                <SelectOption value="expense">Despesa</SelectOption>
              </SelectGroup>
            </Fieldset>
            <Fieldset>
              <Label htmlFor="date">Data</Label>
              <CampoTexto
                type="date"
                id="date"
                placeholder="dd/mm/aaaa"
                value={newTransaction.date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange("date", e.target.value);
                }}
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="category">Categoria</Label>
              <CampoTexto
                type="text"
                id="category"
                placeholder="Alimentação"
                value={newTransaction.category}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange("category", e.target.value);
                }}
              />
            </Fieldset>
          </Form>
        </Modal>
      </Container>
    </Cartao>
  );
};
export default Transactions;
