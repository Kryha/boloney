import { FC } from "react";
import { PowerUp as PowerUpType, PowerupType } from "../../interfaces/game";
import { useGameCreationFormState } from "../../pages/new-game/game-creation-form-state";
import { GeneralContentWrapper } from "../atoms";
import { PowerUpInfo } from "./power-up";

import {
  CheckboxContainer,
  CheckContainer,
  CheckWrapper,
  Close,
  Description,
  DescriptionContainer,
  Title,
  ToggleSwitchOff,
  ToggleSwitchOn,
} from "./styles";

interface Props {
  title: string;
  description?: string;
  isUsingSwitchIcon?: boolean;
  isTop?: boolean;
  powerUp?: PowerUpType;
  isDisabled?: boolean;
  name: PowerupType;
  isChecked: boolean;

  toggleCheck: () => void;
}

export const Checkbox: FC<Props> = ({
  title,
  description,
  isChecked,
  toggleCheck,
  isUsingSwitchIcon,
  isTop,
  powerUp,
  isDisabled,
  name,
}) => {
  const removeProbability = useGameCreationFormState((state) => state.removeProbability);

  const check = () => {
    if (isUsingSwitchIcon) {
      if (isChecked) return <ToggleSwitchOn />;
      return <ToggleSwitchOff />;
    } else {
      if (isChecked) return <Close />;
      return <></>;
    }
  };

  return (
    <CheckboxContainer
      isTop={isTop}
      onClick={() => {
        toggleCheck();
        if (isChecked) removeProbability(name);
      }}
      addHover={isUsingSwitchIcon}
      isChecked={isChecked}
      isDisabled={isDisabled}
    >
      <CheckWrapper>
        <CheckContainer>{check()}</CheckContainer>
      </CheckWrapper>
      {powerUp ? (
        <PowerUpInfo powerUp={powerUp} name={name} description={description} isUsingSwitchIcon={isUsingSwitchIcon} isChecked={isChecked} />
      ) : (
        <DescriptionContainer removeLeftBorder={isUsingSwitchIcon}>
          <GeneralContentWrapper>
            <Title>{title}</Title>
            {description && <Description>{description}</Description>}
          </GeneralContentWrapper>
        </DescriptionContainer>
      )}
    </CheckboxContainer>
  );
};
