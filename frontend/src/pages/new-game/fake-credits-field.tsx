import { text } from "../../assets";
import { Checkbox, Input } from "../../components";
import { useNewGameState } from "./new-game-state";
import { FieldContainer } from "./styles";

export const FakeCreditsField = () => {
  const isUsingFakeCredits = useNewGameState((state) => state.isUsingFakeCredits);
  const toggleIsUsingFakeCredits = useNewGameState((state) => state.toggleIsUsingFakeCredits);

  return (
    <FieldContainer>
      <Input label={text.newGame.typeOfBet}>
        <Checkbox
          isTop
          title={text.newGame.fakeCredits}
          description={text.newGame.typeOfBetDesc}
          isUsingSwitchIcon
          isChecked={isUsingFakeCredits}
          toggleCheck={toggleIsUsingFakeCredits}
        />
      </Input>
    </FieldContainer>
  );
};
