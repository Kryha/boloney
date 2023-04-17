import { EMPTY_DATA } from "../../../constants";
import {
  errors,
  getLatestBid,
  getTotalDiceWithFace,
  hidePlayersData,
  isBidHigher,
  isBidMaxTotal,
  messageHandler,
  sendMatchNotification,
  setActivePlayer,
  setAllPlayersReady,
  stopLoading,
  handlePlayerLostRound,
  setAction,
  updatePlayerPublicData,
  powerUp,
  saveHistoryEvent,
  matchStageDuration,
  handleActivePlayerTurnEnds,
  getDiceValues,
  getPlayerAccount,
  getFilteredPlayerIds,
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

  const nextActivePlayerId = handleActivePlayerTurnEnds(loopParams, sender.userId);

  const placeBidPayload: BidPayloadBackend = state.bids;
  const playerActivePayload: PlayerActivePayloadBackend = {
    activePlayerId: nextActivePlayerId,
    remainingStageTime: matchStageDuration.playerTurnLoopStage,
  };

  dispatcher.broadcastMessage(MatchOpCode.PLAYER_PLACE_BID, JSON.stringify(placeBidPayload));
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_ACTIVE, JSON.stringify(playerActivePayload));
  stopLoading(loopParams, message.sender);

  saveHistoryEvent(state, { eventType: "bidAction", senderId: sender.userId });
});

const handlePlayerCallBoloney = messageHandler((loopParams, message, sender) => {
  const { logger, state, dispatcher } = loopParams;

  logger.info(sender.username, "called Boloney");
  setActivePlayer(sender.userId, state.players);

  const bid = getLatestBid(state.bids);
  if (!bid) throw errors.invalidPayload;

  //TODO set in notification function
  const notificationContent: NotificationContentCallBoloney = {
    activePlayerName: state.presences[sender.userId].username,
    targetPlayerName: state.presences[bid.userId].username,
  };
  const receiversIds = getFilteredPlayerIds(state.players, [sender.userId, bid.userId]);
  sendMatchNotification(loopParams, NotificationOpCode.BOLONEY, notificationContent, receiversIds);

  const totalDice = getTotalDiceWithFace(state.players, bid.face);

  const target = state.players[bid.userId];
  target.isTarget = true;

  const [winner, loser] = bid.amount <= totalDice ? [target, sender] : [sender, target];

  handlePlayerLostRound(loopParams, loser.userId, false);
  // TODO: implement ZK lose dice logic
  winner.actionRole = "winner";

  setAllPlayersReady(state);

  const payload: BoloneyPayloadBackend = { players: hidePlayersData(state.players), diceValue: getDiceValues(state.players) };
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_BOLONEY, JSON.stringify(payload));

  setAction("Boloney", state);
  stopLoading(loopParams, message.sender);
  saveHistoryEvent(state, { eventType: "roundResults", roundEndAction: "boloney" });
});

const handlePlayerCallExact = messageHandler(async (loopParams, message, sender) => {
  const { logger, state, dispatcher, nk } = loopParams;

  logger.info(sender.username, "called Exact");

  setActivePlayer(sender.userId, state.players);

  const bid = getLatestBid(state.bids);
  if (!bid) throw errors.invalidPayload;

  const notificationContent: NotificationContentCallExact = {
    activePlayerName: state.presences[sender.userId].username,
  };

  const receiversIds = getFilteredPlayerIds(state.players, [sender.userId, bid.userId]);
  sendMatchNotification(loopParams, NotificationOpCode.EXACT, notificationContent, receiversIds);

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

    const playerAccount = getPlayerAccount(nk, winner.userId);

    await Promise.all(
      range(amountToReceive - 1).map(async () => {
        const powerUpId = getPowerUp(loopParams, playerAccount);
        if (isPowerUpId(powerUpId)) winner.powerUpIds.push(powerUpId);
      })
    );

    const payload: PlayerGetPowerUpsPayloadBackend = winner.powerUpIds;
    dispatcher.broadcastMessage(MatchOpCode.PLAYER_GET_POWERUPS, JSON.stringify(payload), [state.presences[winner.userId]]);
  }

  winner.actionRole = "winner";

  setAllPlayersReady(state);

  const payload: ExactPayloadBackend = { players: hidePlayersData(state.players), diceValue: getDiceValues(state.players) };
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_EXACT, JSON.stringify(payload));

  setAction("Exact", state);
  stopLoading(loopParams, message.sender);
  saveHistoryEvent(state, { eventType: "roundResults", roundEndAction: "exact" });
});

const handlePlayerCallHealDice = messageHandler(async (loopParams, message, sender) => {
  const { nk, state, dispatcher } = loopParams;
  const player = state.players[sender.userId];

  const data = JSON.parse(nk.binaryToString(message.data));

  if (!isHealDicePayloadFrontend(data)) throw errors.invalidPayload;

  // Check if the frontend payload coresponds with the players proposed powerups
  if (sender.powerUpIds.length < data.selectedPowerUps.length) throw errors.invalidPayload;

  // Remote calls to zk gaming toolkit
  const playerAccount = getPlayerAccount(nk, sender.userId);

  const newRolledDice = await rollDice(loopParams, 1, player, playerAccount);

  state.players[sender.userId].diceValue.push(newRolledDice[0]);

  // removes the powerUpIds from the state and toolkit
  const updatedPowerUps = await powerUp.handleDeletePowerUps(loopParams, data.selectedPowerUps, sender.userId);
  state.players[sender.userId].powerUpIds = updatedPowerUps;

  // update playerPublic data for other player to see the results
  updatePlayerPublicData(loopParams, [sender.userId]);

  //Healing dice is not a turn ending action
  const notificationContent: NotificationContentHealDice = {
    activePlayerName: sender.username,
  };

  const receiversIds = getFilteredPlayerIds(state.players, [sender.userId]);
  sendMatchNotification(loopParams, NotificationOpCode.HEAL_DICE, notificationContent, receiversIds);

  const payloadDice: RollDicePayload = {
    diceValue: sender.diceValue,
  };

  dispatcher.broadcastMessage(MatchOpCode.STOP_LOADING, EMPTY_DATA, [state.presences[sender.userId]]);
  dispatcher.broadcastMessage(MatchOpCode.ROLL_DICE, JSON.stringify(payloadDice), [state.presences[sender.userId]]);

  const payloadPowerUps: PlayerGetPowerUpsPayloadBackend = sender.powerUpIds;
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_GET_POWERUPS, JSON.stringify(payloadPowerUps), [state.presences[sender.userId]]);

  const payload: HealDicePayloadBackend = {
    players: hidePlayersData(state.players),
  };
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_HEAL_DICE, JSON.stringify(payload));

  stopLoading(loopParams, message.sender);
  saveHistoryEvent(state, { eventType: "playerAction", senderId: sender.userId });
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
