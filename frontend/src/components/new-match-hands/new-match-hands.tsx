import { useViewport } from "../../hooks/use-viewport";
import { Hand } from "../hand";
import { NewMatchHandsContainer, NewMatchHandsWrapper } from "./styles";

export const NewMatchHands = () => {
  const { width, height } = useViewport();

  return (
    <NewMatchHandsContainer>
      <NewMatchHandsWrapper width={width} height={height}>
        <Hand avatarName="plastic" />
        <Hand avatarName="hook" />
        <Hand avatarName="scooper" />
        <Hand avatarName="hand" />
        <Hand avatarName="skeleton" />
        <Hand avatarName="sausage" />
        <Hand avatarName="lobster" />
      </NewMatchHandsWrapper>
    </NewMatchHandsContainer>
  );
};
