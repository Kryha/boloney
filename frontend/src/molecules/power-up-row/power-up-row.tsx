import { FC } from "react";
import { LightningIconSVG, text } from "../../assets";
import { BaseIcon, BaseRow } from "../../atoms";
import { color, fontSizes, fontWeights, lineHeights, spacing } from "../../design";
import { PowerUpId } from "../../types";
import { getPowerUp, getPowerUpsShown } from "../../util";
import { PowerUpSmall } from "../power-up/power-up-small";
import { RowHeadingIcon } from "../text";
import { PowerUpRowWrapper } from "./styles";

interface Props {
  powerUpIds?: PowerUpId[];
  width: number;
  isPowerUpDisabled?: boolean;
  onClick: () => void;
}

/** This component shows a list of power ups in the hud. It uses the small power up cards
 * @param {PowerUp} powerUpIds - An array of Power-up ids that needs to be displayed in a list
 * @param {boolean} isPowerUpDisabled - Is true when the powerUp can't be used. A lock icon appears on the power-ups
 * @param {string} width - is the width of the power up list
 * @param {Function} onClick - Opens up a modal when the power up list is clicked
 */

export const PowerUpRow: FC<Props> = ({ powerUpIds, width, isPowerUpDisabled, onClick }) => {
  if (!powerUpIds || !powerUpIds.length) return <></>;
  const powerUpsShown = getPowerUpsShown(width);

  return (
    <BaseRow gap={spacing.xs}>
      <RowHeadingIcon
        icon={<BaseIcon src={<LightningIconSVG />} iconColor={color.transparent} strokeColor={color.black} />}
        heading={text.param.xAmount(powerUpIds.length)}
        headingFontSize={fontSizes.body}
        headingLineHeight={lineHeights.body}
        headingFontWeight={fontWeights.light}
        iconPosition="row-reverse"
        transformText="lowercase"
      />
      <PowerUpRowWrapper gap={spacing.xs} onClick={onClick}>
        {powerUpIds.slice(0, powerUpsShown).map((powerUpId, i) => {
          const powerUp = getPowerUp(powerUpId);
          return (
            <PowerUpSmall key={i} powerUpName={powerUp?.name} powerUpImage={powerUp?.cardImage} isPowerUpDisabled={isPowerUpDisabled} />
          );
        })}
        <PowerUpSmall isEmpty isPowerUpDisabled={isPowerUpDisabled} plusAmount={powerUpIds.length - powerUpsShown} padding={spacing.xs} />
      </PowerUpRowWrapper>
    </BaseRow>
  );
};
