import { FC } from "react";
import { text } from "../../assets";
import { Card, CenteredImage, GeneralText } from "../../atoms";
import { FullHeightColumn } from "./styles";

interface PowerUpSmallProps {
  powerUpName?: string;
  powerUpImage?: string;
  isEmpty?: boolean;
}

/**
 * @param {string} powerUpName - The name of the powerUp used for the alt text
 * @param {string} powerUpImage - Image of the powerUp
 * @param {string} isEmpty - If the powerUp is used to display the hidden amount of powerUps. No powerUp image is shown but a number.
 */

export const PowerUpSmall: FC<PowerUpSmallProps> = ({ powerUpName, powerUpImage, isEmpty = false }) => {
  return (
    <Card isSmall isEmpty={isEmpty}>
      <FullHeightColumn alignItems="center" justifyContent="center">
        {isEmpty ? <GeneralText>{text.param.plusAmount(4)}</GeneralText> : <CenteredImage src={powerUpImage} alt={powerUpName} />}
      </FullHeightColumn>
    </Card>
  );
};
