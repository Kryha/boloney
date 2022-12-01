import { FC, ReactNode } from "react";
import { useStore } from "../../store";
import { ActivePlayerViewWrapper } from "./styles";

interface ActivePlayerViewProps {
  children: ReactNode;
}

export const ActivePlayerView: FC<ActivePlayerViewProps> = ({ children }) => {
  // TODO: check that state if page renders after refresh
  const turnActionStep = useStore((state) => state.turnActionStep);
  return <ActivePlayerViewWrapper isPickAction={turnActionStep === "pickAction"}>{children}</ActivePlayerViewWrapper>;
};
