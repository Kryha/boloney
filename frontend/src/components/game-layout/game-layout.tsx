import { FC, ReactNode } from "react";

import { GamePlayersOverview } from "../game-players-overview";
import { HUD } from "../hud";
import { ContentContainer, MainContentContainer } from "./styles";
import { TopNavigation } from "../top-navigation";
import { OverlayWrapper } from "../overlay-wrapper";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";

interface GameLayoutProps {
  children?: ReactNode;
}

export const localPlayer = {
  hasRolledDice: false,
  userId: "1",
  username: "history",
  avatarId: 7,
  diceAmount: 1,
  powerUpsAmount: 1,
  isConnected: true,
  isReady: false,
  hasInitialPowerUps: true,
};

export const dice = [
  { rolledValue: 6 },
  { rolledValue: 5 },
  { rolledValue: 4 },
  { rolledValue: 3 },
  { rolledValue: 2 },
  { rolledValue: 1 },
];

export const GameLayout: FC<GameLayoutProps> = ({ children }) => {
  // const dice = useStore((state) => state.diceValue);
  // const remotePlayers = useStore((state) => state.getRemotePlayers());
  // const localPlayer = useStore((state) => state.getLocalPlayer());
  // const powerUpIds = useStore((state) => state.powerUpIds);

  // if (!localPlayer || !remotePlayers) return <ErrorView />;

  return (
    <>
      <TopNavigation isInMatch />
      <GamePlayersOverview players={[localPlayer]} />
      <HUD dice={dice} powerUpIds={["1", "2"]} player={localPlayer} />
      <MainContentContainer>
        <ContentContainer>{children}</ContentContainer>
      </MainContentContainer>
      <OverlayWrapper />
    </>
  );
};
