import styled from "@emotion/styled";
import { color, margins } from "../../design";
import { Heading6, Paragraph, Row } from "../atoms";
import { ButtonContainer } from "../buttons/styles";
import { PowerUpWrapper } from "../power-up/styles";

export const MatchSettingsOverviewComponent = styled.section`
  padding: 3.75em;
  width: clamp(768px, 60.62vw + 186px, 1350px);
  overflow-y: scroll;
  ${Heading6} {
    text-transform: uppercase;
  }
  ${ButtonContainer} {
    height: fit-content;
    padding-right: 0px;
  }
`;

export const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  height: fit-content;
  padding-right: 0px;
`;

export const MatchSettingsFooter = styled.div`
  background: linear-gradient(0deg, ${color.white} 50%, rgba(238, 234, 233, 0) 139.86%);
  border-radius: 0px 0px 10px 10px;
  height: 10vh;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0px;
`;

export const MatchInfoButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
  margin-top: 2.5em;
  margin-bottom: 3.75em;
`;
export const Percentage = styled(Paragraph)`
  padding: 0.625em 0px 0.625em 0.625em;
`;

export const PowerUpContainer = styled.div`
  display: flex;
  width: 100%;
  ${PowerUpWrapper} {
    margin-top: ${margins.small5};
    margin-bottom: ${margins.small3};
  }
  ${Row} {
    gap: ${margins.small0};
  }
  ${Paragraph} {
    padding-right: 10px;
    color: ${color.black};
  }
`;
