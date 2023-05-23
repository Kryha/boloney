import { FC } from "react";
import { text } from "../../assets";
import { buttonSize, color, spacing } from "../../design";
import { TertiaryButton } from "../../molecules";
import { getPowerUp } from "../../util";
import { BaseRow, Heading1, Heading6, PopUpFooter } from "../../atoms";
import { MatchInfoButtons, MatchSettingsOverviewComponent, Percentage, PowerUpContainer } from "./styles";
import { MatchSettings } from "../../types";
import { MatchInfo } from "../match-info";
import { PowerUpDescription } from "../power-up-description";
import { Tooltip } from "../tooltip";

interface MatchSettingsOverviewProps {
  matchSettings: MatchSettings;
}

/**
 * @description The MatchSettingsOverview molecule displays the match settings of the current match.
 * @param {MatchSettingsOverviewProps} props - The match settings props
 * @param {plusAmount} - The amount of power-ups that are not visible
 */

export const MatchSettingsOverview: FC<MatchSettingsOverviewProps> = ({ matchSettings }) => {
  const powerUpProbabilities = matchSettings.powerUpProbability.filter((powerUp) => powerUp.probability > 0);
  const powerUps = matchSettings.powerUpProbability.map((powerUp) => getPowerUp(powerUp.id));
  return (
    <MatchSettingsOverviewComponent>
      <Heading1 customcolor={color.mediumGrey}>{text.match.matchSettings}</Heading1>
      <MatchInfoButtons gap={spacing.xxs}>
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
          hasTooltip
        />
        <MatchInfo
          title={text.match.healAction}
          matchSettingsType="healAction"
          matchSettings={matchSettings}
          tooltipTitle={text.general.toolTipHealTitle}
          tooltipDescription={text.general.toolTipHealInfo}
          hasTooltip
        />
        <MatchInfo
          title={text.general.sound}
          matchSettingsType="sound"
          matchSettings={matchSettings}
          tooltipTitle={text.general.toolTipSoundTitle}
          tooltipDescription={text.general.toolTipSoundInfo}
          hasTooltip
        />
      </MatchInfoButtons>
      <Heading6>{text.match.powerUpTypeOnTheTable}</Heading6>
      <BaseRow justifyContent="flex-end">
        <TertiaryButton
          text={text.newMatch.chance}
          icon={
            <Tooltip title={text.general.toolTipPowerUpTypeTitle} description={text.general.toolTipPowerUpTypeInfo} infoPosition="right" />
          }
          padding={buttonSize.xl}
        />
      </BaseRow>
      {powerUpProbabilities.map((powerUpProbability, index) => {
        const powerUp = powerUps[index];
        return (
          <PowerUpContainer key={powerUps[index]?.id} alignItems="flex-start">
            {powerUp && <PowerUpDescription powerUp={powerUp} gap={spacing.xxs} />}
            <Percentage>{text.param.percentageAmount(powerUpProbability.probability)}</Percentage>
          </PowerUpContainer>
        );
      })}
      <PopUpFooter />
    </MatchSettingsOverviewComponent>
  );
};
