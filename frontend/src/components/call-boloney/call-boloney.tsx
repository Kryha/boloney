import { FC } from "react";
import { CallBoloney as Boloney, text } from "../../assets";
import { FADE_TRANSITION_DURATION } from "../../constants";
import { CallAction } from "../call-action";
import { FadeTransition } from "../page-transition";

export const CallBoloney: FC = () => {
  return (
    <FadeTransition delay={FADE_TRANSITION_DURATION}>
      <CallAction image={Boloney} alt={text.playerTurn.boloney} isCallBoloney />
    </FadeTransition>
  );
};
