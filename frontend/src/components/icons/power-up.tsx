import { FC } from "react";

import { LightningIconSVG, LockIconSVG, text } from "../../assets";
import { color, FontProps } from "../../design";
import { BaseIcon, GeneralText } from "../../atoms";
import { PowerUpId } from "../../types";
import { RevealedPowerUps } from "../revealed-power-ups";
import { PowerUpIconWrapper } from "./styles";
import { LightningContainer } from "../../pages/new-match/styles";

interface PowerUpProps {
  powerUpAmount: number;
  powerUpIds?: PowerUpId[];
  powerUpDisabled?: boolean;
  fontSize?: FontProps;
  lineHeight?: FontProps;
  strokeColor?: string;
}

export const PowerUpIcon: FC<PowerUpProps> = ({
  powerUpAmount,
  powerUpIds,
  powerUpDisabled = false,
  strokeColor,
  fontSize,
  lineHeight,
}) => {
  const powerUpColor = strokeColor ?? color.darkGrey;

  if (powerUpIds?.length) return <RevealedPowerUps powerUpIds={powerUpIds} />;

  return (
    <PowerUpIconWrapper>
      <LightningContainer>
        <BaseIcon src={<LightningIconSVG />} iconColor={color.transparent} strokeColor={powerUpColor} />
      </LightningContainer>
      <GeneralText transformText="none" fontSize={fontSize} lineHeight={lineHeight} customcolor={powerUpColor}>
        {text.param.xAmount(powerUpAmount)}
      </GeneralText>
      {powerUpDisabled && <BaseIcon src={<LockIconSVG />} />}
    </PowerUpIconWrapper>
  );
};
