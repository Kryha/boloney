import styled from "@emotion/styled";

import { CloseIcon, ToggleSwitchOffIcon, ToggleSwitchOnIcon } from "../../assets";
import { color, margins } from "../../design";
import { GeneralText, Paragraph } from "../atoms";

export const Title = styled(GeneralText)`
  text-transform: uppercase;
`;

export const Description = styled(Paragraph)`
  color: ${color.darkGrey};
`;

export const Close = styled(CloseIcon)`
  width: 20px;
`;

export const ToggleSwitchOn = styled(ToggleSwitchOnIcon)`
  width: 80px;
`;
export const ToggleSwitchOff = styled(ToggleSwitchOffIcon)`
  width: 80px;
`;

export const CheckContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  border-bottom: 1px solid ${color.mediumGrey};
  padding: 20px;
  user-select: none;
  cursor: pointer;
`;

interface DescriptionContainerProps {
  removeLeftBorder?: boolean;
}

export const DescriptionContainer = styled.div<DescriptionContainerProps>`
  border-bottom: 1px solid ${color.mediumGrey};
  border-left: 1px solid ${color.mediumGrey};
  border-left: ${({ removeLeftBorder }) => (removeLeftBorder ? "0px" : `1px solid ${color.mediumGrey}`)};
  flex: 11;

  padding: ${margins.small2};
`;

export const CheckboxContainer = styled.div`
  display: flex;
  width: 100%;
`;
