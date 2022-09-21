import { FC, useState } from "react";

import { BaseLayout, Logo, TopNavigation } from "../../components";
import { NewGameConfirmation } from "./new-game-confirmation";
import { NewGameCreation } from "./new-game-creation";

export const NewGame: FC = () => {
  const [url, setUrl] = useState<string>();

  return (
    <BaseLayout
      leftSection={<Logo />}
      mainSection={url ? <NewGameConfirmation url={url} /> : <NewGameCreation setUrl={setUrl} />}
      rightSection={<TopNavigation />}
    />
  );
};
