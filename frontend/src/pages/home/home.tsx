import { FC } from "react";
import { BaseLayout, Logo, TopNavigation } from "../../components";
import { MatchSelect } from "./match-select";

export const Home: FC = () => {
  return <BaseLayout leftSection={<Logo />} mainSection={<MatchSelect />} rightSection={<TopNavigation />} />;
};
