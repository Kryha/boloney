import { FC } from "react";
import { useEffectOnce } from "usehooks-ts";

import { text } from "../../assets";
import { BottomButtonWrapper } from "../../atoms";
import { useClientTimer } from "../../hooks";
import { PlayerPublic } from "../../types";
import { ColumnHeading, FadeTransition } from "../../molecules";
import { Timer } from "../timer";
import { color, spacing } from "../../design";
import { MatchHeadingColumn } from "./styles";
import { ButtonReady } from "../button-ready";

interface Props {
  localPlayer: PlayerPublic;
  setSpinnerVisibility: (isVisible: boolean) => void;
}
export const GetPowerUps: FC<Props> = ({ localPlayer, setSpinnerVisibility }) => {
  useClientTimer();

  useEffectOnce(() => {
    setSpinnerVisibility(true);
  });

  return (
    <FadeTransition>
      <BottomButtonWrapper marginLeft="1px" marginBottom="0px">
        <MatchHeadingColumn gap={spacing.s}>
          <Timer title={text.powerUps.settingItUp} />
          <ColumnHeading
            heading={text.powerUps.getYourPowerUps}
            subheading={text.param.powerUpsHiddenMoves(localPlayer.username)}
            subheadingColor={color.darkGrey}
            wordsToBold={[localPlayer.username]}
            gap={spacing.xs}
          />
        </MatchHeadingColumn>
        <ButtonReady />
      </BottomButtonWrapper>
    </FadeTransition>
  );
};
