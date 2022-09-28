import { FC } from "react";

import { BaseLayout, Logo, TopNavigation } from "../../components";
import { RegisterForm } from "./register-form";

export const Register: FC = () => {
  // TODO: add routes to navigate to when authenticated

  return <BaseLayout leftSection={<Logo />} mainSection={<RegisterForm />} rightSection={<TopNavigation />} />;
};
