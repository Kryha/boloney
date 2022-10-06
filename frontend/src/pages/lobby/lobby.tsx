import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContentWrapper, Heading1, Heading4, Heading6, PrimaryButton } from "../../components";
import { routes } from "../../navigation";
import { useMatchMaker } from "../../service/match-maker";
import { ButtonContainer } from "../new-game/styles";

export const Lobby: FC = () => {
  // TODO: Implement the designs

  const { matchMaker, joinMatch, isLoading } = useMatchMaker();
  const navigate = useNavigate();

  const createMatch = () => navigate(routes.newGame);
  const joinMatchById = async (matchId: string) => await joinMatch(matchId);
  const quickPlay = async () => matchMaker();

  return (
    <GeneralContentWrapper>
      <Heading1>Hello you!</Heading1>
      <Heading4>What would you like to do? Choose wisely...</Heading4>

      <ButtonContainer>
        <PrimaryButton text="Quick Play" onClick={quickPlay} />
      </ButtonContainer>

      <ButtonContainer>
        <PrimaryButton text="Create a match" onClick={createMatch} />
      </ButtonContainer>

      <ButtonContainer>
        <PrimaryButton text="Join match by ID:" onClick={() => joinMatchById("MATCHID")} />
      </ButtonContainer>

      {isLoading && <Heading6>Hang on to your butts...</Heading6>}
    </GeneralContentWrapper>
  );
};
