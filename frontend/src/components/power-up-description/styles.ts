import styled from "@emotion/styled";
import { LightningIcon } from "../../assets";
import { margins } from "../../design";
import { GeneralContentWrapper } from "../atoms";

export const DescriptionContainer = styled.div`
  flex: 11;

  padding: ${margins.small2} 0px ${margins.small2} ${margins.small2};
  ${GeneralContentWrapper} {
    margin-left: ${margins.small3};
    margin-top: ${margins.small0};
  }
`;

export const Lightning = styled(LightningIcon)`
  width: 20px;
  margin-top: 3px;
`;
