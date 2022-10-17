import { text } from "../text";
import { handleError, MAX_DICE_PER_PLAYER, MIN_DICE_PER_PLAYER, range, rpcHandler } from "../utils";

interface RollPayload {
  diceAmount: number;
}

const isRollPayload = (value: unknown): value is RollPayload => {
  const assertedVal = value as RollPayload;

  return (
    assertedVal.diceAmount !== undefined &&
    typeof assertedVal.diceAmount === "number" &&
    assertedVal.diceAmount >= MIN_DICE_PER_PLAYER &&
    assertedVal.diceAmount <= MAX_DICE_PER_PLAYER
  );
};

export const rollDice = rpcHandler((_ctx, logger, _nk, payload) => {
  // TODO: implement wanted behaviour for this function
  // - check if user is allowed to roll
  // - check if diceAmount respects the game settings
  // - call toolkit
  // - store generated proofs
  // - update game state

  const parsed = JSON.parse(payload);

  if (!isRollPayload(parsed)) throw handleError(text.error.invalidPayload, logger, nkruntime.Codes.INVALID_ARGUMENT);

  // TODO: make the call to toolkit for number generation
  const values = range(parsed.diceAmount, 1).map(() => Math.floor(Math.random() * 6) + 1);

  return JSON.stringify({ values });
});
