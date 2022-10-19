import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { text } from "../../assets";
import { FormContainer, Heading1, Heading4, GeneralContentWrapper, Paragraph, PrimaryButton, Heading6 } from "../../components";
import { useMatchMaker } from "../../service";
import { isString, MatchSettings } from "../../types";
import { useGameCreationFormState } from "./game-creation-form-state";
import { HealActionField } from "./heal-action-field";
import { PlayersField } from "./players-field";
import { PowerUpsAmountField } from "./powerups-amount-field";
import { PowerUpsField } from "./powerups-field";
import { BottomContainer, ButtonContainer, NewGameContainer } from "./styles";

interface Props {
  setUrl: (url: string) => void;
}

// TODO: make a form component
export const NewGameCreation: FC<Props> = ({ setUrl }) => {
  const { register, handleSubmit } = useForm<MatchSettings>({ mode: "onChange", reValidateMode: "onChange" });
  const availablePowerUps = useGameCreationFormState((state) => state.availablePowerUps);
  const powerUpProbability = useGameCreationFormState((state) => state.powerUpProbability);
  const isUsingFakeCredits = useGameCreationFormState((state) => state.isUsingFakeCredits);
  const { createMatch, joinMatch, isLoading } = useMatchMaker();
  const isPowerUpError = useGameCreationFormState((state) => state.isPowerUpError);
  const [isError, setIsError] = useState(false);

  const handleFormSubmit = handleSubmit(async (data: MatchSettings) => {
    data.players = Number(data.players);
    data.dicePerPlayer = Number(data.dicePerPlayer);
    data.powerUpsPerPlayer = Number(data.powerUpsPerPlayer);
    data.availablePowerUps = availablePowerUps;
    data.isUsingFakeCredits = isUsingFakeCredits;
    data.healAction = Number(data.healAction);
    data.stageNumber = Number(data.stageNumber);
    // TODO: use newer stuff
    data.powerUpProbability = powerUpProbability;
    data.drawRoundOffset = Number(data.drawRoundOffset);

    const res = await createMatch(data);
    if (isString(res)) {
      const matchId = res;
      await joinMatch(matchId);
      // TODO: retrieve url from backend
      setUrl(`tmp/url/${matchId}`);
    } else {
      console.log(res);
      setIsError(true);
    }
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

          <PowerUpsAmountField register={register} />

          <PowerUpsField />

          <HealActionField register={register} />

          <BottomContainer>
            <Paragraph>{text.newGame.bottomDesc}</Paragraph>
          </BottomContainer>
          {isLoading && <Heading6>{text.newGame.loading}</Heading6>}
          {isError && <Heading6>{text.newGame.error}</Heading6>}
          <ButtonContainer>
            <PrimaryButton type="submit" text={text.newGame.continue} disabled={isPowerUpError} />
          </ButtonContainer>
        </FormContainer>
      </form>
    </NewGameContainer>
  );
};
