import { MAX_TOOLKIT_REQUESTS_ATTEMPTS } from "../constants";
import { MatchLoopParams, MatchOpCode, ErrorPayloadBackend, isInternalServerError, isErrorStatusCode } from "../types";
import { httpRequest } from "../utils";

export const handleToolkitRequest = (
  url: string,
  method: nkruntime.RequestMethod,
  body: unknown,
  nk: nkruntime.Nakama,
  logger: nkruntime.Logger
): nkruntime.HttpResponse => {
  let response,
    parsedBody,
    attemptNumber = 0;

  do {
    response = httpRequest(nk, url, method, body);
    attemptNumber++;
    parsedBody = JSON.parse(response.body);

    if (isErrorStatusCode(response.code)) logger.error("Toolkit request attempt", attemptNumber, parsedBody.code);
  } while (isInternalServerError(response.code) && attemptNumber < MAX_TOOLKIT_REQUESTS_ATTEMPTS);

  return response;
};

export const broadcastErrorMessage = (loopParams: MatchLoopParams, errorPayload: ErrorPayloadBackend) => {
  const { dispatcher, logger } = loopParams;

  logger.info("Broadcasting error message", errorPayload.message);
  dispatcher.broadcastMessage(MatchOpCode.ERROR, JSON.stringify(errorPayload));
};
