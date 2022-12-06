import { FC } from "react";
import { Heading4 } from "../atoms/text";
import { text } from "../../assets/text";

import { Close, HistoryHeadingSection, HistorySection } from "./styles";
import { useLayoutStore } from "../../service/layout-config";
import { useIsInMatch } from "../../service";

// TODO: finish history component
export const History: FC = () => {
  const isChatToggled = useLayoutStore((state) => state.isChatToggled);
  const isHistoryToggled = useLayoutStore((state) => state.isHistoryToggled);
  const toggleHistory = useLayoutStore((state) => state.toggleHistory);
  const isInMatch = useIsInMatch();

  return (
    <HistorySection isChatToggled={isChatToggled} onClick={() => toggleHistory()} isToggled={isHistoryToggled} isInMatch={isInMatch}>
      <HistoryHeadingSection>
        <Heading4>{text.general.history}</Heading4>
        <Close />
      </HistoryHeadingSection>
    </HistorySection>
  );
};
