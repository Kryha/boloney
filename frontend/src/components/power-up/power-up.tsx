import { FC } from "react";

import { PowerUpCardImage, PowerUpWrapper } from "./styles";
import { PowerUp as PowerUps } from "../../types";

interface PowerUpProps {
  powerUp: PowerUps;
}

export const PowerUp: FC<PowerUpProps> = ({ powerUp }) => {
  return (
    <PowerUpWrapper>
      <PowerUpCardImage src={powerUp.image} alt={powerUp.name} />
    </PowerUpWrapper>
  );
};
