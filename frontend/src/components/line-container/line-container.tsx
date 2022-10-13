import { FC, ReactNode } from "react";
import { text } from "../../assets";
import {
  ChildrenWrapper,
  GameName,
  HorizontalLine,
  HorizontalLineContainer,
  HorizontalLineInitial,
  VerticalLine,
  WaitForOthersContainer,
  WaitingText,
} from "./styles";

interface LineContainerProps {
  children: ReactNode;
}

export const LineContainer: FC<LineContainerProps> = ({ children }) => {
  return (
    <LineContainer>
      <HorizontalLineContainer>
        <HorizontalLineInitial />
        <HorizontalLine />
        <HorizontalLine />
        <HorizontalLineInitial />
      </HorizontalLineContainer>
      <ChildrenWrapper>{children}</ChildrenWrapper>
      <HorizontalLineContainer>
        <HorizontalLineInitial />
        <HorizontalLine />
        <HorizontalLine />
        <WaitForOthersContainer>
          <WaitingText>{text.general.waitingForTheOthersToJoin}</WaitingText>
        </WaitForOthersContainer>
      </HorizontalLineContainer>
      <VerticalLine />
      <GameName>{text.general.appName}</GameName>
    </LineContainer>
  );
};
