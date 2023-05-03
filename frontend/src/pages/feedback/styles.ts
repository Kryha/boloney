import styled from "@emotion/styled";
import { Heading6 } from "../../atoms";
import { GeneralLinkWrapper } from "../../components";
import { margins } from "../../design";

export const TitleSection = styled.section`
  margin-bottom: ${margins.large0};
  ${Heading6} {
    margin-bottom: ${margins.small4};
  }
`;

export const LinkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  ${GeneralLinkWrapper} {
    width: auto;
  }
`;
