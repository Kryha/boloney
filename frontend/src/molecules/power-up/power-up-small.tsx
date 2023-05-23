import { FC } from "react";
import { text } from "../../assets";
import { Card, CenteredImage, GeneralText } from "../../atoms";
import { FullHeightColumn } from "./styles";

interface PowerUpSmallProps {
  powerUpName?: string;
  powerUpImage?: string;
  isEmpty?: boolean;
  plusAmount?: number;
}

/**
 * @param {string} powerUpName - The name of the powerUp used for the alt text
 * @param {string} powerUpImage - Image of the powerUp
 * @param {string} isEmpty - If the powerUp is used to display the hidden amount of powerUps. No powerUp image is shown but a number.
 * @param {number} plusAmount - The amount of powerUps that are not visible, isEmpty prop has to be true
 */

export const PowerUpSmall: FC<PowerUpSmallProps> = ({ powerUpName, powerUpImage, isEmpty = false, plusAmount = 0 }) => {
  return (
    <Card isSmall isEmpty={isEmpty}>
      <FullHeightColumn alignItems="center" justifyContent="center">
        {isEmpty ? <GeneralText>{text.param.plusAmount(plusAmount)}</GeneralText> : <CenteredImage src={powerUpImage} alt={powerUpName} />}
      </FullHeightColumn>
    </Card>
  );
};
