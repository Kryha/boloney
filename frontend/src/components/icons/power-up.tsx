import { FC } from "react";
import { LockIcon, text } from "../../assets";
import { color } from "../../design";
import { PowerUpId } from "../../types";
import { GeneralText } from "../atoms";
import { RevealedPowerUps } from "../revealed-power-ups";
import { Lightning, PowerUpIconWrapper } from "./styles";

interface PowerUpProps {
  powerUpAmount: number;
  powerUpIds?: PowerUpId[];
  powerUpDisabled?: boolean;
}

export const PowerUpIcon: FC<PowerUpProps> = ({ powerUpAmount, powerUpIds, powerUpDisabled = false }) => {
  if (powerUpIds?.length) return <RevealedPowerUps powerUpIds={powerUpIds} />;

  return (
    <PowerUpIconWrapper>
      <Lightning />
      <GeneralText customColor={color.darkGrey}>{text.param.xAmount(powerUpAmount)}</GeneralText>
      {powerUpDisabled && <LockIcon />}
    </PowerUpIconWrapper>
  );
};
