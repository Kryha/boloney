import styled from "@emotion/styled";
import { color, margins } from "../../design";
import { Heading6, Paragraph, Row } from "../atoms";
import { ButtonContainer } from "../buttons/styles";
import { PowerUpWrapper } from "../power-up/styles";

export const MatchSettingsOverviewComponent = styled.section`
  padding: 3.75em;
  max-height: 75.6vh;
  width: clamp(768px, 60.62vw + 186px, 1350px);
  overflow-y: scroll;
  ${Heading6} {
    text-transform: uppercase;
  }
  ${ButtonContainer} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-content: center;
    align-items: center;
    height: fit-content;
    padding-right: 0px;
  }
`;

export const MatchSettingsFooter = styled.div`
  background: linear-gradient(0deg, #eeeeea 50%, rgba(238, 238, 234, 0) 139.86%);
  border-radius: 0px 0px 10px 10px;
  height: 10vh;
  position: absolute;
  bottom: 0;
  width: 90%;
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
    max-width: 30vw;
    color: ${color.black};
  }
`;
