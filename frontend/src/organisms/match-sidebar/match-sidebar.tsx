import { FC } from "react";

import { images, layoutWidth } from "../../design";
import { sidebarAvatarHeights } from "../../design/avatar";
import { BidWithUserId, PlayerPublic } from "../../types";
import { SideBarPlayer } from "../sidebar-player";
import { MatchSideBarWrapper } from "./styles";

interface Props {
  players: PlayerPublic[];
  isHovered?: boolean;
  active: boolean;
  lastBid?: BidWithUserId;
  isShuffling?: boolean;
  isEndOfMatch?: boolean;
  areDeadPlayers?: boolean[];
  setActive: (active: boolean) => void;
}

/**
 *
 * This is the component for displaying players in the match sidebar.
 * @param {PlayerPublic} players - This is an array of the players in the sidebar
 * @param {boolean} isHovered - If a player is hovered in the sidebar
 * @param {boolean} active - If the tooltip is showing, for revealed power ups.
 * @param {BidWithUserId} lastBid - The last bid tabled.
 * @param {boolean} isShuffling - When true this will shuffle the player order start the animation for changing the player order.
 * @param {boolean} isEndOfMatch - A boolean to indicate if it is the end of the match
 * @param {boolean} areDeadPlayers -  An array of booleans indicating if the players are no longer playing.
 * @param {Function} setActive - A function used to set if the tooltip is active.
 */

export const MatchSideBar: FC<Props> = ({
  players,
  isHovered,
  active,
  setActive,
  lastBid,
  isShuffling = false,
  isEndOfMatch,
  areDeadPlayers,
}) => {
  const totalPlayers = players.length;
  const amountOfSidebarPlayers = totalPlayers - 1;

  return (
    <MatchSideBarWrapper
      isShuffling={isShuffling}
      isOnePlayer={players.length === 1}
      isEndOfMatch={isEndOfMatch}
      areDeadPlayers={areDeadPlayers}
    >
      {players.map((player) => (
        <SideBarPlayer
          key={player.userId}
          player={player}
          height={sidebarAvatarHeights[amountOfSidebarPlayers]}
          width={images.auto}
          maxWidth={layoutWidth.sm}
          amountOfSidebarPlayers={totalPlayers}
          isHovered={isHovered}
          isLastBid={!!lastBid && player.userId === lastBid.userId}
          lastBid={lastBid}
          active={active}
          isPowerUpDisabled={player.arePowerUpsDisabled}
          setActive={setActive}
        />
      ))}
    </MatchSideBarWrapper>
  );
};
