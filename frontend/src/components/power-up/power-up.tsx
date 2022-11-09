import { FC } from "react";

import { PowerUpCardImage, PowerUpWrapper } from "./styles";
import { PowerUp } from "../../types";

interface PowerUpComponentProps {
  powerUp: PowerUp;
}

export const PowerUpComponent: FC<PowerUpComponentProps> = ({ powerUp }) => {
  return (
    <PowerUpWrapper>
      <PowerUpCardImage src={powerUp.image} alt={powerUp.name} />
    </PowerUpWrapper>
  );
};
