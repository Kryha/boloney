import { FC, useState } from "react";
import { useGameCreationFormState } from "../../pages/new-game/game-creation-form-state";
import { PowerUpInfo } from "./power-up";

import { CheckboxContainer, CheckContainer, CheckWrapper, Close } from "./styles";
import { PowerUpDataProps } from "../../assets";
import { PowerUpType } from "../../types";

interface Props {
  isTop?: boolean;
  powerUp: PowerUpDataProps;
  isChecked: boolean;
  isError: boolean;
  toggleCheck: () => void;
}

export const PowerUpCheckbox: FC<Props> = ({ isChecked, toggleCheck, isTop, powerUp, isError }) => {
  const removePowerUpProbability = useGameCreationFormState((state) => state.removePowerUpProbability);
  const [probability, setProbability] = useState(0);

  const check = () => {
    if (isChecked) return <Close />;
    return <></>;
  };

  const clearCheckProbability = (id: PowerUpType) => {
    removePowerUpProbability(id);
    setProbability(0);
  };

  return (
    <CheckboxContainer
      isTop={isTop}
      onClick={() => {
        toggleCheck();
        isChecked && clearCheckProbability(powerUp.id);
      }}
      isChecked={isChecked}
    >
      <CheckWrapper>
        <CheckContainer>{check()}</CheckContainer>
      </CheckWrapper>
      <PowerUpInfo powerUp={powerUp} isChecked={isChecked} isError={isError} probability={probability} setProbability={setProbability} />
    </CheckboxContainer>
  );
};
