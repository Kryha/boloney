import { FC } from "react";

import { text } from "../../assets";
import { BottomButtonWrapper, Heading1 } from "../atoms";

import { ButtonReady } from "../button-ready";

// TODO: finish component
export const EndOfRound: FC = () => {
  return (
    <BottomButtonWrapper>
      <Heading1>{text.match.endOfRound}</Heading1>
      <ButtonReady />
    </BottomButtonWrapper>
  );
};
