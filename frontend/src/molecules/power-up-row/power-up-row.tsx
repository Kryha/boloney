import { FC } from "react";
import { LightningIconSVG, text } from "../../assets";
import { BaseIcon, BaseRow } from "../../atoms";
import { color, fontSizes, fontWeights, lineHeights, spacing } from "../../design";
import { PowerUpId } from "../../types";
import { getPowerUp } from "../../util";
import { PowerUpSmall } from "../power-up/power-up-small";
import { RowHeadingIcon } from "../text";
import { AddPowerUp, PowerUpRowContainer, PowerUpRowWrapper } from "./styles";

interface Props {
  powerUpIds?: PowerUpId[];
  isPowerUpDisabled?: boolean;
  onClick: () => void;
  showPowerUpAnimation?: boolean;
}

/** This component shows a list of power ups in the hud. It uses the small power up cards
 * @param {PowerUp} powerUpIds - An array of Power-up ids that needs to be displayed in a list
 * @param {boolean} isPowerUpDisabled - Is true when the powerUp can't be used. A lock icon appears on the power-ups
 * @param {string} width - is the width of the power up list
 * @param {Function} onClick - Opens up a modal when the power up list is clicked
 * @param {boolean} showPowerUpAnimation - A boolean used to begin the power up animation. The animation occurs when a new power up is added to your hand.
 */

export const PowerUpRow: FC<Props> = ({ powerUpIds, isPowerUpDisabled, showPowerUpAnimation = false, onClick }) => {
  if (!powerUpIds || !powerUpIds.length) return <></>;

  return (
    <BaseRow gap={spacing.s}>
      <PowerUpRowContainer>
        <RowHeadingIcon
          icon={<BaseIcon src={<LightningIconSVG />} iconColor={color.transparent} strokeColor={color.black} />}
          heading={text.param.xAmount(powerUpIds.length)}
          headingFontSize={fontSizes.body}
          headingLineHeight={lineHeights.body}
          headingFontWeight={fontWeights.light}
          iconPosition="row-reverse"
          transformText="lowercase"
        />
        <AddPowerUp fontWeight={fontWeights.bolder} transformText="none" showPowerUpAnimation={showPowerUpAnimation}>
          {text.general.plusOne}
        </AddPowerUp>
      </PowerUpRowContainer>
      <PowerUpRowWrapper gap={spacing.xs} onClick={onClick} amount={powerUpIds.length}>
        {powerUpIds.map((powerUpId, i) => {
          const powerUp = getPowerUp(powerUpId);
          return (
            <PowerUpSmall
              key={i}
              powerUpName={powerUp?.name}
              powerUpImage={powerUp?.cardImage}
              isPowerUpDisabled={isPowerUpDisabled}
              pointer
            />
          );
        })}
      </PowerUpRowWrapper>
    </BaseRow>
  );
};
