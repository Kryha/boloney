import { FC } from "react";
import { text } from "../../assets";
import { Heading1 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { useMatch } from "../../service";
// import { useStore } from "../../store";

// TODO: Add styles according to design
// TODO: Add payload to the broadcasted message
export const PlayerTurns: FC = () => {
  const { broadcastPlaceBid, broadcastCallExact, broadcastCallBoloney } = useMatch();
  return (
    <>
      <Heading1>{text.match.playerTurns}</Heading1>

      {/* <BottomButtonWrapper>
        <PrimaryButton text={text.match.goForIt} onClick={() => broadcastPlayerReady()} />
      </BottomButtonWrapper> */}
      <PrimaryButton disabled text={text.match.placeBid} onClick={() => broadcastPlaceBid("myBid")} />
      <PrimaryButton text={text.match.callExact} onClick={() => broadcastCallExact()} />
      <PrimaryButton text={text.match.callBoloney} onClick={() => broadcastCallBoloney()} />
    </>
  );
};
