import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContentWrapper, Heading1, Heading4, Heading6, PrimaryButton } from "../../components";
import { routes } from "../../navigation";
import { useMatchMaker } from "../../service/match-maker";
import { ButtonContainer } from "../new-game/styles";

export const Lobby: FC = () => {
  // TODO: Implement the designs

  const { findMatches, joinMatch, isLoading } = useMatchMaker();
  const [openMatchCount, setOpenMatchCount] = useState(0);
  const [openMatches, setOpenMatches] = useState([""]);
  const navigate = useNavigate();

  useEffect(() => {
    const update = async () => {
      const openMatches = await findMatches();
      setOpenMatches(openMatches);
      setOpenMatchCount(openMatches.length);
    };
    update();
  }, [findMatches]);

  const onCreate = async () => {
    navigate(routes.newGame);
  };

  const onJoin = async () => {
    if (openMatchCount === 0) return;
    await joinMatch(openMatches[0]);
  };

  return (
    <GeneralContentWrapper>
      <Heading1>Hello Lobby!</Heading1>
      <Heading4>What would you like to do? Choose wisely...</Heading4>

      <ButtonContainer>
        <PrimaryButton text="Create a match" onClick={onCreate} />
      </ButtonContainer>

      <ButtonContainer>
        <PrimaryButton text={`Join match (${openMatchCount} available)`} disabled={openMatchCount === 0} onClick={onJoin} />
      </ButtonContainer>

      {isLoading && <Heading6>Hang on to your butts...</Heading6>}
    </GeneralContentWrapper>
  );
};
