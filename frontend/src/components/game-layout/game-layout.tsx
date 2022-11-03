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
  currentPlayer: Player;
}

export const GameLayout: FC<GameLayoutProps> = ({ players, dice, children, powerUps, currentPlayer }) => {
  const setIsModalVisible = useStore((state) => state.setIsModalVisible);
  const setIsOverlayVisible = useStore((state) => state.setIsOverlayVisible);
  const setIsOverviewVisible = useStore((state) => state.setIsOverviewVisible);

  const handleClose = () => {
    setIsOverlayVisible(false);
    setIsModalVisible(false);
    setIsOverviewVisible(true);
  };

  return (
    <>
      <TopNavigation isInMatch />
      <GamePlayersOverview players={players} />
      <HUD dice={dice} powerUp={powerUps} currentPlayer={currentPlayer} />
      <MainContentContainer>
        <ContentContainer>{children}</ContentContainer>
      </MainContentContainer>
      <OverlayWrapper handleClickOutside={() => handleClose()} />
    </>
  );
};
