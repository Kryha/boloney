import { FC, ReactNode, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { useUIState } from "../../store/ui";
import { OverlayWrapperSection } from "./styles";

interface OverlayWrapperProps {
  handleClickOutside: () => void;
  children: ReactNode;
}

export const OverlayWrapper: FC<OverlayWrapperProps> = ({ handleClickOutside, children }) => {
  const ref = useRef(null);
  const setIsOverlayVisible = useUIState((state) => state.setIsOverlayVisible);

  useOnClickOutside(ref, () => {
    setIsOverlayVisible(false);
    handleClickOutside();
  });

  return <OverlayWrapperSection ref={ref}>{children}</OverlayWrapperSection>;
};
