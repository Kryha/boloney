import { FC } from "react";

import { PowerUpOverviewWrapper, PowerUpOverviewContainer, YourPowerUpContainer } from "./styles";
import { PowerUp } from "../power-up";
import { GeneralText } from "../atoms/text";
import { text } from "../../assets/text";

// TODO: update component when the power-up type is created
export const PowerUpOverview: FC = () => {
  return (
    <PowerUpOverviewWrapper>
      <PowerUpOverviewContainer>
        <YourPowerUpContainer>
          <PowerUp />
        </YourPowerUpContainer>
        <GeneralText>{text.param.yourPowerUp(1)}</GeneralText>
      </PowerUpOverviewContainer>
    </PowerUpOverviewWrapper>
  );
};
