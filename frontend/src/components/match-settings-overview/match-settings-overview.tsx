import { FC } from "react";
import { POWER_UP_DATA, text } from "../../assets";
import { color } from "../../design";
import { fakeMatchSettings } from "../../service/fake-match-settings";
import { Heading1, Heading6 } from "../atoms";
import { InfoButton } from "../buttons";
import { ErrorView } from "../error-view";
import { MatchInfo } from "../match-info";
import { PowerUpDescription } from "../power-up-description";
import { MatchInfoButtons, MatchSettingsFooter, MatchSettingsOverviewComponent, Percentage, PowerUpContainer } from "./styles";

export const MatchSettingsOverview: FC = () => {
  // const matchSettings = useStore((state) => state.matchSettings);
  const matchSettings = fakeMatchSettings;
  if (!matchSettings) return <ErrorView />;
  return (
    <>
      <MatchSettingsOverviewComponent>
        <Heading1 customColor={color.mediumGrey}>{text.match.matchSettings}</Heading1>
        <MatchInfoButtons>
          <MatchInfo title={text.match.players} type="players" matchSettings={matchSettings} />
          <MatchInfo title={text.match.dicePP} type="dice" matchSettings={matchSettings} />
          <MatchInfo title={text.match.powerUpPP} type="powerUp" matchSettings={matchSettings} />
          <MatchInfo title={text.match.extraPowerUp} type="extraPowerUp" matchSettings={matchSettings} />
          <MatchInfo title={text.match.healAction} type="healAction" matchSettings={matchSettings} />
        </MatchInfoButtons>
        <Heading6>{text.match.powerUpTypeOnTheTable}</Heading6>
        <InfoButton text={text.newGame.chance} />
        {Object.values(POWER_UP_DATA).map((powerUp) => (
          <PowerUpContainer key={powerUp.id}>
            <PowerUpDescription powerUp={powerUp} />
            <Percentage>{text.param.percentageAmount("80")}</Percentage>
          </PowerUpContainer>
        ))}
        <MatchSettingsFooter />
      </MatchSettingsOverviewComponent>
    </>
  );
};
