import { FC, ReactNode } from "react";

import { useViewport } from "../../hooks/use-viewport";
import { OverlayWrapper } from "../overlay-wrapper";
import { MainWrap, MainPageContainer } from "./styles";

interface MainContainerProps {
  children: ReactNode;
}

export const MainContainer: FC<MainContainerProps> = ({ children }) => {
  const { height } = useViewport();
  return (
    <>
      <MainWrap height={height}>
        <MainPageContainer>{children}</MainPageContainer>
      </MainWrap>
      <OverlayWrapper />
    </>
  );
};
