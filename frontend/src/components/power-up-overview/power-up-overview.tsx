import { FC } from "react";

import { PowerUpOverviewWrapper, PowerUpOverviewContainer, YourPowerUpContainer } from "./styles";
import { PowerUp } from "../power-up";
import { GeneralText } from "../atoms/text";
import { text } from "../../assets/text";
import { useViewport } from "../../hooks/use-viewport";
import { PowerUp as PowerUps } from "../../types";

interface PowerUpOverviewProps {
  powerUps?: PowerUps[];
}

export const PowerUpOverview: FC<PowerUpOverviewProps> = ({ powerUps }) => {
  const { height } = useViewport();

  if (!powerUps) return <></>;

  return (
    <PowerUpOverviewWrapper>
      <PowerUpOverviewContainer height={height}>
        <YourPowerUpContainer>
          {powerUps.map((powerUp) => (
            <PowerUp key={powerUp.id} powerUp={powerUp} />
          ))}
        </YourPowerUpContainer>
        <GeneralText>{text.param.yourPowerUp(powerUps.length)}</GeneralText>
      </PowerUpOverviewContainer>
    </PowerUpOverviewWrapper>
  );
};
