import styled from "@emotion/styled";

import { BaseRow } from "../../atoms";
import { InputContainer } from "../../components";
import { SMALL_VIEWPORT_WIDTH } from "../../constants";
import { margins, spacing } from "../../design";
import { LinkContainer, PrimaryButtonContainer } from "../../molecules";
import { ViewProps } from "../../types";

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px;
  margin-top: ${margins.medium0};
  width: 62.5vw;
  ${InputContainer} {
    margin-top: ${margins.small5};
  }
`;

export const SignOrJoinContainer = styled.div<ViewProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  margin-top: ${(props) => (props.height < SMALL_VIEWPORT_WIDTH ? "30px" : margins.large0)};
  ${PrimaryButtonContainer} {
    margin-left: ${margins.small3};
  }
  ${LinkContainer} {
    margin-left: ${margins.small0};
  }
`;

export const WalletAuthContainer = styled.div``;

export const PillsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  height: ${spacing.xxl};
  margin-left: ${margins.medium1};
`;

export const InstructionsWrapper = styled(BaseRow)`
  margin-top: ${spacing.s};
  padding-right: ${spacing.s};
`;
