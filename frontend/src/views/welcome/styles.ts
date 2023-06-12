import styled from "@emotion/styled";

import { SMALL_VIEWPORT_WIDTH } from "../../constants";
import { margins } from "../../design";
import { PrimaryButtonContainer } from "../../molecules";
import { ViewProps } from "../../types";

export const WelcomeContainer = styled.div`
  width: 100%;
`;

export const ButtonContainer = styled.div<ViewProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  margin-top: ${(props) => (props.height < SMALL_VIEWPORT_WIDTH ? "30px" : margins.large3)};
  ${PrimaryButtonContainer} {
    margin-left: ${margins.small3};
  }
`;
