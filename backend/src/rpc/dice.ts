import { z } from "zod";

import { range, logError } from "../utils";

export const rollSchema = z.object({
  diceAmount: z.number().min(1).max(5),
});

export const rollDice: nkruntime.RpcFunction = (ctx, logger, nk, payload) => {
  try {
    const { diceAmount } = rollSchema.parse(JSON.parse(payload));

    // check if user is allowed to roll

    // call toolkit
    // store generated keys

    // update game state

    // TODO: make the call to toolkit for number generation
    const values = range(diceAmount, 1).map(() => Math.floor(Math.random() * 6) + 1);

    return JSON.stringify({ values });
  } catch (error) {
    throw logError(error, logger);
  }
};
