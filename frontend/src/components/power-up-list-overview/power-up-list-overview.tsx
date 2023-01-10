import { FC } from "react";

import {
  ButtonWrapper,
  DescriptionText,
  PowerUpCard,
  PowerUpContainer,
  PowerUpImage,
  PowerUpInfoContainer,
  PowerUpInfoWrapper,
  PowerUpListOverviewWrapper,
} from "./styles";
import { PowerUpId } from "../../types";
import { text } from "../../assets";
import { GeneralText, Heading2 } from "../atoms";
import { color } from "../../design";
import { PrimaryButton } from "../buttons";
import { getPowerUpData } from "../../util";
import { ErrorView } from "../error-view";
import { useViewport } from "../../hooks";

interface PowerUpListOverviewProps {
  powerUpIds: PowerUpId[];
  isPowerUpInUse?: boolean;
}

export const PowerUpListOverview: FC<PowerUpListOverviewProps> = ({ powerUpIds, isPowerUpInUse = false }) => {
  const dataPowerUp = getPowerUpData(powerUpIds);
  const { width } = useViewport();

  if (!dataPowerUp) return <ErrorView />;

  return (
    <PowerUpListOverviewWrapper powerUpsAmount={powerUpIds.length}>
      {dataPowerUp.map((powerUp, i) => (
        <PowerUpContainer key={i} width={width} isPowerUpInUse={isPowerUpInUse}>
          <PowerUpCard>
            <PowerUpImage src={powerUp.cardImage} isImageLarge={powerUp.isImageLarge} />
            <PowerUpInfoWrapper>
              <PowerUpInfoContainer>
                <Heading2 customColor={color.mediumGrey}>{powerUp.name}</Heading2>
                <DescriptionText>{powerUp.longDescription}</DescriptionText>
                <GeneralText>{text.param.zeroAmount(powerUp.id)}</GeneralText>
              </PowerUpInfoContainer>
            </PowerUpInfoWrapper>
          </PowerUpCard>
          {isPowerUpInUse && (
            <ButtonWrapper>
              {/* TODO: implement boost */}
              <PrimaryButton text={text.powerUps.boost} />
            </ButtonWrapper>
          )}
        </PowerUpContainer>
      ))}
    </PowerUpListOverviewWrapper>
  );
};
