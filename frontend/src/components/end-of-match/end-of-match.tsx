import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { text } from "../../assets";
import { routes } from "../../navigation";
import { BottomButtonWrapper, Heading1 } from "../atoms";
import { PrimaryButton } from "../buttons";

interface Props {
  matchStageReady: () => void;
}

// TODO: finish component
export const EndOfMatch: FC<Props> = ({ matchStageReady }) => {
  const navigate = useNavigate();
  const handleNewMatch = (): void => {
    matchStageReady();
    navigate(`${routes.home}`);
  };
  return (
    <BottomButtonWrapper>
      <Heading1>{text.match.endOfMatch}</Heading1>
      <PrimaryButton text={text.match.newMatch} onClick={() => handleNewMatch()} />
    </BottomButtonWrapper>
  );
};
