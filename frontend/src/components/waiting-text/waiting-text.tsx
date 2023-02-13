import { FC, useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { waitingText } from "../../assets";
import { FADE_INTERVAL_MS, WORD_CHANGE_INTERVAL_MS } from "../../constants";
import { color } from "../../design";

import { Heading2 } from "../atoms";
import { AnimatedTextWrapper } from "./styles";

interface Props {
  headingTwo: string;
  wordsToBold?: string[] | RegExp[];
}

type FadeProp = { fade: "fade-in" | "fade-out" };

export const AnimatedWaitingText: FC<Props> = ({ headingTwo, wordsToBold = [] }) => {
  const [fade, setFade] = useState<FadeProp>({ fade: "fade-in" });
  const [wordOrder, setWordOrder] = useState(0);
  const wordsToAnimate = [...waitingText, headingTwo];

  useEffect(() => {
    const fadeTimeout = setInterval(() => {
      fade.fade === "fade-in" ? setFade({ fade: "fade-out" }) : setFade({ fade: "fade-in" });
    }, FADE_INTERVAL_MS);

    return () => clearInterval(fadeTimeout);
  }, [fade]);

  useEffect(() => {
    const wordTimeout = setInterval(() => {
      setWordOrder((prevWordOrder) => (prevWordOrder + 1) % wordsToAnimate.length);
    }, WORD_CHANGE_INTERVAL_MS);

    return () => clearInterval(wordTimeout);
  }, [wordsToAnimate.length]);

  return (
    <AnimatedTextWrapper className={fade.fade}>
      <Heading2 customColor={color.darkGrey}>
        <Highlighter
          className={fade.fade}
          highlightClassName="bold"
          searchWords={wordsToBold}
          autoEscape
          textToHighlight={wordsToAnimate[wordOrder]}
        />
      </Heading2>
    </AnimatedTextWrapper>
  );
};
