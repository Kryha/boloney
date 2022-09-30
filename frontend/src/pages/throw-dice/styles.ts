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

export const DiceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40vh;
`;
