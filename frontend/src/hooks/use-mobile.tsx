import { useViewport } from "./use-viewport";
import { DESKTOP_BREAKPOINT } from "../design";

export const useIsMobile = () => {
  const { width } = useViewport();

  return width < DESKTOP_BREAKPOINT;
};
