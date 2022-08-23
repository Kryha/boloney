import { FC } from "react";

import { color } from "../../design";
import { PowerUpWrapper, PowerUpContainer } from "./styles";

interface PowerUpProps {}

export const PowerUpOverview: FC<PowerUpProps> = () => {
  return (
    <PowerUpWrapper>
      <PowerUpContainer></PowerUpContainer>
    </PowerUpWrapper>
  );
};
