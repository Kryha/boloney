import { MatchData } from "@heroiclabs/nakama-js";
import { ReactNode, useEffect } from "react";
import { useParams } from "react-router-dom";
import { z } from "zod";

import { text } from "../../assets";
import {
  EndOfMatch,
  EndOfRound,
  GameLayout,
  GeneralContentWrapper,
  GetPowerUps,
  PlayerTurns,
  Heading2,
  RollDice,
  Lobby,
  ErrorView,
} from "../../components";
import { useMatchMaker } from "../../service";
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
} from "../../types";
import { parseMatchData, parseMatchIdParam } from "../../util";

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

  // TODO: Check if we need to re-stablish socket connection after reloading the page
  const { matchId: unparsedId } = useParams();
  const matchId = parseMatchIdParam(unparsedId);

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

      // TODO: Add cases for the rest of the OP_CODES
      switch (matchOpcode) {
        case MatchOpCode.STAGE_TRANSITION: {
          const parsed = stageTransitionSchema.safeParse(data);
          if (!parsed.success) return;
          setMatchStage(parsed.data.matchStage);
          break;
        }
        case MatchOpCode.PLAYER_JOINED: {
          const parsed = z.record(playerPublicSchema).safeParse(data);
          if (!parsed.success) return;
          setPlayers(parsed.data);
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
      }
    };
  }, [socket, setMatchStage, setPlayerOrder, setPlayers, session, setDiceValue, setPowerUpIds]);

  // TODO: add loading animation
  if (isLoading) return <Heading2>{text.general.loading}</Heading2>;

  if (matchStage === "lobbyStage") return <Lobby />;

  if (!matchId) return <ErrorView />;

  return (
    <GameLayout>
      <GeneralContentWrapper>{getStageComponent(matchStage)}</GeneralContentWrapper>
    </GameLayout>
  );
};
