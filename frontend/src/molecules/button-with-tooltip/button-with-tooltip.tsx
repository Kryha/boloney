import { FC } from "react";
import { FlexDirection } from "../../atoms";
import { color, spacing } from "../../design";
import { PrimaryButton } from "../buttons";
import { Tooltip, TooltipInfoPosition } from "../tooltip";
import { ButtonWithTooltipWrapper } from "./styles";

interface Props {
  tooltipTitle?: string;
  tooltipInfo?: string;
  tooltipInfoPosition?: TooltipInfoPosition;
  disabled?: boolean;
  onClick?: () => void;
  primaryText?: string;
  secondaryText?: string;
  width?: string;
  isLoading?: boolean;
  zIndex?: number;
  flexDirection?: FlexDirection;
}

/**
 * This component is the primary button with a tooltip.
 * @param {string} tooltipTitle - This is the title of the tooltip.
 * @param {string} tooltipInfo - This is the info of the tooltip.
 * @param {TooltipInfoPosition} tooltipInfoPosition - This is the position of the tool tips information. i.e either to the right or left of the button.
 * @param {boolean} disabled - This is a prop to indicate if the button is in the disabled state.
 * @param {Function} onClick - This is a function used to perform an action when the button is clicked.
 * @param {string} primaryText - This is the initial text shown for the primary button.
 * @param {string} secondaryText - This is the secondary text shown for the primary button on hover.
 * @param {string} width - This is width of the button's secondary view. It is only needed when the tooltip is to the right of the button.
 * @param {boolean} isLoading - This is a prop to indicate if the button is in the loading state.
 * @param {number} zIndex - This sets the z-order of the tooltip component and its descendants.
 * @param {FlexDirection} flexDirection - for reversed tooltips i.e tooltips to the left of the button the value must be row-reverse
 */

export const ButtonWithTooltip: FC<Props> = ({
  tooltipInfoPosition,
  tooltipTitle,
  tooltipInfo,
  disabled,
  onClick,
  primaryText,
  secondaryText,
  width,
  isLoading = false,
  zIndex,
  flexDirection,
}) => {
  return (
    <ButtonWithTooltipWrapper id={primaryText} gap={spacing.xxs} flexDirection={flexDirection}>
      <PrimaryButton
        primaryText={primaryText}
        secondaryText={secondaryText}
        disabled={disabled}
        onClick={onClick}
        width={width}
        isLoading={isLoading}
      />
      <Tooltip
        title={tooltipTitle}
        description={tooltipInfo}
        infoPosition={tooltipInfoPosition}
        iconColor={color.darkGrey}
        zIndex={zIndex}
      />
    </ButtonWithTooltipWrapper>
  );
};
