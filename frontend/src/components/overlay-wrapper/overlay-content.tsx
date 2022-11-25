import { OverlayComponent } from "../../types";
import { PowerUpListOverview, SausageSpinner, MatchSettingsOverview } from "../../components";
import { FC } from "react";
import { useStore } from "../../store";

//TODO add the Setting modal view
interface Props {
  name: OverlayComponent | undefined;
}
//TODO: Change this approach to a more modular one. Ideal situation is calling the overview with the component you want to render
export const OverlayContent: FC<Props> = ({ name }) => {
  const powerUpIds = useStore((state) => state.powerUpIds);

  switch (name) {
    case "power-up-list":
      return <PowerUpListOverview powerUpIds={powerUpIds} />;
    case "sausage-spinner":
      return <SausageSpinner />;
    case "match-settings-overview":
      return <MatchSettingsOverview />;
    case undefined:
      return <></>;
  }
};
