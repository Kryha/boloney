import styled from "@emotion/styled";
import { ExitIcon, TimerIcon } from "../../assets/icons";
import { color, margins } from "../../design";

export const ControlContainer = styled.div`
  display: flex;
  align-items: flex-end;
  height: 5.105vh;
  width: 100%;
  justify-content: flex-end;
`;

export const Divider = styled.div`
  height: 100%;
  width: 1px;
  background: ${color.black};
`;

export const Timer = styled(TimerIcon)`
  margin-top: 2px;
`;

export const CountdownTimer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px ${margins.medium0} 0px ${margins.medium0};
  gap: ${margins.small1};
  height: 100%;
`;

export const Exit = styled(ExitIcon)`
  margin-top: 2px;
`;

export const ExitButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px ${margins.medium0} 0px ${margins.medium0};
  gap: ${margins.small1};
  height: 100%;
`;
