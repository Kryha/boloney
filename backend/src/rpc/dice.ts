import { z } from "zod";

import { range, rpcHandler } from "../utils";

export const rollSchema = z.object({
  diceAmount: z.number().min(1).max(5),
});

export const rollDice = rpcHandler((_ctx, _logger, _nk, payload) => {
  // TODO: implement wanted behaviour for this function
  // 1. check if user is allowed to roll
  // 2. call toolkit
  // 3. store generated keys
  // 4. update game state

  const { diceAmount } = rollSchema.parse(JSON.parse(payload));

  // TODO: make the call to toolkit for number generation
  const values = range(diceAmount, 1).map(() => Math.floor(Math.random() * 6) + 1);

  return JSON.stringify({ values });
});
