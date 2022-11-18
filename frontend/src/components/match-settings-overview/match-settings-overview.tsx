import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { fakeMatchSettings } from "../../service/fake-match-settings";
import { useStore } from "../../store";
import { Heading1 } from "../atoms";
import { ErrorView } from "../error-view";
import { MatchInfo } from "../match-info";
import { MatchInfoButtons, MatchSettingsFooter, MatchSettingsOverviewComponent } from "./styles";

interface MatchSettingsOverviewProps {}

export const MatchSettingsOverview: FC<MatchSettingsOverviewProps> = () => {
  // const matchSettings = useStore((state) => state.matchSettings);
  const matchSettings = fakeMatchSettings;
  if (!matchSettings) return <ErrorView />;
  return (
    <>
      <MatchSettingsOverviewComponent>
        <Heading1 customColor={color.mediumGrey}>{text.match.matchSettings}</Heading1>
        <MatchInfoButtons>
          <MatchInfo title={text.newGame.players} matchSettings={matchSettings} />
        </MatchInfoButtons>
      </MatchSettingsOverviewComponent>
      <MatchSettingsFooter />
    </>
  );
};
