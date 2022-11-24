import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { useStore } from "../../store";
import { getPowerUp } from "../../util";
import { Heading1, Heading6 } from "../atoms";
import { InfoButton } from "../buttons";
import { ErrorView } from "../error-view";
import { MatchInfo } from "../match-info";
import { PowerUpDescription } from "../power-up-description";
import { MatchInfoButtons, MatchSettingsFooter, MatchSettingsOverviewComponent, Percentage, PowerUpContainer } from "./styles";

export const MatchSettingsOverview: FC = () => {
  const matchSettings = useStore((state) => state.matchSettings);

  if (!matchSettings) return <ErrorView />;

  const powerUpProbabilities = matchSettings.powerUpProbability.filter((powerUp) => powerUp.probability > 0);

  return (
    <MatchSettingsOverviewComponent>
      <Heading1 customColor={color.mediumGrey}>{text.match.matchSettings}</Heading1>
      <MatchInfoButtons>
        <MatchInfo title={text.match.players} matchSettingsType="players" matchSettings={matchSettings} />
        <MatchInfo title={text.match.dicePP} matchSettingsType="dice" matchSettings={matchSettings} />
        {/* TODO: update tooltip info */}
        <MatchInfo
          title={text.match.powerUpPP}
          matchSettingsType="powerUp"
          matchSettings={matchSettings}
          tooltipTitle={text.general.toolTipTitle}
          tooltipDescription={text.general.toolTipInfo}
          hasTooltip
        />
        <MatchInfo
          title={text.match.extraPowerUp}
          matchSettingsType="extraPowerUp"
          matchSettings={matchSettings}
          tooltipTitle={text.general.toolTipTitle}
          tooltipDescription={text.general.toolTipInfo}
          hasTooltip
        />
        <MatchInfo
          title={text.match.healAction}
          matchSettingsType="healAction"
          matchSettings={matchSettings}
          tooltipTitle={text.general.toolTipTitle}
          tooltipDescription={text.general.toolTipInfo}
          hasTooltip
        />
      </MatchInfoButtons>
      <Heading6>{text.match.powerUpTypeOnTheTable}</Heading6>
      <InfoButton text={text.newGame.chance} />
      {powerUpProbabilities.map((powerUp) => (
        <PowerUpContainer key={powerUp.id}>
          <PowerUpDescription powerUp={getPowerUp(powerUp.id)} />
          <Percentage>{text.param.percentageAmount(powerUp.probability)}</Percentage>
        </PowerUpContainer>
      ))}
      <MatchSettingsFooter />
    </MatchSettingsOverviewComponent>
  );
};
