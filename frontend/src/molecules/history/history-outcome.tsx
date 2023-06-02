import { FC } from "react";
import { CoolHandSVG, CrownSVG, DeadCoffinIconSVG, text } from "../../assets";
import { HistoryBadgeContainer, HistoryBadgeWrapper, PlayerInfoText } from "../../atoms";
import { color, fontWeights, margins, spacing } from "../../design";
import { HistoryRoundPlayer, PlayerPublic } from "../../types";
import { Badge } from "../badges";
import { Die } from "../die";
import { PowerUpIcon } from "../icons";
import { MatchStateContainer } from "./styles";

interface OutcomeProps {
  outcome: HistoryRoundPlayer;
  player: PlayerPublic;
  isLocalPlayer: boolean;
  iconColor?: string;
  amountResult?: string;
  isPlayerDead?: boolean;
}

/**
 *  Molecule for displaying the outcome of a round for a single player.
 * @param {outcome} - HistoryOutcome object
 * @param {player} - Active player
 * @param {isLocalPlayer} - If the active player is the local player
 * @param {playerColor} - Color of the player
 * @param {iconColor} - Color of the icon
 * @param {amountResult} - Amount of dice
 * @param {isPlayerDead} - If the player is dead
 */

export const HistoryOutcome: FC<OutcomeProps> = ({ outcome, player, isLocalPlayer, iconColor, amountResult, isPlayerDead }) => {
  const getPlayerBadge = () => {
    if (isPlayerDead) return <Badge icon={<DeadCoffinIconSVG />} text={text.playerTurn.loser} />;
    if (outcome?.isWinner) return <Badge icon={<CrownSVG />} text={text.playerTurn.winner} />;
    return <Badge icon={<CoolHandSVG />} text={text.playerTurn.loser} />;
  };

  return (
    <HistoryBadgeWrapper flexDirection="row" justifyContent="space-between">
      <HistoryBadgeContainer gap={spacing.xs}>
        <PlayerInfoText>{text.param.usernameTitle(player.username, isLocalPlayer)}</PlayerInfoText>
        <MatchStateContainer alignItems="center" gap={margins.small1}>
          <Die dieColor={iconColor} />
          <PlayerInfoText fontWeight={fontWeights.light} transformText="none" customcolor={color.darkGrey}>
            {amountResult}
          </PlayerInfoText>
          <PowerUpIcon powerUpAmount={outcome?.playerStats.powerUpsAmount || 0} />
        </MatchStateContainer>
      </HistoryBadgeContainer>
      {getPlayerBadge()}
    </HistoryBadgeWrapper>
  );
};
