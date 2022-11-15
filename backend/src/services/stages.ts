import { getPowerUp } from "../toolkit-api/power-ups";
import { isPowerUpId, MatchLoopParams, MatchOpCode, MatchStage } from "../types";
import { getNextPlayerId, getOtherPresences, getRange, shuffleArray } from "../utils";
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
      async ({ logger }) => {
        logger.debug("Lobby stage");
      },
      ({ state, dispatcher }, nextStage) => {
        state.playerOrder = shuffleArray(state.playerOrder);
        state.activePlayer = state.playerOrder[0];
        dispatcher.broadcastMessage(MatchOpCode.PLAYER_ORDER_SHUFFLE, JSON.stringify({ playerOrder: state.playerOrder }));
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
      async ({ state, logger, dispatcher }) => {
        const playersList = Object.values(state.players);
        const initialPowerUpAmount = state.settings.initialPowerUpAmount;
        const range = getRange(initialPowerUpAmount);

        await Promise.all(
          playersList.map(async (player) => {
            if (player.hasInitialPowerUps) return;

            await Promise.all(
              range.map(async () => {
                const powerUpId = await getPowerUp(state.settings.powerUpProbability);
                if (isPowerUpId(powerUpId)) player.powerUpsList.push(powerUpId);
              })
            );

            player.hasInitialPowerUps = true;
            dispatcher.broadcastMessage(MatchOpCode.PLAYER_GET_POWERUPS, JSON.stringify(player.powerUpsList), [
              state.presences[player.userId],
            ]);
          })
        );

        logger.debug("----->> Get powerUp logic");
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
      async ({ logger }) => {
        logger.debug("roll dice logic");
      },
      ({ dispatcher }, nextStage) => {
        dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify({ matchStage: nextStage }));
      }
    ),

  playerTurnLoopStage: (loopParams) =>
    handleMatchStage(
      loopParams,
      (message, sender, { state, dispatcher }) => {
        if (sender.userId === state.activePlayer) {
          const otherPresences = getOtherPresences(sender.userId, state.presences);
          switch (message.opCode) {
            case MatchOpCode.PLAYER_PLACE_BID:
              console.log(sender.username, " placed BID");
              state.activePlayer = getNextPlayerId(sender.userId, state.playerOrder);
              // TODO: Add "PlaceBid" logic
              // TODO: Add "lastBid" property to the MatchState
              // Broadcast PlaceBid action to everyone else
              dispatcher.broadcastMessage(MatchOpCode.PLAYER_PLACE_BID, JSON.stringify({ lastBid: message.data }), otherPresences);
              break;
            case MatchOpCode.PLAYER_CALL_BOLONEY:
              console.log(sender.username, " Called Boloney: ");
              state.activePlayer = sender.userId;
              // TODO: Add "CallBoloney" logic
              // Broadcast action to everyone else
              dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_BOLONEY, JSON.stringify({ target: message.data }), otherPresences);
              // TODO: Transition stage to Round Summary after rendering outcome in the client
              break;
            case MatchOpCode.PLAYER_CALL_EXACT:
              console.log(sender.username, " Called Exact: ");
              state.activePlayer = sender.userId;
              // TODO: Add "CallExact" logic
              // Broadcast action to everyone else
              dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_EXACT, JSON.stringify({ target: message.data }), otherPresences);
              // TODO: Transition stage to Round Summary after rendering outcome in the client
              break;
            default:
              console.log("Unknown OP_CODE recieved: ", message.opCode);
              break;
          }
        }
        // TODO: Listen to other OP_CODES
        // if (message.opCode == MatchOpCode.PLAYER_READY) {
        //   state.playersReady.push(sender.userId);
        // }
      },
      async ({ logger }) => {
        logger.debug("Turn loop logic");
      },
      /*
       * In the turn loop players won't indicate that they are ready.
       * We'll move to the next stage only when the conditions are met.
       * Next stage transition will be trigger by a "round ending" action (exact, boloney)
       * TODO: Update how we signal the end of Player Turn Loop
       */
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
      async ({ logger }) => {
        logger.debug("round Summary logic");
      },
      ({ dispatcher }, nextStage) => {
        dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify({ matchStage: nextStage }));
      }
    ),
  // TODO: Add broadcast to inform the client when player has left the match
  endOfMatchStage: (loopParams) =>
    handleMatchStage(
      loopParams,
      (message, sender, { state }) => {
        if (message.opCode == MatchOpCode.PLAYER_READY) {
          state.playersReady.push(sender.userId);
        }
      },
      async ({ logger }) => {
        logger.debug("End of match logic");
      }
    ),
  // TODO: Add garbage collection logic to end the match
  terminateMatchStage: (loopParams) => loopParams.logger.info("Terminating Match: ", loopParams.ctx.matchId),
};
