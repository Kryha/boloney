import { MatchLoopParams } from "../types";

export const resetRound = ({ state }: MatchLoopParams) => {
  // TODO: maybe reset other fields as well
  state.bids = {};
  Object.values(state.players).forEach((player) => {
    state.players[player.userId].hasRolledDice = false;
    state.players[player.userId].diceValue = [];
  });
};
