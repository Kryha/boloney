import { FC } from "react";

import { OverlayComponent } from "../../types";
import { PowerUpListOverview, SausageSpinner, MatchSettingsOverview, PowerUpListUse } from "../../components";
import { useStore } from "../../store";
import { DEFAULT_MATCH_SETTINGS } from "../../constants";

interface Props {
  name: OverlayComponent | undefined;
}

//TODO: Change this approach to a more modular one. Ideal situation is calling the overview with the component you want to render
export const OverlayContent: FC<Props> = ({ name }) => {
  const powerUpIds = useStore((state) => state.powerUpIds);

  switch (name) {
    case "power-up-list":
      return <PowerUpListOverview powerUpIds={powerUpIds} />;
    case "power-up-use":
      return <PowerUpListUse powerUpIds={powerUpIds} />;
    case "sausage-spinner":
      return <SausageSpinner hasLoadingText />;
    case "match-settings-overview":
      return <MatchSettingsOverview />;
    case "power-up-list-description":
      return <PowerUpListOverview powerUpIds={DEFAULT_MATCH_SETTINGS.availablePowerUps} />;
    case undefined:
      return <></>;
  }
};
