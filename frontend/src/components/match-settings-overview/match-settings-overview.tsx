import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { useStore } from "../../store";
import { Heading1 } from "../atoms";
import { MatchInfo } from "../match-info";
import { MatchInfoButtons, MatchSettingsFooter, MatchSettingsOverviewComponent } from "./styles";

interface MatchSettingsOverviewProps {}

export const MatchSettingsOverview: FC<MatchSettingsOverviewProps> = () => {
  const matchSettings = useStore((state) => state.matchSettings);
  return (
    <>
      <MatchSettingsOverviewComponent>
        <Heading1 customColor={color.mediumGrey}>{text.match.matchSettings}</Heading1>
        <MatchInfoButtons>
          <MatchInfo />
        </MatchInfoButtons>
      </MatchSettingsOverviewComponent>
      <MatchSettingsFooter />
    </>
  );
};
