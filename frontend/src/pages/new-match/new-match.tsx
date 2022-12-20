import { FC, useState } from "react";

import { BaseLayout, Logo, TopNavigation } from "../../components";
import { NewMatchConfirmation } from "./new-match-confirmation";
import { NewMatchCreation } from "./new-match-creation";

export const NewMatch: FC = () => {
  const [matchId, setMatchId] = useState<string>();

  return (
    <BaseLayout
      leftSection={<Logo />}
      mainSection={matchId ? <NewMatchConfirmation matchId={matchId} /> : <NewMatchCreation setMatchId={setMatchId} />}
      rightSection={<TopNavigation />}
    />
  );
};
