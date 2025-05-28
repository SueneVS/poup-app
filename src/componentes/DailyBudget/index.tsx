import { useAppContext } from "../../context/AppContext";
import { Cartao, CartaoCabecalho, CartaoCorpo, Descricao } from "../Cartao";

const formatador = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

const DailyBudget = () => {
  const { user } = useAppContext();
  return (
    <Cartao>
      <CartaoCabecalho>Orçamento diário disponível</CartaoCabecalho>
      <CartaoCorpo>
        <Descricao>{formatador.format(user?.dailyBudget ?? 0)}</Descricao>
      </CartaoCorpo>
    </Cartao>
  );
};
export default DailyBudget;
