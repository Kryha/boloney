import { text } from "../../assets";
import { Checkbox, Input } from "../../components";
import { useGameCreationFormState } from "./game-creation-form-state";
import { FieldContainer, ToggleContainer } from "./styles";

export const PrivatePublicField = () => {
  const isPrivate = useGameCreationFormState((state) => state.isPrivate);
  const toggleIsPrivate = useGameCreationFormState((state) => state.toggleIsPrivate);

  return (
    <ToggleContainer>
      <Input label={text.newGame.privateOrPublic}>
        <Checkbox
          isTop
          title={text.newGame.private}
          description={text.newGame.privateOrPublicDesc}
          isUsingSwitchIcon
          isChecked={isPrivate}
          toggleCheck={toggleIsPrivate}
        />
      </Input>
    </ToggleContainer>
  );
};
