import { FC, ReactNode, useRef } from "react";

import useOnClickOutside from "../../hooks/use-overlay";
import { useUIState } from "../../store/ui";

interface OverlayWrapperProps {
  handleClickOutside?: () => void;
  children: ReactNode;
}

export const OverlayWrapper: FC<OverlayWrapperProps> = ({ handleClickOutside, children }) => {
  const ref = useRef(null);
  const setIsOverlayVisible = useUIState((state) => state.setIsOverlayVisible);

  useOnClickOutside(ref, () => {
    setIsOverlayVisible(false);
    handleClickOutside && handleClickOutside();
  });

  return <div ref={ref}>{children}</div>;
};
