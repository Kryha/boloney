import styled from "@emotion/styled";

import { CloseIcon, ToggleSwitchOffIcon, ToggleSwitchOnIcon } from "../../assets";
import { color, margins } from "../../design";
import { GeneralText, Paragraph } from "../atoms";
import { GeneralContentWrapper } from "../atoms/containers";

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
  width: 60px;
`;
export const ToggleSwitchOff = styled(ToggleSwitchOffIcon)`
  width: 60px;
`;

export const CheckContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  border-bottom: 1px solid ${color.mediumGrey};
  padding: ${margins.small2};
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
  ${GeneralContentWrapper} {
    margin-left: ${margins.small4};
    margin-top: ${margins.small0};
  }
  ${GeneralText} {
    text-transform: uppercase;
  }
`;

interface CheckboxContainerProps {
  isTop?: boolean;
  addHover?: boolean;
}

export const CheckboxContainer = styled.div<CheckboxContainerProps>`
  display: flex;
  width: 100%;
  cursor: pointer;
  border-top: ${({ isTop }) => (isTop ? `1px solid ${color.mediumGrey}` : "0px")};
  :hover {
    ${CheckContainer} {
      background: ${({ addHover }) => (addHover ? "transparent" : "#dedede")};
    }
  }
`;
