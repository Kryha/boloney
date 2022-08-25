interface DiceThrowPayload {
  diceAmount: number;
}
interface DiceThrowResponse {
  rollResult: number[];
}

// TODO: Update this url to our own
const apiBaseUrl: string = "http://www.randomnumberapi.com/api/v1.0";

const getDiceRoll: nkruntime.RpcFunction = (_ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string) => {
  // The code below is to check if the clients send a correct payload for the server
  let json: DiceThrowPayload;
  try {
    json = JSON.parse(payload);
  } catch (error) {
    logger.error("An error occured parsing the payload: %s", getErrorMessage(error));
    return;
  }

  //Calling the external server and formatting the results
  let response: DiceThrowResponse;

  try {
    response = throwDice(nk, json);
  } catch (error) {
    logger.error("An error occured throwing the dice: %s", getErrorMessage(error));
    return;
  }

  return JSON.stringify(response);
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
