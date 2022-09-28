import { FC } from "react";

import { BaseLayout, Logo, TopNavigation } from "../../components";
import { LoginForm } from "./login-form";

export const Login: FC = () => {
  // TODO: add routes to navigate to when authenticated

  return <BaseLayout leftSection={<Logo />} mainSection={<LoginForm />} rightSection={<TopNavigation />} />;
};
