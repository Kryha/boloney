import { FC, ReactNode, useEffect } from "react";

import { ErrorView } from "../error-view";
import { isStageWithHUD } from "../../util";
import { notificationSound } from "../../assets";
import { ToastNotifications } from "../../molecules";
import { NkResponse, NotificationContent, PlayerPublic, MatchStage } from "../../types";
import { NOTIFICATION_VISIBILITY_TIME } from "../../constants";
import { ContentContainer, MainContentContainer } from "./styles";

interface MatchLayoutProps {
  localPlayer: PlayerPublic;
  matchStage: MatchStage;
  isInMatch: boolean;
  children?: ReactNode;
  notifications: NotificationContent[];
  deleteNotification: (notificationIds: string[]) => Promise<NkResponse<void>>;
  playSound: (audioFile: string) => Promise<void>;
}

/* This component is the main match layout. It contains the player menu, hud, local player, sidebar and navigation
 * @param {PlayerPublic} localPlayer - This is the local player object.
 * @param {MatchStage} matchStage - This is the stage of the match that you are in.
 * @param {boolean} isInMatch - This is a boolean that indicates if you are in the match or not.
 * @param {ReactNode} children - This is content that is displayed in the main area of the match layout.
 * @param {NotificationContent} - This is an array of notifications.
 * @param {Function} deleteNotification: - This is a function that accepts notification ids as a param and deletes them.
 * @param {Function} playSound: - This is a param that accepts an audio file as a param and plays a sound;
 */

export const MatchLayout: FC<MatchLayoutProps> = ({
  children,
  notifications,
  localPlayer,
  matchStage,
  isInMatch,
  deleteNotification,
  playSound,
}) => {
  const notification = notifications.at(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (notification) deleteNotification([notification.id]);
    }, NOTIFICATION_VISIBILITY_TIME);
    return () => clearTimeout(timer);
  }, [deleteNotification, notification]);

  useEffect(() => {
    playSound(notificationSound);
  }, [playSound]);

  if (!localPlayer) return <ErrorView />;

  return (
    <>
      {/* TODO: add all the other components */}
      <MainContentContainer isStageWithHUD={isStageWithHUD(matchStage)} isInMatch={isInMatch}>
        <ContentContainer>{children}</ContentContainer>
        {notification && (
          <ToastNotifications
            img={notification.img}
            heading={notification.title}
            subheading={notification.description}
            isMultipleNotifications={notifications.length > 1}
            wordsToBold={notification.boldText}
            closeToast={() => deleteNotification([notification.id])}
          />
        )}
      </MainContentContainer>
    </>
  );
};
