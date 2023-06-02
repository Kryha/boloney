import { FC } from "react";
import { text } from "../../assets";
import { buttonSize, color } from "../../design";
import { TertiaryButton } from "../../molecules";
import { useStore } from "../../store";
import { getPowerUp } from "../../util";
import { BaseRow, Heading1, Heading6 } from "../../atoms";
import { ErrorView } from "../error-view";
import { MatchInfo } from "../match-info";
import { PowerUpDescription } from "../power-up-description";
import { Tooltip } from "../tooltip";
import { MatchInfoButtons, MatchSettingsFooter, MatchSettingsOverviewComponent, Percentage, PowerUpContainer } from "./styles";

export const MatchSettingsOverview: FC = () => {
  const matchSettings = useStore((state) => state.matchSettings);

  if (!matchSettings) return <ErrorView />;

  const powerUpProbabilities = matchSettings.powerUpProbability.filter((powerUp) => powerUp.probability > 0);

  return (
    <MatchSettingsOverviewComponent>
      <Heading1 customcolor={color.mediumGrey}>{text.match.matchSettings}</Heading1>
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
        <MatchInfo
          title={text.match.playerTurnDuration}
          matchSettingsType="playerTurnDuration"
          matchSettings={matchSettings}
          tooltipDescription={text.general.tooltipRoundDurationInfo}
          tooltipPosition="right"
          hasTooltip
        />
      </MatchInfoButtons>
      <Heading6>{text.match.powerUpTypeOnTheTable}</Heading6>
      <BaseRow justifyContent="flex-end">
        <TertiaryButton
          text={text.newMatch.chance}
          icon={<Tooltip title={text.general.toolTipPowerUpTypeTitle} info={text.general.toolTipPowerUpTypeInfo} infoPosition="right" />}
          padding={buttonSize.xl}
        />
      </BaseRow>
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
