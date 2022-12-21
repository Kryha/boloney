import create from "zustand";

import { createAuthSlice, AuthSlice } from "./auth";
import { createUISlice, UISlice } from "./ui";
import { createMatchSlice, MatchSlice } from "./match";
import { createNotificationSlice, NotificationSlice } from "./notification";

export const useStore = create<AuthSlice & UISlice & MatchSlice & NotificationSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createUISlice(...a),
  ...createMatchSlice(...a),
  ...createNotificationSlice(...a),
}));

export const useSession = () => useStore((state) => state.session);
export const useIsAuthenticating = () => useStore((state) => state.isAuthenticating);
