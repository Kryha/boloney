import { FC, useEffect } from "react";
import { useMatchMaker } from "../../service/match-maker";
import { useAuthState } from "../../store";
import { StyledLobby } from "./styles";

export const Lobby: FC = () => {
  // TODO: Implement the designs
  const { matchMaker, isLoading } = useMatchMaker();
  const socket = useAuthState((state) => state.socket);

  const onSubmit = async () => {
    matchMaker();
    // const match = await socket?.rpc("find_match");
    // console.log(match);
  };

  return (
    <StyledLobby>
      <h1>Hello Lobby</h1>
      {isLoading ? <h1> is Loading ----</h1> : <h1>---- Found a match</h1>}
      <button onClick={onSubmit}>Find a match</button>
    </StyledLobby>
  );
};
