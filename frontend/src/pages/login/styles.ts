import styled from "@emotion/styled";
import { BaseInput, Heading4 } from "../../components";
import { PrimaryButtonContainer } from "../../components/buttons/styles";
import { color } from "../../design";

export const InformationContainer = styled.div`
  margin-top: 40px;
  margin-left: 20px;
  ${Heading4} {
    margin-bottom: 55px;
    margin-top: 50px;
    max-width: 45.27vw;
  }
`;

export const PasswordInput = styled(BaseInput)`
  // border-right: none;
`;

export const EmailInput = styled(BaseInput)`
  // border-left: none;
  // border-right: none;
`;

interface AuthProps {
  width: number;
}

export const AuthContainer = styled.div<AuthProps>`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0px;
  // width: ${({ width }): string => `${width}px`};
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

export const SignOrJoinContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  margin-top: 40px;
  ${PrimaryButtonContainer} {
    margin-left: 20px;
  }
`;
