import { FC } from "react";

import { PowerUpCard, PowerUpImage, PowerUpInfoContainer, PowerUpInfoWrapper, PowerUpListOverviewWrapper } from "./styles";
import { PowerUpId } from "../../types";
import { text } from "../../assets";
import { GeneralText, Heading2 } from "../atoms";
import { color } from "../../design";
import { Link, PrimaryButton } from "../buttons";
import { getPowerUpData } from "../../util";

interface PowerUpListOverviewProps {
  powerUpIds: PowerUpId[];
  isPowerUpInUse?: boolean;
}

export const PowerUpListOverview: FC<PowerUpListOverviewProps> = ({ powerUpIds, isPowerUpInUse }) => {
  const dataPowerUp = getPowerUpData(powerUpIds);

  if (!dataPowerUp) return <></>;

  return (
    <PowerUpListOverviewWrapper>
      {dataPowerUp.map((powerUp) => {
        return (
          <PowerUpCard key={powerUp.id}>
            <PowerUpImage src={powerUp.cardImage} />
            <PowerUpInfoWrapper>
              <PowerUpInfoContainer>
                <Heading2 customColor={color.mediumGrey}>{powerUp.name}</Heading2>
                <Link text={text.powerUps.seeDetails} />
                <GeneralText>{text.param.zeroAmount(powerUp.id)}</GeneralText>
              </PowerUpInfoContainer>
              {isPowerUpInUse && <PrimaryButton text={text.powerUps.boostIt} />}
            </PowerUpInfoWrapper>
          </PowerUpCard>
        );
      })}
    </PowerUpListOverviewWrapper>
  );
};
