import styled from "@emotion/styled";
import { color, fontWeight } from "../../design";
import { Heading6 } from "../atoms";
import { LinkText } from "../buttons/styles";

export const GeneralLinkWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 35vw;
  ${Heading6} {
    text-transform: uppercase;
  }
`;

export const GeneralLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  ${LinkText} {
    font-family: "itc-clearface-regular";
    font-weight: ${fontWeight.regular};
    font-size: clamp(1.5rem, 2.29vw + 0.13rem, 2.88rem);
    line-height: clamp(1.63rem, 2.29vw + 0.25rem, 3rem);
    color: ${color.darkGrey};
    &:after {
      border-bottom: 1px solid ${color.darkGrey};
    }
  }
`;

export const HyperLink = styled.a``;
