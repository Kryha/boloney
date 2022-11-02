import { FC, useState } from "react";

import { PowerUpCardImage, PowerUpWrapper } from "./styles";
import { PowerUp } from "../../types";

interface PowerUpListOverviewProps {
  powerUps: PowerUp;
}

export const PowerUpListOverview: FC<PowerUpListOverviewProps> = ({ powerUps }) => {
  const [showModal, setShowModal] = useState(false);
  return <PowerUpWrapper onClick={() => setShowModal(true)}></PowerUpWrapper>;
};
