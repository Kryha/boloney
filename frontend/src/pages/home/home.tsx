import { FC } from "react";
import { BaseLayout, Logo, TopNavigation } from "../../components";
import { useAuth } from "../../service/auth";
import { LoginForm } from "../auth/login-form";
import { MatchSelect } from "./match-select";

export const Home: FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BaseLayout leftSection={<Logo />} mainSection={isAuthenticated ? <MatchSelect /> : <LoginForm />} rightSection={<TopNavigation />} />
  );
};
