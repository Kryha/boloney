import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CopyIconSVG, text } from "../../assets";
import { NewMatchHands, FadeTransition } from "../../components";
import { Heading1, Heading4, Heading6, GeneralText, BaseIcon } from "../../atoms";
import { COPIED_TEXT_TIMEOUT } from "../../constants";
import { fontSizes, lineHeights } from "../../design";
import { Link, PrimaryButton } from "../../molecules";
import { routes } from "../../navigation";
import { parseMatchUrl } from "../../util";
import { CopyLink, GoToLobbyButton, LinkCopied, NewMatchConfirmationContainer } from "./styles";

interface Props {
  matchId: string;
}

export const NewMatchConfirmation: FC<Props> = ({ matchId }) => {
  const navigate = useNavigate();
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const matchUrl = parseMatchUrl(matchId);

  const hideCopiedText = useCallback(() => {
    setIsLinkCopied(true);
    setTimeout(() => {
      setIsLinkCopied(false);
    }, COPIED_TEXT_TIMEOUT);
  }, []);

  const copyText = () => {
    navigator.clipboard.writeText(matchUrl);
    hideCopiedText();
  };

  return (
    <FadeTransition>
      <NewMatchConfirmationContainer>
        <Heading1>{text.general.matchCreated}</Heading1>
        <Heading4>{text.general.yourMatchHasBeenCreated}</Heading4>
        <Heading6>{text.general.onlyPlayersWithThisCode}</Heading6>
        <CopyLink
          onClick={() => {
            copyText();
          }}
          isCopied={isLinkCopied}
        >
          <Link text={matchUrl} transformText="none" fontSize={fontSizes.generalText} lineHeight={lineHeights.generalText} />
          <BaseIcon src={<CopyIconSVG />} pointer />
          <LinkCopied isCopied={isLinkCopied}>
            <GeneralText>{text.general.copied}</GeneralText>
          </LinkCopied>
        </CopyLink>
      </NewMatchConfirmationContainer>
      <GoToLobbyButton>
        <PrimaryButton primaryText={text.general.goToLobby} onClick={() => navigate(`${routes.match}/${matchId}`)} />
      </GoToLobbyButton>
      <NewMatchHands />
    </FadeTransition>
  );
};
