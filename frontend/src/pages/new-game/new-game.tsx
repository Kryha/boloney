import { FC, useState } from "react";

import { BaseLayout, Logo, TopNavigation } from "../../components";
import { useStore } from "../../store";
import { NewGameConfirmation } from "./new-game-confirmation";
import { NewGameCreation } from "./new-game-creation";

export const NewGame: FC = () => {
  const [url, setUrl] = useState<string>();
  const { matchId } = useStore();
  return (
    <BaseLayout
      leftSection={<Logo />}
      mainSection={url && matchId ? <NewGameConfirmation url={url} /> : <NewGameCreation setUrl={setUrl} />}
      rightSection={<TopNavigation />}
    />
  );
};
