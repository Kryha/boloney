import styled from "@emotion/styled";

import { LinkContainer, PrimaryButtonContainer } from "../../components/buttons/styles";
import { InputContainer } from "../../components/inputs/styles";
import { SMALL_VIEWPORT_WIDTH } from "../../constants";
import { color, margins } from "../../design";
import { ViewProps } from "../../interfaces";

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px;
  margin-top: ${margins.medium0};
  width: 62.5vw;
  ${InputContainer} {
    margin-top: ${margins.small5};
  }
  ${InputContainer}:nth-of-type(1) {
    border-right: 1px solid ${color.mediumGrey};
  }
`;

export const SignOrJoinContainer = styled.div<ViewProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  margin-top: ${(props) => (props.height < SMALL_VIEWPORT_WIDTH ? "-10px" : margins.large0)};
  ${PrimaryButtonContainer} {
    margin-left: ${margins.small3};
  }
  ${LinkContainer} {
    margin-left: ${margins.small0};
  }
`;

export const LoginFormContainer = styled.div``;

export const MenuContainer = styled.div`
  background: ${color.lightGrey};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px;
`;
