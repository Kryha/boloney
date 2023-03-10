import {
  ActionRole,
  BidWithUserId,
  HistoryEvent,
  MatchHistoryUpdateBackendPayload,
  PlayerPublic,
  HistoryRoundEnd,
  HistoryRoundResults,
  HistoryRoundStart,
  HistoryPlayerStats,
  BidPayloadBackend,
  HistoryRoundPlayer,
  HistoryRoundEndAction,
  Die,
} from "../types";

export const getHistoryEvent = (payload: MatchHistoryUpdateBackendPayload): HistoryEvent | undefined => {
  switch (payload.id) {
    case "healDice":
      return {
        eventType: "playerAction",
        activePlayerName: findActivePlayer(payload.data.players)?.username || "",
        outcome: "-5",
        actionName: payload.id,
        createdAt: Date.now(),
      };
    case "bid":
      return getBidHistoryEvent(payload.data);
    default:
      return;
  }
};

const getBidHistoryEvent = (payload: BidPayloadBackend): HistoryEvent | undefined => {
  const latestBid = Object.entries(payload).reduce((prevLatest: BidWithUserId | undefined, [k, bid]) => {
    if (!prevLatest || prevLatest.createdAt < bid.createdAt) return { userId: k, ...bid };
    return prevLatest;
  }, undefined);
  if (!latestBid) return;
  return { eventType: "bidAction", ...latestBid };
};

export const getRoundEndHistoryEvent = (
  action: HistoryRoundEndAction | undefined,
  players: Record<string, PlayerPublic>,
  diceValues: Record<string, Die[]>,
  round: number,
  playerLeft?: PlayerPublic
): HistoryRoundResults | undefined => {
  if (!action) return;

  const roundEnd: HistoryRoundEnd = {
    actionName: action,
    roundNumber: round,
    createdAt: Date.now(),
  };
  const winner = findPlayerWithRole(players, "winner");
  const loser = findPlayerWithRole(players, "loser");
  const userTimeout = findPlayerWithRole(players, "timeOut");

  const roundStats = Object.values(players).map((player) => {
    const playerStats: HistoryPlayerStats = {
      userId: player.userId,
      diceAmount: player.diceAmount,
      powerUpsAmount: player.powerUpsAmount,
      diceValue: diceValues[player.userId],
    };
    return playerStats;
  });

  if (action === "leftMatch") {
    if (!playerLeft) return;
    return getPlayerLeftMatchHistoryEvent(playerLeft, roundEnd, roundStats);
  }

  if (action === "exact") {
    const isWinner = !!winner;
    const playerActive = isWinner ? winner : loser;
    if (!playerActive) return;

    return getRoundEndExactHistoryEvent(playerActive, isWinner, players, roundEnd, roundStats);
  }

  if (action === "lostByTimeOut") {
    if (!userTimeout) return;
    return getRoundEndTimeOutHistoryEvent(userTimeout, players, roundEnd, roundStats);
  }

  if (!winner || !loser) return;
  return getRoundEndBoloneyHistoryEvent(winner, loser, players, roundEnd, roundStats);
};

export const getRoundStartHistoryEvent = (
  round: number,
  players: Record<string, PlayerPublic>,
  stageNumber: number,
  drawRoundCounter: number
): HistoryRoundStart => {
  const roundStart: HistoryRoundStart = {
    eventType: "roundStart",
    roundNumber: round,
    totalDiceAmount: Object.values(players).reduce((sum, player) => sum + player.diceAmount, 0),
    stageNumber: stageNumber,
    roundsUntillDrawRound: drawRoundCounter,
  };
  return roundStart;
};

const findActivePlayer = (players: Record<string, PlayerPublic>): PlayerPublic | undefined => {
  return Object.values(players).find((player) => player.isActive);
};

const findPlayerWithRole = (players: Record<string, PlayerPublic>, role: ActionRole): PlayerPublic | undefined => {
  return Object.values(players).find((player) => player.actionRole === role);
};

const getRoundEndExactHistoryEvent = (
  playerActive: PlayerPublic,
  isWinner: boolean,
  players: Record<string, PlayerPublic>,
  roundEnd: HistoryRoundEnd,
  roundStats: HistoryPlayerStats[]
): HistoryRoundResults => {
  const roundActivePlayer: HistoryRoundPlayer = {
    playerStats: {
      userId: playerActive.userId,
      diceAmount: players[playerActive.userId].diceAmount,
      powerUpsAmount: players[playerActive.userId].powerUpsAmount,
      diceValue: [],
    },
    isWinner: isWinner,
  };

  const roundEndResult: HistoryRoundResults = {
    eventType: "roundResults",
    roundEnd: roundEnd,
    roundStats: roundStats,
  };

  if (isWinner) {
    roundEndResult.roundWinner = roundActivePlayer;
  } else {
    roundEndResult.roundLoser = roundActivePlayer;
  }

  return roundEndResult;
};

const getRoundEndTimeOutHistoryEvent = (
  userTimeout: PlayerPublic,
  players: Record<string, PlayerPublic>,
  roundEnd: HistoryRoundEnd,
  roundStats: HistoryPlayerStats[]
): HistoryRoundResults => {
  roundEnd.actionName = "lostByTimeOut";
  const roundWinner: HistoryRoundPlayer = {
    playerStats: {
      userId: userTimeout.userId,
      diceAmount: players[userTimeout.userId].diceAmount,
      powerUpsAmount: players[userTimeout.userId].powerUpsAmount,
      diceValue: [],
    },
    isWinner: false,
  };

  return {
    eventType: "roundResults",
    roundEnd: roundEnd,
    roundWinner: roundWinner,
    roundStats: roundStats,
  };
};

const getRoundEndBoloneyHistoryEvent = (
  winner: PlayerPublic,
  loser: PlayerPublic,
  players: Record<string, PlayerPublic>,
  roundEnd: HistoryRoundEnd,
  roundStats: HistoryPlayerStats[]
): HistoryRoundResults => {
  const roundWinner: HistoryRoundPlayer = {
    playerStats: {
      userId: winner.userId,
      diceAmount: players[winner.userId].diceAmount,
      powerUpsAmount: players[winner.userId].powerUpsAmount,
      diceValue: [],
    },
    isWinner: true,
  };

  const roundLoser: HistoryRoundPlayer = {
    playerStats: {
      userId: loser.userId,
      diceAmount: players[loser.userId].diceAmount,
      powerUpsAmount: players[loser.userId].powerUpsAmount,
      diceValue: [],
    },
    isWinner: false,
  };

  const roundResults: HistoryRoundResults = {
    eventType: "roundResults",
    roundEnd: roundEnd,
    roundWinner: roundWinner,
    roundLoser: roundLoser,
    roundStats: roundStats,
  };
  return roundResults;
};

const getPlayerLeftMatchHistoryEvent = (
  playerLeft: PlayerPublic,
  roundEnd: HistoryRoundEnd,
  roundStats: HistoryPlayerStats[]
): HistoryRoundResults => {
  roundEnd.actionName = "leftMatch";
  const roundLoser: HistoryRoundPlayer = {
    playerStats: {
      userId: playerLeft.userId,
      diceAmount: playerLeft.diceAmount,
      powerUpsAmount: playerLeft.powerUpsAmount,
      diceValue: [],
    },
    isWinner: false,
  };

  return {
    eventType: "roundResults",
    roundEnd: roundEnd,
    roundLoser: roundLoser,
    roundStats: roundStats,
  };
};
