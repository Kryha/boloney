import create from "zustand";

import { createAuthSlice, AuthSlice } from "./auth";
import { createUISlice, UISlice } from "./ui";
import { createMatchSlice, MatchSlice } from "./match";
import { createNotificationSlice, NotificationSlice } from "./notification";
import { ChatSlice, createChatSlice } from "./chat";

export const useStore = create<AuthSlice & UISlice & MatchSlice & NotificationSlice & ChatSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createUISlice(...a),
  ...createMatchSlice(...a),
  ...createNotificationSlice(...a),
  ...createChatSlice(...a),
}));

export const useSession = () => useStore((state) => state.session);
export const useIsAuthenticating = () => useStore((state) => state.isAuthenticating);
