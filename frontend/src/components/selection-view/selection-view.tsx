import { FC } from "react";
import { avatars, text } from "../../assets";
import { color } from "../../design";
import { usePlayer } from "../../service";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { ErrorView } from "../error-view";
import { Hand } from "../hand";
import { HandWrapper } from "./styles";

interface SelectionViewProps {
  powerUpName: string;
  userId?: string;
  onClick?: () => void;
}

interface SelectionHandProps {
  userId: string;
}

export const SelectionHand: FC<SelectionHandProps> = ({ userId }) => {
  const player = usePlayer(userId);

  if (!player) return <ErrorView />;

  return (
    <HandWrapper>
      <Hand avatarName={avatars[player.avatarId].name} />
    </HandWrapper>
  );
};

// TODO: disable button when no target is selected
export const SelectionView: FC<SelectionViewProps> = ({ powerUpName, userId, onClick }) => {
  return (
    <BottomButtonWrapper>
      <Heading2>{text.powerUps.whoIsGoingToGetIt}</Heading2>
      <Heading2 customColor={color.darkGrey}>{text.param.choosePlayer(powerUpName)}</Heading2>
      {userId && <SelectionHand userId={userId} />}
      {onClick && <PrimaryButton primaryText={text.match.goForIt} onClick={() => onClick()} />}
    </BottomButtonWrapper>
  );
};
