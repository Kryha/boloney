import { FC } from "react";

import { BaseLayout, Logo } from "../../components";
import { CreateAccountForm } from "./create-account-form";

export const CreateAccount: FC = () => {
  return <BaseLayout leftSection={<Logo />} mainSection={<CreateAccountForm />} />;
};
