import { FC } from "react";
import { text } from "../../assets";
import { PowerUpId } from "../../types";
import { getPowerUp } from "../../util";
import { GeneralText } from "../atoms";
import { PowerUpComponent } from "../power-up";
import { PowerUpContainer } from "./styles";

interface MinimumPowerUpsShownProps {
  powerUpIds: PowerUpId[];
  initialPowerUpsShown: number;
  togglePowerUps: () => void;
}

export const MinimumPowerUpsShown: FC<MinimumPowerUpsShownProps> = ({ powerUpIds, initialPowerUpsShown, togglePowerUps }) => {
  return (
    <>
      {powerUpIds.slice(0, initialPowerUpsShown).map((powerUpId, i) => (
        <PowerUpComponent key={i} powerUp={getPowerUp(powerUpId)} showPowerUps={togglePowerUps} />
      ))}
      {powerUpIds.length > initialPowerUpsShown && (
        <PowerUpContainer>
          <GeneralText>{text.param.powerUpAmount(powerUpIds.length - initialPowerUpsShown)}</GeneralText>
        </PowerUpContainer>
      )}
    </>
  );
};
