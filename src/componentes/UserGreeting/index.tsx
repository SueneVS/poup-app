import styled from "styled-components";
import { getUser } from "../../api";
import { useEffect, useState } from "react";
import { IUser } from "../../Types";

export const StyledUser = styled.div`
  grid-area: usuario;
  color: var(--cor-neutra-light);

  & > h1 {
    margin: 16px 0 0 0;
  }

  & > p {
    margin: 8px 0 16px 0;
  }
`;

const UserGreeting = () => {
  const [user, setUser] = useState<IUser | null>(null);

  const findUser = async () => {
    const response = await getUser();
    setUser(response[0]);
  };

  useEffect(() => {
    findUser();
  }, []);
  return (
    <StyledUser>
      <h1>Olá, {user?.name}</h1>
      <p>Veja como estão suas finanças hoje.</p>
    </StyledUser>
  );
};

export default UserGreeting;
