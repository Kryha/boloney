import { FC } from "react";

import { PowerUpCard, PowerUpImage, PowerUpInfoContainer, PowerUpInfoWrapper, PowerUpListOverviewWrapper } from "./styles";
import { PowerUp } from "../../types";
import { POWER_UP_DATA, text } from "../../assets";
import { GeneralText, Heading2 } from "../atoms";
import { color } from "../../design";
import { Link, PrimaryButton } from "../buttons";

interface PowerUpListOverviewProps {
  powerUps: PowerUp[];
  isPowerUpInUse?: boolean;
}

export const PowerUpListOverview: FC<PowerUpListOverviewProps> = ({ powerUps, isPowerUpInUse }) => {
  const dataPowerUp = POWER_UP_DATA.filter((localPowerUp) => powerUps.some((powerUp) => localPowerUp.id === powerUp.id));

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
