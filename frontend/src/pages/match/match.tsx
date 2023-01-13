import { MatchData } from "@heroiclabs/nakama-js";
import { FC, ReactNode, useEffect } from "react";
import { useParams } from "react-router-dom";
import { z } from "zod";

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
import { nakama, useJoinMatch } from "../../service";
import { useSession, useStore } from "../../store";
import {
  MatchOpCode,
  MatchStage,
  matchOpCodeSchema,
  rollDicePayloadSchema,
  powerUpIdSchema,
  stageTransitionSchema,
  playerOrderSchema,
  playerPublicSchema,
  playerJoinedPayloadBackendSchema,
  playerActivePayloadSchema,
  bidPayloadBackendSchema,
  boloneyPayloadBackendSchema,
  exactPayloadBackendSchema,
  playerUpdatePayloadBackendSchema,
  isString,
  leaderboardUpdatePayloadBackendSchema,
  playerLeftPayloadBackend,
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
  const setTimerTimeInSeconds = useStore((state) => state.setTimerTimeInSeconds);
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);

  const joinMatchDone = useJoinMatch(matchId);

  const isLoading = joinMatchDone;

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
          const parsed = stageTransitionSchema.safeParse(data);
          if (!parsed.success) return;

          if (parsed.data.matchStage === "rollDiceStage") resetRound();
          setTimerTimeInSeconds(parsed.data.remainingStageTime);
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
          const parsed = z.record(playerPublicSchema).safeParse(data);
          if (!parsed.success) return;
          setPlayers(parsed.data);
          break;
        }
        case MatchOpCode.PLAYER_ORDER_SHUFFLE: {
          const parsed = playerOrderSchema.safeParse(data);
          if (!parsed.success) return;
          setPlayerOrder(parsed.data.playerOrder);
          break;
        }
        case MatchOpCode.PLAYER_GET_POWERUPS: {
          const parsed = z.array(powerUpIdSchema).safeParse(data);
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
          const parsed = playerActivePayloadSchema.safeParse(data);
          if (!parsed.success) return;
          setActivePlayer(parsed.data.activePlayerId);
          break;
        }
        case MatchOpCode.PLAYER_UPDATE: {
          const parsed = playerUpdatePayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;
          setPlayers(parsed.data.players);
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
        case MatchOpCode.LEADERBOARD_UPDATE: {
          const parsed = leaderboardUpdatePayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;
          setLeaderboard(parsed.data.leaderboard);
          setRound(parsed.data.round);
          break;
        }
        case MatchOpCode.DEBUG_INFO: {
          if (import.meta.env.DEV && isString(data)) console.log("DEBUG_INFO", JSON.parse(data));
          break;
        }
        // TODO: receive as a notification and show it to the user
        case MatchOpCode.ERROR: {
          console.error("MESSAGE ERROR: ", data);
        }
      }
    };
  }, [
    matchStage,
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
    setPlayers,
    setPowerUpIds,
    setRound,
    setSpinnerVisibility,
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
