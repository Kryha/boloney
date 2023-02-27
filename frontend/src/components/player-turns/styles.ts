import styled from "@emotion/styled";

import { color, margins, zIndex } from "../../design";
import { ButtonWithHelperWrapper } from "../button-with-helper/styles";
import { Info } from "../../components/tooltip/styles";
import { BottomButtonWrapper, Heading6 } from "../atoms";
import { SecondaryButtonContainer } from "../buttons/styles";
import { TimerRow } from "../timer/styles";

export const ActivePlayerWrapper = styled.section``;

export const ActivePlayerContainer = styled.section`
  margin-top: ${margins.large0};
  ${ButtonWithHelperWrapper} {
    margin-left: -${margins.large0};
  }
  ${Info} {
    margin-top: -7px;
    g {
      path {
        fill: ${color.darkGrey};
      }
    }
  }
`;

export const PowerUpButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: ${margins.large0};
`;

export const ActionButtonContainer = styled(PowerUpButtonContainer)`
  margin-top: ${margins.small5};
`;

export const IdlePlayerWrapper = styled.section`
  padding-top: -${margins.large0};
`;

export const TurnActionWrapper = styled.section`
  margin-top: -${margins.large0};
  ${SecondaryButtonContainer} {
    position: absolute;
    top: 0;
    left: 0;
    z-index: ${zIndex.modalBackground};
  }
  ${BottomButtonWrapper} {
    ${Heading6} {
      margin-bottom: ${margins.small4};
    }
  }
  ${TimerRow} {
    padding-top: ${margins.medium0};
  }
`;

export const TextResultWrapper = styled.section``;

export const ProceedWithActionWrapper = styled.section``;
