import styled from "@emotion/styled";
import { BaseRow } from "../../atoms";
import { spacing } from "../../design";
import { GeneralLinkContainer, GeneralLinkWrapper } from "../links/styles";

interface FooterWrapperProps {
  isMobile: boolean;
}

export const LinkWrapper = styled.div``;

export const FooterWrapper = styled(BaseRow)<FooterWrapperProps>`
  padding-left: ${spacing.xxl};
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
`;
