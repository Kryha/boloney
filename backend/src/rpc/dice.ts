// import { z } from "zod";

import { MAX_DICE_PER_PLAYER, MIN_DICE_PER_PLAYER, range, rpcHandler } from "../utils";

// export const rollSchema = z.object({
//   diceAmount: z.number().min(MIN_DICE_PER_PLAYER).max(MAX_DICE_PER_PLAYER),
// });

// TODO: define predicate and parser
interface RollPayload {
  diceAmount: number;
}

export const rollDice = rpcHandler((_ctx, _logger, _nk, payload) => {
  // TODO: implement wanted behaviour for this function
  // - check if user is allowed to roll
  // - check if diceAmount respects the game settings
  // - call toolkit
  // - store generated proofs
  // - update game state

  // TODO: parse properly
  const { diceAmount }: RollPayload = JSON.parse(payload);

  // TODO: make the call to toolkit for number generation
  const values = range(diceAmount, 1).map(() => Math.floor(Math.random() * 6) + 1);

  return JSON.stringify({ values });
});
