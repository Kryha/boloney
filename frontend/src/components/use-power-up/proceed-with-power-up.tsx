import { FC } from "react";
import { text } from "../../assets";

import { PowerUp } from "../../types";
import { powerUpRequiresTarget } from "../../util";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { SelectionView } from "../selection-view";

interface ProceedWithPowerUpProps {
  targetPlayerId?: string;
  activePowerUp: PowerUp;
  onClick?: () => void;
}

export const ProceedWithPowerUp: FC<ProceedWithPowerUpProps> = ({ targetPlayerId, activePowerUp, onClick }) => {
  const requiresTarget = powerUpRequiresTarget(activePowerUp.id);

  if (!activePowerUp) return <></>;

  if (requiresTarget) return <SelectionView powerUpName={activePowerUp.name} userId={targetPlayerId} onClick={onClick} />;

  return (
    <BottomButtonWrapper>
      {/* TODO: finish component */}
      <Heading2>{text.newMatch.continueText}</Heading2>
    </BottomButtonWrapper>
  );
};
