import { FC } from "react";

import { PowerUpCardImage, PowerUpWrapper } from "./styles";
import { PowerUp } from "../../types";

interface PowerUpComponentProps {
  powerUp: PowerUp;
  showPowerUps?: () => void;
}

export const PowerUpComponent: FC<PowerUpComponentProps> = ({ powerUp, showPowerUps }) => {
  return (
    <PowerUpWrapper onClick={() => showPowerUps && showPowerUps()}>
      <PowerUpCardImage src={powerUp.icon} alt={powerUp.name} />
    </PowerUpWrapper>
  );
};
