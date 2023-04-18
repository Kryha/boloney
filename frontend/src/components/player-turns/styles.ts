import styled from "@emotion/styled";

import { margins } from "../../design";
import { ButtonWithHelperWrapper } from "../button-with-helper/styles";
import { BottomButtonWrapper, Heading6 } from "../../atoms";
import { TimerRow } from "../timer";

export const ActivePlayerWrapper = styled.section``;

export const ActivePlayerContainer = styled.section`
  margin-top: ${margins.large0};
  ${ButtonWithHelperWrapper} {
    margin-left: -${margins.large0};
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
