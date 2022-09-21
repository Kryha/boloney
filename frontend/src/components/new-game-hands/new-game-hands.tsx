import {
  ToyHand,
  ToyHandPaint,
  PlasticHand,
  PlasticHandPaint,
  HookHand,
  HookHandPaint,
  ScooperHand,
  ScooperHandPaint,
  HandPaint,
  Hand as HandImg,
  SkeletonHand,
  LobsterHand,
  LobsterHandPaint,
  SkeletonHandPaint,
} from "../../assets";
import { useViewport } from "../../hooks/use-viewport";
import { Hand } from "../hand";
import { NewGameHandsWrapper } from "./styles";

export const NewGameHands = () => {
  const { width, height } = useViewport();

  return (
    <NewGameHandsWrapper width={width} height={height}>
      <Hand avatar={PlasticHand} paint={PlasticHandPaint} avatarName="plastic" />
      <Hand avatar={HookHand} paint={HookHandPaint} avatarName="hook" />
      <Hand avatar={ScooperHand} paint={ScooperHandPaint} avatarName="scooper" />
      <Hand avatar={HandImg} paint={HandPaint} avatarName="hand" />
      <Hand avatar={SkeletonHand} paint={SkeletonHandPaint} avatarName="skeleton" />
      <Hand avatar={ToyHand} paint={ToyHandPaint} avatarName="toy" />
      <Hand avatar={LobsterHand} paint={LobsterHandPaint} avatarName="lobster" />
    </NewGameHandsWrapper>
  );
};
