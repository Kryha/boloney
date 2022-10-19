import styled from "@emotion/styled";

import { CloseIcon, LightningIcon, ToggleSwitchOffIcon, ToggleSwitchOnIcon } from "../../assets";
import { color, margins } from "../../design";
import { GeneralText, Paragraph, GeneralContentWrapper, Heading6, Row, BaseInput } from "../atoms";
import { PowerUpWrapper } from "../power-up/styles";

export const Title = styled(GeneralText)`
  text-transform: uppercase;
`;

export const Description = styled(Paragraph)`
  color: ${color.darkGrey};
`;

export const Close = styled(CloseIcon)`
  width: 20px;
`;

export const Lightning = styled(LightningIcon)`
  width: 20px;
  margin-top: 3px;
`;

export const ToggleSwitchOn = styled(ToggleSwitchOnIcon)`
  width: 60px;
`;
export const ToggleSwitchOff = styled(ToggleSwitchOffIcon)`
  width: 60px;
`;

export const CheckContainer = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid ${color.mediumGrey};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckWrapper = styled.div`
  padding: ${margins.small6} ${margins.small6} ${margins.large0} ${margins.small6};
  user-select: none;
  cursor: pointer;
`;

interface DescriptionContainerProps {
  removeLeftBorder?: boolean;
}

export const DescriptionContainer = styled.div<DescriptionContainerProps>`
  flex: 11;

  padding: ${margins.small2};
  ${GeneralContentWrapper} {
    margin-left: ${margins.small4};
    margin-top: ${margins.small0};
  }
  ${Heading6} {
    text-transform: uppercase;
  }
`;

interface CheckboxContainerProps {
  isTop?: boolean;
  addHover?: boolean;
  isChecked?: boolean;
  isDisabled?: boolean;
}

export const CheckboxContainer = styled.div<CheckboxContainerProps>`
  display: flex;
  width: 62.5vw;
  cursor: pointer;
  opacity: ${({ isDisabled }) => (isDisabled ? "0.5" : "1")};
  pointer-events:${({ isDisabled }) => (isDisabled ? "none" : "")};
  border-top: ${({ isTop }) => (isTop ? `1px solid ${color.mediumGrey}` : "0px")};
  background: ${({ isChecked }) => (isChecked ? color.white : "transparent")};
  :hover {
    background: ${color.white};
    ${CheckContainer} {
      background: ${({ isChecked }) => (isChecked ? color.white : "transparent")};
      background: ${({ addHover }) => (addHover ? "transparent" : color.white)};
    }
  }
  ${PowerUpWrapper} {
    margin-top: ${margins.small5};
  }
  ${Row} {
    gap: ${margins.small1};
  }
`;

interface PercentageInputProps {
  isChecked?: boolean;
}
export const PercentageInputContainer = styled.div<PercentageInputProps>`
`;

export const PercentageInput = styled(BaseInput)`
  width: 80px;
  height: 40px;
  border: 1px solid ${color.mediumGrey};
  padding: ${margins.small2} ${margins.small6} ${margins.small2} ${margins.small2};
  ::after {
    position: absolute;
    content: "%";
    font-family: ibm-plex-mono, sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    padding-left: 3px;
    padding-right: 3px;
    padding-top: 7px;
    color: ${color.black};
    right: 35px;
  }
`;

export const TextLabel = styled(GeneralText)`
  display: flex;
  width: 100%;
  ::after {
    position: absolute;
    content: "%";
    font-family: ibm-plex-mono, sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    padding-left: 3px;
    padding-right: 3px;
    padding-top: 7px;
    color: ${color.black};
  }
`;

export const InputIconContainer = styled.div`
  margin-top: ${margins.small6};
  margin-right: ${margins.small6};
  margin-left: ${margins.small6};
`;
