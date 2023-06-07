import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MatchmakerMatched } from "@heroiclabs/nakama-js";

import { text } from "../../assets";
import { ButtonWithTooltip, ColumnHeading, FadeTransition } from "../../molecules";
import { routes } from "../../navigation";
import { joinPool, nakama } from "../../service";
import { useSession, useStore } from "../../store";
import { cleanUUID } from "../../util";
import { MatchSelectWrapper, MatchSelectContainer } from "./styles";
import { fontSizes, lineHeights, spacing, zIndex } from "../../design";

export const MatchSelect: FC = () => {
  const session = useSession();
  const navigate = useNavigate();

  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);
  const isLoadingSpinnerVisible = useStore((state) => state.isLoadingSpinnerVisible);
  const closeModal = useStore((state) => state.closeModal);

  useEffect(() => {
    if (!session) return;
    nakama.socket.onmatchmakermatched = (matched: MatchmakerMatched) => {
      setSpinnerVisibility(false);
      const matchId = cleanUUID(matched.match_id);
      navigate(`${routes.match}/${matchId}`);
    };
  }, [closeModal, session, navigate, setSpinnerVisibility]);

  const joinMatchPool = () => {
    setSpinnerVisibility(true);
    joinPool();
  };

  return (
    <FadeTransition>
      <MatchSelectWrapper>
        <ColumnHeading
          heading={text.home.helloYou}
          subheading={text.home.chooseWisely}
          gap={spacing.md}
          headingFontSize={fontSizes.heading1}
          headingLineHeight={lineHeights.heading1}
          subheadingFontSize={fontSizes.heading4}
          subheadingLineHeight={lineHeights.heading4}
        />
      </MatchSelectWrapper>

      <MatchSelectContainer justifyContent="flex-end" alignItems="flex-end" gap={spacing.xl}>
        <ButtonWithTooltip
          tooltipTitle={text.home.quickPlay}
          tooltipInfo={text.home.quickPlayDescription}
          tooltipInfoPosition="left"
          zIndex={zIndex.inFront}
          primaryText={text.home.quickPlay}
          onClick={() => joinMatchPool()}
          isLoading={isLoadingSpinnerVisible}
          flexDirection="row-reverse"
        />
        <ButtonWithTooltip
          tooltipTitle={text.home.createMatch}
          tooltipInfo={text.home.createMatchDescription}
          tooltipInfoPosition="left"
          zIndex={zIndex.inFront}
          primaryText={text.home.createMatch}
          onClick={() => navigate(routes.newMatch)}
          flexDirection="row-reverse"
        />
      </MatchSelectContainer>
    </FadeTransition>
  );
};
