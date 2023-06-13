import { FC } from "react";
import { EyeSVG, LightningIconSVG, text } from "../../assets";
import { BaseColumn, BaseIcon, BaseRow, Heading6 } from "../../atoms";
import { color, fontSizes, fontWeights, lineHeights, spacing } from "../../design";
import { PowerUpId } from "../../types";
import { getPowerUp } from "../../util";
import { PowerUpSmall } from "../power-up";
import { RowHeadingIcon } from "../text";
import { PowerUpInsightWrapper } from "./styles";

interface Props {
  powerUpIds?: PowerUpId[];
  isPowerUpDisabled?: boolean;
}

/**
 *
 * This is the component for displaying the hidden power ups of a player.
 * @param {PowerUpIdc} powerUpIds - This is an array of power up ids.
 * @param {boolean} isPowerUpDisabled - A boolean to indicate if a players power ups are all disabled.
 */

export const PowerUpReveal: FC<Props> = ({ powerUpIds, isPowerUpDisabled }) => {
  if (!powerUpIds || !powerUpIds.length) return <></>;
  return (
    <BaseRow gap={spacing.s}>
      <PowerUpInsightWrapper gap={spacing.xs}>
        <BaseIcon src={<EyeSVG />} iconColor={color.transparent} strokeColor={color.black} />
        <BaseColumn>
          <Heading6 fontSize={fontSizes.heading5} lineHeight={lineHeights.heading5}>
            {text.powerUps.powerUpInsight}
          </Heading6>
          <RowHeadingIcon
            icon={<BaseIcon src={<LightningIconSVG />} iconColor={color.transparent} strokeColor={color.black} />}
            heading={text.param.xAmount(powerUpIds.length)}
            headingFontSize={fontSizes.body}
            headingLineHeight={lineHeights.body}
            headingFontWeight={fontWeights.light}
            iconPosition="row-reverse"
            transformText="lowercase"
          />
        </BaseColumn>
      </PowerUpInsightWrapper>

      <BaseRow gap={spacing.s}>
        {powerUpIds.map((powerUpId, i) => {
          const powerUp = getPowerUp(powerUpId);
          return (
            <PowerUpSmall key={i} powerUpName={powerUp?.name} powerUpImage={powerUp?.cardImage} isPowerUpDisabled={isPowerUpDisabled} />
          );
        })}
      </BaseRow>
    </BaseRow>
  );
};
