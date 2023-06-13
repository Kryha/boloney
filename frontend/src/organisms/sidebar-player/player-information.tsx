import { FC } from "react";
import { text } from "../../assets";
import { BaseRow, BodyText } from "../../atoms";
import { color, fontWeights, lineHeights, spacing } from "../../design";
import { RowHeadingIcon, Die } from "../../molecules";
import { PlayerInformationWrapper } from "./styles";

interface Props {
  isPlayerSelected: boolean;
  totalDice: number;
  playerColor: string;
  extraDice?: number;
  diceSum?: number;
}

export const PlayerInformation: FC<Props> = ({ isPlayerSelected, totalDice, extraDice = 0, playerColor, diceSum }) => {
  return (
    <PlayerInformationWrapper alignItems="center" selected={isPlayerSelected} gap={spacing.xxs}>
      <RowHeadingIcon
        heading={text.param.xAmount(totalDice)}
        icon={<Die dieColor={playerColor} pipColor={color.black} />}
        iconPosition="row-reverse"
        transformText="lowercase"
        gap={spacing.xxs}
        headingFontWeight={fontWeights.light}
        headingLineHeight={lineHeights.body}
      />
      {extraDice !== 0 && (
        <BaseRow gap={spacing.xxs}>
          <BodyText customcolor={color.darkGrey}>{"+"}</BodyText>
          <RowHeadingIcon
            heading={text.param.plusAmount(extraDice)}
            icon={<Die dieColor={playerColor} pipColor={color.black} />}
            iconPosition="row-reverse"
            transformText="lowercase"
            gap={spacing.xxs}
            headingFontWeight={fontWeights.light}
            headingLineHeight={lineHeights.body}
          />
        </BaseRow>
      )}
      {diceSum && (
        <BodyText transformText="none" fontWeight={fontWeights.bolder}>
          {text.param.sumOfDice(diceSum)}
        </BodyText>
      )}
    </PlayerInformationWrapper>
  );
};
