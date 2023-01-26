import { FC } from "react";
import { PrimaryButton } from "../buttons";
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
}

export const PrimaryButtonWithHelper: FC<PrimaryButtonWithHelperProps> = ({
  tooltipInfoPosition,
  tooltipTitle,
  tooltipInfo,
  disabled,
  onClick,
  primaryText,
  secondaryText,
}) => {
  return (
    <ButtonWithHelperWrapper id={primaryText}>
      <PrimaryButton primaryText={primaryText} secondaryText={secondaryText} disabled={disabled} onClick={onClick} />
      <Tooltip title={tooltipTitle} info={tooltipInfo} infoPosition={tooltipInfoPosition} isButtonWithHelper />
    </ButtonWithHelperWrapper>
  );
};
