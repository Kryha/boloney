import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContentWrapper, Heading1, Heading4, Heading6, PrimaryButton } from "../../components";
import { routes } from "../../navigation";
import { useMatchMaker } from "../../service/match-maker";
import { ButtonContainer } from "../new-game/styles";
import { HomeContainer } from "./style";

export const MatchSelect: FC = () => {
  // TODO: Implement the designs

  const { matchMaker, isLoading } = useMatchMaker();
  const navigate = useNavigate();

  const createMatch = () => navigate(routes.newGame);
  const quickPlay = async () => matchMaker();

  return (
    <HomeContainer>
      <GeneralContentWrapper>
        <Heading1>Hello you!</Heading1>
        <Heading4>What would you like to do? Choose wisely...</Heading4>

        <ButtonContainer>
          <PrimaryButton text="Quick Play" onClick={quickPlay} />
        </ButtonContainer>

        <ButtonContainer>
          <PrimaryButton text="Create a match" onClick={createMatch} />
        </ButtonContainer>

        {isLoading && <Heading6>Hang on to your butts...</Heading6>}
      </GeneralContentWrapper>
    </HomeContainer>
  );
};
