import { EMPTY_DATA, MENAGE_A_TROIS_DICE_AMOUNT } from "../constants";
import { getPowerUp, rollDice, toolkitUse } from "../toolkit-api";
import {
  isPowerUpTypeArray,
  DiceDataToolkit,
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
  UsePowerUpPayloadBackend,
  UsePowerUpPayloadFrontend,
  UseSecondChanceBackend,
  UseSecondChanceFrontend,
  UseSmokeAndMirrorsBackend,
  UseVendettaBackend,
  UseVendettaFrontend,
  isDieArray,
} from "../types";
import { stopLoading, updatePlayersState } from "./match";
import { handleError } from "./error";
import { sendMatchNotification } from "./notification";
import { cleanUUID, env, getRange, shuffleArray } from "../utils";
import { getNextPlayerId, setActivePlayer, updatePlayerPowerUpAmount } from "./player";
import { saveHistoryEvent } from "./history";

const useGrill = (loopParams: MatchLoopParams, data: UseGrillFrontend): UseGrillBackend => {
  const { state } = loopParams;

  const diceAmount = state.players[data.targetId].diceValue.filter((die) => die.rolledValue === data.face).length;
  const isCorrect = diceAmount === data.amount;

  // TODO: call toolkit

  return { isCorrect, targetId: data.targetId };
};

const useBirdsEye = (loopParams: MatchLoopParams, data: UseBirdsEyeFrontend, powerUpRecord: PowerUpToolkit): UseBirdsEyeBackend => {
  const { state, ctx } = loopParams;
  const { targetId } = data;

  const target = state.players[targetId];

  let sum: number;

  if (env(ctx).ZK_ENABLED) {
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

    const res = toolkitUse.birdsEye(loopParams, powerUpRecord, diceData);
    sum = res.sum;
  } else {
    sum = target.diceValue.reduce((tot, die) => tot + die.rolledValue, 0);
  }

  return { sum, targetId };
};

const useMenage = async (loopParams: MatchLoopParams, sender: Player): Promise<UseMenageBackend> => {
  const { state } = loopParams;
  const activePlayer = state.players[sender.userId];

  const newRolledDice = await rollDice(loopParams, MENAGE_A_TROIS_DICE_AMOUNT);

  if (!isDieArray(newRolledDice)) throw new Error("Failed to roll new dice!");

  activePlayer.diceValue = [...activePlayer.diceValue, ...newRolledDice];
  activePlayer.diceAmount = activePlayer.diceValue.length;
  activePlayer.extraDice = activePlayer.extraDice + MENAGE_A_TROIS_DICE_AMOUNT;

  return { newRolledDice: newRolledDice };
};

const useDoubleUp = async (loopParams: MatchLoopParams, sender: Player): Promise<UseDoubleUpBackend> => {
  const { state } = loopParams;

  const numberOfNewPowerUps = sender.powerUpsAmount >= state.settings.maxPowerUpAmount ? 1 : 2;
  const newPowerUps =
    numberOfNewPowerUps === 1
      ? await Promise.all([getPowerUp(loopParams)])
      : await Promise.all([getPowerUp(loopParams), getPowerUp(loopParams)]);

  if (!isPowerUpTypeArray(newPowerUps)) throw new Error("Failed to get new power-ups");

  state.players[sender.userId].powerUpIds.push(...Object.values(newPowerUps));
  state.players[sender.userId].powerUpsAmount = state.players[sender.userId].powerUpIds.length;

  // TODO: perform call to toolkit
  await toolkitUse.doubleUp();

  return { powerUpIds: newPowerUps, recentlyAdded: numberOfNewPowerUps };
};

const useVendetta = async (loopParams: MatchLoopParams, data: UseVendettaFrontend): Promise<UseVendettaBackend> => {
  const { state } = loopParams;

  state.players[data.targetId].arePowerUpsDisabled = true;

  return { targetId: data.targetId, targetPowerUps: state.players[data.targetId].powerUpIds };
};

const useSecondChance = async (
  loopParams: MatchLoopParams,
  data: UseSecondChanceFrontend,
  sender: Player
): Promise<UseSecondChanceBackend> => {
  const { state } = loopParams;

  const activePlayer = state.players[sender.userId];

  // Remove chosen dice from userId
  const countDie = data.diceToReroll.reduce((dieCount, die) => {
    dieCount[die.rolledValue] = (dieCount[die.rolledValue] || 0) + 1;
    return dieCount;
  }, {} as { [key: number]: number });

  state.players[activePlayer.userId].diceValue = activePlayer.diceValue.filter(
    (rolledValue) => countDie[rolledValue.rolledValue] === undefined || --countDie[rolledValue.rolledValue] < 0
  );

  // Reroll the amount of dice chosen
  const newRolledDice = await rollDice(loopParams, data.diceToReroll.length);

  if (!isDieArray(newRolledDice)) throw new Error("Failed to roll new dice!");

  // Add new rolled dice to the players stage
  activePlayer.diceValue = [...activePlayer.diceValue, ...newRolledDice];

  // return the new rolled dice
  return { newRolledDice: newRolledDice };
};

