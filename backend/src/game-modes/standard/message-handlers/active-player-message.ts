import {
  errors,
  getLatestBid,
  getNextPlayerId,
  getFilteredPlayerIds,
  getTotalDiceWithFace,
  hidePlayersData,
  isBidHigher,
  isBidMaxTotal,
  messageHandler,
  sendNotification,
  setActivePlayer,
  setAllPlayersReady,
  stopLoading,
  handlePlayerLostRound,
  setAction,
  handleError,
  updatePlayerPublicData,
  powerUp,
} from "../../../services";
import { getPowerUp, rollDice } from "../../../toolkit-api";
import {
  BidPayloadBackend,
  BoloneyPayloadBackend,
  ExactPayloadBackend,
  HealDicePayloadBackend,
  isBidPayloadFrontend,
  isHealDicePayloadFrontend,
  isPowerUpId,
  MatchLoopParams,
  MatchOpCode,
  NotificationContentCallBoloney,
  NotificationContentCallExact,
  NotificationContentHealDice,
  NotificationOpCode,
  Player,
  PlayerActivePayloadBackend,
  PlayerGetPowerUpsPayloadBackend,
  RollDicePayload,
} from "../../../types";
import { range } from "../../../utils";

const handlePlayerPlaceBid = messageHandler((loopParams, message, sender) => {
  const { logger, nk, state, dispatcher } = loopParams;

  logger.info(sender.username, "placed Bid");

  const data = JSON.parse(nk.binaryToString(message.data));

  if (!isBidPayloadFrontend(data)) throw errors.invalidPayload;

  const latestBid = getLatestBid(state.bids);

  if (!isBidMaxTotal(state.players, data)) throw errors.invalidPayload;
  if (latestBid && !isBidHigher(latestBid, data)) throw errors.invalidPayload;

  state.bids[sender.userId] = { ...data, createdAt: Date.now() };

  const nextActivePlayerId = getNextPlayerId(sender.userId, state);
  setActivePlayer(nextActivePlayerId, state.players);

  state.timerHasStarted = false;

  const placeBidPayload: BidPayloadBackend = state.bids;
  const playerActivePayload: PlayerActivePayloadBackend = { activePlayerId: nextActivePlayerId };

  dispatcher.broadcastMessage(MatchOpCode.PLAYER_PLACE_BID, JSON.stringify(placeBidPayload));
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_ACTIVE, JSON.stringify(playerActivePayload));
  stopLoading(loopParams, message);
});

const handlePlayerCallBoloney = messageHandler((loopParams, message, sender) => {
  const { nk, logger, state, dispatcher } = loopParams;

  logger.info(sender.username, "called Boloney");
  setActivePlayer(sender.userId, state.players);

  const bid = getLatestBid(state.bids);
  if (!bid) throw errors.invalidPayload;

  //TODO set in notification function
  const notificationContent: NotificationContentCallBoloney = {
    activePlayerName: state.presences[sender.userId].username,
    targetPlayerName: state.presences[bid.userId].username,
  };

  const idlePlayers = getFilteredPlayerIds(state.players, sender.userId);

  sendNotification(nk, idlePlayers, NotificationOpCode.BOLONEY, notificationContent);

  const totalDice = getTotalDiceWithFace(state.players, bid.face);

  const target = state.players[bid.userId];
  target.isTarget = true;

  const [winner, loser] = bid.amount <= totalDice ? [target, sender] : [sender, target];

  handlePlayerLostRound(loopParams, loser.userId, false);
  // TODO: implement ZK lose dice logic
  winner.actionRole = "winner";

  setAllPlayersReady(state);

  const payload: BoloneyPayloadBackend = { players: hidePlayersData(state.players) };
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_BOLONEY, JSON.stringify(payload));

  setAction("Boloney", state);
  stopLoading(loopParams, message);
});

