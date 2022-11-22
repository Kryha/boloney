import { FC } from "react";
import { color } from "../../design";
import { PowerUp } from "../../types";
import { GeneralContentWrapper, Heading6, Paragraph, Row } from "../atoms";
import { PowerUpComponent } from "../power-up/power-up";
import { DescriptionContainer, Lightning } from "./styles";

interface PowerUpDescriptionProps {
  powerUp: PowerUp;
  hasLightningIcon?: boolean;
}
export const PowerUpDescription: FC<PowerUpDescriptionProps> = ({ powerUp, hasLightningIcon = false }) => {
  return (
    <>
      <PowerUpComponent powerUp={powerUp} />
      <DescriptionContainer>
        <GeneralContentWrapper>
          <Row>
            {hasLightningIcon && <Lightning />}
            <Heading6>{powerUp.name}</Heading6>
          </Row>
          <Paragraph customColor={color.darkGrey}>{powerUp.shortDescription}</Paragraph>
        </GeneralContentWrapper>
      </DescriptionContainer>
    </>
  );
};
