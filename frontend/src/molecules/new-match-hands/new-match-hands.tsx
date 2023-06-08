import { avatarHeight, sidebarAvatarHeights, spacing } from "../../design";
import { FloatingPlayer } from "../floating-player";

import { NewMatchHandsContainer, NewMatchHandsWrapper } from "./styles";

export const NewMatchHands = () => {
  return (
    <NewMatchHandsContainer>
      <NewMatchHandsWrapper gap={spacing.ms}>
        <FloatingPlayer avatarName="plastic" containerHeight={avatarHeight.lg} height={sidebarAvatarHeights[1]} width="auto" />
        <FloatingPlayer avatarName="hook" containerHeight={avatarHeight.lg} height={sidebarAvatarHeights[1]} width="auto" />
        <FloatingPlayer avatarName="scooper" containerHeight={avatarHeight.lg} height={sidebarAvatarHeights[1]} width="auto" />
        <FloatingPlayer avatarName="hand" containerHeight={avatarHeight.lg} height={sidebarAvatarHeights[1]} width="auto" />
        <FloatingPlayer avatarName="skeleton" containerHeight={avatarHeight.lg} height={sidebarAvatarHeights[1]} width="auto" />
        <FloatingPlayer avatarName="sausage" containerHeight={avatarHeight.lg} height={sidebarAvatarHeights[1]} width="auto" />
        <FloatingPlayer avatarName="lobster" containerHeight={avatarHeight.lg} height={sidebarAvatarHeights[1]} width="auto" />
      </NewMatchHandsWrapper>
    </NewMatchHandsContainer>
  );
};
