import { FC } from "react";
import { BlueLockSVG, text } from "../../assets";
import { BaseIcon, Card, CenteredImage, GeneralText } from "../../atoms";
import { iconSize, radius } from "../../design";
import { DisabledSmallPowerUpWrapper, FullHeightColumn } from "./styles";

interface PowerUpSmallProps {
  powerUpName?: string;
  powerUpImage?: string;
  isEmpty?: boolean;
  padding?: string;
  isPowerUpDisabled?: boolean;
  plusAmount?: number;
}

/**
 * @param {string} powerUpName - The name of the powerUp used for the alt text
 * @param {string} powerUpImage - Image of the powerUp
 * @param {string} isEmpty - If the powerUp is used to display the hidden amount of powerUps. No powerUp image is shown but a number.
 * @param {number} plusAmount - The amount of powerUps that are not visible, isEmpty prop has to be true
 * @param {string} padding - If the powerUp is used to display the hidden amount of powerUps. This parameter represents that value.
 * @param {string} isPowerUpDisabled - If the powerUp is used to display the hidden amount of powerUps. This parameter represents that value.
 */

export const PowerUpSmall: FC<PowerUpSmallProps> = ({
  powerUpName,
  powerUpImage,
  isEmpty = false,
  plusAmount = 0,
  padding,
  isPowerUpDisabled,
}) => {
  return (
    <Card isSmall isEmpty={isEmpty} padding={padding}>
      <FullHeightColumn alignItems="center" justifyContent="center">
        {isEmpty ? <GeneralText>{text.param.plusAmount(plusAmount)}</GeneralText> : <CenteredImage src={powerUpImage} alt={powerUpName} />}
      </FullHeightColumn>
      {isPowerUpDisabled && (
        <DisabledSmallPowerUpWrapper alignItems="flex-end" justifyContent="center">
          <BaseIcon src={<BlueLockSVG />} radius={radius.xxs} width={iconSize.sm} height={iconSize.sm} />
        </DisabledSmallPowerUpWrapper>
      )}
    </Card>
  );
};
