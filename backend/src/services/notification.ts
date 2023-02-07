import { MatchLoopParams, NotificationContent, NotificationOpCode } from "../types";
import { NOT_USED } from "../constants";
import { getFilteredPlayerIds, isMatchEnded } from "./player";

export const sendMatchNotification = (
  loopParams: MatchLoopParams,
  notificationCode: NotificationOpCode,
  content: NotificationContent,
  sender?: string,
  title = NOT_USED
) => {
  const { state, nk } = loopParams;
  if (isMatchEnded(state.players)) return;

  const idlePlayers = sender ? getFilteredPlayerIds(state.players, sender) : Object.keys(state.players);
  sendNotification(nk, idlePlayers, notificationCode, content, title);
};

export const sendNotification = (
  nk: nkruntime.Nakama,
  idlePlayers: string[],
  notificationCode: NotificationOpCode,
  content: NotificationContent,
  title = NOT_USED
) => {
  idlePlayers.forEach((id) => {
    nk.notificationSend(id, title, content, notificationCode);
  });
};
