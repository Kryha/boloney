import { MatchData } from "@heroiclabs/nakama-js";
import { ReactNode, useEffect } from "react";
import { z } from "zod";

import {
  EndOfMatch,
  EndOfRound,
  GameLayout,
  GeneralContentWrapper,
  GetPowerUps,
  PlayerTurns,
  RollDice,
  Lobby,
  ErrorView,
  Loading,
} from "../../components";
import { setIsMatchCreated, useMatchMaker } from "../../service";
import { useStore } from "../../store";
import {
  MatchOpCode,
  MatchStage,
  matchOpCodeSchema,
  rollDicePayloadSchema,
  powerUpIdSchema,
  stageTransitionSchema,
  playerOrderSchema,
  playerPublicSchema,
  playerJoinedPayloadSchema,
  playerActivePayloadSchema,
  bidPayloadBackendSchema,
  boloneyPayloadBackendSchema,
  exactPayloadBackendSchema,
  playerUpdatePayloadBackendSchema,
  leaderboardUpdatePayloadBackendSchema,
} from "../../types";
import { parseMatchData } from "../../util";

export const Match = () => {
  const { joinMatch, isLoading } = useMatchMaker();

  const matchStage = useStore((state) => state.matchStage);
  const socket = useStore((state) => state.socket);
  const session = useStore((state) => state.sessionState);
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
  const resetRound = useStore((state) => state.resetRound);

  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);

  const matchId = useStore((state) => state.matchId);

  // TODO: uncomment when it will be synchronised with server, for now it's too annoying
  // const syncState = useSyncState();
  // const { matchId: unparsedId } = useParams();
  // const matchIdFromUrl = parseMatchIdParam(unparsedId);

  // useEffect(() => {
  //   if (matchId && matchId !== matchIdFromUrl) {
  //     clearLocalStorage();
  //   }
  //   if (matchIdFromUrl) syncState(matchIdFromUrl);
  // }, [matchId, matchIdFromUrl, syncState]);

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
    if (matchId && session?.username) joinMatch(matchId, { username: session.username });
  }, [joinMatch, matchId, session?.username]);

  useEffect(() => {
    if (!socket) return;

    socket.onmatchdata = (matchData: MatchData) => {
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

          if (parsed.data.matchStage === "getPowerUpStage") setIsMatchCreated();
          if (parsed.data.matchStage === "rollDiceStage") resetRound();

          setMatchStage(parsed.data.matchStage);
          setPlayerReady(false);
          break;
        }
        case MatchOpCode.PLAYER_JOINED: {
          const parsed = playerJoinedPayloadSchema.safeParse(data);
          if (!parsed.success) return;
          setPlayers(parsed.data.players);
          setPlayerOrder(parsed.data.playerOrder);
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
        case MatchOpCode.LEADERBOARD_UPDATE: {
          const parsed = leaderboardUpdatePayloadBackendSchema.safeParse(data);
          if (!parsed.success) return;
          setLeaderboard(parsed.data.leaderboard);
          break;
        }
      }
    };
  }, [
    resetRound,
    setActivePlayer,
    setBids,
    setDiceValue,
    setLastAction,
    setLeaderboard,
    setMatchStage,
    setPlayerOrder,
    setPlayerReady,
    setPlayers,
    setPowerUpIds,
    setSpinnerVisibility,
    socket,
  ]);

  // TODO: generalise overlay and return that when awaiting a ws response
  if (isLoading) return <Loading />;

  if (matchStage === "lobbyStage") return <Lobby />;

  if (!matchId) return <ErrorView />;

  return (
    <GameLayout>
      <GeneralContentWrapper withoutSideMargins={matchStage === "endOfMatchStage"}>{getStageComponent(matchStage)}</GeneralContentWrapper>
    </GameLayout>
  );
};
