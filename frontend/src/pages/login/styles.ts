import styled from "@emotion/styled";
import { Heading4 } from "../../components";
import { LinkContainer, PrimaryButtonContainer } from "../../components/buttons/styles";
import { color } from "../../design";
import { ViewProps } from "../../interfaces";

export const InformationContainer = styled.div`
  margin-top: 40px;
  margin-left: 20px;
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
  margin-top: 30px;
`;

export const SignInLink = styled.a`
  font-family: ibm-plex-mono;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.01em;
  text-decoration-line: underline;
  color: ${color.black};
  margin-left: 8px;
  cursor: pointer;
`;


export const SignOrJoinContainer = styled.div<ViewProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  margin-top: ${(props) => (props.height < 670) ? "-10px" : "40px"};
  ${PrimaryButtonContainer} {
    margin-left: 20px;
  }
  ${LinkContainer} {
  margin-left: 8px;
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
  gap: 30px;
`;
