import { FC } from "react";
import { useMatch } from "../../service";
import { useStore } from "../../store";
import { getPowerUp } from "../../util";
import { SelectionView } from "../selection-view";

export const UseVendetta: FC = () => {
  const powerUp = getPowerUp("5");
  const { targetPlayerId } = useStore((state) => state.powerUpState);
  const { broadcastUsePowerUp } = useMatch();

  if (!powerUp) return <></>;

  const handleSubmit = async () => {
    if (!targetPlayerId) return;
    await broadcastUsePowerUp({ id: "5", data: { targetId: targetPlayerId } });
  };

  return <SelectionView powerUpName={powerUp.name} userId={targetPlayerId} onClick={handleSubmit} />;
};
