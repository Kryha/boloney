import { FC } from "react";

import { text } from "../../assets";
import { useLatestBid, useLocalPlayer, useMatch } from "../../service";
import { useStore } from "../../store";
import { getDieColor } from "../../util";
import { BottomButtonWrapper } from "../atoms";
import { PrimaryButton } from "../buttons";
import { ErrorView } from "../error-view";
import { usePlaceBidFormState } from "./bid-state";
import { DiceFaces } from "./dice-faces";
import { AmountSlider } from "./amount-slider";
import { AmountContainer, DiceSelectorContainer, DiceSelectorWrapper, FaceContainer } from "./styles";
import { Bid, Player } from "../../types";

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

  const setTurnActionStep = useStore((state) => state.setTurnActionStep);

  const localPlayer = useLocalPlayer();

  // TODO: consider passing an object as param
  const handleClick = (diceAmount: number, faceValue: number) => {
    setTurnActionStep("pickAction");
    broadcastPlaceBid({ face: faceValue, amount: diceAmount });
  };

  if (!localPlayer) return <ErrorView />;

  return (
    <DiceSelector
      onClick={handleClick}
      player={localPlayer}
      lastBid={latestBid}
      primaryText={text.match.bid}
      secondaryText={text.playerTurn.bidSecondaryView}
    />
  );
};
