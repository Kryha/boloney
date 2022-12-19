import { FC } from "react";
import { BoloneyToaster, text } from "../../assets";
import { CallAction } from "../call-action";

export const CallBoloney: FC = () => {
  return <CallAction image={BoloneyToaster} alt={text.playerTurn.boloney} isCallBoloney />;
};
