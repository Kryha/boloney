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
        <MatchInfo title={text.match.dice} matchSettingsType="dice" matchSettings={matchSettings} />
        <MatchInfo
          title={text.match.powerUpPP}
          matchSettingsType="powerUps"
          matchSettings={matchSettings}
          tooltipTitle={text.general.toolTipPowerUpTitle}
          tooltipDescription={text.general.toolTipPowerUpInfo}
          hasTooltip
        />
        <MatchInfo
          title={text.match.drawRoundOffset}
          matchSettingsType="drawRoundOffset"
          matchSettings={matchSettings}
          tooltipTitle={text.general.toolTipDrawRoundOffsetTitle}
          tooltipDescription={text.general.toolTipDrawRoundOffsetInfo}
          tooltipPosition="right"
          hasTooltip
        />
        <MatchInfo
          title={text.match.healAction}
          matchSettingsType="healAction"
          matchSettings={matchSettings}
          tooltipTitle={text.general.toolTipHealTitle}
          tooltipDescription={text.general.toolTipHealInfo}
          tooltipPosition="right"
          hasTooltip
        />
      </MatchInfoButtons>
      <Heading6>{text.match.powerUpTypeOnTheTable}</Heading6>
      <InfoButton
        primaryText={text.newMatch.chance}
        tooltipInfo={text.general.toolTipPowerUpTypeInfo}
        tooltipTitle={text.general.toolTipPowerUpTypeTitle}
        tooltipInfoPosition="right"
      />
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
