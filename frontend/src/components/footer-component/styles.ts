import styled from "@emotion/styled";
import { BaseRow } from "../../atoms";
import { breakpoints, spacing } from "../../design";
import { GeneralLinkContainer, GeneralLinkWrapper } from "../links/styles";

export const LinkWrapper = styled.div``;

export const FooterWrapper = styled(BaseRow)`
  justify-content: space-evenly;
  ${GeneralLinkWrapper} {
    width: fit-content;
    padding-top: 0px;
    gap: 0px;
  }
  ${GeneralLinkContainer} {
    margin-top: 20px;
    gap: 0px;
  }
  padding-bottom: ${spacing.xxl};

  @media (max-width: ${breakpoints.md}) {
    padding-left: ${spacing.md};
  }
`;
