import { FC } from "react";
import Highlighter from "react-highlight-words";

import { idlePlayerTurnData } from "../../assets";
import { useActivePlayer } from "../../service";
import { useStore } from "../../store";
import { TurnActionStep } from "../../types";
import { Heading2 } from "../atoms";
import { ErrorView } from "../error-view";
import { Timer } from "../timer";
import { FadeTransition } from "../page-transition";
import { color } from "../../design";

interface IdlePlayerHeaderProps {
  step?: TurnActionStep;
}

export const IdlePlayerHeader: FC<IdlePlayerHeaderProps> = ({ step }) => {
  const activePlayer = useActivePlayer();

  const round = useStore((state) => state.round);
  if (!activePlayer) return <ErrorView />;
  const headerData = idlePlayerTurnData(activePlayer, round, step);

  return (
    <>
      <Timer title={headerData.timerTitle} />
      <Heading2>
        {!!headerData.headingTitle && (
          <Highlighter
            highlightClassName="bold"
            searchWords={[activePlayer.username]}
            autoEscape
            textToHighlight={headerData.headingTitle}
          />
        )}
      </Heading2>
      {!!headerData.subHeadingTitle && (
        <FadeTransition key={headerData.subHeadingTitle}>
          <Heading2 customColor={color.darkGrey}>{headerData.subHeadingTitle}</Heading2>
        </FadeTransition>
      )}
    </>
  );
};
