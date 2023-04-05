import { FC } from "react";
import { text } from "../../assets/text";
import { color } from "../../design";
import { useLocalPlayer } from "../../service";

import { useLayoutStore } from "../../service/layout-config";
import { useStore } from "../../store";
import { MenuToggle } from "../menu-toggle";
import { MatchHistoryComponent } from "./match-history";
import { EmptyHistoryTitle, HistoryWrapperSection } from "./styles";

export const History: FC = () => {
  const isHistoryToggled = useLayoutStore((state) => state.isHistoryToggled);
  const toggleHistory = useLayoutStore((state) => state.toggleHistory);
  const historyEvents = useStore((state) => state.historyEvents);
  const players = useStore((state) => state.players);
  const localPlayer = useLocalPlayer();

  if (!localPlayer) return <></>;

  return (
    <MenuToggle closeMenuItem={toggleHistory} isToggled={isHistoryToggled} title={text.general.history}>
      <HistoryWrapperSection>
        {historyEvents.length ? (
          <MatchHistoryComponent historyEvents={historyEvents} players={players} localPlayer={localPlayer} />
        ) : (
          <EmptyHistoryTitle customcolor={color.darkGrey}>{text.history.whenTheGameStarts}</EmptyHistoryTitle>
        )}
      </HistoryWrapperSection>
    </MenuToggle>
  );
};
