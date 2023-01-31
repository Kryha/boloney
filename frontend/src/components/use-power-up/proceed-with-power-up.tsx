import { FC } from "react";

import { text } from "../../assets";
import { useMatch } from "../../service";
import { PowerUp } from "../../types";
import { powerUpRequiresTarget } from "../../util";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { SelectionView } from "../selection-view";

interface ProceedWithPowerUpProps {
  targetPlayerId?: string;
  activePowerUp: PowerUp;
}

/**
 * This component handles the views rendered before power-up use and the call to the game server.
 */
export const ProceedWithPowerUp: FC<ProceedWithPowerUpProps> = ({ targetPlayerId, activePowerUp }) => {
  const requiresTarget = powerUpRequiresTarget(activePowerUp.id);
  const { broadcastUsePowerUp } = useMatch();

  const handlePrimaryClick = async () => {
    await broadcastUsePowerUp();
  };

  if (!activePowerUp) return <></>;

  if (requiresTarget) return <SelectionView powerUpName={activePowerUp.name} userId={targetPlayerId} onClick={handlePrimaryClick} />;

  return (
    <BottomButtonWrapper>
      {/* TODO: finish component */}
      <Heading2>{text.newMatch.continueText}</Heading2>
    </BottomButtonWrapper>
  );
};
