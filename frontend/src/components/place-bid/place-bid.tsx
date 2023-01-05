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
import { AmountContainer, BidContainer, BidWrapper } from "./styles";

export const PlaceBid: FC = () => {
  const latestBid = useLatestBid();
  const diceAmount = usePlaceBidFormState((state) => state.diceAmount);
  const faceValue = usePlaceBidFormState((state) => state.faceValue);
  const resetBidState = usePlaceBidFormState((state) => state.resetBidState);
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  const { broadcastPlaceBid } = useMatch();
  const noBidSet = !diceAmount || !faceValue;

  let isMaxBidPlaced = latestBid ? true : false;
  if (faceValue && latestBid && diceAmount) isMaxBidPlaced = latestBid.face >= faceValue && latestBid.amount >= diceAmount;

  const localPlayer = useLocalPlayer();

  const handleClick = () => {
    if (noBidSet) return;

    resetBidState();
    setTurnActionStep("pickAction");
    broadcastPlaceBid({ face: faceValue, amount: diceAmount });
  };

  if (!localPlayer) return <ErrorView />;

  return (
    <BidWrapper>
      <BidContainer>
        <DiceFaces dieColor={getDieColor(localPlayer)} lastBid={latestBid} />

        <AmountContainer>
          <AmountSlider lastBid={latestBid} />
        </AmountContainer>
      </BidContainer>
      <BottomButtonWrapper>
        <PrimaryButton disabled={isMaxBidPlaced || noBidSet || faceValue === 0} text={text.match.bid} onClick={() => handleClick()} />
      </BottomButtonWrapper>
    </BidWrapper>
  );
};
