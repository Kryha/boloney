import { MatchLoopParams, NotificationContent, NotificationOpCode } from "../types";
import { NOT_USED } from "../constants";
import { isMatchEnded } from "./player";

export const sendMatchNotification = (
  loopParams: MatchLoopParams,
  notificationCode: NotificationOpCode,
  content: NotificationContent,
  receiversIds?: string[],
  title = NOT_USED
) => {
  const { state, nk } = loopParams;
  if (isMatchEnded(state.players)) return;

  const idlePlayers = receiversIds ?? Object.keys(state.players);
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
