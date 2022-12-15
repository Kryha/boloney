import {
  errors,
  getLatestBid,
  getNextPlayerId,
  getTotalDiceWithFace,
  handlePlayerLoss,
  hidePlayersData,
  isBidHigher,
  isBidMaxTotal,
  messageHandler,
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
  const { logger, state, dispatcher } = loopParams;

  logger.info(sender.username, "called Boloney");

  setActivePlayer(sender.userId, state.players);

  const bid = getLatestBid(state.bids);
  if (!bid) throw errors.invalidPayload;

  const totalDice = getTotalDiceWithFace(state.players, bid.face);

  const target = state.players[bid.userId];
  target.isTarget = true;

  const [winner, loser] = bid.amount <= totalDice ? [target, sender] : [sender, target];

  // TODO: implement ZK lose dice logic
  loser.diceAmount -= 1;
  loser.actionRole = "loser";
  winner.actionRole = "winner";

  if (loser.diceAmount <= 0) handlePlayerLoss(state, loser);

  setAllPlayersReady(state);

  const payload: BoloneyPayloadBackend = { players: hidePlayersData(state.players) };
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_BOLONEY, JSON.stringify(payload));

  const nextPlayerId = getNextPlayerId(sender.userId, state);
  setActivePlayer(nextPlayerId, state.players);

  stopLoading(loopParams, message);
});

const handlePlayerCallExact = messageHandler((loopParams, message, sender) => {
  const { logger, state, dispatcher } = loopParams;

  logger.info(sender.username, "called Exact");

  setActivePlayer(sender.userId, state.players);

  const bid = getLatestBid(state.bids);
  if (!bid) throw errors.invalidPayload;

  const totalDice = getTotalDiceWithFace(state.players, bid.face);

  const target = state.players[bid.userId];
  target.isTarget = true;

  const [winner, loser] = bid.amount === totalDice ? [sender, target] : [target, sender];

  // TODO: implement ZK lose dice logic
  loser.diceAmount -= 1;
  loser.actionRole = "loser";
  winner.actionRole = "winner";

  if (loser.diceAmount <= 0) handlePlayerLoss(state, loser);

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
