import { FC, useEffect, useState } from "react";
import { text } from "../../assets";
import { useMatch } from "../../service";
import { useStore } from "../../store";
import { PowerUpId } from "../../types";
import { HealDicePowerUpSelection } from "./types";
import { BottomButtonWrapper } from "../atoms";
import { ErrorView } from "../error-view";
import { HealDiceWrapper, PowerUpSelectionWrapper } from "./styles";
import { PowerUpCardCheckbox } from "../power-up-card/power-up-card-checkbox";
import { getPowerUpData } from "../../util";
import { FadeTransition } from "../page-transition";
import { FADE_TRANSITION_DURATION } from "../../constants";
import { PrimaryButton } from "../../molecules";

export const HealDice: FC = () => {
  const playerPowerUps = useStore((state) => state.powerUpIds);
  const matchSettings = useStore((state) => state.matchSettings);
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  const { broadcastHealDice } = useMatch();

  const [selectedPowerups, setSelectedPowerups] = useState<HealDicePowerUpSelection[]>([]);
  const [reachedMaxSelectedPowerUps, setReachedMaxSelectedPowerUps] = useState(false);

  const powerUps = getPowerUpData(playerPowerUps);

  useEffect(() => {
    if (!matchSettings) return;
    setReachedMaxSelectedPowerUps(selectedPowerups.length >= matchSettings.healPowerUpAmount);
  }, [matchSettings, selectedPowerups.length]);

  if (!matchSettings) return <ErrorView />;

  const isSelected = (powerUpKey: number) => {
    const alreadySelected = selectedPowerups.filter((selectedPowerUp) => selectedPowerUp.key === powerUpKey);
    if (alreadySelected.length === 0) return false;
    return true;
  };

  const handlePowerUpSelect = (key: number, id: PowerUpId) => {
    const selectedPowerUp: HealDicePowerUpSelection = { key: key, powerUpId: id };
    const isNotSelected = !selectedPowerups.find((obj) => obj.key === selectedPowerUp.key);
    if (isNotSelected) {
      setSelectedPowerups((selectedPowerups) => [...selectedPowerups, selectedPowerUp]);
    } else {
      setSelectedPowerups((oldSelectedPowerUps) => oldSelectedPowerUps.filter((obj) => obj.key !== selectedPowerUp.key));
    }
  };

  const handleHealDice = () => {
    setTurnActionStep("pickAction");
    const selected = selectedPowerups.reduce((acc, obj): PowerUpId[] => {
      return [...acc, obj.powerUpId];
    }, [] as PowerUpId[]);

    broadcastHealDice({ selectedPowerUps: selected });
  };

  return (
    <FadeTransition delay={FADE_TRANSITION_DURATION}>
      <HealDiceWrapper>
        <PowerUpSelectionWrapper>
          {powerUps.map((powerUp, i) => (
            <PowerUpCardCheckbox
              key={i}
              powerUpKey={i}
              powerUp={powerUp}
              isClicked={isSelected(i)}
              toggleCheckBox={handlePowerUpSelect}
              disabledCheckbox={reachedMaxSelectedPowerUps}
            />
          ))}
        </PowerUpSelectionWrapper>
        <BottomButtonWrapper>
          {reachedMaxSelectedPowerUps && (
            <PrimaryButton primaryText={text.playerTurn.continueWithAction} onClick={() => handleHealDice()} />
          )}
        </BottomButtonWrapper>
      </HealDiceWrapper>
    </FadeTransition>
  );
};
