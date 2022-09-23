import { text } from "../../assets";
import { Checkbox, Input } from "../../components";
import { useNewGameState } from "./new-game-state";
import { FieldContainer } from "./styles";

export const PrivatePublicField = () => {
  const isPrivate = useNewGameState((state) => state.isPrivate);
  const toggleIsPrivate = useNewGameState((state) => state.toggleIsPrivate);

  return (
    <FieldContainer>
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
    </FieldContainer>
  );
};
