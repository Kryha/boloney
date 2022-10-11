import { FC } from "react";
import { useForm } from "react-hook-form";

import { text } from "../../assets";
import { FormContainer, Heading1, Heading4, GeneralContentWrapper, Paragraph, PrimaryButton } from "../../components";
import { PowerupType } from "../../interfaces";
import { FakeCreditsField } from "./fake-credits-field";
import { useGameCreationFormState } from "./game-creation-form-state";
import { PlayersField } from "./players-field";
import { PowerupsAmountField } from "./powerups-amount-field";
import { PowerupsField } from "./powerups-field";
import { PrivatePublicField } from "./private-public-field";
import { BottomContainer, ButtonContainer, NewGameContainer } from "./styles";

interface Props {
  setUrl: (url: string) => void;
}

export interface Fields {
  players: number;
  dicePerPlayer: number;
  powerupsPerPlayer: number;
  availablePowerups: PowerupType[];
  isPrivate: boolean;
  isUsingFakeCredits: boolean;
}

// TODO: make a form component
export const NewGameCreation: FC<Props> = ({ setUrl }) => {
  const { register, handleSubmit } = useForm<Fields>({ mode: "onChange", reValidateMode: "onChange" });
  const availablePowerups = useGameCreationFormState((state) => state.availablePowerups);
  const isPrivate = useGameCreationFormState((state) => state.isPrivate);
  const isUsingFakeCredits = useGameCreationFormState((state) => state.isUsingFakeCredits);
  const powerUpProbability = useGameCreationFormState((state) => state.powerUpProbability);

  const handleFormSubmit = handleSubmit((data) => {
    data.players = Number(data.players);
    data.dicePerPlayer = Number(data.dicePerPlayer);
    data.powerupsPerPlayer = Number(data.powerupsPerPlayer);
    data.availablePowerups = availablePowerups;
    data.isPrivate = isPrivate;
    data.isUsingFakeCredits = isUsingFakeCredits;
    // TODO: call backend
    console.log("SUBMITTING:", data);
    // TODO: retrieve url from backend
    setUrl("tmp/url");
  });

  return (
    <NewGameContainer>
      <GeneralContentWrapper>
        <Heading1>{text.newGame.newGame}</Heading1>
        <Heading4>{text.newGame.newGameDescription}</Heading4>
      </GeneralContentWrapper>
      <form onSubmit={handleFormSubmit}>
        <FormContainer>
          <PlayersField register={register} />

          <PowerupsAmountField register={register} />

          <PowerupsField />

          <PrivatePublicField />

          <FakeCreditsField />

          <BottomContainer>
            <Paragraph>{text.newGame.bottomDesc}</Paragraph>
          </BottomContainer>
          <ButtonContainer>
            <PrimaryButton type="submit" text={text.newGame.continue} />
          </ButtonContainer>
        </FormContainer>
      </form>
    </NewGameContainer>
  );
};
