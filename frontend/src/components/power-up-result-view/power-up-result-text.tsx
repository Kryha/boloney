import { FC } from "react";
import { powerUpResult } from "../../assets";
import { color } from "../../design";
import { usePlayer } from "../../service";
import { useStore } from "../../store";
import { PowerUpId } from "../../types";
import { Heading2 } from "../atoms";
import { TextInfoContainer } from "./styles";

interface PowerUpResultTextProps {
  id: PowerUpId;
  receivedPowerUps?: number;
}

export const PowerUpResultText: FC<PowerUpResultTextProps> = ({ id, receivedPowerUps }) => {
  const powerUpState = useStore((state) => state.powerUpState);
  const targetedPlayer = usePlayer(powerUpState.targetPlayerId || "");

  const info = powerUpResult(id, targetedPlayer?.username, receivedPowerUps);

  return (
    <TextInfoContainer>
      <Heading2>{info.heading1}</Heading2>
      <Heading2 customColor={color.darkGrey}>{info.heading2}</Heading2>
    </TextInfoContainer>
  );
};
