import styled from "@emotion/styled";
import { color, margins } from "../../design";
import { ButtonWithHelperWrapper } from "../button-with-helper/styles";
import { Info } from "../../components/tooltip/styles";

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

export const PassivePlayerWrapper = styled.section`
  padding-top: ${margins.medium0};
`;
