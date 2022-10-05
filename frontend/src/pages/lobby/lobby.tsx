import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../navigation";
import { useMatchMaker } from "../../service/match-maker";
import { StyledLobby } from "./styles";

export const Lobby: FC = () => {
  // TODO: Implement the designs and add match selection
  // 1. useEffect to rpc find_match
  // 2. store/view open game count
  // 3. show new match button -> redirect to match create form
  // 4. show join match button with open match count in it -> join first game (or have it sort on player count so they fill up faster)

  const { findMatches, joinMatch, isLoading } = useMatchMaker();

  useEffect(() => {
    const init = async () => {
      const openMatches = [];
      // openMatches = await findMatches();
      // setOpenMatches(openMatches);
      setOpenMatchCount(openMatches.length);
    };
    init();
  }, []);

  const [openMatchCount, setOpenMatchCount] = useState(0);
  const [openMatches, setOpenMatches] = useState([]);
  const navigate = useNavigate();

  const onCreate = async () => {
    navigate(routes.newGame);
  };

  const onJoin = async () => {
    if (openMatchCount === 0) return;
    await joinMatch(openMatches[0]);
  };

  return (
    <StyledLobby>
      <h1>Hello Lobby 2</h1>
      {isLoading ? <h1> is Loading ----</h1> : <h1>---- Found a match</h1>}
      <button onClick={onCreate}>Create a match</button>
      {/* <button disabled={openMatchCount === 0} onClick={onJoin}> */}
      <button disabled={false} onClick={onJoin}>
        Join match ({openMatchCount} available)
      </button>
    </StyledLobby>
  );
};
