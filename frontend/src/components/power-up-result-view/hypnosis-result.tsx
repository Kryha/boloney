import { FC, useState } from "react";
import { text } from "../../assets";
import { PrimaryButton } from "../../molecules";
import { useMatch } from "../../service";
import { PowerUpId, UseHypnosisBackend } from "../../types";
import { getPowerUpData } from "../../util";
import { BottomButtonWrapper } from "../atoms";
import { PowerUpPile } from "../power-up-pile";
import { PowerUpResultText } from "./power-up-result-text";

interface HypnosisResultProps {
  data: UseHypnosisBackend;
  id: PowerUpId;
  handleDone: () => void;
}

export const HypnosisResult: FC<HypnosisResultProps> = ({ data, id, handleDone }) => {
  const powerUpData = getPowerUpData(data.powerUpIds);

  const [selectedPowerUp, setSelectedPowerUp] = useState<number>(0);
  const { broadcastUsePowerUp } = useMatch();

  const handlePowerUpSelect = (powerUpIndex?: number) => {
    if (powerUpIndex === undefined) return;
    setSelectedPowerUp(powerUpIndex);
  };

  const handlePowerUpSteal = () => {
    broadcastUsePowerUp({ id: "9", data: { targetId: data.targetId, targetPowerUpId: powerUpData[selectedPowerUp].id } });

    handleDone();
  };

  return (
    <BottomButtonWrapper>
      <PowerUpResultText id={id} receivedPowerUps={powerUpData.length} />
      <PowerUpPile data={powerUpData} selectedPowerUp={selectedPowerUp} onClick={handlePowerUpSelect} disableId />
      <PrimaryButton primaryText={text.powerUps.getPowerUp} onClick={() => handlePowerUpSteal()} />
    </BottomButtonWrapper>
  );
};