const handlePlayerCallExact = messageHandler(async (loopParams, message, sender) => {
  const { nk, logger, state, dispatcher } = loopParams;

  logger.info(sender.username, "called Exact");

  setActivePlayer(sender.userId, state.players);

  const bid = getLatestBid(state.bids);
  if (!bid) throw errors.invalidPayload;

  const idlePlayers = getFilteredPlayerIds(state.players, sender.userId);

  const notificationContent: NotificationContentCallExact = {
    activePlayerName: state.presences[sender.userId].username,
  };

  sendNotification(nk, idlePlayers, NotificationOpCode.EXACT, notificationContent);

  const totalDice = getTotalDiceWithFace(state.players, bid.face);

  const target = state.players[bid.userId];
  target.isTarget = true;

  const [winner, loser] = bid.amount === totalDice ? [sender, target] : [target, sender];

  if (loser.userId === sender.userId) {
    handlePlayerLostRound(loopParams, loser.userId, false);
  }

  if (winner.userId === sender.userId) {
    const { maxPowerUpAmount } = state.settings;
    const currentPowerUpAmount = winner.powerUpIds.length;

    const totalAfterReceive = currentPowerUpAmount + state.stageNumber;
    const amountToReceive = totalAfterReceive > maxPowerUpAmount ? maxPowerUpAmount - currentPowerUpAmount : state.stageNumber;

    await Promise.all(
      range(amountToReceive - 1).map(async () => {
        const powerUpId = await getPowerUp(state.settings.powerUpProbability);
        if (isPowerUpId(powerUpId)) winner.powerUpIds.push(powerUpId);
      })
    );

    const payload: PlayerGetPowerUpsPayloadBackend = winner.powerUpIds;
    dispatcher.broadcastMessage(MatchOpCode.PLAYER_GET_POWERUPS, JSON.stringify(payload), [state.presences[winner.userId]]);
  }

  winner.actionRole = "winner";

  setAllPlayersReady(state);

  const payload: ExactPayloadBackend = { players: hidePlayersData(state.players) };
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_EXACT, JSON.stringify(payload));

  setAction("Exact", state);
  stopLoading(loopParams, message);
});

const handlePlayerCallHealDice = messageHandler(async (loopParams, message, sender) => {
  const { nk, logger, state, dispatcher } = loopParams;

  logger.info(sender.username, "called Heal dice");

  const data = JSON.parse(nk.binaryToString(message.data));

  if (!isHealDicePayloadFrontend(data)) throw errors.invalidPayload;

  // Check if the frontend payload coresponds with the players proposed powerups
  if (sender.powerUpIds.length < data.selectedPowerUps.length) throw errors.invalidPayload;

  // Remote calls to zk gaming toolkit
  try {
    // create die record

    // roll the die
    const newRolledDice = await rollDice(1);
    state.players[sender.userId].diceValue.push(newRolledDice[0]);

    // removes the powerUpIds from the state and toolkit
    const updatedPowerUps = await powerUp.handleDeletePowerUps(loopParams, data.selectedPowerUps, sender.userId);
    state.players[sender.userId].powerUpIds = updatedPowerUps;

    // update playerPublic data for other player to see the results
    updatePlayerPublicData(loopParams, [sender.userId]);
  } catch (error) {
    // TODO revert changes to the state
    throw handleError(error, logger);
  }

  //Healing dice is not a turn ending action
  const notificationContent: NotificationContentHealDice = {
    activePlayerName: sender.username,
  };

  const idlePlayers = getFilteredPlayerIds(state.players, sender.userId);
  sendNotification(nk, idlePlayers, NotificationOpCode.HEAL_DICE, notificationContent);

  const payloadDice: RollDicePayload = {
    diceValue: sender.diceValue,
  };
  dispatcher.broadcastMessage(MatchOpCode.ROLL_DICE, JSON.stringify(payloadDice), [state.presences[sender.userId]]);

  const payloadPowerUps: PlayerGetPowerUpsPayloadBackend = sender.powerUpIds;
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_GET_POWERUPS, JSON.stringify(payloadPowerUps), [state.presences[sender.userId]]);

  const payload: HealDicePayloadBackend = {
    players: hidePlayersData(state.players),
  };
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_HEAL_DICE, JSON.stringify(payload));

  stopLoading(loopParams, message);
});

export const handleActivePlayerMessages = (message: nkruntime.MatchMessage, sender: Player, loopParams: MatchLoopParams) => {
  const { logger } = loopParams;
  switch (message.opCode) {
    case MatchOpCode.PLAYER_PLACE_BID:
      handlePlayerPlaceBid(loopParams, message, sender);
      break;
    case MatchOpCode.PLAYER_CALL_BOLONEY:
      handlePlayerCallBoloney(loopParams, message, sender);
      break;
    case MatchOpCode.PLAYER_CALL_EXACT:
      handlePlayerCallExact(loopParams, message, sender);
      break;
    case MatchOpCode.PLAYER_HEAL_DICE:
      handlePlayerCallHealDice(loopParams, message, sender);
      break;
    case MatchOpCode.USE_POWER_UP:
      powerUp.handlePlayerUsePowerUp(loopParams, message, sender);
      break;
    default:
      logger.info("Unknown OP_CODE received: ", message.opCode);
      break;
  }
};
