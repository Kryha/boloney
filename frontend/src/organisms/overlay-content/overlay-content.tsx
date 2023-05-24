import { FC } from "react";

import { MatchFormSettings, OverlayComponent, PowerUpId } from "../../types";
import { DEFAULT_MATCH_SETTINGS } from "../../constants";
import { PowerUpList } from "../../molecules/power-up-list";
import { getPowerUpData } from "../../util";
import { MatchSettingsOverview } from "../../molecules/match-settings-overview/match-settings-overview";
import { SausageSpinner } from "../spinner";
import { containerHeight } from "../../design";

interface Props {
  componentType: OverlayComponent | undefined;
  powerUpIds?: PowerUpId[];
  matchSettings?: MatchFormSettings;
}

export const OverlayContent: FC<Props> = ({ componentType, powerUpIds, matchSettings }) => {
  switch (componentType) {
    case "power-up-list":
      if (!powerUpIds || !powerUpIds?.length) return <></>;
      return <PowerUpList powerUps={getPowerUpData(powerUpIds)} height={containerHeight.xxxl} />;
    case "power-up-use":
      // TODO: replace
      if (!powerUpIds || !powerUpIds?.length) return <></>;
      return <PowerUpList powerUps={getPowerUpData(powerUpIds)} />;
    case "sausage-spinner":
      return <SausageSpinner hasLoadingText />;
    case "match-settings-overview":
      return <MatchSettingsOverview matchSettings={matchSettings || DEFAULT_MATCH_SETTINGS} />;
    case "power-up-list-description":
      return <PowerUpList powerUps={getPowerUpData(DEFAULT_MATCH_SETTINGS.availablePowerUps)} />;
    case undefined:
      return <></>;
  }
};
