import { text } from "../../assets";
import { Checkbox, Input } from "../../components";
import { useGameCreationFormState } from "./game-creation-form-state";
import { ToggleContainer } from "./styles";

export const FakeCreditsField = () => {
  const isUsingFakeCredits = useGameCreationFormState((state) => state.isUsingFakeCredits);
  const toggleIsUsingFakeCredits = useGameCreationFormState((state) => state.toggleIsUsingFakeCredits);

  return (
    <ToggleContainer>
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
    </ToggleContainer>
  );
};
