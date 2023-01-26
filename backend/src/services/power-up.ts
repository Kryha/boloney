import {
  MatchLoopParams,
  MatchOpCode,
  NotificationContentUsePowerUp,
  NotificationOpCode,
  Player,
  PowerUpId,
  UseBirdsEyeBackend,
  UseBirdsEyeFrontend,
  UseCoupBackend,
  UseCoupFrontend,
  UseDoubleUpBackend,
  UseDoubleUpFrontend,
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
  UseSmokeAndMirrorsFrontend,
  UseVendettaBackend,
  UseVendettaFrontend,
} from "../types";
import { handleError } from "./error";
import { sendNotification } from "./notification";
import { getFilteredPlayerIds } from "./player";

const useGrill = async (loopParams: MatchLoopParams, data: UseGrillFrontend): Promise<UseGrillBackend> => {
  // TODO: implement
  return {};
};

const useBirdsEye = async (loopParams: MatchLoopParams, data: UseBirdsEyeFrontend): Promise<UseBirdsEyeBackend> => {
  const { state } = loopParams;
  const { targetId } = data;

  const target = state.players[targetId];

  const sum = target.diceValue.reduce((tot, die) => tot + die.rolledValue, 0);

  // TODO: add interaction with toolkit

  return { sum, targetId };
};

const useMenage = async (loopParams: MatchLoopParams, data: UseMenageFrontend): Promise<UseMenageBackend> => {
  // TODO: implement
  return {};
};

const useDoubleUp = async (loopParams: MatchLoopParams, data: UseDoubleUpFrontend): Promise<UseDoubleUpBackend> => {
  // TODO: implement
  return {};
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

const useSmokeAndMirrors = async (loopParams: MatchLoopParams, data: UseSmokeAndMirrorsFrontend): Promise<UseSmokeAndMirrorsBackend> => {
  // TODO: implement
  return {};
};

const useHypnosis = async (loopParams: MatchLoopParams, data: UseHypnosisFrontend): Promise<UseHypnosisBackend> => {
  // TODO: implement
  return {};
};

const use = async (loopParams: MatchLoopParams, message: nkruntime.MatchMessage, sender: Player): Promise<void> => {
  const { ctx, state, dispatcher, nk } = loopParams;

  // TODO: use type predicates instead of assertion
  const payload = JSON.parse(nk.binaryToString(message.data)) as UsePowerUpPayloadFrontend;

  const { id, data } = payload;

  const powerUp = sender.powerUpIds.find((powerUp) => powerUp === id);
  if (!powerUp) throw new Error(`Player does not own a power-up with id ${id}`);

  // TODO: add interaction with toolkit
  sender.powerUpIds.splice(sender.powerUpIds.indexOf(powerUp), 1);
  sender.powerUpsAmount--;

  let resPayload: UsePowerUpPayloadBackend;

  switch (id) {
    case "1": {
      const resData = await useGrill(loopParams, data);
      resPayload = { id, data: resData };
      break;
    }
    case "2": {
      const resData = await useBirdsEye(loopParams, data);
      resPayload = { id, data: resData };
      break;
    }
    case "3": {
      const resData = await useMenage(loopParams, data);
      resPayload = { id, data: resData };
      break;
    }
    case "4": {
      const resData = await useDoubleUp(loopParams, data);
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
      const resData = await useSmokeAndMirrors(loopParams, data);
      resPayload = { id, data: resData };
      break;
    }
    case "9": {
      const resData = await useHypnosis(loopParams, data);
      resPayload = { id, data: resData };
      break;
    }
  }

  dispatcher.broadcastMessage(MatchOpCode.USE_POWER_UP, JSON.stringify(resPayload), [state.presences[ctx.userId]]);

  const notificationPayload: NotificationContentUsePowerUp = {
    id,
    callerName: sender.username,
    targetName: "targetId" in data ? state.players[data.targetId].username : undefined,
  };
  const idlePlayers = getFilteredPlayerIds(state.players, ctx.userId);
  sendNotification(nk, idlePlayers, NotificationOpCode.USE_POWER_UP, notificationPayload);
};

export const powerUp = { handlePlayerUsePowerUp: use };

export const deletePowerUps = async (
  loopParams: MatchLoopParams,
  selectedPowerUps: PowerUpId[],
  targetPlayer: string
): Promise<PowerUpId[]> => {
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
