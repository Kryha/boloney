import { FC } from "react";

import { BaseLayout } from "../../molecules";
import { GeneralNavigationBar, TextLogo } from "../../organisms";
import { MatchSelect } from "./match-select";

export const HomePage: FC = () => {
  return <BaseLayout leftSection={<TextLogo />} mainSection={<MatchSelect />} rightSection={<GeneralNavigationBar />} />;
};
