import styled from "@emotion/styled";

import { Heading4 } from "../../components";
import { PrimaryButtonWrapper } from "../../components/buttons/styles";
import { margins, zIndex } from "../../design";

export const NewGameContainer = styled.div``;

export const PlayersDiceContainer = styled.div`
  display: flex;
  padding: 0px;
  margin-top: ${margins.medium0};
`;

export const FieldContainer = styled.div`
  margin-top: ${margins.medium0};
`;

export const BottomContainer = styled.div`
  margin-top: ${margins.small3};
  padding-left: ${margins.large0};
  padding-right: ${margins.large0};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: ${margins.large0};
  margin-bottom: ${margins.large2};

  width: 100%;
`;

export const NewGameConfirmationContainer = styled.div`
  margin-left: ${margins.large0};
  margin-top: ${margins.large0};
  margin-bottom: ${margins.large0};
  ${Heading4} {
    margin-top: ${margins.medium1};
    margin-bottom: ${margins.medium1};
    width: 49vw;
  }
  position: relative;
  z-index: ${zIndex.normal};
`;

export const GoToLobbyButton = styled.div`
  ${PrimaryButtonWrapper} {
    z-index: ${zIndex.normal};
    position: relative;
  }
`;

export const CopyLink = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${margins.small4};
  align-items: flex-end;
`;
