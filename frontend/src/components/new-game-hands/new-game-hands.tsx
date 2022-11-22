import { useViewport } from "../../hooks/use-viewport";
import { Hand } from "../hand";
import { NewGameHandsWrapper } from "./styles";

export const NewGameHands = () => {
  const { width, height } = useViewport();

  return (
    <NewGameHandsWrapper width={width} height={height}>
      <Hand avatarName="plastic" isInLobby />
      <Hand avatarName="hook" isInLobby />
      <Hand avatarName="scooper" isInLobby />
      <Hand avatarName="hand" isInLobby />
      <Hand avatarName="skeleton" isInLobby />
      <Hand avatarName="sausage" isInLobby />
      <Hand avatarName="lobster" isInLobby />
    </NewGameHandsWrapper>
  );
};
