import { FC, MouseEventHandler } from "react";
import { PowerUp as PowerUpType, PowerupType } from "../../interfaces/game";
import { useGameCreationFormState } from "../../pages/new-game/game-creation-form-state";
import { GeneralText, GeneralContentWrapper, Heading6, Row } from "../atoms";
import { CheckboxInput, Input } from "../inputs";
import { PowerUp } from "../power-up";

import {
  CheckboxContainer,
  CheckContainer,
  CheckWrapper,
  Close,
  Description,
  DescriptionContainer,
  InputIconContainer,
  PercentageInput,
  TextLabel,
  Title,
  ToggleSwitchOff,
  ToggleSwitchOn,
  Trophy,
} from "./styles";

interface Props {
  title: string;
  description?: string;
  isUsingSwitchIcon?: boolean;
  isTop?: boolean;
  powerUp?: PowerUpType;
  isDisabled?: boolean;
  name: PowerupType;
  isPowerUpError: boolean;
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
  isPowerUpError = false,
}) => {
  const setPowerUpProbability = useGameCreationFormState((state) => state.setPowerUpProbability);
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
      onClick={() => toggleCheck()}
      addHover={isUsingSwitchIcon}
      isChecked={isChecked}
      isDisabled={isDisabled}
    >
      <CheckWrapper>
        <CheckContainer>{check()}</CheckContainer>
      </CheckWrapper>
      {powerUp ? (
        <>
          <PowerUp powerUp={powerUp} />
          <DescriptionContainer removeLeftBorder={isUsingSwitchIcon}>
            <GeneralContentWrapper>
              {!isUsingSwitchIcon && (
                <Row>
                  <Trophy />
                  <Heading6>{title}</Heading6>
                </Row>
              )}
              {description && <Description>{description}</Description>}
            </GeneralContentWrapper>
          </DescriptionContainer>
          <CheckboxInput isError={isPowerUpError}>
            <PercentageInput
              type="number"
              onClick={(e) => e.stopPropagation()}
              onBlur={(e) => setPowerUpProbability({ name: name, probability: Number(e.target.value) })}
            />
          </CheckboxInput>
        </>
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
