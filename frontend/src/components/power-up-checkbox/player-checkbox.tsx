import { FC } from "react";
import { useStore } from "../../store";
import { RadioButton } from "./radio-checkbox";

interface PlayerCheckboxProps {
  userId: string;
  targetPlayerId?: string;
}

export const PlayerCheckboxProps: FC<PlayerCheckboxProps> = ({ userId, targetPlayerId }) => {
  const setPowerUpState = useStore((state) => state.setPowerUpState);

  return <RadioButton onSelect={() => setPowerUpState({ targetPlayerId: userId })} isChecked={userId === targetPlayerId} />;
};
