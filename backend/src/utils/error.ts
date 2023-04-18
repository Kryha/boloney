import { HttpError, MatchOpCode, StatusCodes } from "../types";

export const httpError = (httpCode: StatusCodes, message: string, opCode?: MatchOpCode): HttpError => {
  return { httpCode, message, opCode };
};
