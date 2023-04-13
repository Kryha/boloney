import { FC } from "react";
import { text } from "../../assets";
import { inputWidth } from "../../design";
import { useStore } from "../../store";
import { Checkbox } from "../checkbox";
import { SoundToggleWrapper } from "./styles";

export const SoundToggle: FC = () => {
  const isSoundEnabled = useStore((state) => state.isSoundEnabled);
  const setSoundEnabled = useStore((state) => state.setSoundEnabled);

  const handleCheck = () => {
    setSoundEnabled(!isSoundEnabled);
  };

  return (
    <SoundToggleWrapper>
      <Checkbox
        isChecked={isSoundEnabled}
        toggleCheck={handleCheck}
        description={text.param.soundOnOrOff(isSoundEnabled)}
        size={inputWidth.xs}
      />
    </SoundToggleWrapper>
  );
};
