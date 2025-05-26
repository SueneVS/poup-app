import { useRef, useState } from "react";
import MoneyIcon from "../Icones/MoneyIcon";
import Transaction from "../Transaction";
import { Cartao, CartaoCabecalho, CartaoCorpo } from "../Cartao";
import Botao from "../Botao";
import styled from "styled-components";
import Modal, { ModalHandle } from "../Modal";
import { Form } from "react-router";
import Label from "../Label";
import CampoTexto from "../CampoTexto";
import Fieldset from "../Fieldset";
import { SelectGroup, SelectOption } from "../Select";

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

const transactions = [
  {
    id: 1,
    name: "Compra de supermercado",
    amount: 150,
    type: "despesa",
    category: "Alimentação",
    date: "2024-10-10",
  },
  {
    id: 2,
    name: "Pagamento de aluguel",
    amount: 1000,
    type: "despesa",
    category: "Moradia",
    date: "2024-10-05",
  },
  {
    id: 3,
    name: "Recebimento de salário",
    amount: 3000,
    type: "receita",
    category: "Renda",
    date: "2024-10-01",
  },
];

const Transactions = () => {
  const modalRef = useRef<ModalHandle>(null);

  const [newTransaction, setNewTransaction] = useState({
    name: "",
    amount: 0,
    type: "",
    category: "",
    date: "",
  });

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
        <Botao $variante="neutro" onClick={() => modalRef.current?.open()}>
          <MoneyIcon />
          Adicionar transação
        </Botao>
        <Modal
          ref={modalRef}
          onOutsideClick
          title="Adicionar transação"
          icon={<MoneyIcon />}
          handleClick={() => alert("Transação adicionada!")}
        >
          <Form>
            <Fieldset>
              <Label htmlFor="nomeTransacao">Nome da transação</Label>
              <CampoTexto
                type="text"
                id="nomeTransacao"
                placeholder="Ex: Compra na padaria"
                value={newTransaction.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewTransaction({ ...newTransaction, name: e.target.value })
                }
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="valor">Valor</Label>
              <CampoTexto
                type="number"
                id="valor"
                placeholder="10"
                value={newTransaction.amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: parseFloat(e.target.value),
                  })
                }
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="tipo">Tipo</Label>
              <SelectGroup
                id="tipo"
                value={newTransaction.type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setNewTransaction({
                    ...newTransaction,
                    type: e.target.value,
                  })
                }
              >
                <SelectOption value="">Selecione o tipo</SelectOption>
                <SelectOption value="receita">Receita</SelectOption>
                <SelectOption value="despesa">Despesa</SelectOption>
              </SelectGroup>
            </Fieldset>
            <Fieldset>
              <Label htmlFor="valor">Data</Label>
              <CampoTexto
                type="date"
                id="valor"
                placeholder="dd/mm/aaaa"
                value={newTransaction.date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewTransaction({
                    ...newTransaction,
                    date: e.target.value,
                  })
                }
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="categoria">Categoria</Label>
              <CampoTexto
                type="text"
                id="categoria"
                placeholder="Alimentação"
                value={newTransaction.category}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewTransaction({
                    ...newTransaction,
                    category: e.target.value,
                  })
                }
              />
            </Fieldset>
          </Form>
        </Modal>
      </Container>
    </Cartao>
  );
};
export default Transactions;
