import { FC, ReactNode } from "react";
import { text } from "../../assets";
import { useViewport } from "../../hooks/use-viewport";
import { PrimaryButton } from "../buttons";
import { Chat } from "../chat";
import {
  ChildrenWrapper,
  HorizontalLine,
  WaitForOthersContainer,
  WaitingText,
  LineWrapper,
  HorizontalContainer,
  NameContainer,
  LineWrap,
  NameWrapper,
  AppName,
  WaitingWrapper,
  HorizontalLineContainerTwo,
} from "./styles";

interface LineContainerProps {
  children: ReactNode;
  playersReady?: boolean;
  onClick?: () => void;
}

export const LineContainer: FC<LineContainerProps> = ({ children, playersReady, onClick }) => {
  const { width, height } = useViewport();

  return (
    <LineWrapper>
      <LineWrap>
        <HorizontalLineContainerTwo height={height} width={width}>
          <HorizontalLine />
          <HorizontalLine />
        </HorizontalLineContainerTwo>
        <ChildrenWrapper height={height} width={width}>
          {children}
        </ChildrenWrapper>
      </LineWrap>
      <WaitingWrapper>
        <HorizontalContainer height={height} width={width}>
          <HorizontalLine />
          <WaitForOthersContainer playersReady={playersReady}>
            {playersReady ? (
              <PrimaryButton text={text.general.startGame} onClick={onClick && onClick} />
            ) : (
              <WaitingText>{text.general.waitingForTheOthersToJoin}</WaitingText>
            )}
          </WaitForOthersContainer>
        </HorizontalContainer>
        <NameWrapper>
          <NameContainer>
            <AppName />
          </NameContainer>
          <Chat />
        </NameWrapper>
      </WaitingWrapper>
    </LineWrapper>
  );
};
