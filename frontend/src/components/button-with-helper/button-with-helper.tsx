import { FC } from "react";
import { color } from "../../design";
import { PrimaryButton } from "../../molecules";
import { Tooltip } from "../tooltip";
import { InfoPosition } from "../tooltip/tooltip-info";
import { ButtonWithHelperWrapper } from "./styles";

interface PrimaryButtonWithHelperProps {
  tooltipTitle?: string;
  tooltipInfo?: string;
  tooltipInfoPosition?: InfoPosition;
  disabled?: boolean;
  onClick?: () => void;
  primaryText?: string;
  secondaryText?: string;
  width?: string;
  isLoading?: boolean;
}

export const PrimaryButtonWithHelper: FC<PrimaryButtonWithHelperProps> = ({
  tooltipInfoPosition,
  tooltipTitle,
  tooltipInfo,
  disabled,
  onClick,
  primaryText,
  secondaryText,
  width,
  isLoading = false,
}) => {
  return (
    <ButtonWithHelperWrapper id={primaryText}>
      <PrimaryButton
        primaryText={primaryText}
        secondaryText={secondaryText}
        disabled={disabled}
        onClick={onClick}
        width={width}
        isLoading={isLoading}
      />
      <Tooltip title={tooltipTitle} info={tooltipInfo} infoPosition={tooltipInfoPosition} isButtonWithHelper iconColor={color.darkGrey} />
    </ButtonWithHelperWrapper>
  );
};
