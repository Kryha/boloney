import styled from "@emotion/styled";

import { Heading4 } from "../../components";
import { PrimaryButtonWrapper } from "../../components/buttons/styles";
import { DescriptionContainer, CheckboxContainer as CheckboxWrapper, CheckContainer } from "../../components/checkbox/styles";
import { InputContainer } from "../../components/inputs/styles";
import { color, margins, zIndex } from "../../design";

export const NewGameContainer = styled.section``;

export const PlayersDiceContainer = styled.section`
  display: flex;
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

export const FieldContainer = styled.section`
  margin-top: ${margins.medium1};
`;

export const PowerUpsAmountFieldContainer = styled.section`
  margin-top: ${margins.medium1};
`;

export const CheckboxContainer = styled.section`
  ${CheckboxWrapper}:nth-of-type(1) {
    ${DescriptionContainer} {
      padding-top: ${margins.small5};
    }
  }
`;

export const ToggleContainer = styled(FieldContainer)`
  ${CheckContainer}{
    align-items: flex-start;
    padding: ${margins.small4} ${margins.small2} ${margins.small2} ${margins.small2};
    justify-content: flex-start;
  }
`;

export const BottomContainer = styled.section`
  margin-top: ${margins.small3};
  padding-left: ${margins.large0};
  padding-right: ${margins.large0};
`;

export const ButtonContainer = styled.section`
  display: flex;
  justify-content: flex-end;

  margin-top: ${margins.large0};
  margin-bottom: ${margins.large2};

  width: 100%;
`;

export const NewGameConfirmationContainer = styled.section`
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
