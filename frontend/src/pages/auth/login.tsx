import { FC } from "react";

import { BaseLayout, Logo } from "../../components";
import { LoginForm } from "./login-form";

export const Login: FC = () => {
  return <BaseLayout leftSection={<Logo />} mainSection={<LoginForm />} />;
};
