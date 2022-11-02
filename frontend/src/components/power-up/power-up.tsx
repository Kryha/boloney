import { FC, useState } from "react";

import { PowerUpCardImage, PowerUpWrapper } from "./styles";
import { PowerUp } from "../../types";

interface PowerUpComponentProps {
  powerUp: PowerUp;
}

export const PowerUpComponent: FC<PowerUpComponentProps> = ({ powerUp }) => {
  const [showModal, setShowModal] = useState(false);
  if (showModal) return <PowerUpListOverview />;
  return (
    <PowerUpWrapper onClick={() => setShowModal(true)}>
      <PowerUpCardImage src={powerUp.image} alt={powerUp.name} />
    </PowerUpWrapper>
  );
};
