import { handleMatchStage, setAllPlayersReady, getNextPlayerId, getOtherPresences, setActivePlayer, attemptSetPlayerReady } from "./match";
import { getPowerUp, rollDice } from "../toolkit-api";
import { isPowerUpId, MatchLoopParams, MatchOpCode, MatchStage, RollDicePayload } from "../types";
import { getRange, hidePlayersData, shuffleArray } from "../utils";

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
          attemptSetPlayerReady(state, sender.userId);
          const payload = hidePlayersData(state.players);
          dispatcher.broadcastMessage(MatchOpCode.PLAYER_READY, JSON.stringify(payload));
        }
      },
      async ({ logger }) => {
        logger.debug("Lobby stage");
      },
      ({ state, dispatcher }, nextStage) => {
        state.playerOrder = shuffleArray(state.playerOrder);
        const activePlayerId = state.playerOrder[0];
        setActivePlayer(activePlayerId, state.players);

        // TODO: We may need to combine this into one message
        dispatcher.broadcastMessage(MatchOpCode.PLAYER_ORDER_SHUFFLE, JSON.stringify({ playerOrder: state.playerOrder }));
        dispatcher.broadcastMessage(MatchOpCode.PLAYER_ACTIVE, JSON.stringify({ activePlayerId }));
        dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify({ matchStage: nextStage }));
      }
    ),

  getPowerUpStage: (loopParams) =>
    handleMatchStage(
      loopParams,
      (message, sender, { state }) => {
        if (message.opCode === MatchOpCode.PLAYER_READY) {
          attemptSetPlayerReady(state, sender.userId);
        }
      },
      async ({ state, dispatcher }) => {
        const playersList = Object.values(state.players);
        const initialPowerUpAmount = state.settings.initialPowerUpAmount;
        const range = getRange(initialPowerUpAmount);

        await Promise.all(
          playersList.map(async (player) => {
            if (player.hasInitialPowerUps) return;

            await Promise.all(
              range.map(async () => {
                const powerUpId = await getPowerUp(state.settings.powerUpProbability);
                if (isPowerUpId(powerUpId)) player.powerUpIds.push(powerUpId);
              })
            );

            player.hasInitialPowerUps = true;
            dispatcher.broadcastMessage(MatchOpCode.PLAYER_GET_POWERUPS, JSON.stringify(player.powerUpIds), [
              state.presences[player.userId],
            ]);
          })
        );
      },
      ({ dispatcher }, nextStage) => {
        dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify({ matchStage: nextStage }));
      }
    ),

  rollDiceStage: (loopParams) =>
    handleMatchStage(
      loopParams,
      async (message, sender, { state, dispatcher }) => {
        // TODO: make a function with a switch for checking opCodes and pass a callback
        if (message.opCode === MatchOpCode.PLAYER_READY) {
          attemptSetPlayerReady(state, sender.userId);
        }

        if (message.opCode === MatchOpCode.ROLL_DICE) {
          const { userId } = message.sender;
          const player = state.players[userId];

          if (player.hasRolledDice) return;

          state.players[userId].hasRolledDice = true; // this has to be here in order to prevent user spamming

          try {
            const diceValue = await rollDice(player.diceAmount);
            state.players[userId].diceValue = diceValue;

            const payload: RollDicePayload = { diceValue };
            dispatcher.broadcastMessage(MatchOpCode.ROLL_DICE, JSON.stringify(payload), [message.sender]);
          } catch (error) {
            state.players[userId].hasRolledDice = false;
            throw error;
          }
        }
      },
      async () => {
        // TODO: maybe add rolling here in the future in order to optimise the calculation
        // Not needed for now
      },
      ({ dispatcher, state }, nextStage) => {
        // TODO: Refactor as a helper like "resetPlayerRolled"
        Object.values(state.players).forEach((player) => {
          state.players[player.userId].hasRolledDice = false;
        });
        dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify({ matchStage: nextStage }));
      }
    ),

  playerTurnLoopStage: (loopParams) =>
    handleMatchStage(
      loopParams,
      (message, sender, { state, dispatcher, logger }) => {
        if (state.players[sender.userId].isActive) {
          const otherPresences = getOtherPresences(sender.userId, state.presences);
          let nextActivePlayerId = "";
          switch (message.opCode) {
            case MatchOpCode.PLAYER_PLACE_BID:
              logger.info(sender.username, " placed BID");

              // TODO: Add "PlaceBid" logic
              // TODO: Add "lastBid" property to the MatchState
              nextActivePlayerId = setActivePlayer(getNextPlayerId(sender.userId, state.playerOrder), state.players);
              // Set next active player

              // Broadcast PlaceBid action to everyone else
              dispatcher.broadcastMessage(
                MatchOpCode.PLAYER_PLACE_BID,
                JSON.stringify({ player: sender.userId, lastBid: message.data }),
                otherPresences
              );

              dispatcher.broadcastMessage(MatchOpCode.PLAYER_ACTIVE, JSON.stringify({ activePlayerId: nextActivePlayerId }));
              break;
            case MatchOpCode.PLAYER_CALL_BOLONEY:
              logger.info(sender.username, " Called Boloney: ");

              setActivePlayer(sender.userId, state.players);

              // TODO: Add "CallBoloney" logic

              // Broadcast action to everyone else
              dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_BOLONEY, JSON.stringify({ player: sender.userId }), otherPresences);

              // TODO: Transition stage to Round Summary only after rendering outcome in the client
              setAllPlayersReady(state);
              break;
            case MatchOpCode.PLAYER_CALL_EXACT:
              logger.info(sender.username, " Called Exact");

              // TODO: Add "CallExact" logic

              // Broadcast action to everyone else
              dispatcher.broadcastMessage(MatchOpCode.PLAYER_CALL_EXACT, JSON.stringify({ player: sender.userId }), otherPresences);

              setActivePlayer(sender.userId, state.players);

              // TODO: Transition stage to Round Summary only after rendering outcome in the client
              setAllPlayersReady(state); // We set all the players in order to trigger the stage transition
              break;
            default:
              logger.info("Unknown OP_CODE recieved: ", message.opCode);
              break;
          }
        }

        // TODO: Listen to other OP_CODES from Idle Players?
        if (message.opCode === MatchOpCode.PLAYER_READY) {
          attemptSetPlayerReady(state, sender.userId);
        }
      },
      async () => {
        // Unused for now
      },
      /*
       * In the turn loop players won't indicate that they are ready.
       * We'll move to the next stage only when the conditions are met.
       * Next stage transition will be trigger by a "round ending" action (exact, boloney)
       */
      ({ dispatcher }, nextStage) => {
        dispatcher.broadcastMessage(MatchOpCode.STAGE_TRANSITION, JSON.stringify({ matchStage: nextStage }));
      }
    ),

  roundSummaryStage: (loopParams) =>
    handleMatchStage(
      loopParams,
      (message, sender, { state }) => {
        if (message.opCode === MatchOpCode.PLAYER_READY) {
          attemptSetPlayerReady(state, sender.userId);
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
        if (message.opCode === MatchOpCode.PLAYER_READY) {
          attemptSetPlayerReady(state, sender.userId);
        }
      },
      async ({ logger }) => {
        logger.debug("End of match logic");
      }
    ),
  // TODO: Add garbage collection logic to end the match
  terminateMatchStage: (loopParams) => loopParams.logger.info("Terminating Match: ", loopParams.ctx.matchId),
};
