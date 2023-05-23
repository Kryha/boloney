import { FC } from "react";
import { LightningIconSVG } from "../../assets";
import { color } from "../../design";
import { PowerUp } from "../../types";
import { Heading6, BodyText, BaseIcon, BaseRow } from "../../atoms";
import { DescriptionContainer, PowerUpDescriptionWrapper } from "./styles";
import { PowerUpSmall } from "../power-up";

interface PowerUpDescriptionProps {
  powerUp: PowerUp;
  hasLightningIcon?: boolean;
  gap?: string;
  plusAmount?: number;
}

/**
 * @description Molecule for power-up description.
 * @param {powerUp} - Power-up object
 * @param {hasLightningIcon} - If the power-up has a lightning icon
 */

export const PowerUpDescription: FC<PowerUpDescriptionProps> = ({ powerUp, hasLightningIcon = false, plusAmount, gap }) => {
  return (
    <>
      <PowerUpSmall powerUpName={powerUp.name} powerUpImage={powerUp.cardImage} plusAmount={plusAmount} />
      <DescriptionContainer>
        <PowerUpDescriptionWrapper>
          <BaseRow gap={gap}>
            {hasLightningIcon && <BaseIcon src={<LightningIconSVG />} strokeColor={color.mediumGrey} />}
            <Heading6>{powerUp.name}</Heading6>
          </BaseRow>
          <BodyText customcolor={color.darkGrey}>{powerUp.shortDescription}</BodyText>
        </PowerUpDescriptionWrapper>
      </DescriptionContainer>
    </>
  );
};
