import { FC } from "react";

import { useLocalPlayer } from "../../service";
import { text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { Timer } from "../timer";
import { color } from "../../design";
import { ErrorView } from "../error-view";
import { ButtonReady } from "../button-ready";

export const GetPowerUps: FC = () => {
  const localPlayer = useLocalPlayer();

  if (!localPlayer) return <ErrorView />;

  return (
    <BottomButtonWrapper>
      <Timer title={text.powerUps.settingItUp} />
      <Heading2 customColor={color.darkGrey}>{text.param.powerUpsHiddenMoves(localPlayer.username)}</Heading2>

      <ButtonReady />
    </BottomButtonWrapper>
  );
};
