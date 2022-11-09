import { FC, ReactNode } from "react";

import { Die, Player, PowerUp } from "../../types";
import { GamePlayersOverview } from "../game-players-overview";
import { HUD } from "../hud";
import { ContentContainer, MainContentContainer } from "./styles";
import { TopNavigation } from "../top-navigation";
import { OverlayWrapper } from "../overlay-wrapper";
import { useStore } from "../../store";

interface GameLayoutProps {
  players: Player[];
  dice?: Die[];
  children?: ReactNode;
  powerUps?: PowerUp[];
  localPlayer: Player;
}

export const GameLayout: FC<GameLayoutProps> = ({ players, dice, children, powerUps, localPlayer }) => {
  const setIsModalVisible = useStore((state) => state.setIsModalVisible);
  const setIsOverlayVisible = useStore((state) => state.setIsOverlayVisible);
  const setIsOverviewVisible = useStore((state) => state.setIsOverviewVisible);

  const handleClose = () => {
    setIsOverlayVisible(false);
    setIsModalVisible(false);
    setIsOverviewVisible(true);
  };

  const remotePlayers: Player[] = players.filter((player) => player.userId !== localPlayer.userId);

  return (
    <>
      <TopNavigation isInMatch />
      <GamePlayersOverview players={remotePlayers} />
      <HUD dice={dice} powerUp={powerUps} localPlayer={localPlayer} />
      <MainContentContainer>
        <ContentContainer>{children}</ContentContainer>
      </MainContentContainer>
      <OverlayWrapper handleClickOutside={() => handleClose()} />
    </>
  );
};
