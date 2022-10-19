import { ReactNode } from "react";
import { text } from "../../assets";

import { GameLayout, Heading1, Heading2, PrimaryButton } from "../../components";
import { DiceRolls, Players } from "../../service";
import { useMatch } from "../../service/match";
import { useMatchState } from "../../store";

export const Match = () => {
  const { getPowerUps, isLoading } = useMatch();
  const roundPhase = useMatchState((state) => state.roundPhase);

  const GameState = (): ReactNode => {
    // TODO: update with actual views/pages
    switch (roundPhase) {
      case 0:
        return (
          <>
            <Heading1>{text.match.getPowerUps}</Heading1>
            <PrimaryButton text={text.match.goForIt} onClick={async () => await getPowerUps()} />
          </>
        );
      case 1:
        return <Heading1>{text.match.throwDice}</Heading1>;
      case 2:
        return <Heading1>{text.match.playerTurns}</Heading1>;
      case 3:
        return (
          <>
            <Heading1>{text.match.endOfRound}</Heading1>
            <PrimaryButton text={text.match.goForIt} />
          </>
        );
      case 4:
        return (
          <>
            <Heading1>{text.match.endOfGame}</Heading1>
            <PrimaryButton text={text.match.newGame} />
          </>
        );
      default:
        return (
          <>
            <Heading1>{text.match.getPowerUps}</Heading1>
            <PrimaryButton text={text.match.goForIt} />
          </>
        );
    }
  };

  // TODO: add loading animation
  if (isLoading) return <Heading2>{"loading"}</Heading2>;

  return (
    <GameLayout players={Players} dice={DiceRolls}>
      {GameState()}
    </GameLayout>
  );
};
