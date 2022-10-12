import styled from "@emotion/styled";
import { TrophyIcon } from "../../assets";

import { GeneralText, Heading4, Heading6, Row } from "../../components";
import { PrimaryButtonWrapper, ButtonContainer as ButtonWrapper } from "../../components/buttons/styles";
import { DescriptionContainer, CheckboxContainer as CheckboxWrapper, CheckContainer, CheckWrapper } from "../../components/checkbox/styles";
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

export const PowerupsAmountFieldContainer = styled.section`
  margin-top: ${margins.medium1};
`;

export const CheckboxContainer = styled.section`
  width: 62.5vw;
  // ${Row} {
  //   border-top: 1px solid ${color.mediumGrey};
  //   border-bottom: 1px solid ${color.mediumGrey};
  // }
  ${CheckboxWrapper}:nth-of-type(1) {
    ${DescriptionContainer} {
      padding-top: ${margins.small5};
    }
  }
`;

export const ToggleContainer = styled(FieldContainer)`
  ${CheckWrapper}{
    align-items: flex-start;
    padding: ${margins.small4} ${margins.small2} ${margins.small2} ${margins.small6};
    justify-content: flex-start;
  }
  ${CheckContainer}{
   border: none;
   width: 60px;
  }
  border-bottom: 1px solid ${color.mediumGrey};
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

export const TotalContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding: ${margins.small5} ${margins.small5} ${margins.small5} ${margins.small2};
  gap: ${margins.small5};
  border-top: 1px solid ${color.mediumGrey};
  width: 100%;
  margin-bottom: ${margins.large0};
`;

export const TrophyNewGame = styled(TrophyIcon)`
  margin-top: 3px;
`;

export const TrophyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: ${margins.small0};
  ${Heading6} {
    text-transform: uppercase;
  }
`;

export const Percentage = styled(GeneralText)`
  font-weight: ${fontWeight.bolder};
`;

export const PercentageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${GeneralText} {
    display: inline;
  }
`;
