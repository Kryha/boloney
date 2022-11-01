import { FC, useState } from "react";
import { text } from "../../assets";
import { MEDIUM_VIEWPORT_WIDTH, POWER_UP_DEFAULT_VIEW, POWER_UP_DEFAULT_VIEW_SMALL } from "../../constants";
import { useViewport } from "../../hooks";
import { PowerUp } from "../../types";
import { GeneralText } from "../atoms/text";
import { PowerUpComponent } from "../power-up";
import { PowerUpWrapper } from "../power-up/styles";
import { PowerUpOverview, YourPowerUpContainer } from "./styles";

interface PowerUpListProps {
  powerUps: PowerUp[];
}

export const PowerUpList: FC<PowerUpListProps> = ({ powerUps }) => {
  const [showModal, setShowModal] = useState(false);
  const { width } = useViewport();

  const defaultPowerUps = width > MEDIUM_VIEWPORT_WIDTH ? POWER_UP_DEFAULT_VIEW : POWER_UP_DEFAULT_VIEW_SMALL;

  const toggleShowModel = () => {
    setShowModal(!showModal);
  };

  return (
    <YourPowerUpContainer>
      {powerUps.slice(0, defaultPowerUps).map((powerUp) => (
        <PowerUpComponent key={powerUp.id} powerUp={powerUp} />
      ))}
      {powerUps.length > defaultPowerUps && (
        <PowerUpWrapper onClick={() => toggleShowModel()}>
          <PowerUpOverview>
            <GeneralText>{text.param.powerUpAmount(powerUps.length - defaultPowerUps)}</GeneralText>
          </PowerUpOverview>
        </PowerUpWrapper>
      )}
    </YourPowerUpContainer>
  );
};
