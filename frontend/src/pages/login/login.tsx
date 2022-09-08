import { FC } from "react";

import { text } from "../../assets/text";
import { BaseLayout, Heading3 } from "../../components";
import { TopNavigation } from "../../components/top-navigation";
import { LoginForm } from "./login-form";

export const Login: FC = () => {
  return (
    <BaseLayout leftSection={<Heading3>{text.general.logoHere}</Heading3>} mainSection={<LoginForm />} rightSection={<TopNavigation />} />
  );
};
