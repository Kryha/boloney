import { FC } from "react";

import { PowerUpCardImage, PowerUpWrapper } from "./styles";
import { PowerUp } from "../../types";

interface PowerUpComponentProps {
  powerUp?: PowerUp;
  showPowerUps?: () => void;
}

export const PowerUpComponent: FC<PowerUpComponentProps> = ({ powerUp, showPowerUps }) => {
  if (!powerUp) return <></>;

  const isSmokeAnMirrorsPowerUp = powerUp.id === "8";
  const isDoubleUpPowerUp = powerUp.id === "4";

  return (
    <PowerUpWrapper onClick={() => showPowerUps && showPowerUps()}>
      <PowerUpCardImage
        src={powerUp.cardImage}
        alt={powerUp.name}
        isDoubleUp={isDoubleUpPowerUp}
        isSmokeAndMirrors={isSmokeAnMirrorsPowerUp}
      />
    </PowerUpWrapper>
  );
};
