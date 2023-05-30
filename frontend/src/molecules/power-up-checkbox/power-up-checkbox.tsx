import { FC } from "react";

import { PowerUpInfo } from "./power-up";
import { CheckboxContainer, CheckboxWrapper, CheckWrapper } from "./styles";
import { PowerUp } from "../../types";
import { CheckboxBox } from "../../atoms";

interface Props {
  isTop?: boolean;
  powerUp: PowerUp;
  probability: number;
  isChecked: boolean;
  isError: boolean;
  handleCheck: () => void;
  updateProbability: () => void;
}

/**
 * @description A component that renders a checkbox
 * @param {boolean} isTop - Whether the checkbox should be displayed at the top
 * @param {PowerUp} powerUp - The power up
 * @param {number} probability - The probability of the power up
 * @param {boolean} isChecked - Whether the checkbox is checked
 * @param {boolean} isError - Whether the checkbox has an error
 * @param {handleCheck} handleCheck - The function to handle the checkbox
 * @param {updateProbability} updateProbability - The function to update the probability
 */

export const PowerUpCheckbox: FC<Props> = ({ isChecked, handleCheck, isTop, powerUp, isError, probability, updateProbability }) => {
  return (
    <CheckboxContainer isTop={isTop} onClick={() => handleCheck()} isChecked={isChecked}>
      <CheckboxWrapper>
        <CheckWrapper>
          <CheckboxBox type="checkbox" checked={isChecked} />
        </CheckWrapper>
        <PowerUpInfo
          powerUp={powerUp}
          isChecked={isChecked}
          isError={isError}
          probability={probability}
          updateProbability={updateProbability}
        />
      </CheckboxWrapper>
    </CheckboxContainer>
  );
};
