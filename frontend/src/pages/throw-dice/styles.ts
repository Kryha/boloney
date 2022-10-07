import styled from "@emotion/styled";
import { Heading2, Heading6, HeadingContentWrapper } from "../../components";
import { LeftSection, RightSection } from "../../components/base-layout/styles";
import { FaceWrapper } from "../../components/die/styles";
import { PlayerNameContainer } from "../../components/game-player/styles";
import { margins } from "../../design";

export const ThrowDiceContainer = styled.section`
  ${PlayerNameContainer} {
    display: none;
  }
  ${RightSection} {
    border-left: none;
  }
  ${LeftSection} {
    justify-content: center;
    display: flex;
  }
`;

export const DiceContainer = styled.div`
  ${HeadingContentWrapper} {
    margin-left: 0;
  }
  ${Heading6} {
    text-transform: uppercase;
  }
`;

export const AttributesContainer = styled.div`
  position: absolute;
  bottom: 0;
`;

export const DiceValueContainer = styled.div`
  margin-top: 5em;
  margin-left: ${margins.large0};
  width: clamp(300px, 38.75vw + -72px, 672px);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: ${margins.large0};
  width: 140px;
`;
