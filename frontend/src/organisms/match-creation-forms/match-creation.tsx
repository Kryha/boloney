import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { DEFAULT_MATCH_SETTINGS, DEFAULT_MATCH_STAGE_DURATION, env, MIN_POWERUPS_PER_PLAYER } from "../../constants";
import { routes } from "../../navigation";
import { isString, matchFormSettingsSchema, MatchSettings, MatchStage } from "../../types";
import { cleanUUID } from "../../util";
import { createMatch } from "../../service";
import { ColumnHeading, FadeTransition, PrimaryButton, TertiaryButton, ZKToggleSwitch } from "../../molecules";
import { BaseColumn, BaseIcon, BodyText, Heading4, Heading6 } from "../../atoms";
import { LeftArrowIconSVG, text } from "../../assets";
import { buttonSize, fontSizes, lineHeights, spacing } from "../../design";
import { MatchBottomContainer, MatchButtonContainer, MatchCreationWrapper } from "./styles";
import { useMatchCreationFormState } from "./match-creation-form-state";
import { PlayersField } from "./players-field";
import { StartingNumberDivisor } from "./starting-number-divisor";
import { DrawRoundOffsetField } from "./draw-round-offset-field";
import { RoundDurationField } from "./round-duration";
import { PowerUpsAmountField } from "./power-up-amount-field";
import { PowerUpsField } from "./power-ups-field";

interface Props {
  setMatchId: (id: string) => void;
}

export const MatchCreation: FC<Props> = ({ setMatchId }) => {
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
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    reset({ ...DEFAULT_MATCH_SETTINGS });
  }, [isSubmitSuccessful, reset]);

  const handleFormSubmit = handleSubmit(async (data: MatchSettings) => {
    setIsLoading(true);
    const matchStageDuration: Record<MatchStage, number> = {
      ...DEFAULT_MATCH_STAGE_DURATION,
      playerTurnLoopStage: data.matchStageDuration.playerTurnLoopStage ?? 60,
    };

    const result = matchFormSettingsSchema.safeParse({
      ...data,
      matchStageDuration: matchStageDuration,
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

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    setValue("zkEnabled", !isChecked);
  };

  return (
    <FadeTransition>
      <BaseColumn>
        <TertiaryButton
          text={text.playerTurn.back}
          onClick={handleGoBack}
          icon={<BaseIcon src={<LeftArrowIconSVG />} pointer />}
          iconPosition="row-reverse"
          padding={buttonSize.md}
        />
        <MatchCreationWrapper>
          <ColumnHeading
            heading={text.newMatch.newMatch}
            subheading={text.newMatch.newMatchDescriptionFirstSentence}
            gap={spacing.lg}
            headingFontSize={fontSizes.heading1}
            headingLineHeight={lineHeights.heading1}
            subheadingFontSize={fontSizes.heading4}
            subheadingLineHeight={lineHeights.heading4}
          />
          <Heading4>{text.newMatch.newMatchDescriptionSecondSentence}</Heading4>
        </MatchCreationWrapper>
        <form onSubmit={handleFormSubmit}>
          <BaseColumn gap={spacing.sm}>
            <PlayersField register={register} />

            <StartingNumberDivisor register={register} />

            <DrawRoundOffsetField register={register} />

            <RoundDurationField register={register} />

            <PowerUpsAmountField register={register} minPowerUps={watchPowerUpAmount} />

            <PowerUpsField />

            {env.VITE_ZK_ENABLED && (
              <ZKToggleSwitch
                isChecked={isChecked}
                toggleSwitch={toggleSwitch}
                title={text.newMatch.zkEnabledTitle}
                description={text.newMatch.zkEnabledDescription}
                tooltipDescription={text.newMatch.zkEnabledTooltipDescription}
                descriptionTitle={text.newMatch.zkEnabledDescriptionTitle}
                infoPosition="bottom"
              />
            )}

            <MatchBottomContainer>
              <BodyText>{text.newMatch.bottomDesc}</BodyText>
            </MatchBottomContainer>
            {isLoading && <Heading6>{text.newMatch.loading}</Heading6>}
            {isError && <Heading6>{text.newMatch.error}</Heading6>}

            <MatchButtonContainer justifyContent="flex-end">
              <PrimaryButton buttonType="submit" primaryText={text.newMatch.continueText} disabled={isPowerUpError} />
            </MatchButtonContainer>
          </BaseColumn>
        </form>
      </BaseColumn>
    </FadeTransition>
  );
};
