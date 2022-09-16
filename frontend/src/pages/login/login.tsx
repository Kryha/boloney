import { FC } from "react";

import { text } from "../../assets/text";
import { BaseLayout, Heading3, MenuDropdown } from "../../components";
import { LoginForm } from "./login-form";
import { LogoContainer } from "./styles";

export const Login: FC = () => {
  // TODO: add routes to navigate to when authenticated

  return (
    <BaseLayout
      leftSection={
        <LogoContainer>
          <Heading3>{text.general.logoHere}</Heading3>
        </LogoContainer>
      }
      mainSection={<LoginForm />}
      rightSection={<MenuDropdown />}
    />
  );
};
