import styled from "@emotion/styled";

import { CloseIcon } from "../../assets";
import { color, fontWeight, margins } from "../../design";
import { GeneralText, Paragraph } from "../atoms";

export const Title = styled(GeneralText)`
  text-transform: uppercase;
`;

export const Description = styled(Paragraph)`
  color: ${color.darkGrey};
`;

export const Close = styled(CloseIcon)`
  width: 10px;
  height: 10px;

  color: ${color.black};
  font-weight: ${fontWeight.bolder};
`;

export const CheckContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  border-top: 1px solid ${color.mediumGrey};
  border-bottom: 1px solid ${color.mediumGrey};
`;

export const DescriptionContainer = styled.div`
  border-top: 1px solid ${color.mediumGrey};
  border-bottom: 1px solid ${color.mediumGrey};
  border-left: 1px solid ${color.mediumGrey};
  flex: 10;

  padding: ${margins.small2};
`;

export const CheckboxContainer = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  user-select: none;
`;
