import { MAX_DIE_FACE, MIN_DIE_FACE } from "../utils";
import { isNumber } from "./primitive";

export interface Bid extends BidPayloadFrontend {
  createdAt: number; // unix timestamp
}

// payload that is sent by the frontend when placing a bid
export interface BidPayloadFrontend {
  face: number;
  amount: number;
}

export const isBidPayloadFrontend = (value: unknown): value is BidPayloadFrontend => {
  const assertedVal = value as BidPayloadFrontend;

  const fieldsAreDefined = assertedVal.face !== undefined && assertedVal.amount !== undefined;
  if (!fieldsAreDefined) return false;

  const fieldsAreCorrectType = isNumber(assertedVal.face) && isNumber(assertedVal.amount);
  if (!fieldsAreCorrectType) return false;

  const faceIsCorrect = assertedVal.face >= MIN_DIE_FACE && assertedVal.face <= MAX_DIE_FACE;
  const amountIsCorrect = assertedVal.amount > 0;

  return faceIsCorrect && amountIsCorrect;
};

// payload that is dispatched to the clients after bid gets processed
export type BidPayloadBackend = Record<string, Bid>;

export interface BidWithUserId extends Bid {
  userId: string;
}
