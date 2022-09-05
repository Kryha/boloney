import { FC } from "react";
import { Heading4 } from "../atoms/text";
import { text } from "../../assets/text";

import { Close, HistoryHeadingSection, HistorySection } from "./styles";
import { useLayoutStore } from "../../service/layout-config";

// TODO: finish history component
export const History: FC = () => {
  const isChatToggled = useLayoutStore((state) => state.isChatToggled);
  const isHistoryToggled = useLayoutStore((state) => state.isHistoryToggled);
  const toggleHistory = useLayoutStore((state) => state.toggleHistory);

  return (
    <HistorySection isChatToggled={isChatToggled} onClick={() => toggleHistory()} isToggled={isHistoryToggled}>
      <HistoryHeadingSection>
        <Heading4>{text.general.history}</Heading4>
        <Close />
      </HistoryHeadingSection>
    </HistorySection>
  );
};
