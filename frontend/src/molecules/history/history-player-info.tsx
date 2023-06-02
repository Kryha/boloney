import { FC, ReactNode } from "react";
import { AlignContent, BaseIcon, BaseRow, PlayerInfoText } from "../../atoms";
import { FontProps, fontSizes, TransformText } from "../../design";

interface HistoryPlayerInfoProps {
  src: ReactNode;
  text?: string;

  alignItems?: AlignContent;
  transformText?: TransformText;
  gap?: string;

  iconColor?: string;
  iconStrokeColor?: string;
  textColor?: string;
  fontWeight?: string;
  fontSize?: FontProps;
}

/**
 *  Molecule for history player info.
 * @param {src} - Icon
 * @param {text} - Text
 * @param {alignItems} - Align items
 * @param {transformText} - Transform text
 * @param {gap} - Gap
 * @param {iconColor} - Icon color
 * @param {iconStrokeColor} - Icon stroke color
 * @param {textColor} - Text color
 * @param {fontWeight} - Font weight of text
 * @param {fontSize} - Font size of text
 */

export const HistoryPlayerInfo: FC<HistoryPlayerInfoProps> = ({
  iconColor,
  iconStrokeColor,
  textColor,
  text,
  gap,
  fontWeight,
  fontSize,
  src,
  alignItems,
  transformText,
}) => {
  return (
    <BaseRow gap={gap}>
      <BaseRow alignItems={alignItems} gap={gap}>
        <BaseIcon src={src} iconColor={iconColor} strokeColor={iconStrokeColor} />
      </BaseRow>
      <PlayerInfoText
        transformText={transformText}
        fontSize={fontSize || fontSizes.playerInfo}
        fontWeight={fontWeight}
        customcolor={textColor}
      >
        {text}
      </PlayerInfoText>
    </BaseRow>
  );
};
