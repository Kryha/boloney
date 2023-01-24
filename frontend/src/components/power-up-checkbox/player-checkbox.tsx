import { FC } from "react";
import { useStore } from "../../store";
import { RadioButton } from "./radio-checkbox";

interface PlayerCheckboxProps {
  userId: string;
  targetPlayerId?: string;
}

export const PlayerCheckboxProps: FC<PlayerCheckboxProps> = ({ userId, targetPlayerId }) => {
  const setTargetPowerUpPlayerId = useStore((state) => state.setTargetPowerUpPlayerId);

  return <RadioButton onSelect={() => setTargetPowerUpPlayerId(userId)} isChecked={userId === targetPlayerId} />;
};
