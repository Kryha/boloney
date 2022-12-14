import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { text } from "../../assets";
import { FormContainer, Heading1, Heading4, GeneralContentWrapper, Paragraph, PrimaryButton, Heading6 } from "../../components";
import { useMatchMaker } from "../../service";
import { isString, matchFormSettingsSchema, MatchSettings } from "../../types";
import { useMatchCreationFormState } from "./match-creation-form-state";
import { HealActionField } from "./heal-action-field";
import { PlayersField } from "./players-field";
import { DrawRoundOffsetField } from "./draw-round-offset-field";
import { PowerUpsField } from "./power-ups-field";
import { BottomContainer, ButtonContainer, NewMatchContainer } from "./styles";
import { PowerUpsAmountField } from "./power-up-amount-field";
import { parseLobbyUrl, splitMatchId } from "../../util";
import { useStore } from "../../store";

// TODO: make a form component
export const NewMatchCreation: FC = () => {
  const { register, handleSubmit } = useForm<MatchSettings>({ mode: "onChange", reValidateMode: "onChange" });
  const availablePowerUps = useMatchCreationFormState((state) => state.availablePowerUps);
  const powerUpProbability = useMatchCreationFormState((state) => state.powerUpProbability);
  const isPowerUpError = useMatchCreationFormState((state) => state.getIsError());
  const setMatchId = useStore((state) => state.setMatchId);
  const setMatchUrl = useStore((state) => state.setMatchUrl);
  const { createMatch, isLoading } = useMatchMaker();
  const [isError, setIsError] = useState(false);

  const handleFormSubmit = handleSubmit(async (data: MatchSettings) => {
    const result = matchFormSettingsSchema.safeParse({
      ...data,
      availablePowerUps: Array.from(availablePowerUps.values()),
      powerUpProbability: Array.from(powerUpProbability.values()),
    });

    if (!result.success) {
      setIsError(true);
    } else {
      const matchId = await createMatch(result.data);
      if (isString(matchId)) {
        setMatchId(splitMatchId(matchId));
        setMatchUrl(parseLobbyUrl(matchId));
      } else {
        setIsError(true);
      }
    }
  });

  return (
    <NewMatchContainer>
      <GeneralContentWrapper>
        <Heading1>{text.newMatch.newMatch}</Heading1>
        <Heading4>{text.newMatch.newMatchDescription}</Heading4>
      </GeneralContentWrapper>
      <form onSubmit={handleFormSubmit}>
        <FormContainer>
          <PlayersField register={register} />

          <PowerUpsAmountField register={register} />

          <DrawRoundOffsetField register={register} />

          <PowerUpsField />

          <HealActionField register={register} />

          <BottomContainer>
            <Paragraph>{text.newMatch.bottomDesc}</Paragraph>
          </BottomContainer>
          {isLoading && <Heading6>{text.newMatch.loading}</Heading6>}
          {isError && <Heading6>{text.newMatch.error}</Heading6>}
          <ButtonContainer>
            <PrimaryButton type="submit" text={text.newMatch.continue} disabled={isPowerUpError} />
          </ButtonContainer>
        </FormContainer>
      </form>
    </NewMatchContainer>
  );
};
