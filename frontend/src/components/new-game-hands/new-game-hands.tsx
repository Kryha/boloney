import { useViewport } from "../../hooks/use-viewport";
import { Hand } from "../hand";
import { NewGameHandsWrapper } from "./styles";

export const NewGameHands = () => {
  const { width, height } = useViewport();

  return (
    <NewGameHandsWrapper width={width} height={height}>
      <Hand avatarName="plastic" />
      <Hand avatarName="hook" />
      <Hand avatarName="scooper" />
      <Hand avatarName="hand" />
      <Hand avatarName="skeleton" />
      <Hand avatarName="toy" />
      <Hand avatarName="lobster" />
    </NewGameHandsWrapper>
  );
};
