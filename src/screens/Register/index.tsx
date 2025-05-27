import { useState } from "react";
import {
  Section,
  Container,
  Title,
  Description,
  Illustration,
  SectionWrapper,
} from "./style.js";
import ilustracao from "../../assets/images/ilustracao-cadastro.png";
import { Form, useNavigate } from "react-router";
import Fieldset from "../../componentes/Fieldset/index.js";
import Label from "../../componentes/Label/index.js";
import { IUser } from "../../Types/index.js";
import TextInput from "../../componentes/CampoTexto/index.js";
import Button from "../../componentes/Button/index.js";
import { useAppContext } from "../../context/AppContext.js";

const Register = () => {
  const [form, setForm] = useState<Omit<IUser, "id">>({
    name: "",
    income: 0,
  });

  const handleTextInputChange = (input: "name" | "income", value: string) => {
    setForm((prev) => ({ ...prev, [input]: value }));
  };

  const navigate = useNavigate();

  const { addUser } = useAppContext();

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    addUser(form);
    navigate("/home");
  };

  return (
    <Section>
      <SectionWrapper>
        <Container>
          <Title>Configuração financeira</Title>
          <Description>
            Boas-vindas à plataforma que protege seu bolso! Antes de começar,
            precisamos de algumas informações sobre sua rotina financeira. Vamos
            lá?
          </Description>
          <Form>
            <Fieldset>
              <Label htmlFor="name">Nome</Label>
              <TextInput
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => handleTextInputChange("name", e.target.value)}
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="income">Renda mensal total</Label>
              <TextInput
                type="text"
                name="income"
                value={form.income}
                onChange={(e) =>
                  handleTextInputChange("income", e.target.value)
                }
              />
            </Fieldset>
          </Form>
          <Button $variante="primario" onClick={handleFormSubmit}>
            Ir para o app
          </Button>
        </Container>
        <Illustration
          src={ilustracao}
          alt="ilustração da tela de cadastro. Um avatar mexendo em alguns gráficos"
        />
      </SectionWrapper>
    </Section>
  );
};

export default Register;
