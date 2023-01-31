import { MatchData } from "@heroiclabs/nakama-js";
import { FC, ReactNode, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  EndOfMatch,
  EndOfRound,
  MatchLayout,
  GeneralContentWrapper,
  GetPowerUps,
  PlayerTurns,
  RollDice,
  Lobby,
  ErrorView,
  Loading,
} from "../../components";
import { nakama, useChatHistory, useJoinMatch } from "../../service";
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
  playerLeftPayloadBackend,
  roundSummaryTransitionPayloadBackendSchema,
  playerGetPowerUpsPayloadBackendSchema,
  playerReadyPayloadBackendSchema,
  playerOrderShufflePayloadBackendSchema,
  healDicePayloadBackendSchema,
  usePowerUpPayloadBackendSchema,
  UsePowerUpPayloadBackend,
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

    const handlePowerUpSiceEffects = (powerUpPayload: UsePowerUpPayloadBackend) => {
      const { id, data } = powerUpPayload;

      switch (id) {
        case "2":
          setPlayerRoundData(data.targetId, { diceSum: data.sum });
          break;
      }

      setPowerUpState({ result: powerUpPayload });
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

          if (parsed.data.matchStage === "rollDiceStage") resetRound();
          setTimerTimeInSeconds(parsed.data.remainingStageTime || 0);
          setMatchStage(parsed.data.matchStage);
          setPlayerReady(false);
          break;
        }
        case MatchOpCode.PLAYER_JOINED: {
          const parsed = playerJoinedPayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;
          setTimerTimeInSeconds(parsed.data.remainingStageTime);
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
          break;
        }
        case MatchOpCode.PLAYER_CALL_BOLONEY: {
          const parsed = boloneyPayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;
          setLastAction("Boloney");
          setPlayers(parsed.data.players);
          break;
        }
        case MatchOpCode.PLAYER_LOST_BY_TIMEOUT: {
          const parsed = boloneyPayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;
          setLastAction("lostByTimeOut");
          setPlayers(parsed.data.players);
          setTurnActionStep("results");
          break;
        }
        case MatchOpCode.PLAYER_CALL_EXACT: {
          const parsed = exactPayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;
          setLastAction("Exact");
          setPlayers(parsed.data.players);
          break;
        }
        case MatchOpCode.PLAYER_ACTIVE: {
          const parsed = playerActivePayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;
          setActivePlayer(parsed.data.activePlayerId);
          break;
        }
        case MatchOpCode.PLAYER_LEFT: {
          const parsed = playerLeftPayloadBackend.safeParse(data);
          if (!parsed.success) return;

          setPlayers(parsed.data.players);
          setPlayerOrder(parsed.data.playerOrder);
          setMatchStage(parsed.data.stage);

          const activePlayer = Object.values(parsed.data.players).find((player) => player.isActive === true);
          if (activePlayer) setActivePlayer(activePlayer.userId);
          //TODO: leaderboards could be updated somewhere else.
          if (parsed.data.leaderboard) setLeaderboard(parsed.data.leaderboard);
          break;
        }
        case MatchOpCode.PLAYER_HEAL_DICE: {
          const parsed = healDicePayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;
          setTurnActionStep("pickAction");
          setPlayers(parsed.data.players);
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

          handlePowerUpSiceEffects(parsed.data);
          break;
        }
        case MatchOpCode.ERROR: {
          console.error("MESSAGE ERROR: ", data);
        }
      }
    };
  }, [
    resetRound,
    session,
    setActivePlayer,
    setBids,
    setDiceValue,
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
    setSpinnerVisibility,
    setStageNumberAndCounter,
    setTimerTimeInSeconds,
    setTurnActionStep,
  ]);

  if (isLoading || isJoining) return <Loading />;

  if (matchStage === "lobbyStage") return <Lobby />;

  return (
    <MatchLayout>
      <GeneralContentWrapper withoutSideMargins={matchStage === "endOfMatchStage"}>{getStageComponent(matchStage)}</GeneralContentWrapper>
    </MatchLayout>
  );
};
