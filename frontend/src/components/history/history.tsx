import { FC } from "react";
import { text } from "../../assets/text";

import { useLayoutStore } from "../../service/layout-config";
import { MenuToggle } from "../menu-toggle";
import { HistoryWrapperSection } from "./styles";

// TODO: finish history component
export const History: FC = () => {
  const isHistoryToggled = useLayoutStore((state) => state.isHistoryToggled);
  const toggleHistory = useLayoutStore((state) => state.toggleHistory);

  return (
    <MenuToggle closeMenuItem={toggleHistory} isToggled={isHistoryToggled} title={text.general.history}>
      <HistoryWrapperSection></HistoryWrapperSection>
    </MenuToggle>
  );
};
