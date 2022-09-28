import { FC } from "react";

import { BaseLayout, Logo, TopNavigation } from "../../components";
import { CreateAccountForm } from "./create-account-form";

export const CreateAccount: FC = () => {
  // TODO: add routes to navigate to when authenticated

  return <BaseLayout leftSection={<Logo />} mainSection={<CreateAccountForm />} rightSection={<TopNavigation />} />;
};
