import { FC } from "react";
import { color } from "../../design";
import { PowerUp } from "../../types";
import { GeneralContentWrapper, Heading6, Paragraph, Row } from "../atoms";
import { ErrorView } from "../error-view";
import { PowerUpComponent } from "../power-up/power-up";
import { DescriptionContainer, Lightning } from "./styles";

interface PowerUpDescriptionProps {
  powerUp?: PowerUp;
  hasLightningIcon?: boolean;
}
export const PowerUpDescription: FC<PowerUpDescriptionProps> = ({ powerUp, hasLightningIcon = false }) => {
  if (!powerUp) return <ErrorView />;
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
