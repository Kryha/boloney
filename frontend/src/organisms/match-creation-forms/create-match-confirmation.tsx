import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { text } from "../../assets";
import { BaseColumn, Heading4 } from "../../atoms";
import { COPIED_TEXT_TIMEOUT } from "../../constants";
import { spacing, fontSizes, lineHeights } from "../../design";
import { ColumnHeading, FadeTransition, NewMatchHands, PrimaryButton, CopyLink } from "../../molecules";
import { routes } from "../../navigation";
import { parseMatchUrl } from "../../util";
import { MatchConfirmationButton, MatchConfirmationWrapper } from "./styles";

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
      <BaseColumn gap={spacing.md}>
        <MatchConfirmationWrapper>
          <ColumnHeading
            heading={text.general.matchCreated}
            subheading={text.general.yourMatchHasBeenCreated}
            gap={spacing.lg}
            headingFontSize={fontSizes.heading1}
            headingLineHeight={lineHeights.heading1}
            subheadingFontSize={fontSizes.heading4}
            subheadingLineHeight={lineHeights.heading4}
          />
          <BaseColumn gap={spacing.md}>
            <Heading4>{text.general.onlyPlayersWithThisCode}</Heading4>
            <CopyLink linkText={matchUrl} isLinkCopied={isLinkCopied} onClick={copyText} />
          </BaseColumn>
        </MatchConfirmationWrapper>

        <MatchConfirmationButton>
          <PrimaryButton primaryText={text.general.goToLobby} onClick={() => navigate(`${routes.match}/${matchId}`)} />
        </MatchConfirmationButton>
      </BaseColumn>
      <NewMatchHands />
    </FadeTransition>
  );
};
