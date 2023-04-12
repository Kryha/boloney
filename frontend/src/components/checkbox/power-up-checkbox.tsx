import { FC } from "react";

import { PowerUpInfo } from "./power-up";
import { CheckboxContainer, CheckContainer, CheckWrapper } from "./styles";
import { PowerUp } from "../../types";
import { BaseIcon } from "../atoms";
import { CloseIconSVG } from "../../assets";

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
  const check = () => {
    if (isChecked) return <BaseIcon src={<CloseIconSVG />} />;
    return <></>;
  };

  const handleCheck = () => {
    toggleCheck();
    if (isChecked) setProbability(0);
  };

  return (
    <CheckboxContainer isTop={isTop} onClick={() => handleCheck()} isChecked={isChecked}>
      <CheckWrapper>
        <CheckContainer>{check()}</CheckContainer>
      </CheckWrapper>
      <PowerUpInfo powerUp={powerUp} isChecked={isChecked} isError={isError} probability={probability} setProbability={setProbability} />
    </CheckboxContainer>
  );
};
