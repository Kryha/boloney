import { MatchData } from "@heroiclabs/nakama-js";
import { FC, ReactNode, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  EndOfMatch,
  EndOfRound,
  MatchLayout,
  GetPowerUps,
  PlayerTurns,
  RollDice,
  Lobby,
  ErrorView,
  Loading,
  FadeTransition,
} from "../../components";
import { GeneralContentWrapper } from "../../atoms";
import { nakama, getRoundEndHistoryEvent, useChatHistory, useJoinMatch, getRoundStartHistoryEvent, getHistoryEvent } from "../../service";
import { useSession, useStore } from "../../store";
import {
  MatchOpCode,
  MatchStage,
  matchOpCodeSchema,
  rollDicePayloadSchema,
  stageTransitionPayloadBackendSchema,
  playerJoinedPayloadBackendSchema,
  playerActivePayloadBackendSchema,
  bidPayloadBackendSchema,
  boloneyPayloadBackendSchema,
  exactPayloadBackendSchema,
  playerLeftPayloadBackendSchema,
  roundSummaryTransitionPayloadBackendSchema,
  playerGetPowerUpsPayloadBackendSchema,
  playerReadyPayloadBackendSchema,
  playerOrderShufflePayloadBackendSchema,
  healDicePayloadBackendSchema,
  usePowerUpPayloadBackendSchema,
  UsePowerUpPayloadBackend,
  MatchHistoryUpdateBackendPayload,
  errorPayloadBackendSchema,
} from "../../types";
import { parseMatchData, parseMatchIdParam } from "../../util";

export const MatchRoute = () => {
  const { matchId } = useParams();
  if (!matchId) return <ErrorView />;

  const parsedId = parseMatchIdParam(matchId);
  if (!parsedId) return <ErrorView />;

  return <Match matchId={parsedId} />;
};

interface MatchProps {
  matchId: string;
}

