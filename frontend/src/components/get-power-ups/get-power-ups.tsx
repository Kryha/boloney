import { FC } from "react";
import { text } from "../../assets";
import { Heading1 } from "../atoms";
import { PrimaryButton } from "../buttons";

interface Props {
  matchStageReady: () => void;
}
// TODO: finish component
export const GetPowerUps: FC<Props> = ({ matchStageReady }) => {
  return (
    <>
      <Heading1>{text.match.getPowerUps}</Heading1>
      <PrimaryButton text={text.match.goForIt} onClick={() => matchStageReady()} />
    </>
  );
};
