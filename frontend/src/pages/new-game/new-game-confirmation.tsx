import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { CopyIcon, text } from "../../assets";
import { Heading1, Heading4, Heading6, NewGameHands, Link, PrimaryButton } from "../../components";
import { routes } from "../../navigation";
import { CopyLink, GoToLobbyButton, NewGameConfirmationContainer } from "./styles";

interface Props {
  url: string;
  matchId: string;
}

export const NewGameConfirmation: FC<Props> = ({ url, matchId }) => {
  const navigate = useNavigate();

  return (
    <>
      <NewGameConfirmationContainer>
        <Heading1>{text.general.gameCreated}</Heading1>
        <Heading4>{text.general.yourGameHasBeenCreated}</Heading4>
        <Heading6>{text.general.onlyPlayersWithThisCode}</Heading6>
        <CopyLink>
          <Link text={url} onClick={() => navigator.clipboard.writeText(url)} />
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
