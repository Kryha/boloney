import { FC } from "react";

import { PowerUpOverviewWrapper, PowerUpOverviewContainer, YourPowerUpContainer } from "./styles";
import { PowerUp } from "../power-up";
import { GeneralText } from "../atoms/text";
import { text } from "../../assets/text";
import { useViewport } from "../../hooks/use-viewport";

// TODO: update component when the power-up type is created
export const PowerUpOverview: FC = () => {
  const { height } = useViewport();
  return (
    <PowerUpOverviewWrapper>
      <PowerUpOverviewContainer height={height}>
        <YourPowerUpContainer>
          <PowerUp />
        </YourPowerUpContainer>
        <GeneralText>{text.param.yourPowerUp(1)}</GeneralText>
      </PowerUpOverviewContainer>
    </PowerUpOverviewWrapper>
  );
};
