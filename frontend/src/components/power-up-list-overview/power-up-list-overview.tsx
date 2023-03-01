import { FC } from "react";
import { PowerUpListOverviewWrapper } from "./styles";
import { PowerUp, PowerUpId } from "../../types";
import { getPowerUpData, isPowerUpTriggeredImmediately } from "../../util";
import { useStore } from "../../store";
import { PowerUpCard } from "../power-up-card";
import { useLocalPlayer, useMatch } from "../../service";
import { ErrorView } from "../error-view";

interface PowerUpListProps {
  powerUps: PowerUp[];
  onClick?: (powerUp: PowerUp) => void;
  extraDice?: number;
}

const PowerUpList: FC<PowerUpListProps> = ({ powerUps, onClick, extraDice }) => {
  const isPowerUpDisabled = (powerUpId: PowerUpId) => {
    return extraDice !== 0 && powerUpId === "3";
  };
  return (
    <PowerUpListOverviewWrapper powerUpsAmount={powerUps.length}>
      {powerUps.map((powerUp, i) => (
        <PowerUpCard key={i} powerUp={powerUp} onClickUse={onClick} isButtonDisabled={isPowerUpDisabled(powerUp.id)} />
      ))}
    </PowerUpListOverviewWrapper>
  );
};

interface Props {
  powerUpIds: PowerUpId[];
}

export const PowerUpListOverview: FC<Props> = ({ powerUpIds }) => {
  const powerUps = getPowerUpData(powerUpIds);

  return <PowerUpList powerUps={powerUps} />;
};

export const PowerUpListUse: FC<Props> = ({ powerUpIds }) => {
  const hideModal = useStore((state) => state.hideModal);
  const setPowerUpState = useStore((state) => state.setPowerUpState);
  const localPlayer = useLocalPlayer();
  const replacePowerUpState = useStore((state) => state.replacePowerUpState);

  const { broadcastUseImmediatePowerUp } = useMatch();

  const powerUps = getPowerUpData(powerUpIds);
  if (!localPlayer) return <ErrorView />;

  const handleClick = async (powerUp: PowerUp) => {
    if (localPlayer.extraDice !== 0 && powerUp.id === "3") return;
    setPowerUpState({ active: powerUp });
    replacePowerUpState({ active: powerUp });
    hideModal();

    if (isPowerUpTriggeredImmediately(powerUp.id)) {
      await broadcastUseImmediatePowerUp(powerUp.id);
    }
  };

  return <PowerUpList powerUps={powerUps} onClick={handleClick} extraDice={localPlayer.extraDice} />;
};
