import { FC } from "react";

import { PowerUpOverviewWrapper, PowerUpOverviewContainer, YourPowerUpContainer } from "./styles";
import { PowerUpComponent } from "../power-up";
import { GeneralText } from "../atoms/text";
import { text } from "../../assets/text";
import { useViewport } from "../../hooks/use-viewport";
import { PowerUp } from "../../types";

interface PowerUpOverviewProps {
  powerUps?: PowerUp[];
}

export const PowerUpOverview: FC<PowerUpOverviewProps> = ({ powerUps }) => {
  const { height } = useViewport();

  if (!powerUps || !powerUps.length) return <></>;

  return (
    <PowerUpOverviewWrapper>
      <PowerUpOverviewContainer height={height}>
        <YourPowerUpContainer>
          {powerUps.map((powerUp) => (
            <PowerUpComponent key={powerUp.id} powerUp={powerUp} />
          ))}
        </YourPowerUpContainer>
        <GeneralText>{text.param.yourPowerUp(powerUps.length)}</GeneralText>
      </PowerUpOverviewContainer>
    </PowerUpOverviewWrapper>
  );
};
