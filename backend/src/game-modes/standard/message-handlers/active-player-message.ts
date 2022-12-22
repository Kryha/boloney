import {
  errors,
  getLatestBid,
  getNextPlayerId,
  getFilteredPlayerIds,
  getTotalDiceWithFace,
  handlePlayerLoss,
  hidePlayersData,
  isBidHigher,
  isBidMaxTotal,
  messageHandler,
  sendNotification,
  setActivePlayer,
  setAllPlayersReady,
  stopLoading,
} from "../../../services";
import {
  BidPayloadBackend,
  BoloneyPayloadBackend,
  ExactPayloadBackend,
  isBidPayloadFrontend,
  MatchLoopParams,
  MatchOpCode,
  NotificationContentCallBoloney,
  NotificationContentCallExact,
  NotificationOpCode,
  Player,
} from "../../../types";

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

  const placeBidPayload: BidPayloadBackend = state.bids;
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_PLACE_BID, JSON.stringify(placeBidPayload));
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_ACTIVE, JSON.stringify({ activePlayerId: nextActivePlayerId }));
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

  // TODO: implement ZK lose dice logic
  loser.diceAmount -= 1;
  loser.actionRole = "loser";
  winner.actionRole = "winner";

  if (loser.diceAmount <= 0) {
    handlePlayerLoss(loopParams, loser, NotificationOpCode.PLAYER_LOST);
  }

  setAllPlayersReady(state);

  const payload: BoloneyPayloadBackend = { players: hidePlayersData(state.players) };
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_BOLONEY, JSON.stringify(payload));

  const nextPlayerId = getNextPlayerId(sender.userId, state);
  setActivePlayer(nextPlayerId, state.players);

  stopLoading(loopParams, message);
});

const handlePlayerCallExact = messageHandler((loopParams, message, sender) => {
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
    loser.diceAmount -= 1;
  }
  // TODO: if caller is winner, give them power-ups
  loser.actionRole = "loser";
  winner.actionRole = "winner";

  if (loser.diceAmount <= 0) handlePlayerLoss(loopParams, loser, NotificationOpCode.PLAYER_LOST);

  setAllPlayersReady(state);

  const payload: ExactPayloadBackend = { players: hidePlayersData(state.players) };
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_EXACT, JSON.stringify(payload));

  const nextPlayerId = getNextPlayerId(sender.userId, state);
  setActivePlayer(nextPlayerId, state.players);

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
    default:
      logger.info("Unknown OP_CODE received: ", message.opCode);
      break;
  }
};
