import { FC } from "react";
import Highlighter from "react-highlight-words";

import { useLocalPlayer } from "../../service";
import { text } from "../../assets";
import { BottomButtonWrapper, Heading1, Heading2 } from "../atoms";
import { Timer } from "../timer";
import { color } from "../../design";
import { ErrorView } from "../error-view";
import { ButtonReady } from "../button-ready";
import { useEffectOnce } from "usehooks-ts";
import { useStore } from "../../store";

export const GetPowerUps: FC = () => {
  const localPlayer = useLocalPlayer();
  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);

  useEffectOnce(() => {
    setSpinnerVisibility(true);
  });

  if (!localPlayer) return <ErrorView />;

  return (
    <BottomButtonWrapper>
      <Timer title={text.powerUps.settingItUp} />
      <Heading1>{text.powerUps.getYourPowerUps}</Heading1>
      <Heading2 customColor={color.darkGrey}>
        <Highlighter
          highlightClassName="bold"
          searchWords={[localPlayer.username]}
          autoEscape
          textToHighlight={text.param.powerUpsHiddenMoves(localPlayer.username)}
        />
      </Heading2>

      <ButtonReady />
    </BottomButtonWrapper>
  );
};
