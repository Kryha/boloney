import { FC, useState } from "react";
import { LockIconSVG } from "../../assets";
import { MAX_SIDEBAR_POWER_UPS_SHOWN, MEDIUM_VIEWPORT_WIDTH, MIN_SIDEBAR_POWER_UPS_SHOWN } from "../../constants";
import { useViewport } from "../../hooks";
import { PowerUpId } from "../../types";
import { getPowerUp } from "../../util";
import { BaseIcon } from "../../atoms";
import { PowerUpComponent } from "../power-up";
import { MinimumPowerUpsShown } from "./minimum-power-ups-show";
import { RevealedPowerUpsContainer } from "./styles";

interface RevealedPowerUpsProps {
  powerUpIds?: PowerUpId[];
}

export const RevealedPowerUps: FC<RevealedPowerUpsProps> = ({ powerUpIds }) => {
  const { width } = useViewport();
  const initialPowerUpsShown = width < MEDIUM_VIEWPORT_WIDTH ? MIN_SIDEBAR_POWER_UPS_SHOWN : MAX_SIDEBAR_POWER_UPS_SHOWN;
  const [powerUpsShown, setPowerUpsShown] = useState(false);

  if (!powerUpIds) return <></>;

  const toggleShowPowerUps = () => {
    setPowerUpsShown((powerUpsShown) => !powerUpsShown);
  };

  return (
    <RevealedPowerUpsContainer>
      <BaseIcon src={<LockIconSVG />} />
      {powerUpsShown ? (
        <>
          {powerUpIds.map((powerUpId, i) => (
            <PowerUpComponent key={i} powerUp={getPowerUp(powerUpId)} showPowerUps={toggleShowPowerUps} />
          ))}
        </>
      ) : (
        <MinimumPowerUpsShown powerUpIds={powerUpIds} initialPowerUpsShown={initialPowerUpsShown} togglePowerUps={toggleShowPowerUps} />
      )}
    </RevealedPowerUpsContainer>
  );
};
