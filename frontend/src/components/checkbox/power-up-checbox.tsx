import { FC } from "react";
import { PowerUp as PowerUpType } from "../../types";
import { useGameCreationFormState } from "../../pages/new-game/game-creation-form-state";
import { PowerUpInfo } from "./power-up";

import { CheckboxContainer, CheckContainer, CheckWrapper, Close } from "./styles";
import { PowerUpDataProps } from "../../assets";

interface Props {
  isTop?: boolean;
  powerUp: PowerUpDataProps;
  isDisabled?: boolean;
  isChecked: boolean;

  toggleCheck: () => void;
}

export const PowerUpCheckbox: FC<Props> = ({ isChecked, toggleCheck, isTop, powerUp, isDisabled }) => {
  const removeProbability = useGameCreationFormState((state) => state.removeProbability);

  const check = () => {
    if (isChecked) return <Close />;
    return <></>;
  };

  return (
    <CheckboxContainer
      isTop={isTop}
      onClick={() => {
        toggleCheck();
        if (isChecked) removeProbability(powerUp.id);
      }}
      isChecked={isChecked}
      isDisabled={isDisabled}
    >
      <CheckWrapper>
        <CheckContainer>{check()}</CheckContainer>
      </CheckWrapper>
      <PowerUpInfo powerUp={powerUp} isChecked={isChecked} />
    </CheckboxContainer>
  );
};
