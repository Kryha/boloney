import { FC, useState } from "react";
import { useGameCreationFormState } from "../../pages/new-game/game-creation-form-state";
import { PowerUpInfo } from "./power-up";

import { CheckboxContainer, CheckContainer, CheckWrapper, Close } from "./styles";
import { PowerUpDataProps } from "../../assets";
import { PowerUpProbability, PowerUpType } from "../../types";

interface Props {
  isTop?: boolean;
  powerUp: PowerUpDataProps;
  isChecked: boolean;
  isError: boolean;
  toggleCheck: () => void;
  setPowerUpValue: (name: PowerUpType, value: number) => void;
  powerUpValue: PowerUpProbability[];
}
export const splitInteger = (num: number, parts: number) => {
  // Complete this function

  let val;
  let retData;
  const mod = num % parts;
  if (mod == 0) {
    val = num / parts;
    retData = Array(parts).fill(val);
  } else {
    val = (num - mod) / parts;
    retData = Array(parts).fill(val);
    for (let i = 0; i < mod; i++) {
      retData[i] = retData[i] + 1;
    }
    retData.reverse();
  }

  return retData;
};

export const PowerUpCheckbox: FC<Props> = ({ isChecked, toggleCheck, isTop, powerUp, isError, setPowerUpValue, powerUpValue }) => {
  const removePowerUpProbability = useGameCreationFormState((state) => state.removePowerUpProbability);
  const removePowerUpValue = useGameCreationFormState((state) => state.removePowerUpValue);
  const [probability, setProbability] = useState(0);
  const getProbability = useGameCreationFormState((state) => state.getProbability);
  const check = () => {
    if (isChecked) return <Close />;
    return <></>;
  };

  const clearCheckProbability = (id: PowerUpType) => {
    removePowerUpProbability(id);
    setProbability(0);
    removePowerUpValue(powerUp.id);
  };

  return (
    <CheckboxContainer
      isTop={isTop}
      onClick={() => {
        toggleCheck();
        setPowerUpValue(powerUp.id, 0);
        isChecked && clearCheckProbability(powerUp.id);
      }}
      isChecked={isChecked}
    >
      <CheckWrapper>
        <CheckContainer>{check()}</CheckContainer>
      </CheckWrapper>
      <PowerUpInfo
        powerUp={powerUp}
        isChecked={isChecked}
        isError={isError}
        probability={probability}
        setProbability={setProbability}
        powerUpValue={powerUpValue}
        setPowerUpValue={setPowerUpValue}
      />
    </CheckboxContainer>
  );
};
