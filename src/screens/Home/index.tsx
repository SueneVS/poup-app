import BalancoFinanceiro from "../../componentes/BalancoFinanceiro";
import BarraLateral from "../../componentes/BarraLateral";
import BarraPesquisa from "../../componentes/BarraPesquisa";
import OrcamentoDiario from "../../componentes/OrcamentoDiario";
import UserGreeting from "../../componentes/UserGreeting";
import Transacoes from "../../componentes/Transacoes";
import {
  Container,
  Movimentacoes,
  Orcamento,
  TransacoesWrapper,
} from "./style";

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
        <Transacoes />
      </TransacoesWrapper>
    </Container>
  );
}

export default Home;
