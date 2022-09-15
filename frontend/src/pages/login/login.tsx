import { FC } from "react";

import { text } from "../../assets/text";
import { BaseLayout, Heading3 } from "../../components";
import { MenuDropdown } from "../../components/top-navigation";
import { useAuth } from "../../service/authentication";
import { LoginForm } from "./login-form";
import { LogoContainer } from "./styles";

export const Login: FC = () => {
  const { authenticated } = useAuth();
  // TODO: check if the user is logged in
  if (authenticated) console.log("go somewhere");

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
