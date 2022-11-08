import { FC, useState } from "react";

import { BaseLayout, Logo, TopNavigation } from "../../components";
import { useStore } from "../../store";
import { NewGameConfirmation } from "./new-game-confirmation";
import { NewGameCreation } from "./new-game-creation";

export const NewGame: FC = () => {
  // TODO: move URL to global store
  const { matchId, matchUrl } = useStore();
  return (
    <BaseLayout
      leftSection={<Logo />}
      mainSection={matchUrl && matchId ? <NewGameConfirmation /> : <NewGameCreation />}
      rightSection={<TopNavigation />}
    />
  );
};
