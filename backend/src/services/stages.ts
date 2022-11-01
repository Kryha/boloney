import { MatchLoopParams, MatchOpCode, MatchStage } from "../types";
import { handleMatchStage } from "./match";

export type StageHandler = (loopParams: MatchLoopParams) => void;

export type StageHandlers = {
  [stage in MatchStage]: StageHandler;
};

export const handleStage: StageHandlers = {
  lobbyStage: (loopParams) =>
    handleMatchStage(
      loopParams,
      (message, sender, { state, dispatcher }) => {
        if (message.opCode === MatchOpCode.PLAYER_READY) {
          state.playersReady.push(sender.userId);
          state.players[sender.userId].isReady = true;
          dispatcher.broadcastMessage(MatchOpCode.PLAYER_READY, JSON.stringify(state.players));
        }
      },
      ({ dispatcher }, nextStage) => {
        dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify({ matchStage: nextStage }));
      }
    ),

  getPowerUpStage: (loopParams) =>
    handleMatchStage(
      loopParams,
      (message, sender, { state }) => {
        if (message.opCode == MatchOpCode.PLAYER_READY) {
          state.playersReady.push(sender.userId);
        }
      },
      ({ dispatcher }, nextStage) => {
        dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify({ matchStage: nextStage }));
      }
    ),

  rollDiceStage: (loopParams) =>
    handleMatchStage(
      loopParams,
      (message, sender, { state }) => {
        if (message.opCode == MatchOpCode.PLAYER_READY) {
          state.playersReady.push(sender.userId);
        }
      },
      ({ dispatcher }, nextStage) => {
        dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify({ matchStage: nextStage }));
      }
    ),

  playerTurnLoopStage: (loopParams) =>
    handleMatchStage(
      loopParams,
      (message, sender, { state }) => {
        if (message.opCode == MatchOpCode.PLAYER_READY) {
          state.playersReady.push(sender.userId);
        }
      },
      ({ dispatcher }, nextStage) => {
        dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify({ matchStage: nextStage }));
      }
    ),

  roundSummaryStage: (loopParams) =>
    handleMatchStage(
      loopParams,
      (message, sender, { state }) => {
        if (message.opCode == MatchOpCode.PLAYER_READY) {
          state.playersReady.push(sender.userId);
        }
      },
      ({ dispatcher }, nextStage) => {
        dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify({ matchStage: nextStage }));
      }
    ),

  endOfMatchStage: (loopParams) =>
    handleMatchStage(loopParams, (message, sender, { state }) => {
      if (message.opCode == MatchOpCode.PLAYER_READY) {
        state.playersReady.push(sender.userId);
      }
    }),
};
