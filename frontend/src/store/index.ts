import create from "zustand";

import { createAuthSlice, AuthSlice } from "./auth";
import { createUISlice, UISlice } from "./ui";
import { createMatchSlice, MatchSlice } from "./match";

export const useStore = create<AuthSlice & UISlice & MatchSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createUISlice(...a),
  ...createMatchSlice(...a),
}));
