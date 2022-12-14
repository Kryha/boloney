import { FC } from "react";

import { BaseLayout, Logo, TopNavigation } from "../../components";
import { useStore } from "../../store";
import { NewMatchConfirmation } from "./new-match-confirmation";
import { NewMatchCreation } from "./new-match-creation";

export const NewMatch: FC = () => {
  const matchId = useStore((state) => state.matchId);
  const matchUrl = useStore((state) => state.matchUrl);

  return (
    <BaseLayout
      leftSection={<Logo />}
      mainSection={matchUrl && matchId ? <NewMatchConfirmation /> : <NewMatchCreation />}
      rightSection={<TopNavigation />}
    />
  );
};
