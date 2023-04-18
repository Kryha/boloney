import styled from "@emotion/styled";
import { Row } from "../../atoms";

export const GeneralLinkWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 35vw;
`;

export const GeneralLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
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
