import { FC } from "react";

import { color } from "../../design";
import { PowerUpOverviewWrapper, PowerUpOverviewContainer, YourPowerUpContainer } from "./styles";
import { PowerUp } from "../power-up";
import { GeneralText } from "../atoms/text";
import { text } from "../../assets/text";

interface PowerUpProps {}

export const PowerUpOverview: FC<PowerUpProps> = () => {
  return (
    <PowerUpOverviewWrapper>
      <PowerUpOverviewContainer>
        <YourPowerUpContainer>
          <PowerUp />
          <PowerUp />
          <PowerUp />
        </YourPowerUpContainer>
        <GeneralText>{text.param.yourPowerUp(3)}</GeneralText>
      </PowerUpOverviewContainer>
    </PowerUpOverviewWrapper>
  );
};
