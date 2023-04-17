import { FC, useEffect } from "react";

import { text } from "../../assets";
import { useLatestBid, useLocalPlayer, useMatch, useTotalDiceInMatch } from "../../service";
import { getDieColor, getMinFaceValue } from "../../util";
import { BottomButtonWrapper } from "../atoms";
import { ErrorView } from "../error-view";
import { usePlaceBidFormState } from "./bid-state";
import { DiceFaces } from "./dice-faces";
import { AmountSlider } from "./amount-slider";
import { AmountContainer, DiceSelectorContainer, DiceSelectorWrapper, FaceContainer } from "./styles";
import { Bid, Player } from "../../types";
import { FadeTransition } from "../page-transition";
import { FADE_TRANSITION_DURATION } from "../../constants";
import { PrimaryButton } from "../../molecules";

// TODO: declare these components in 2 different files

interface DiceSelectorProps {
  lastBid?: Bid;
  player: Player;
  disabled?: boolean;
  primaryText: string;
  secondaryText: string;
  onClick: (diceAmount: number, faceValue: number) => void;
}

export const DiceSelector: FC<DiceSelectorProps> = ({ lastBid, player, disabled, primaryText, secondaryText, onClick }) => {
  const diceAmount = usePlaceBidFormState((state) => state.diceAmount);
  const faceValue = usePlaceBidFormState((state) => state.faceValue);
  const resetBidState = usePlaceBidFormState((state) => state.resetBidState);
  const setFaceValue = usePlaceBidFormState((state) => state.setFaceValue);
  const totalDice = useTotalDiceInMatch();

  useEffect(() => {
    if (!faceValue) {
      const minimumFaceValue = getMinFaceValue(lastBid, totalDice);
      setFaceValue(minimumFaceValue);
    }
  }, [faceValue, lastBid, setFaceValue, totalDice]);

  const isBidSet = diceAmount && faceValue;

  const isMaxBidPlaced = lastBid && isBidSet && lastBid.face >= faceValue && lastBid.amount >= diceAmount;

  const handleClick = () => {
    if (!isBidSet) return;
    resetBidState();
    onClick(diceAmount, faceValue);
  };

  return (
    <DiceSelectorWrapper>
      <DiceSelectorContainer>
        <FaceContainer>
          <DiceFaces dieColor={getDieColor(player)} lastBid={lastBid} />
        </FaceContainer>
        <AmountContainer>
          <AmountSlider lastBid={lastBid} />
        </AmountContainer>
      </DiceSelectorContainer>
      <BottomButtonWrapper>
        <PrimaryButton
          disabled={isMaxBidPlaced || !isBidSet || disabled}
          primaryText={primaryText}
          secondaryText={secondaryText}
          onClick={handleClick}
        />
      </BottomButtonWrapper>
    </DiceSelectorWrapper>
  );
};

export const PlaceBid: FC = () => {
  const { broadcastPlaceBid } = useMatch();
  const latestBid = useLatestBid();

  const localPlayer = useLocalPlayer();

  // TODO: consider passing an object as param
  const handleClick = (diceAmount: number, faceValue: number) => {
    broadcastPlaceBid({ face: faceValue, amount: diceAmount });
  };

  if (!localPlayer) return <ErrorView />;

  return (
    <FadeTransition delay={FADE_TRANSITION_DURATION}>
      <DiceSelector
        onClick={handleClick}
        player={localPlayer}
        lastBid={latestBid}
        primaryText={text.match.bid}
        secondaryText={text.playerTurn.bidSecondaryView}
      />
    </FadeTransition>
  );
};
