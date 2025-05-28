import BalancoFinanceiro from "../../componentes/BalancoFinanceiro";
import BarraLateral from "../../componentes/BarraLateral";
import BarraPesquisa from "../../componentes/BarraPesquisa";
import OrcamentoDiario from "../../componentes/DailyBudget";
import UserGreeting from "../../componentes/UserGreeting";
import {
  Container,
  Movimentacoes,
  Orcamento,
  TransacoesWrapper,
} from "./style";
import Transactions from "../../componentes/Transactions";

function Home() {
  return (
    <Container>
      <BarraLateral />
      <BarraPesquisa />
      <UserGreeting />
      <Orcamento>
        <OrcamentoDiario />
      </Orcamento>
      <Movimentacoes>
        <BalancoFinanceiro />
      </Movimentacoes>
      <TransacoesWrapper>
        <Transactions />
      </TransacoesWrapper>
    </Container>
  );
}

export default Home;
