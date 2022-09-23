import styled from "@emotion/styled";
import { } from "../../components";
import { LeftSection, RightSection } from "../../components/base-layout/styles";
import { PlayerNameContainer } from "../../components/game-player/styles";

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
