import { FC } from "react";

import { DisabledPowerUpsIconWrapper, PowerUpCardImage, PowerUpContainer, PowerUpWrapper } from "./styles";
import { PowerUp } from "../../types";
import { BaseIcon } from "../../atoms";
import { BlueLockSVG } from "../../assets";
import { iconSize, radius } from "../../design";

interface PowerUpComponentProps {
  powerUp?: PowerUp;
  showPowerUps?: () => void;
  isPowerUpDisabled?: boolean;
  isInHud?: boolean;
}

export const PowerUpComponent: FC<PowerUpComponentProps> = ({ powerUp, showPowerUps, isPowerUpDisabled = false, isInHud = false }) => {
  if (!powerUp) return <></>;

  const isSmokeAnMirrorsPowerUp = powerUp.id === "8";
  const isDoubleUpPowerUp = powerUp.id === "4";

  return (
    <PowerUpContainer>
      <PowerUpWrapper onClick={() => showPowerUps && showPowerUps()} isInHud={isInHud}>
        <PowerUpCardImage
          src={powerUp.cardImage}
          alt={powerUp.name}
          isDoubleUp={isDoubleUpPowerUp}
          isSmokeAndMirrors={isSmokeAnMirrorsPowerUp}
        />
      </PowerUpWrapper>
      {isPowerUpDisabled && (
        <DisabledPowerUpsIconWrapper>
          <BaseIcon src={<BlueLockSVG />} radius={radius.xxs} width={iconSize.sm} height={iconSize.sm} />
        </DisabledPowerUpsIconWrapper>
      )}
    </PowerUpContainer>
  );
};
