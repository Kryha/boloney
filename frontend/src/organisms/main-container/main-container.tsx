import { FC, ReactNode } from "react";
import { OverlayWrapper } from "../overlay-content";
import { MainWrap, MainPageContainer } from "./styles";

interface MainContainerProps {
  children: ReactNode;
  height: number;
  isOverlayVisible: boolean;
}

export const MainContainer: FC<MainContainerProps> = ({ children, height, isOverlayVisible }) => {
  return (
    <>
      {isOverlayVisible && <OverlayWrapper />}
      <MainWrap height={height} isOverlayVisible={isOverlayVisible}>
        <MainPageContainer>{children}</MainPageContainer>
      </MainWrap>
    </>
  );
};
