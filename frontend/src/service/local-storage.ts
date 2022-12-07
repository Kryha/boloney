import { MatchSliceState } from "../store/match";

export const setIsMatchCreated = () => {
  localStorage.setItem("isMatchCreated", "true");
};

export const isInMatch = (): boolean => {
  return localStorage.getItem("isMatchCreated") === "true";
};

export const setLocalStorage = (matchState: MatchSliceState) => {
  try {
    localStorage.setItem("matchState", JSON.stringify(matchState));
  } catch (error) {
    console.log("User has disabled local storage");
    console.log(error);
  }
};

export const getLocalStorage = (): MatchSliceState => {
  // TODO: properly handle type: {} is not MAtchSliceState
  const matchState = JSON.parse(localStorage.getItem("matchState") || "{}");
  return matchState;
};

export const clearLocalStorage = (removeAuth = false) => {
  const auth_token = localStorage.getItem("auth_token");
  const refresh_token = localStorage.getItem("refresh_token");
  localStorage.clear();
  if (!removeAuth) {
    if (auth_token) localStorage.setItem("auth_token", auth_token);
    if (refresh_token) localStorage.setItem("refresh_token", refresh_token);
  }
};
