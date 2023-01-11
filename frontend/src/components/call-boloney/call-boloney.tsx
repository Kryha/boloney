import { FC } from "react";
import { CallBoloney as Boloney, text } from "../../assets";
import { CallAction } from "../call-action";

export const CallBoloney: FC = () => {
  return <CallAction image={Boloney} alt={text.playerTurn.boloney} isCallBoloney />;
};
