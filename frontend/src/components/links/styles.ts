import styled from "@emotion/styled";
import { BaseRow, Row } from "../../atoms";
import { breakpoints, containerWidth, spacing } from "../../design";

export const GeneralLinkWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 35vw;
  @media (max-width: ${breakpoints.md}) {
    width: ${containerWidth.fluid};
    margin-top: ${spacing.s};
  }
`;

export const GeneralLinkContainer = styled(BaseRow)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  @media (max-width: ${breakpoints.md}) {
    align-items: flex-start;
  }
`;

export const HyperLink = styled.a``;

export const LinkImage = styled.img`
  width: auto;
  height: clamp(1.63rem, 2.29vw + 0.25rem, 3rem);
`;

export const ImageLinkContainer = styled(Row)`
  align-items: flex-end;
  gap: 40px;
`;
