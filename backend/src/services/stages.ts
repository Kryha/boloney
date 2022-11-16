import { getPowerUp } from "../toolkit-api/power-ups";
import { isPowerUpId, MatchLoopParams, MatchOpCode, MatchStage } from "../types";
import { getRange, shuffleArray } from "../utils";
import { handleMatchStage, setAllPlayersReady, getNextPlayerId, getOtherPresences, setActivePlayer } from "./match";

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
        setActivePlayer(state.playerOrder[0], state.players);
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
        if (state.players[sender.userId].isActive) {
          const otherPresences = getOtherPresences(sender.userId, state.presences);

          switch (message.opCode) {
            case MatchOpCode.PLAYER_PLACE_BID:
              console.log(sender.username, " placed BID");

              // TODO: Add "PlaceBid" logic
              // TODO: Add "lastBid" property to the MatchState

              // Set next active player
              setActivePlayer(getNextPlayerId(sender.userId, state.playerOrder), state.players);
              // Broadcast PlaceBid action to everyone else
              dispatcher.broadcastMessage(
                MatchOpCode.PLAYER_PLACE_BID,
                JSON.stringify({ player: sender.userId, lastBid: message.data }),
                otherPresences
              );
              break;
            case MatchOpCode.PLAYER_CALL_BOLONEY:
              console.log(sender.username, " Called Boloney: ");

              setActivePlayer(sender.userId, state.players);

              // TODO: Add "CallBoloney" logic

              // Broadcast action to everyone else
              dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_BOLONEY, JSON.stringify({ player: sender.userId }), otherPresences);

              // TODO: Transition stage to Round Summary only after rendering outcome in the client
              setAllPlayersReady(state);

              break;
            case MatchOpCode.PLAYER_CALL_EXACT:
              console.log(sender.username, " Called Exact: ");

              // TODO: Add "CallExact" logic

              // Broadcast action to everyone else
              dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_EXACT, JSON.stringify({ player: sender.userId }), otherPresences);

              setActivePlayer(sender.userId, state.players);

              // TODO: Transition stage to Round Summary only after rendering outcome in the client
              setAllPlayersReady(state); // We set all the players in order to trigger the stage transition
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
      async ({ dispatcher, state }) => {
        // TODO: Check if we need to limit the broadcasting of this mesage as only one per turn.
        dispatcher.broadcastMessage(MatchOpCode.PLAYER_ACTIVE, JSON.stringify({ players: state.players }));
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
