import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { CopyIcon, text } from "../../assets";

import { Heading1, Heading4, NewGameHands } from "../../components";
import { Link, PrimaryButton } from "../../components/buttons";
import { routes } from "../../navigation";
import { CopyLink, GoToLobbyButton, NewGameConfirmationContainer } from "./styles";

interface Props {
  url: string;
}

export const NewGameConfirmation: FC<Props> = ({ url }) => {
  const navigate = useNavigate();

  return (
    <>
      <NewGameConfirmationContainer>
        <Heading1>{text.general.gameCreated}</Heading1>
        <Heading4>{text.general.yourGameHasBeenCreated}</Heading4>
        <CopyLink>
          {/* TODO: update with app url */}
          <Link text={url} onClick={() => navigator.clipboard.writeText(url)} />
          <CopyIcon />
        </CopyLink>
      </NewGameConfirmationContainer>
      <GoToLobbyButton>
        <PrimaryButton text={text.general.goToLobby} onClick={() => navigate(routes.lobby)} />
      </GoToLobbyButton>
      <NewGameHands />
    </>
  );
};