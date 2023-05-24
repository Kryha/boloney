import { FC } from "react";
import { CloseIconSVG, text } from "../../assets";
import { BaseIcon } from "../../atoms";
import { spacing } from "../../design";
import { PowerUp, PowerUpId } from "../../types";
import { TertiaryButton } from "../buttons";
import { PowerUpCard } from "../power-up";
import { PowerUpListContainer, PowerUpListWrapper } from "./styles";

interface Props {
  powerUps: PowerUp[];
  isPowerUpDisabled?: boolean;
  isButtonDisabled?: boolean;
  isDetailShown?: boolean;
  width?: string;
  height?: string;
  setDetailsShown?: (isDetailShown: boolean) => void;
  onClickButton?: (powerUp: PowerUp) => void;
  onClickRadio?: (powerUpKey: number) => void;
  onClickCheck?: (key: number, powerUpId: PowerUpId) => void;
}

/** This component shows a list of power ups in a grid. It is used in the modal, and in power up use
 * @param {PowerUp} powerUpS - An array of PowerUps that needs to be displayed on a list
 * @param {boolean} isPowerUpDisabled - Is true when the powerUp can't be used
 * @param {boolean} isButtonDisabled - Is true when the button can't be clicked
 * @param {boolean} areDetailsShown - will determine if the power-up description is shown
 * @param {string} width - is the width of the power up list
 * @param {string} height - is the height of the power up list
 * @param {Function} setDetailsShown - Manipulate the areDetailsShown state
 * @param {Function} onClickButton - Provide the powerUp information for this component
 * @param {Function} onClickRadio - Provide the powerUpKey for this component
 * @param {Function} onClickCheck - Provide the powerUpKey and powerUpId for this component
 */

export const PowerUpList: FC<Props> = ({
  powerUps,
  isPowerUpDisabled,
  width,
  height,
  isButtonDisabled,
  isDetailShown,
  onClickButton,
  onClickCheck,
  onClickRadio,
}) => {
  return (
    <PowerUpListWrapper>
      <TertiaryButton text={text.general.close} icon={<BaseIcon src={<CloseIconSVG />} pointer />} />
      <PowerUpListContainer powerUpsAmount={powerUps.length} alignItems="center" gap={spacing.s} width={width} height={height}>
        {powerUps.map((powerUp, i) => (
          <PowerUpCard
            key={i}
            powerUp={powerUp}
            onClickButton={onClickButton}
            isButtonDisabled={isButtonDisabled}
            onClickCheck={onClickCheck}
            onClickRadio={onClickRadio}
            powerUpKey={i}
            isDetailShown={isDetailShown}
            isPowerUpDisabled={isPowerUpDisabled}
          />
        ))}
      </PowerUpListContainer>
    </PowerUpListWrapper>
  );
};
