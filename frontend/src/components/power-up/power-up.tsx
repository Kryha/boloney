import { FC } from "react";

import { DisabledPowerUpsIconWrapper, PowerUpCardImage, PowerUpContainer, PowerUpWrapper } from "./styles";
import { PowerUp } from "../../types";
import { BlueLock } from "../../assets";

interface PowerUpComponentProps {
  powerUp?: PowerUp;
  showPowerUps?: () => void;
  isPowerUpDisabled?: boolean;
}

export const PowerUpComponent: FC<PowerUpComponentProps> = ({ powerUp, showPowerUps, isPowerUpDisabled = false }) => {
  if (!powerUp) return <></>;

  const isSmokeAnMirrorsPowerUp = powerUp.id === "8";
  const isDoubleUpPowerUp = powerUp.id === "4";

  return (
    <PowerUpContainer>
      <PowerUpWrapper onClick={() => showPowerUps && showPowerUps()}>
        <PowerUpCardImage
          src={powerUp.cardImage}
          alt={powerUp.name}
          isDoubleUp={isDoubleUpPowerUp}
          isSmokeAndMirrors={isSmokeAnMirrorsPowerUp}
        />
      </PowerUpWrapper>
      {isPowerUpDisabled && (
        <DisabledPowerUpsIconWrapper>
          <BlueLock />
        </DisabledPowerUpsIconWrapper>
      )}
    </PowerUpContainer>
  );
};
