import { FC } from "react";
import { EyeSVG, LightningIconSVG, text } from "../../assets";
import { BaseIcon, CopyBlock } from "../../atoms";
import { color, fontWeights, lineHeights, POWER_UPS_TOOLTIP_LARGE, POWER_UPS_TOOLTIP_SMALL, spacing } from "../../design";
import { Bid, PlayerPublic, PowerUpId } from "../../types";
import { PowerUpReveal } from "../power-up-reveal";
import { RowHeadingIcon } from "../text";
import { TriangleToolTip } from "../triange-tooltip";
import { PillCircleWrapper, PowerUpPillWrapper } from "./styles";

interface Props {
  player: PlayerPublic;
  isLastBid?: boolean;
  lastBid?: Bid;
  isPowerUpsRevealed?: boolean;
  active: boolean;
  powerUps?: PowerUpId[];
  isPowerUpDisabled?: boolean;
  setActive: (active: boolean) => void;
}

/**
 *
 * This is the component for displaying power up amount and tooltip(which reveals the power ups of a player).
 * @param {PlayerPublic} player - This is a player in the sidebar
 * @param {string} width - width of the avatar
 * @param {string} height - height of the avatar
 * @param {string} maxWidth - maximum width of the player avatar
 * @param {boolean} isHovered - If a player is hovered in the sidebar
 * @param {number} amountOfSidebarPlayers - The amount of players in the sidebar
 */

export const PowerUpPill: FC<Props> = ({
  player,
  isLastBid = false,
  active,
  setActive,
  isPowerUpsRevealed = false,
  powerUps,
  isPowerUpDisabled,
}) => {
  const powerUpAmount = powerUps?.length ? powerUps.length : player.powerUpsAmount;

  return (
    <PowerUpPillWrapper gap={spacing.xxs}>
      {isPowerUpsRevealed && (
        <TriangleToolTip
          active={active}
          setActive={setActive}
          position="right"
          tooltipMargin={isLastBid ? POWER_UPS_TOOLTIP_LARGE : POWER_UPS_TOOLTIP_SMALL}
          tooltipIndicator={
            <PillCircleWrapper padding={spacing.xs}>
              <BaseIcon src={<EyeSVG />} iconColor={color.transparent} strokeColor={color.black} pointer />
            </PillCircleWrapper>
          }
        >
          <PowerUpReveal powerUpIds={powerUps} isPowerUpDisabled={isPowerUpDisabled} />
        </TriangleToolTip>
      )}
      <CopyBlock backgroundColor={color.lightGrey} padding={`${spacing.xs} ${spacing.s}`}>
        <RowHeadingIcon
          heading={text.param.xAmount(powerUpAmount)}
          icon={<BaseIcon src={<LightningIconSVG />} iconColor={color.transparent} strokeColor={color.black} />}
          iconPosition="row-reverse"
          transformText="lowercase"
          gap={spacing.xxs}
          headingFontWeight={fontWeights.light}
          headingLineHeight={lineHeights.body}
        />
      </CopyBlock>
    </PowerUpPillWrapper>
  );
};
