import { FC } from "react";

import { PowerUpInfo } from "./power-up";
import { CheckboxContainer, CheckWrapper } from "./styles";
import { PowerUp } from "../../types";
import { CheckboxBox } from "../atoms";

interface Props {
  isTop?: boolean;
  powerUp: PowerUp;
  probability: number;
  isChecked: boolean;
  isError: boolean;
  toggleCheck: () => void;
  setProbability: (value: number) => void;
}

export const PowerUpCheckbox: FC<Props> = ({ isChecked, toggleCheck, isTop, powerUp, isError, probability, setProbability }) => {
  const handleCheck = () => {
    toggleCheck();
    if (isChecked) setProbability(0);
  };

  return (
    <CheckboxContainer isTop={isTop} onClick={() => handleCheck()} isChecked={isChecked}>
      <CheckWrapper>
        <CheckboxBox type="checkbox" checked={isChecked} />
      </CheckWrapper>
      <PowerUpInfo powerUp={powerUp} isChecked={isChecked} isError={isError} probability={probability} setProbability={setProbability} />
    </CheckboxContainer>
  );
};
