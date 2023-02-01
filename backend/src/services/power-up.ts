import { EMPTY_DATA } from "../constants";
import { getPowerUp, toolkitUse } from "../toolkit-api";
import {
  DiceDataToolkit,
  isPowerUpTypeArray,
  MatchLoopParams,
  MatchOpCode,
  NotificationContentUsePowerUp,
  NotificationOpCode,
  Player,
  PowerUpId,
  PowerUpToolkit,
  UseBirdsEyeBackend,
  UseBirdsEyeFrontend,
  UseCoupBackend,
  UseCoupFrontend,
  UseDoubleUpBackend,
  UseGrillBackend,
  UseGrillFrontend,
  UseHypnosisBackend,
  UseHypnosisFrontend,
  UseMenageBackend,
  UseMenageFrontend,
  UsePowerUpPayloadBackend,
  UsePowerUpPayloadFrontend,
  UseSecondChanceBackend,
  UseSecondChanceFrontend,
  UseSmokeAndMirrorsBackend,
  UseVendettaBackend,
  UseVendettaFrontend,
} from "../types";
import { stopLoading, updatePlayersState } from "./match";
import { handleError } from "./error";
import { sendNotification } from "./notification";
import { getFilteredPlayerIds, getNextPlayerId, setActivePlayer } from "./player";
import { readUserKeys } from "../hooks/auth";
import { shuffleArray, cleanUUID } from "../utils";

const useGrill = (loopParams: MatchLoopParams, data: UseGrillFrontend): UseGrillBackend => {
  const { state } = loopParams;

  const diceAmount = state.players[data.targetId].diceValue.filter((die) => die.rolledValue === data.face).length;
  const isCorrect = diceAmount === data.amount;

  // TODO: call toolkit

  return { isCorrect, targetId: data.targetId };
};

const useBirdsEye = (loopParams: MatchLoopParams, data: UseBirdsEyeFrontend, powerUpRecord: PowerUpToolkit): UseBirdsEyeBackend => {
  const { state } = loopParams;
  const { targetId } = data;

  const target = state.players[targetId];

  const diceData: DiceDataToolkit = {
    dice_1: 0,
    dice_2: 0,
    dice_3: 0,
    dice_4: 0,
    dice_5: 0,
    dice_6: 0,
    dice_7: 0,
    dice_8: 0,
    dice_9: 0,
    dice_10: 0,
  };

  target.diceValue.forEach((dice, i) => {
    const key = `dice_${i + 1}` as keyof DiceDataToolkit;
    diceData[key] = dice.rolledValue;
  });

  const { sum } = toolkitUse.birdsEye(loopParams, powerUpRecord, diceData);

  return { sum, targetId };
};

const useMenage = async (loopParams: MatchLoopParams, data: UseMenageFrontend): Promise<UseMenageBackend> => {
  // TODO: implement
  return {};
};

const useDoubleUp = async (loopParams: MatchLoopParams, sender: Player): Promise<UseDoubleUpBackend> => {
  const { state } = loopParams;

  const numberofNewPowerUps = sender.powerUpsAmount >= state.settings.maxPowerUpAmount ? 1 : 2;
  const newPowerUps =
    numberofNewPowerUps === 1
      ? await Promise.all([getPowerUp(state.settings.powerUpProbability)])
      : await Promise.all([getPowerUp(state.settings.powerUpProbability), getPowerUp(state.settings.powerUpProbability)]);

  if (!isPowerUpTypeArray(newPowerUps)) throw new Error("Failed to get new power-ups");

  state.players[sender.userId].powerUpIds.push(...Object.values(newPowerUps));
  state.players[sender.userId].powerUpsAmount = state.players[sender.userId].powerUpIds.length;

  // TODO: perform call to toolkit
  await toolkitUse.doubleUp();

  return { powerUpIds: newPowerUps, recentlyAdded: numberofNewPowerUps };
};

const useVendetta = async (loopParams: MatchLoopParams, data: UseVendettaFrontend): Promise<UseVendettaBackend> => {
  // TODO: implement
  return {};
};

const useSecondChance = async (loopParams: MatchLoopParams, data: UseSecondChanceFrontend): Promise<UseSecondChanceBackend> => {
  // TODO: implement
  return {};
};

const useCoup = async (loopParams: MatchLoopParams, data: UseCoupFrontend): Promise<UseCoupBackend> => {
  // TODO: implement
  return {};
};

const useSmokeAndMirrors = (loopParams: MatchLoopParams, sender: Player): UseSmokeAndMirrorsBackend => {
  const { state } = loopParams;

  state.playerOrder = shuffleArray(state.playerOrder);

  const nextActivePlayerId = getNextPlayerId(sender.userId, state);
  setActivePlayer(nextActivePlayerId, state.players);

  state.timerHasStarted = false;

  return {};
};