export const Match: FC<MatchProps> = ({ matchId }) => {
  const session = useSession();

  const matchStage = useStore((state) => state.matchStage);
  const isJoining = useStore((state) => state.isJoining);
  const setMatchStage = useStore((state) => state.setMatchStage);
  const setPlayers = useStore((state) => state.setPlayers);
  const setPlayerOrder = useStore((state) => state.setPlayerOrder);
  const setPowerUpIds = useStore((state) => state.setPowerUpIds);
  const setDiceValue = useStore((state) => state.setDiceValue);
  const setActivePlayer = useStore((state) => state.setActivePlayer);
  const setPlayerReady = useStore((state) => state.setPlayerReady);
  const setBids = useStore((state) => state.setBids);
  const setLastAction = useStore((state) => state.setLastAction);
  const setLeaderboard = useStore((state) => state.setLeaderboard);
  const setRound = useStore((state) => state.setRound);
  const resetRound = useStore((state) => state.resetRound);
  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);
  const setMatchState = useStore((state) => state.setMatchState);
  const setIsJoining = useStore((state) => state.setIsJoining);
  const setStageNumberAndCounter = useStore((state) => state.setStageNumberAndCounter);
  const setTimerTimeInSeconds = useStore((state) => state.setTimerTimeInSeconds);
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  const setPowerUpState = useStore((state) => state.setPowerUpState);
  const setPlayerRoundData = useStore((state) => state.setPlayerRoundData);
  const resetPowerUpState = useStore((state) => state.resetPowerUpState);
  const setShufflingPlayers = useStore((state) => state.setShufflingPlayers);
  const addHistoryEvent = useStore((state) => state.addHistoryEvent);
  const setHistoryEvents = useStore((state) => state.setHistoryEvents);
  const clearHistory = useStore((state) => state.clearHistory);
  const powerUpState = useStore((state) => state.powerUpState);
  const historyEvents = useStore((state) => state.historyEvents);
  const round = useStore((state) => state.round);
  const players = useStore((state) => state.players);
  const stageNumber = useStore((state) => state.stageNumber);
  const drawRoundCounter = useStore((state) => state.drawRoundCounter);

  const joinMatchDone = useJoinMatch(matchId);
  const joinChatDone = useChatHistory(joinMatchDone);
  const isLoading = joinMatchDone && joinChatDone;

  const getStageComponent = (stage: MatchStage): ReactNode => {
    switch (stage) {
      case "getPowerUpStage":
        return <GetPowerUps />;
      case "rollDiceStage":
        return <RollDice />;
      case "playerTurnLoopStage":
        return <PlayerTurns />;
      case "roundSummaryStage":
        return <EndOfRound />;
      case "endOfMatchStage":
        return <EndOfMatch />;
    }
  };

  useEffect(() => {
    if (!session) return;

    const handlePowerUpSideEffects = (powerUpPayload: UsePowerUpPayloadBackend) => {
      const { id, data } = powerUpPayload;
      //TODO: Make sure the playerRoundData is persisted on reload
      switch (id) {
        case "2":
          setPlayerRoundData(data.targetId, { diceSum: data.sum });
          break;
        case "5":
          setPlayerRoundData(data.targetId, { powerUps: data.targetPowerUps });
          break;
        case "7":
          setTurnActionStep("pickAction");
          resetPowerUpState();
          break;
        case "8":
          setPlayerOrder(data.playerOrder);
          setShufflingPlayers(true);
          resetPowerUpState();
          setTurnActionStep("pickAction");
          break;
      }

      setPowerUpState({ result: powerUpPayload });
    };

    const handleHistoryUpdate = (payload: MatchHistoryUpdateBackendPayload) => {
      const newEvent = getHistoryEvent(payload);
      if (newEvent) addHistoryEvent(newEvent);
    };

    const handleRoundStartHistoryEvent = (payloadRound: number) => {
      const roundStart = getRoundStartHistoryEvent(payloadRound, players, stageNumber, drawRoundCounter);
      addHistoryEvent(roundStart);
    };

    nakama.socket.onmatchdata = (matchData: MatchData) => {
      const parsedCode = matchOpCodeSchema.safeParse(matchData.op_code);
      if (!parsedCode.success) return;

      const matchOpcode = parsedCode.data;
      const data = parseMatchData(matchData.data);

      switch (matchOpcode) {
        case MatchOpCode.STOP_LOADING: {
          setSpinnerVisibility(false);
          break;
        }
        case MatchOpCode.STAGE_TRANSITION: {
          const parsed = stageTransitionPayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;

          if (parsed.data.matchStage === "rollDiceStage") {
            resetRound();
            handleRoundStartHistoryEvent(parsed.data.round);
          }
          setTimerTimeInSeconds(parsed.data.remainingStageTime || 0);
          setMatchStage(parsed.data.matchStage);
          setPlayerReady(false);
          break;
        }
        case MatchOpCode.PLAYER_JOINED: {
          const parsed = playerJoinedPayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;

          setTimerTimeInSeconds(parsed.data.remainingStageTime);
          clearHistory();
          setMatchState(parsed.data.matchState);
          setIsJoining(false);
          break;
        }
        case MatchOpCode.PLAYER_READY: {
          const parsed = playerReadyPayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;
          setPlayers(parsed.data);
          break;
        }
        case MatchOpCode.PLAYER_ORDER_SHUFFLE: {
          const parsed = playerOrderShufflePayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;
          setPlayerOrder(parsed.data.playerOrder);
          break;
        }
        case MatchOpCode.PLAYER_GET_POWERUPS: {
          const parsed = playerGetPowerUpsPayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;
          setPowerUpIds(parsed.data);
          break;
        }
        case MatchOpCode.ROLL_DICE: {
          const parsed = rollDicePayloadSchema.safeParse(data);
          if (!parsed.success) return;
          setDiceValue(parsed.data.diceValue);
          break;
        }
        case MatchOpCode.PLAYER_PLACE_BID: {
          const parsed = bidPayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;
          setBids(parsed.data);
          handleHistoryUpdate({ id: "bid", data: parsed.data });
          break;
        }
        case MatchOpCode.PLAYER_CALL_BOLONEY: {
          const parsed = boloneyPayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;

          setLastAction("Boloney");
          setPlayers(parsed.data.players);
          const roundEnd = getRoundEndHistoryEvent("boloney", parsed.data.players, parsed.data.diceValue, round);
          if (roundEnd) addHistoryEvent(roundEnd);
          break;
        }
        case MatchOpCode.PLAYER_LOST_BY_TIMEOUT: {
          const parsed = boloneyPayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;

          const roundEnd = getRoundEndHistoryEvent("lostByTimeOut", parsed.data.players, parsed.data.diceValue, round);
          if (roundEnd) addHistoryEvent(roundEnd);
          setLastAction("lostByTimeOut");
          setPlayers(parsed.data.players);
          setTurnActionStep("results");
          resetPowerUpState();
          break;
        }
        case MatchOpCode.PLAYER_CALL_EXACT: {
          const parsed = exactPayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;

          setLastAction("Exact");
          setPlayers(parsed.data.players);
          const roundEnd = getRoundEndHistoryEvent("exact", parsed.data.players, parsed.data.diceValue, round);
          if (roundEnd) addHistoryEvent(roundEnd);
          break;
        }
        case MatchOpCode.PLAYER_ACTIVE: {
          const parsed = playerActivePayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;
          setActivePlayer(parsed.data.activePlayerId);
          setTimerTimeInSeconds(parsed.data.remainingStageTime);
          break;
        }
        case MatchOpCode.PLAYER_LEFT: {
          const parsed = playerLeftPayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;

          const roundEnd = getRoundEndHistoryEvent(
            "leftMatch",
            parsed.data.players,
            parsed.data.diceValue,
            parsed.data.round,
            parsed.data.players[parsed.data.playerLeftId]
          );
          if (roundEnd) addHistoryEvent(roundEnd);

          break;
        }
        case MatchOpCode.PLAYER_HEAL_DICE: {
          const parsed = healDicePayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;
          setTurnActionStep("pickAction");
          setPlayers(parsed.data.players);
          handleHistoryUpdate({ id: "healDice", data: parsed.data });
          break;
        }
        case MatchOpCode.ROUND_SUMMARY_TRANSITION: {
          const parsed = roundSummaryTransitionPayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;

          setPlayers(parsed.data.players);
          setLeaderboard(parsed.data.leaderboard);
          setRound(parsed.data.round);
          setStageNumberAndCounter(parsed.data.stageNumber, parsed.data.drawRoundCounter);
          break;
        }
        case MatchOpCode.USE_POWER_UP: {
          const parsed = usePowerUpPayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;

          handlePowerUpSideEffects(parsed.data);

          break;
        }
        case MatchOpCode.ERROR: {
          //TODO: some garbage collection might be needed here
          const parsedData = errorPayloadBackendSchema.safeParse(data);
          console.error("MESSAGE ERROR: ", parsedData);
          break;
        }
      }
    };
  }, [
    addHistoryEvent,
    clearHistory,
    drawRoundCounter,
    historyEvents,
    players,
    powerUpState,
    resetPowerUpState,
    resetRound,
    round,
    session,
    setActivePlayer,
    setBids,
    setDiceValue,
    setHistoryEvents,
    setIsJoining,
    setLastAction,
    setLeaderboard,
    setMatchStage,
    setMatchState,
    setPlayerOrder,
    setPlayerReady,
    setPlayerRoundData,
    setPlayers,
    setPowerUpIds,
    setPowerUpState,
    setRound,
    setShufflingPlayers,
    setSpinnerVisibility,
    setStageNumberAndCounter,
    setTimerTimeInSeconds,
    setTurnActionStep,
    stageNumber,
  ]);

  if (isLoading || isJoining) return <Loading />;

  if (matchStage === "lobbyStage") return <Lobby />;

  return (
    <FadeTransition>
      <MatchLayout>
        <GeneralContentWrapper withoutSideMargins={matchStage === "endOfMatchStage"}>{getStageComponent(matchStage)}</GeneralContentWrapper>
      </MatchLayout>
    </FadeTransition>
  );
};
