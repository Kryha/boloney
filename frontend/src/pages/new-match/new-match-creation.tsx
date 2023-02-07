import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { text } from "../../assets";
import {
  FormContainer,
  Heading1,
  Heading4,
  GeneralContentWrapper,
  Paragraph,
  PrimaryButton,
  Heading6,
  GoBackButton,
} from "../../components";
import { createMatch } from "../../service";
import { isString, matchFormSettingsSchema, MatchSettings } from "../../types";
import { useMatchCreationFormState } from "./match-creation-form-state";
import { HealActionField } from "./heal-action-field";
import { PlayersField } from "./players-field";
import { DrawRoundOffsetField } from "./draw-round-offset-field";
import { PowerUpsField } from "./power-ups-field";
import { BottomContainer, ButtonContainer, NewMatchContainer } from "./styles";
import { PowerUpsAmountField } from "./power-up-amount-field";
import { cleanUUID } from "../../util";
import { DEFAULT_MATCH_SETTINGS, MIN_POWERUPS_PER_PLAYER } from "../../constants";
import { useNavigate } from "react-router-dom";
import { routes } from "../../navigation";

interface Props {
  setMatchId: (id: string) => void;
}

export const NewMatchCreation: FC<Props> = ({ setMatchId }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<MatchSettings>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const availablePowerUps = useMatchCreationFormState((state) => state.availablePowerUps);
  const powerUpProbability = useMatchCreationFormState((state) => state.powerUpProbability);
  const isPowerUpError = useMatchCreationFormState((state) => state.getIsError());
  const navigate = useNavigate();

  const watchPowerUpAmount = watch("initialPowerUpAmount", MIN_POWERUPS_PER_PLAYER);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    reset({ ...DEFAULT_MATCH_SETTINGS });
  }, [isSubmitSuccessful, reset]);

  const handleFormSubmit = handleSubmit(async (data: MatchSettings) => {
    setIsLoading(true);
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
        setMatchId(cleanUUID(matchId));
      } else {
        setIsError(true);
      }
    }
    setIsLoading(false);
  });

  const handleGoBack = () => {
    navigate(routes.home);
  };

  return (
    <NewMatchContainer>
      <GoBackButton primaryText={text.playerTurn.back} onClick={handleGoBack} />
      <GeneralContentWrapper>
        <Heading1>{text.newMatch.newMatch}</Heading1>
        <Heading4>{text.newMatch.newMatchDescriptionFirstSentence}</Heading4>
        <Heading4>{text.newMatch.newMatchDescriptionSecondSentence}</Heading4>
      </GeneralContentWrapper>
      <form onSubmit={handleFormSubmit}>
        <FormContainer>
          <PlayersField register={register} />

          <PowerUpsAmountField register={register} minPowerUps={watchPowerUpAmount} />

          <DrawRoundOffsetField register={register} />

          <PowerUpsField />

          <HealActionField register={register} />

          <BottomContainer>
            <Paragraph>{text.newMatch.bottomDesc}</Paragraph>
          </BottomContainer>
          {isLoading && <Heading6>{text.newMatch.loading}</Heading6>}
          {isError && <Heading6>{text.newMatch.error}</Heading6>}
          <ButtonContainer>
            <PrimaryButton type="submit" primaryText={text.newMatch.continueText} disabled={isPowerUpError} />
          </ButtonContainer>
        </FormContainer>
      </form>
    </NewMatchContainer>
  );
};
