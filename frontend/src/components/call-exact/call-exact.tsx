import { FC } from "react";
import { CallExact as Exact, text } from "../../assets";
import { CallAction } from "../call-action";

export const CallExact: FC = () => {
  return <CallAction image={Exact} alt={text.playerTurn.exact} />;
};
