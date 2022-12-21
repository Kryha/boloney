import { NotificationContent, NotificationOpCode } from "../types";
import { NOT_USED } from "../constants";

export const sendNotification = (
  nk: nkruntime.Nakama,
  receivingPlayersIds: string[],
  notificationCode: NotificationOpCode,
  content: NotificationContent,
  title = NOT_USED
) => {
  receivingPlayersIds.forEach((id) => {
    nk.notificationSend(id, title, content, notificationCode);
  });
};
