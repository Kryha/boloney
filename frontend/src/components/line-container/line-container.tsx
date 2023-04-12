import { FC, ReactNode } from "react";
import { BoloneyLogoIconSVG, text } from "../../assets";
import { color, iconSize } from "../../design";
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
  WaitingWrapper,
  HorizontalLineContainerTwo,
  AppNameIcon,
} from "./styles";

interface LineContainerProps {
  children: ReactNode;
  isPlayerReady?: boolean;
  onClick?: () => void;
}

export const LineContainer: FC<LineContainerProps> = ({ children, isPlayerReady, onClick }) => {
  const { width, height } = useViewport();

  return (
    <LineWrapper>
      <LineWrap>
        <HorizontalLineContainerTwo height={height} width={width}>
          <HorizontalLine />
          <HorizontalLine />
        </HorizontalLineContainerTwo>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </LineWrap>
      <WaitingWrapper>
        <HorizontalContainer height={height} width={width}>
          <HorizontalLine />
          <WaitForOthersContainer isPlayerReady={isPlayerReady}>
            {isPlayerReady ? (
              <WaitingText>{text.general.waitingForTheOthersToBeReady}</WaitingText>
            ) : (
              <PrimaryButton primaryText={text.general.imReady} onClick={onClick && onClick} />
            )}
          </WaitForOthersContainer>
        </HorizontalContainer>
        <NameWrapper>
          <NameContainer>
            <AppNameIcon src={<BoloneyLogoIconSVG />} iconColor={color.peach} width={iconSize.xxl} height={iconSize.auto} />
          </NameContainer>
          <Chat isInLobby />
        </NameWrapper>
      </WaitingWrapper>
    </LineWrapper>
  );
};
