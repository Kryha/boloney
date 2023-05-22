import { FC } from "react";
import { LightningIconSVG, text } from "../../assets";
import { BaseIcon, BodyText } from "../../atoms";
import { fontWeights, lineHeights, spacing } from "../../design";
import { color } from "../../design/color";
import { Die } from "../die";
import { RowHeadingIcon } from "../text";
import { MatchStatsWrapper } from "./styles";

interface Props {
  totalDice: number;
  stageNumber: number;
  drawNumber: number;
}

/**
 *
 * This is the match stats component, its is displayed in the navigation bar.
 * @param {number} totalDice - The total amount of dice in the match.
 * @param {number} stageNumber - Divides the current number of dice in play
 * @param {number} drawNumber - How often a Power-up draw round occurs
 */

export const MatchStats: FC<Props> = ({ totalDice, stageNumber, drawNumber }) => {
  return (
    <MatchStatsWrapper gap={spacing.xs} alignItems="center">
      <RowHeadingIcon
        heading={text.param.matchInfoDivider(text.param.xAmount(totalDice))}
        icon={<Die dieColor={color.white} pipColor={color.black} />}
        iconPosition="row-reverse"
        transformText="lowercase"
        gap={spacing.xxs}
        headingFontWeight={fontWeights.light}
        headingLineHeight={lineHeights.body}
      />
      <BodyText transformText="none">{text.param.matchInfoDivider(text.param.matchStageNumber(stageNumber))}</BodyText>
      <RowHeadingIcon
        heading={text.param.powerUpMatchInfo(drawNumber)}
        icon={<BaseIcon src={<LightningIconSVG />} iconColor={color.transparent} strokeColor={color.black} />}
        iconPosition="row-reverse"
        transformText="lowercase"
        gap={spacing.xxs}
        headingFontWeight={fontWeights.light}
        headingLineHeight={lineHeights.body}
      />
    </MatchStatsWrapper>
  );
};
