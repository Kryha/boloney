import { MatchmakerMatched } from "@heroiclabs/nakama-js";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { text } from "../../assets";
import { FadeTransition, GeneralContentWrapper, Heading1, Heading4 } from "../../components";
import { PrimaryButton } from "../../molecules";

import { routes } from "../../navigation";
import { joinPool, nakama } from "../../service";
import { useSession, useStore } from "../../store";
import { cleanUUID } from "../../util";
import { MatchSelectContainer, ButtonContainer } from "./styles";

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
      <MatchSelectContainer>
        <GeneralContentWrapper>
          <Heading1>{text.home.helloYou}</Heading1>
          <Heading4>{text.home.chooseWisely}</Heading4>

          {/* TODO: abstract this button in a component, together with the useEffect and the join function */}
          <ButtonContainer>
            <PrimaryButton primaryText={text.home.quickPlay} onClick={() => joinMatchPool()} loading={isLoadingSpinnerVisible} />
          </ButtonContainer>

          <ButtonContainer>
            <PrimaryButton primaryText={text.home.createMatch} onClick={() => navigate(routes.newMatch)} />
          </ButtonContainer>
        </GeneralContentWrapper>
      </MatchSelectContainer>
    </FadeTransition>
  );
};
