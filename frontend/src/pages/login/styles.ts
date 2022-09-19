import styled from "@emotion/styled";
import { Heading4 } from "../../components";
import { LinkContainer, PrimaryButtonContainer } from "../../components/buttons/styles";
import { SMALL_VIEWPORT_WIDTH } from "../../constants";
import { color, margins } from "../../design";
import { ViewProps } from "../../interfaces";

export const InformationContainer = styled.div`
  margin-top: ${margins.large0};
  margin-left: ${margins.small3};
  ${Heading4} {
    margin-bottom: 55px;
    margin-top: 50px;
    max-width: 45.27vw;
  }
`;

interface AuthProps {
  width: number;
}

export const AuthContainer = styled.div<AuthProps>`
  display: flex;
  flex-direction: row;
  padding: 0px;
  margin-top: ${margins.medium0};
`;

export const SignOrJoinContainer = styled.div<ViewProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  margin-top: ${(props) => (props.height < SMALL_VIEWPORT_WIDTH) ? "-10px" : margins.large0};
  ${PrimaryButtonContainer} {
    margin-left: ${margins.small3};
  }
  ${LinkContainer} {
    margin-left: ${margins.small0};
  }
`;

export const LoginFormContainer = styled.div``;

export const LogoContainer = styled.div`
  margin-left: 23px;
  margin-top: 17px;
`;

export const MenuContainer = styled.div`
  background: ${color.lightGrey};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${margins.medium0};
`;
