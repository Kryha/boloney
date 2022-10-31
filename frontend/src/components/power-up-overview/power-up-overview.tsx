import { FC } from "react";

import { PowerUpOverviewWrapper, PowerUpOverviewContainer, YourPowerUpContainer } from "./styles";
import { PowerUpComponent } from "../power-up";
import { GeneralText } from "../atoms/text";
import { text } from "../../assets/text";
import { useViewport } from "../../hooks/use-viewport";
import { PowerUp } from "../../types";
import { PowerUpIcon } from "../icons";

interface PowerUpOverviewProps {
  powerUps?: PowerUp[];
}

export const PowerUpOverview: FC<PowerUpOverviewProps> = ({ powerUps }) => {
  const { height } = useViewport();

  if (!powerUps || !powerUps.length) return <></>;

  return (
    <PowerUpOverviewWrapper>
      <PowerUpOverviewContainer height={height}>
        <PowerUpIcon powerUpAmount={powerUps.length} />
        <YourPowerUpContainer>
          {powerUps.map((powerUp) => (
            <PowerUpComponent key={powerUp.id} powerUp={powerUp} />
          ))}
        </YourPowerUpContainer>
      </PowerUpOverviewContainer>
    </PowerUpOverviewWrapper>
  );
};
