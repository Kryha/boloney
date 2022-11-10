import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { GeneralText } from "../atoms";
import { Lightning, PowerUpIconWrapper } from "./styles";

interface PowerUpProps {
  powerUpAmount: number;
}

export const PowerUpIcon: FC<PowerUpProps> = ({ powerUpAmount }) => {
  return (
    <PowerUpIconWrapper>
      <Lightning />
      <GeneralText customColor={color.darkGrey}>{text.param.xAmount(powerUpAmount)}</GeneralText>
    </PowerUpIconWrapper>
  );
};
