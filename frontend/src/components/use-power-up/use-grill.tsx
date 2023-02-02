import { FC, useState } from "react";

import { text } from "../../assets";
import { color } from "../../design";
import { useMatch, usePlayer } from "../../service";
import { useStore } from "../../store";
import { Player } from "../../types";
import { getPowerUp } from "../../util";
import { Heading2 } from "../atoms";
import { DiceSelector } from "../place-bid";
import { SelectionView } from "../selection-view";

interface PlaceGrillBetProps {
  player: Player;
  onSubmit: (amount: number, face: number) => void;
}

const PlaceGrillBet: FC<PlaceGrillBetProps> = ({ onSubmit, player }) => {
  return (
    <>
      <Heading2>{text.match.makeYourClaim}</Heading2>
      <Heading2 customColor={color.darkGrey}>{text.playerTurn.whatsYourGuess}</Heading2>
      <DiceSelector onClick={onSubmit} player={player} primaryText={text.match.goForIt} secondaryText={text.match.goForIt} />
    </>
  );
};

export const UseGrill: FC = () => {
  const powerUp = getPowerUp("1");
  const { broadcastUsePowerUp } = useMatch();
  const { targetPlayerId } = useStore((state) => state.powerUpState);
  const player = usePlayer(targetPlayerId);

  const [isPlayerSelected, setIsPlayerSelected] = useState(false);

  if (!powerUp) return <></>;

  const handlePlayerSelect = () => {
    setIsPlayerSelected(true);
  };

  const handleSubmit = (amount: number, face: number) => {
    if (!targetPlayerId) return;
    broadcastUsePowerUp({ id: "1", data: { targetId: targetPlayerId, face, amount } });
  };

  if (!targetPlayerId || !player || !isPlayerSelected) {
    return <SelectionView powerUpName={powerUp.name} userId={targetPlayerId} onClick={handlePlayerSelect} />;
  }

  return <PlaceGrillBet player={player} onSubmit={handleSubmit} />;
};
