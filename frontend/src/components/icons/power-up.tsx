import { FC } from "react";

import { LockIcon, text } from "../../assets";
import { color, FontProps } from "../../design";
import { GeneralText } from "../atoms";
import { PowerUpId } from "../../types";
import { RevealedPowerUps } from "../revealed-power-ups";
import { Lightning, PowerUpIconWrapper } from "./styles";

interface PowerUpProps {
  powerUpAmount: number;
  powerUpIds?: PowerUpId[];
  powerUpDisabled?: boolean;
  fontSize?: FontProps;
  lineHeight?: FontProps;
  customcolor?: string;
}

export const PowerUpIcon: FC<PowerUpProps> = ({
  powerUpAmount,
  powerUpIds,
  powerUpDisabled = false,
  customcolor,
  fontSize,
  lineHeight,
}) => {
  const powerUpColor = customcolor || color.darkGrey;

  if (powerUpIds?.length) return <RevealedPowerUps powerUpIds={powerUpIds} />;

  return (
    <PowerUpIconWrapper>
      <Lightning customcolor={powerUpColor} />
      <GeneralText transformText="none" fontSize={fontSize} lineHeight={lineHeight} customcolor={powerUpColor}>
        {text.param.xAmount(powerUpAmount)}
      </GeneralText>
      {powerUpDisabled && <LockIcon />}
    </PowerUpIconWrapper>
  );
};
