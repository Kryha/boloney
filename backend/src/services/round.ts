import { MatchLoopParams } from "../types";

export const resetRound = ({ state }: MatchLoopParams) => {
  state.bids = {};

  Object.values(state.players).forEach((player) => {
    const playerRef = state.players[player.userId];

    playerRef.hasRolledDice = false;
    playerRef.diceValue = [];
    playerRef.actionRole = undefined;
    playerRef.isTarget = false;
  });
};
