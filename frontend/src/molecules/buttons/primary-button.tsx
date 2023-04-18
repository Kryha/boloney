import { FC, ReactNode } from "react";
import { ContentLoader, InfoPosition } from "../../components";
import { PrimaryButtonBase } from "../../atoms";
import { color } from "../../design";
import { PrimaryButtonWrapper, PrimaryButtonContainer, InitialButtonView, SecondaryView } from "./styles";

interface PrimaryButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  primaryText?: string;
  secondaryText?: string;
  isOpen?: boolean;
  buttonType?: "button" | "submit" | "reset";
  tooltipTitle?: string;
  tooltipInfo?: string;
  tooltipInfoPosition?: InfoPosition;
  width?: string;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: string;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  disabled,
  onClick,
  primaryText,
  secondaryText,
  buttonType = "button",
  width,
  loading,
}) => {
  return (
    <PrimaryButtonWrapper onClick={() => onClick && onClick()} disabled={disabled}>
      <PrimaryButtonContainer disabled={disabled} width={width} loading={loading}>
        <SecondaryView className="box">
          <PrimaryButtonBase type={buttonType} backgroundColor={color.black} disabled={disabled} loading={loading} fontColor={color.white}>
            {secondaryText ?? primaryText}
          </PrimaryButtonBase>
        </SecondaryView>
        <InitialButtonView>
          <PrimaryButtonBase type={buttonType} disabled={disabled} loading={loading}>
            {primaryText}
            {loading && <ContentLoader loading />}
          </PrimaryButtonBase>
        </InitialButtonView>
      </PrimaryButtonContainer>
    </PrimaryButtonWrapper>
  );
};
