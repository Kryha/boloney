import { text } from "../text";
import { AvatarId, isAvatarId, MatchStage, MatchState, Player } from "../types";
import { handleError } from "../utils";

export const getMessageSender = (state: MatchState, message: nkruntime.MatchMessage, logger: nkruntime.Logger): Player => {
  const messageSender = state.players[message.sender.userId];
  //TODO check if this condition needs to be checked
  if (!messageSender) throw handleError(text.error.notFound, logger, nkruntime.Codes.NOT_FOUND);
  return messageSender;
};

export const isGameActive = (state: MatchState): boolean => {
  // If we have no presences in the match according to the match state, increment the empty ticks count or reset once a player has joined
  if (!state.players) {
    state.emptyTicks++;
  } else {
    state.emptyTicks = 0;
  }
  // If the match has been empty for more than 500 ticks, end the match by returning null
  if (state.emptyTicks > 500) return false;
  return true;
};

export const canTransitionStage = (state: MatchState, nextStage: MatchStage): boolean => {
  if (state.stageReady.length !== state.settings.players) return false;
  state.matchStage = nextStage;
  state.stageReady = [];
  return true;
};

export const getAvailableAvatar = (state: MatchState): AvatarId => {
  const avatarIds = [1, 2, 3, 4, 5, 6, 7];
  const playerArr = Object.values(state.players);

  playerArr.forEach((player) => {
    avatarIds.splice(avatarIds.indexOf(player.avatarId), 1);
  });
  const id = avatarIds[Math.floor(Math.random() * avatarIds.length)];
  if (isAvatarId(id)) return id;
  //TODO add proper error
  throw new Error("");
};
