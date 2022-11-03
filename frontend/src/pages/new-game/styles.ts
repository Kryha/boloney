import styled from "@emotion/styled";
import { LightningIcon } from "../../assets";

import { BaseInput, GeneralText, Heading4, Heading6 } from "../../components";
import { PrimaryButtonWrapper, ButtonContainer as ButtonWrapper } from "../../components/buttons/styles";
import { DescriptionContainer, CheckboxContainer as CheckboxWrapper } from "../../components/checkbox/styles";
import { InputContainer } from "../../components/inputs/styles";
import { color, fontWeight, margins, zIndex } from "../../design";

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

export const CheckboxContainer = styled.section`
  overflow: auto;
  ${CheckboxWrapper}:nth-of-type(1) {
    ${DescriptionContainer} {
      padding-top: ${margins.small5};
    }
  }
`;

export const InputFieldContainer = styled(FieldContainer)`
  display: flex;
  flex-direction: column;
  gap: ${margins.large2};
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

export const InfoBox = styled.div`
  border-top: 1px solid ${color.mediumGrey};
  width: 100%;
  ${GeneralText} {
    margin: ${margins.small3} ${margins.large0} ${margins.small5} ${margins.large0};
  }
  ${ButtonWrapper} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-content: center;
    align-items: center;
  }
`;

export const PercentageInput = styled(BaseInput)`
  width: 80px;
  height: 40px;
  border: 1px solid ${color.mediumGrey};
  margin-top: ${margins.small6};
  margin-right: ${margins.small6};
  margin-left: ${margins.small6};
`;

export const TotalContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding: ${margins.small5} ${margins.small5} ${margins.small5} ${margins.small2};
  gap: ${margins.small5};
  border-top: 1px solid ${color.mediumGrey};
  position: sticky;
  bottom: 0;
  background-color: ${color.lightGrey};
`;

export const LightningNewGame = styled(LightningIcon)`
  margin-top: 3px;
`;

export const LightningContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: ${margins.small0};
  ${Heading6} {
    text-transform: uppercase;
  }
`;

interface PercentProps {
  isError?: boolean;
}

export const Percentage = styled(GeneralText)<PercentProps>`
  font-weight: ${fontWeight.bolder};
  color: ${({ isError }) => (isError ? color.red : color.black)};
`;

export const PercentageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${GeneralText} {
    display: inline;
  }
`;
