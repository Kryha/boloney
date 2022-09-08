import { FC } from "react";

import { text } from "../../assets/text";
import { BaseLayout, Heading3 } from "../../components";
import { MenuDropdown } from "../../components/top-navigation";
import { useAuthState } from "../../service/authentication";
import { LoginForm } from "./login-form";
import { LogoContainer } from "./styles";

export const Login: FC = () => {
  const isLoggedIn = useAuthState((state) => state.isAuthenticated);
  const user = useAuthState((state) => state.user);
  // TODO: check if the user is logged in
  if (isLoggedIn) console.log(`go somewhere ${user?.name}`);

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
