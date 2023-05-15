import { FC } from "react";
import { text } from "../../assets";
import { BaseColumn, Heading6 } from "../../atoms";
import { iconSize, spacing } from "../../design";
import { Bid } from "../../types";
import { Die } from "./die";

interface LastBidProps {
  lastBid: Bid;
  dieColor: string;
}

/**
 *  @description - Last bid of the current round that is placed.
 *  @param lastBid - Last bid of the current round.
 *  @param dieColor - Color of the die.
 */

export const LastBidPlayer: FC<LastBidProps> = ({ lastBid, dieColor }) => {
  return (
    <BaseColumn gap={spacing.s} alignItems="center" justifyContent="center">
      <Heading6 transformText="none"> {text.param.xAmount(lastBid.amount)}</Heading6>
      <Die pipAmount={lastBid.face} dieColor={dieColor} size={iconSize.xs} />
    </BaseColumn>
  );
};
