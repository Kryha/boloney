import { FC } from "react";
import { text } from "../../assets";
import { BaseColumn, Heading6, PlayerInfoText } from "../../atoms";
import { color, fontSizes, fontWeights, LAST_BID_WIDTH_SMALL, spacing } from "../../design";
import { Bid } from "../../types";
import { Die } from "../die";
import { PlayerBidWrapper } from "./styles";

interface Props {
  diceAmount?: number;
  amountOfSidebarPlayers: number;
  lastBid?: Bid;
  playerColor: string;
}

/**
 *
 * This is the component for displaying the last bid made.
 * @param {number} diceAmount - The amount of dice.
 * @param {number} amountOfSidebarPlayers - The amount of sidebar players
 * @param {Bid} lastBid - The last bid tabled
 * @param {string} playerColor - The color that represents the player.
 */

export const PlayerBid: FC<Props> = ({ amountOfSidebarPlayers, lastBid, playerColor, diceAmount }) => {
  if (diceAmount === 0 || !lastBid) return <></>;
  return (
    <PlayerBidWrapper playerColor={playerColor} justifyContent="center" alignItems="center" divisors={amountOfSidebarPlayers}>
      <BaseColumn gap={spacing.s} alignItems="center">
        <PlayerInfoText fontSize={fontSizes.lastBid} fontWeight={fontWeights.light}>
          {text.general.bid}
        </PlayerInfoText>
        <BaseColumn gap={spacing.s} alignItems="center">
          <Die dieColor={color.white} pipColor={color.black} pipAmount={lastBid.face} size={LAST_BID_WIDTH_SMALL} />
          <Heading6 transformText="lowercase" customcolor={color.white}>
            {text.param.xAmount(lastBid.amount)}
          </Heading6>
        </BaseColumn>
      </BaseColumn>
    </PlayerBidWrapper>
  );
};
