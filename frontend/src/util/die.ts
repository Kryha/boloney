import { avatars } from "../assets";
import { PlayerPublic } from "../types";

export const getDieColor = (player: PlayerPublic): string => avatars[player.avatarId].color;
