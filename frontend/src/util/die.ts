import { avatars } from "../assets";
import { AvatarColor, PlayerPublic } from "../types";

export const getDieColor = (player: PlayerPublic): AvatarColor => avatars[player.avatarId].color;
