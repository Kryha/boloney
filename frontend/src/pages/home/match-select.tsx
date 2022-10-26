import { MatchmakerMatched } from "@heroiclabs/nakama-js";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { text } from "../../assets";
import { GeneralContentWrapper, Heading1, Heading4, Heading6, PrimaryButton } from "../../components";
import { routes } from "../../navigation";
import { useMatchMaker } from "../../service";
import { useAuthState } from "../../store";
import { ButtonContainer } from "../new-game/styles";
import { MatchSelectContainer } from "./styles";

export const MatchSelect: FC = () => {
  // TODO: Implement the designs
  const socket = useAuthState((state) => state.socket);
  const { joinPool, isLoading } = useMatchMaker();
  const navigate = useNavigate();

  // TODO: define these in a service ?
  useEffect(() => {
    if (!socket) return;

    socket.onmatchmakermatched = (matched: MatchmakerMatched) => {
      navigate(`${routes.lobby}/${matched.match_id}`);
    };
  }, [joinPool, navigate, socket]);

  return (
    <MatchSelectContainer>
      <GeneralContentWrapper>
        <Heading1>{text.home.helloYou}</Heading1>
        <Heading4>{text.home.chooseWisely}</Heading4>

        <ButtonContainer>
          <PrimaryButton text={text.home.quickPlay} onClick={() => joinPool()} />
        </ButtonContainer>

        <ButtonContainer>
          <PrimaryButton text={text.home.createMatch} onClick={() => navigate(routes.newGame)} />
        </ButtonContainer>

        {isLoading && <Heading6>{text.home.loading}</Heading6>}
      </GeneralContentWrapper>
    </MatchSelectContainer>
  );
};
