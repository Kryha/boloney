import { FC } from "react";

import { text } from "../../assets/text";
import { BaseLayout, Heading3 } from "../../components";
import { TopNavigation } from "../../components/top-navigation";
import { LoginForm } from "./login-form";
import { LogoContainer } from "./styles";

export const Login: FC = () => {
  return (
    <BaseLayout
      leftSection={
        <LogoContainer>
          <Heading3>{text.general.logoHere}</Heading3>
        </LogoContainer>
      }
      mainSection={<LoginForm />}
      rightSection={<TopNavigation />}
    />
  );
};
