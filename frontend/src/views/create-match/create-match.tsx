import { FC, useState } from "react";

import { BaseLayout } from "../../molecules";
import { GeneralNavigationBar, MatchCreation, NewMatchConfirmation, TextLogo } from "../../organisms";

export const CreateMatchPage: FC = () => {
  const [matchId, setMatchId] = useState<string>();

  return (
    <BaseLayout
      leftSection={<TextLogo />}
      mainSection={matchId ? <NewMatchConfirmation matchId={matchId} /> : <MatchCreation setMatchId={setMatchId} />}
      rightSection={<GeneralNavigationBar />}
      showFooter={!matchId}
    />
  );
};
