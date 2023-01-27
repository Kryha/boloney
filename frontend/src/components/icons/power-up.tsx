import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { PowerUpId } from "../../types";
import { GeneralText } from "../atoms";
import { RevealedPowerUps } from "../revealed-power-ups";
import { Lightning, PowerUpIconWrapper } from "./styles";

interface PowerUpProps {
  powerUpAmount: number;
  powerUpIds?: PowerUpId[];
}

export const PowerUpIcon: FC<PowerUpProps> = ({ powerUpAmount, powerUpIds }) => {
  if (powerUpIds?.length) return <RevealedPowerUps powerUpIds={powerUpIds} />;

  return (
    <PowerUpIconWrapper>
      <Lightning />
      <GeneralText customColor={color.darkGrey}>{text.param.xAmount(powerUpAmount)}</GeneralText>
    </PowerUpIconWrapper>
  );
};
