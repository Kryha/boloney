import { FC } from "react";
import { ExactDartBoard, text } from "../../assets";
import { CallAction } from "../call-action";

export const CallExact: FC = () => {
  return <CallAction image={ExactDartBoard} alt={text.playerTurn.exact} />;
};
