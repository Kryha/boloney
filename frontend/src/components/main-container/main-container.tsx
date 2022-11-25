import { FC, ReactNode } from "react";
import { useViewport } from "../../hooks/use-viewport";
import { useStore } from "../../store";
import { OverlayWrapper } from "../overlay-wrapper";
import { MainWrap, MainPageContainer } from "./styles";

interface MainContainerProps {
  children: ReactNode;
}

export const MainContainer: FC<MainContainerProps> = ({ children }) => {
  const { height } = useViewport();
  const isOverlayVisible = useStore((state) => state.isOverlayVisible);

  return (
    <>
      {isOverlayVisible && <OverlayWrapper />}
      <MainWrap height={height} isOverlayVisible={isOverlayVisible}>
        <MainPageContainer>{children}</MainPageContainer>
      </MainWrap>
    </>
  );
};
