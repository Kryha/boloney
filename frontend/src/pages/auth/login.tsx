import { FC } from "react";

import { BaseLayout, GameLayout, Logo, RollDice, TopNavigation } from "../../components";
import { LoginForm } from "./login-form";

export const Login: FC = () => {
  return (
    <GameLayout>
      <RollDice />
    </GameLayout>
  );
};
