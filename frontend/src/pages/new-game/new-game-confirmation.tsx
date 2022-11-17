import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { CopyIcon, text } from "../../assets";
import { Heading1, Heading4, Heading6, NewGameHands, Link, PrimaryButton } from "../../components";
import { routes } from "../../navigation";
import { useStore } from "../../store";
import { CopyLink, GoToLobbyButton, NewGameConfirmationContainer } from "./styles";

export const NewGameConfirmation: FC = () => {
  const navigate = useNavigate();

  const matchId = useStore((state) => state.matchId);
  const matchUrl = useStore((state) => state.matchUrl);

  return (
    <>
      <NewGameConfirmationContainer>
        <Heading1>{text.general.gameCreated}</Heading1>
        <Heading4>{text.general.yourGameHasBeenCreated}</Heading4>
        <Heading6>{text.general.onlyPlayersWithThisCode}</Heading6>
        <CopyLink onClick={() => navigator.clipboard.writeText(matchUrl)}>
          <Link text={matchUrl} />
          <CopyIcon />
        </CopyLink>
      </NewGameConfirmationContainer>
      <GoToLobbyButton>
        <PrimaryButton text={text.general.goToLobby} onClick={() => navigate(`${routes.match}/${matchId}`)} />
      </GoToLobbyButton>
      <NewGameHands />
    </>
  );
};
