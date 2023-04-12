import { FC } from "react";
import { LightningIconSVG } from "../../assets";
import { color } from "../../design";
import { PowerUp } from "../../types";
import { GeneralContentWrapper, Row, Heading6, BodyText, BaseIcon } from "../atoms";
import { ErrorView } from "../error-view";
import { PowerUpComponent } from "../power-up/power-up";
import { DescriptionContainer } from "./styles";

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
            {hasLightningIcon && <BaseIcon src={<LightningIconSVG />} strokeColor={color.mediumGrey} />}
            <Heading6>{powerUp.name}</Heading6>
          </Row>
          <BodyText customcolor={color.darkGrey}>{powerUp.shortDescription}</BodyText>
        </GeneralContentWrapper>
      </DescriptionContainer>
    </>
  );
};
