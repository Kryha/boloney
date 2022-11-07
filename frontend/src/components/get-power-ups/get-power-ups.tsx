import { FC } from "react";
import { useMatch } from "../../service";
import { text } from "../../assets";
import { BottomButtonWrapper, Heading1 } from "../atoms";
import { PrimaryButton } from "../buttons";

// TODO: finish component
export const GetPowerUps: FC = () => {
  const { broadcastPlayerReady } = useMatch();
  return (
    <BottomButtonWrapper>
      <Heading1>{text.match.getPowerUps}</Heading1>
      <PrimaryButton text={text.match.goForIt} onClick={() => broadcastPlayerReady()} />
    </BottomButtonWrapper>
  );
};
