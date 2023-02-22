import { FC } from "react";
import { CallExact as Exact, text } from "../../assets";
import { FADE_TRANSITION_DURATION } from "../../constants";
import { CallAction } from "../call-action";
import { FadeTransition } from "../page-transition";

export const CallExact: FC = () => {
  return (
    <FadeTransition delay={FADE_TRANSITION_DURATION}>
      <CallAction image={Exact} alt={text.playerTurn.exact} />
    </FadeTransition>
  );
};
