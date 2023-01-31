import { FC } from "react";
import { PowerUpListOverviewWrapper } from "./styles";
import { PowerUp, PowerUpId } from "../../types";
import { getPowerUpData, isPowerUpTriggeredImmediately } from "../../util";
import { useStore } from "../../store";
import { PowerUpCard } from "../power-up-card";
import { useMatch } from "../../service";

interface PowerUpListProps {
  powerUps: PowerUp[];
  onClick?: (powerUp: PowerUp) => void;
}

const PowerUpList: FC<PowerUpListProps> = ({ powerUps, onClick }) => {
  return (
    <PowerUpListOverviewWrapper powerUpsAmount={powerUps.length}>
      {powerUps.map((powerUp, i) => (
        <PowerUpCard key={i} powerUp={powerUp} onClick={onClick} />
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

  const { broadcastUsePowerUp } = useMatch();

  const powerUps = getPowerUpData(powerUpIds);

  const handleClick = async (powerUp: PowerUp) => {
    setPowerUpState({ active: powerUp });

    if (isPowerUpTriggeredImmediately(powerUp.id)) {
      await broadcastUsePowerUp({ active: powerUp });
    }

    hideModal();
  };

  return <PowerUpList powerUps={powerUps} onClick={handleClick} />;
};
