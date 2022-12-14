import { useViewport } from "../../hooks/use-viewport";
import { Hand } from "../hand";
import { NewMatchHandsContainer, NewMatchHandsWrapper } from "./styles";

export const NewMatchHands = () => {
  const { width, height } = useViewport();

  return (
    <NewMatchHandsContainer>
      <NewMatchHandsWrapper width={width} height={height}>
        <Hand avatarName="plastic" isInLobby />
        <Hand avatarName="hook" isInLobby />
        <Hand avatarName="scooper" isInLobby />
        <Hand avatarName="hand" isInLobby />
        <Hand avatarName="skeleton" isInLobby />
        <Hand avatarName="sausage" isInLobby />
        <Hand avatarName="lobster" isInLobby />
      </NewMatchHandsWrapper>
    </NewMatchHandsContainer>
  );
};
