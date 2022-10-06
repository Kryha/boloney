import { FC } from "react";
import { useForm } from "react-hook-form";

import { text } from "../../assets";
import { FormContainer, Heading1, Heading4, GeneralContentWrapper, Paragraph, PrimaryButton } from "../../components";
import { MatchSettings } from "../../interfaces";
import { useMatchMaker } from "../../service/match-maker";
import { FakeCreditsField } from "./fake-credits-field";
import { useGameCreationFormState } from "./game-creation-form-state";
import { PlayersField } from "./players-field";
import { PowerupsAmountField } from "./powerups-amount-field";
import { PowerupsField } from "./powerups-field";
import { BottomContainer, ButtonContainer, NewGameContainer } from "./styles";

interface Props {
  setUrl: (url: string) => void;
}

// TODO: make a form component
export const NewGameCreation: FC<Props> = ({ setUrl }) => {
  const { register, handleSubmit } = useForm<MatchSettings>({ mode: "onChange", reValidateMode: "onChange" });
  const availablePowerups = useGameCreationFormState((state) => state.availablePowerups);
  const isUsingFakeCredits = useGameCreationFormState((state) => state.isUsingFakeCredits);
  const { createMatch, joinMatch } = useMatchMaker();

  const handleFormSubmit = handleSubmit(async (data: MatchSettings) => {
    data.players = Number(data.players);
    data.dicePerPlayer = Number(data.dicePerPlayer);
    data.powerupsPerPlayer = Number(data.powerupsPerPlayer);
    data.availablePowerups = availablePowerups;
    data.isUsingFakeCredits = isUsingFakeCredits;

    const matchId = await createMatch(data);
    if (matchId) await joinMatch(matchId);

    // TODO: retrieve url from backend
    setUrl(`tmp/url/${matchId}`);
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
