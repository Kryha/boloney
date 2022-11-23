import { FC, useRef } from "react";
import { useStore } from "../../store";
import { SausageSpinner } from "../spinner";
import { OverlayWrapperSection, SpinnerWrapper } from "./styles";

export const OverlaySpinner: FC = () => {
  const ref = useRef(null);
  const isLoadingSpinnerVisible = useStore((state) => state.isLoadingSpinnerVisible);

  return (
    <OverlayWrapperSection ref={ref}>
      {isLoadingSpinnerVisible && (
        <SpinnerWrapper>
          <SausageSpinner />
        </SpinnerWrapper>
      )}
    </OverlayWrapperSection>
  );
};