const useHypnosis = async (loopParams: MatchLoopParams, data: UseHypnosisFrontend): Promise<UseHypnosisBackend> => {
  // TODO: implement
  return {};
};

const use = async (loopParams: MatchLoopParams, message: nkruntime.MatchMessage, sender: Player): Promise<void> => {
  const { state, dispatcher, nk, ctx, logger } = loopParams;
  try {
    // TODO: use type predicates instead of assertion
    const payload = JSON.parse(nk.binaryToString(message.data)) as UsePowerUpPayloadFrontend;

    logger.debug("payload:", payload);

    const { id, data } = payload;

    logger.debug("id:", id);
    logger.debug("data:", data);

    const powerUp = sender.powerUpIds.find((powerUp) => powerUp === id);
    if (!powerUp) throw new Error(`Player does not own a power-up with id ${id}`);

    logger.debug("powerUp:", powerUp);

    const [key] = readUserKeys(nk, sender.userId, { collection: "Accounts", key: "keys" });
    if (!key) throw new Error("User not found in collection");

    logger.debug("key:", key);

    // TODO: use real record
    // TODO: pass key.value.address as owner field after implementing proper power-up generation
    const powerUpRecord: PowerUpToolkit = {
      owner: "aleo1p4ye54p6n5cfdyzmy6fcs583mmwrghdxl8upeuew4w8uqmhqdqxq3e4tfl",
      gates: 0,
      powerUpId: id,
      matchId: cleanUUID(ctx.matchId),
      _nonce: "4393085214842307962009839145934641063703150241291667000462643412531900836455group",
    };

    logger.debug("powerUpRecord:", powerUpRecord);

    let resPayload: UsePowerUpPayloadBackend;

    switch (id) {
      case "1": {
        const resData = useGrill(loopParams, data);
        resPayload = { id, data: resData };
        break;
      }
      case "2": {
        const resData = useBirdsEye(loopParams, data, powerUpRecord);
        resPayload = { id, data: resData };
        break;
      }
      case "3": {
        const resData = await useMenage(loopParams, data);
        resPayload = { id, data: resData };
        break;
      }
      case "4": {
        const resData = await useDoubleUp(loopParams, sender);
        resPayload = { id, data: resData };
        break;
      }
      case "5": {
        const resData = await useVendetta(loopParams, data);
        resPayload = { id, data: resData };
        break;
      }
      case "6": {
        const resData = await useSecondChance(loopParams, data);
        resPayload = { id, data: resData };
        break;
      }
      case "7": {
        const resData = await useCoup(loopParams, data);
        resPayload = { id, data: resData };
        break;
      }
      case "8": {
        const resData = useSmokeAndMirrors(loopParams, sender);
        resPayload = { id, data: resData };
        break;
      }
      case "9": {
        const resData = await useHypnosis(loopParams, data);
        resPayload = { id, data: resData };
        break;
      }
    }

    sender.powerUpIds.splice(sender.powerUpIds.indexOf(powerUp), 1);
    sender.powerUpsAmount--;

    const senderPresence = state.presences[sender.userId];

    dispatcher.broadcastMessage(MatchOpCode.USE_POWER_UP, JSON.stringify(resPayload), [senderPresence]);

    updatePlayersState(state, dispatcher);

    dispatcher.broadcastMessage(MatchOpCode.STOP_LOADING, EMPTY_DATA, [senderPresence]);

    const notificationPayload: NotificationContentUsePowerUp = {
      id,
      callerName: sender.username,
      targetName: data && "targetId" in data ? state.players[data.targetId].username : undefined,
    };
    const idlePlayers = getFilteredPlayerIds(state.players, sender.userId);
    sendNotification(nk, idlePlayers, NotificationOpCode.USE_POWER_UP, notificationPayload);
  } catch (error) {
    logger.error("Use power-up", error);
    stopLoading(loopParams, message);
  }
};

const deletePowerUps = async (loopParams: MatchLoopParams, selectedPowerUps: PowerUpId[], targetPlayer: string): Promise<PowerUpId[]> => {
  const { state, logger } = loopParams;
  const sourcePowerUpArray = state.players[targetPlayer].powerUpIds;

  try {
    //TODO: add call to the Toolkit to remove the records of the powerUps

    // Removing the powerUpIds from targetPlayer array
    const countPowerUps = selectedPowerUps.reduce((powerUpCounts, powerUpId) => {
      powerUpCounts[powerUpId] = (powerUpCounts[powerUpId] || 0) + 1;
      return powerUpCounts;
    }, {} as { [key: string]: number });

    return sourcePowerUpArray.filter((powerUpId) => countPowerUps[powerUpId] === undefined || --countPowerUps[powerUpId] < 0);
  } catch (error) {
    // TODO revert an changes that are made in the try
    handleError(error, logger);
    //Return the original powerUp array
    return sourcePowerUpArray;
  }
};

export const powerUp = { handlePlayerUsePowerUp: use, handleDeletePowerUps: deletePowerUps };
