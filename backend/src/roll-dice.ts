interface DiceThrowPayload {
  diceAmount: number;
}
interface DiceThrowResponse {
  rollResult: number[];
}

// TODO: Update this url to our own
const apiBaseUrl = "http://www.randomnumberapi.com/api/v1.0";

export const getDiceRoll: nkruntime.RpcFunction = (
  _ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  payload: string
) => {
  try {
    const json: DiceThrowPayload = JSON.parse(payload);
    const response: DiceThrowResponse = throwDice(nk, json);

    return JSON.stringify(response);
  } catch (error) {
    logger.error("An error occured during dice roll:", getErrorMessage(error));
    return JSON.stringify(getErrorJson(error));
  }
};

//This function handles the external call
const throwDice = (nk: nkruntime.Nakama, payload: DiceThrowPayload): DiceThrowResponse => {
  const url = apiBaseUrl + "/random";
  const headers = { "Content-Type": "application/json" };
  const body = {
    min: 1,
    max: 6,
    count: payload.diceAmount,
  };
  const res = nk.httpRequest(url, "get", headers, JSON.stringify(body));

  return {
    rollResult: JSON.parse(res.body),
  };
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

const getErrorJson = (error: unknown) => {
  return { message: error instanceof Error ? error.message : String(error) };
};
