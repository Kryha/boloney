import { text } from "../text";
import { AvatarId, isAvatarId, MatchStage, MatchState, Player } from "../types";
import { handleError } from "../utils";

export const getMessageSender = (state: MatchState, message: nkruntime.MatchMessage, logger: nkruntime.Logger): Player => {
  const messageSender = state.players[message.sender.userId];
  //TODO check if this condition needs to be checked
  if (!messageSender) throw handleError(text.error.notFound, logger, nkruntime.Codes.NOT_FOUND);
  return messageSender;
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
