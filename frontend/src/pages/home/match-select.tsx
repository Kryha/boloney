import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { text } from "../../assets";
import { GeneralContentWrapper, Heading1, Heading4, Heading6, PrimaryButton } from "../../components";
import { routes } from "../../navigation";
import { useMatchMaker } from "../../service/match-maker";
import { ButtonContainer } from "../new-game/styles";
import { MatchSelectContainer } from "./styles";

export const MatchSelect: FC = () => {
  // TODO: Implement the designs

  const { joinPool, isLoading } = useMatchMaker();
  const navigate = useNavigate();

  return (
    <MatchSelectContainer>
      <GeneralContentWrapper>
        <Heading1>{text.home.helloYou}</Heading1>
        <Heading4>{text.home.chooseWisely}</Heading4>

        <ButtonContainer>
          <PrimaryButton text={text.home.quickPlay} onClick={async () => await joinPool()} />
        </ButtonContainer>

        <ButtonContainer>
          <PrimaryButton text={text.home.createMatch} onClick={() => navigate(routes.newGame)} />
        </ButtonContainer>

        {isLoading && <Heading6>{text.home.loading}</Heading6>}
      </GeneralContentWrapper>
    </MatchSelectContainer>
  );
};
