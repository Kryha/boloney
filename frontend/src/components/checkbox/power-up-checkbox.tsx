import { FC } from "react";
import { PowerUp as PowerUpData, PowerUpType } from "../../interfaces/game";
import { useGameCreationFormState } from "../../pages/new-game/game-creation-form-state";
import { PowerUpInfo } from "./power-up";

import { CheckboxContainer, CheckContainer, CheckWrapper, Close } from "./styles";

interface Props {
  name: PowerUpType;
  description?: string;
  isTop?: boolean;
  powerUp: PowerUpData;
  isDisabled?: boolean;
  isChecked: boolean;

  toggleCheck: () => void;
}

export const PowerUpCheckbox: FC<Props> = ({ description, isChecked, toggleCheck, isTop, powerUp, isDisabled, name }) => {
  const removeProbability = useGameCreationFormState((state) => state.removeProbability);

  console.log(isDisabled);
  const check = () => {
    if (isChecked) return <Close />;
    return <></>;
  };

  return (
    <CheckboxContainer
      isTop={isTop}
      onClick={() => {
        toggleCheck();
        if (isChecked) removeProbability(name);
      }}
      isChecked={isChecked}
      isDisabled={isDisabled}
    >
      <CheckWrapper>
        <CheckContainer>{check()}</CheckContainer>
      </CheckWrapper>
      <PowerUpInfo powerUp={powerUp} name={name} description={description} isChecked={isChecked} />
    </CheckboxContainer>
  );
};
