import { MatchmakerMatched } from "@heroiclabs/nakama-js";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { text } from "../../assets";
import { GeneralContentWrapper, Heading1, Heading4, PrimaryButton } from "../../components";

import { routes } from "../../navigation";
import { clearLocalStorage, useMatchMaker } from "../../service";
import { useStore } from "../../store";
import { splitMatchId } from "../../util";
import { MatchSelectContainer, ButtonContainer } from "./styles";

export const MatchSelect: FC = () => {
  // TODO: Implement the designs
  const socket = useStore((state) => state.socket);
  const { joinPool } = useMatchMaker();
  const navigate = useNavigate();
  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);
  const closeModal = useStore((state) => state.closeModal);

  // TODO: define these in a service, improve this logic, discuss the whole flow
  useEffect(() => {
    if (!socket) return;

    socket.onmatchmakermatched = (matched: MatchmakerMatched) => {
      clearLocalStorage();
      setSpinnerVisibility(false);
      const matchId = splitMatchId(matched.match_id);
      navigate(`${routes.match}/${matchId}`);
    };
  }, [closeModal, navigate, setSpinnerVisibility, socket]);

  const joinMatchPool = () => {
    setSpinnerVisibility(true);
    joinPool();
  };

  return (
    <>
      <MatchSelectContainer>
        <GeneralContentWrapper>
          <Heading1>{text.home.helloYou}</Heading1>
          <Heading4>{text.home.chooseWisely}</Heading4>

          <ButtonContainer>
            <PrimaryButton
              text={text.home.quickPlay}
              onClick={() => {
                joinMatchPool();
              }}
            />
          </ButtonContainer>

          <ButtonContainer>
            <PrimaryButton text={text.home.createMatch} onClick={() => navigate(routes.newGame)} />
          </ButtonContainer>
        </GeneralContentWrapper>
      </MatchSelectContainer>
    </>
  );
};