const useCoup = async (loopParams: MatchLoopParams, data: UseCoupFrontend, isSelfTarget: boolean): Promise<UseCoupBackend> => {
  const { state } = loopParams;

  const powerUpsAmount = isSelfTarget ? state.players[data.targetId].powerUpsAmount - 1 : state.players[data.targetId].powerUpsAmount;

  const newPowerUps = await Promise.all(getRange(powerUpsAmount).map(async () => getPowerUp(loopParams)));
  if (!isPowerUpTypeArray(newPowerUps)) throw new Error("Failed to get new power-ups.");
  state.players[data.targetId].powerUpIds = newPowerUps;
  state.players[data.targetId].powerUpsAmount = newPowerUps.length;

  // TODO: implement toolkit call
  // await toolkitUse.coup();

  return { powerUpIds: newPowerUps, targetId: data.targetId };
};

const useSmokeAndMirrors = (loopParams: MatchLoopParams, sender: Player): UseSmokeAndMirrorsBackend => {
  const { state } = loopParams;

  state.playerOrder = shuffleArray(state.playerOrder);

  const nextActivePlayerId = getNextPlayerId(sender.userId, state);
  setActivePlayer(nextActivePlayerId, state.players);

  state.timerHasStarted = false;

  return { playerOrder: state.playerOrder };
};

const useHypnosis = async (loopParams: MatchLoopParams, data: UseHypnosisFrontend): Promise<UseHypnosisBackend> => {
  // TODO: implement
  return { targetId: "" };
};

const use = async (loopParams: MatchLoopParams, message: nkruntime.MatchMessage, sender: Player): Promise<void> => {
  const { state, dispatcher, nk, ctx, logger } = loopParams;
  try {
    // TODO: use type predicates instead of assertion
    const payload = JSON.parse(nk.binaryToString(message.data)) as UsePowerUpPayloadFrontend;

    const { id, data } = payload;

    const powerUp = sender.powerUpIds.find((powerUp) => powerUp === id);
    if (!powerUp) throw new Error(`Player does not own a power-up with id ${id}`);

    updatePlayerPowerUpAmount(loopParams, [sender.userId]);

    // TODO: investigate why keys do not get stored in staging env
    // const [key] = readUserKeys(nk, sender.userId, { collection: "Accounts", key: "keys" });
    // if (!key) throw new Error("User not found in collection");

    // TODO: use real record
    // TODO: pass key.value.address as owner field after implementing proper power-up generation
    const powerUpRecord: PowerUpToolkit = {
      owner: "aleo1p4ye54p6n5cfdyzmy6fcs583mmwrghdxl8upeuew4w8uqmhqdqxq3e4tfl",
      gates: 0,
      powerUpId: id,
      matchId: cleanUUID(ctx.matchId),
      _nonce: "4393085214842307962009839145934641063703150241291667000462643412531900836455group",
    };

    let resPayload: UsePowerUpPayloadBackend;

    let shouldRemovePowerUp = true;
    let shouldBroadcastOnlyToSender = true;

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
        const resData = await useMenage(loopParams, sender);
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
        const resData = await useSecondChance(loopParams, data, sender);
        resPayload = { id, data: resData };
        break;
      }
      case "7": {
        const isSelfTarget = sender.userId === data.targetId;
        shouldRemovePowerUp = !isSelfTarget;
        const resData = await useCoup(loopParams, data, isSelfTarget);
        resPayload = { id, data: resData };
        break;
      }
      case "8": {
        const resData = useSmokeAndMirrors(loopParams, sender);
        resPayload = { id, data: resData };
        shouldBroadcastOnlyToSender = false;
        break;
      }
      case "9": {
        const resData = await useHypnosis(loopParams, data);
        resPayload = { id, data: resData };
        break;
      }
    }

    if (shouldRemovePowerUp) {
      sender.powerUpIds.splice(sender.powerUpIds.indexOf(powerUp), 1);
      sender.powerUpsAmount--;
    }

    const senderPresence = state.presences[sender.userId];

    if (shouldBroadcastOnlyToSender) {
      dispatcher.broadcastMessage(MatchOpCode.USE_POWER_UP, JSON.stringify(resPayload), [senderPresence]);
    } else {
      dispatcher.broadcastMessage(MatchOpCode.USE_POWER_UP, JSON.stringify(resPayload));
    }

    saveHistoryEvent(state, { eventType: "playerAction", senderId: sender.userId, powerUpPayload: resPayload });
    updatePlayerPowerUpAmount(loopParams, [sender.userId]);
    updatePlayersState(state, dispatcher);

    dispatcher.broadcastMessage(MatchOpCode.STOP_LOADING, EMPTY_DATA, [senderPresence]);

    const notificationPayload: NotificationContentUsePowerUp = {
      id,
      callerName: sender.username,
      targetName: data && "targetId" in data ? state.players[data.targetId].username : undefined,
    };
    sendMatchNotification(loopParams, NotificationOpCode.USE_POWER_UP, notificationPayload, sender.userId);
  } catch (error) {
    logger.error("Use power-up", error);
    stopLoading(loopParams, message.sender);
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
