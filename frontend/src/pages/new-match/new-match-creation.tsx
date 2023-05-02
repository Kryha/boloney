import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { LeftArrowIconSVG, text } from "../../assets";
import { FadeTransition, ToggleSwitch } from "../../components";
import { FormContainer, GeneralContentWrapper, Heading1, Heading6, Heading4, BodyText } from "../../atoms";
import { createMatch } from "../../service";
import { isString, matchFormSettingsSchema, MatchSettings } from "../../types";
import { useMatchCreationFormState } from "./match-creation-form-state";
import { PlayersField } from "./players-field";
import { DrawRoundOffsetField } from "./draw-round-offset-field";
import { PowerUpsField } from "./power-ups-field";
import { BottomContainer, ButtonContainer, NewMatchContainer } from "./styles";
import { PowerUpsAmountField } from "./power-up-amount-field";
import { cleanUUID } from "../../util";
import { DEFAULT_MATCH_SETTINGS, env, MIN_POWERUPS_PER_PLAYER } from "../../constants";
import { useNavigate } from "react-router-dom";
import { routes } from "../../navigation";
import { StartingNumberDivisor } from "./starting-number-divisor";
import { PrimaryButton, TertiaryButton } from "../../molecules";
import { buttonSize } from "../../design";

interface Props {
  setMatchId: (id: string) => void;
}

export const NewMatchCreation: FC<Props> = ({ setMatchId }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
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
    <FadeTransition>
      <NewMatchContainer>
        <TertiaryButton
          text={text.playerTurn.back}
          onClick={handleGoBack}
          icon={<LeftArrowIconSVG />}
          iconPosition="row-reverse"
          padding={buttonSize.md}
        />
        <GeneralContentWrapper>
          <Heading1>{text.newMatch.newMatch}</Heading1>
          <Heading4>{text.newMatch.newMatchDescriptionFirstSentence}</Heading4>
          <Heading4>{text.newMatch.newMatchDescriptionSecondSentence}</Heading4>
        </GeneralContentWrapper>
        <form onSubmit={handleFormSubmit}>
          <FormContainer>
            <PlayersField register={register} />

            <StartingNumberDivisor register={register} />

            <DrawRoundOffsetField register={register} />

            <PowerUpsAmountField register={register} minPowerUps={watchPowerUpAmount} />

            <PowerUpsField />

            {env.VITE_ZK_ENABLED && (
              <ToggleSwitch
                setValue={setValue}
                title={text.newMatch.zkEnabledTitle}
                description={text.newMatch.zkEnabledDescription}
                tooltipDescription={text.newMatch.zkEnabledTooltipDescription}
                descriptionTitle={text.newMatch.zkEnabledDescriptionTitle}
                infoPosition="bottom"
              />
            )}

            <BottomContainer>
              <BodyText>{text.newMatch.bottomDesc}</BodyText>
            </BottomContainer>
            {isLoading && <Heading6>{text.newMatch.loading}</Heading6>}
            {isError && <Heading6>{text.newMatch.error}</Heading6>}

            <ButtonContainer>
              <PrimaryButton buttonType="submit" primaryText={text.newMatch.continueText} disabled={isPowerUpError} />
            </ButtonContainer>
          </FormContainer>
        </form>
      </NewMatchContainer>
    </FadeTransition>
  );
};
