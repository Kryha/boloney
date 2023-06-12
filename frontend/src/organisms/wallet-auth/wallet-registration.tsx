import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

import { text } from "../../assets";
import { BaseInput, FormContainer, GeneralContentWrapper, Heading1, Heading4 } from "../../atoms";
import { MINIMUM_USERNAME_LENGTH } from "../../constants";
import { useViewport } from "../../hooks";
import { InputLegend, PrimaryButton } from "../../molecules";
import { useWalletAuth } from "../../service";
import { useStore } from "../../store";
import { backendErrors } from "../../util";
import { AuthContainer, SignOrJoinContainer, WalletAuthContainer } from "./styles";

interface Props {
  signature: string;
}

interface FormFields {
  username: string;
  usernameMatch: string;
}

export const WalletRegistration: FC<Props> = ({ signature }) => {
  const isLoadingSpinnerVisible = useStore((state) => state.isLoadingSpinnerVisible);

  const { authenticateWallet, error: authError } = useWalletAuth();
  const { width, height } = useViewport();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormFields>({ mode: "onChange", reValidateMode: "onChange" });

  useEffect(() => {
    if (authError) setError("username", { type: authError.message });
  }, [authError, setError]);

  const showUsernameError = () => {
    switch (errors.username?.type) {
      case backendErrors.alreadyExists:
        return text.authForm.errorMessages.usernameAlreadyTaken;
      case backendErrors.containsProfanity:
        return text.authForm.errorMessages.usernameProfanity;
      case backendErrors.minLength:
        return text.authForm.errorMessages.usernameMinimum;
      case backendErrors.required:
        return text.authForm.errorMessages.usernameRequired;
      case backendErrors.internal:
        return text.authForm.errorMessages.internal;
      default:
        return errors.username?.message;
    }
  };

  const onSubmit = async (username: string, usernameMatch: string) => {
    if (!isValid) return;

    if (username.includes(";")) {
      setError("username", { message: text.authForm.errorMessages.usernameCharacters });
      return;
    }

    if (username !== usernameMatch) {
      setError("username", { message: text.authForm.errorMessages.usernamesDoNotMatch });
      return;
    }

    await authenticateWallet(username, signature);
  };

  return (
    <WalletAuthContainer>
      <GeneralContentWrapper>
        <Heading1>{text.authForm.createAccount}</Heading1>
        <Heading4>{text.authForm.whoAreYou}</Heading4>
      </GeneralContentWrapper>

      <form onSubmit={handleSubmit((data) => onSubmit(data.username, data.usernameMatch))}>
        <FormContainer>
          <AuthContainer>
            <InputLegend label={text.authForm.username} isError={!!errors.username} errorMessage={showUsernameError()} isRow>
              <BaseInput type="text" {...register("username", { required: true, minLength: MINIMUM_USERNAME_LENGTH })} />
            </InputLegend>
            <InputLegend label={text.authForm.confirmUsername} isError={!!errors.usernameMatch} isRow childNode={2}>
              <BaseInput type="text" {...register("usernameMatch", { required: true, minLength: MINIMUM_USERNAME_LENGTH })} />
            </InputLegend>
          </AuthContainer>
          <SignOrJoinContainer width={width} height={height}>
            <PrimaryButton buttonType="submit" primaryText={text.authForm.join} isLoading={isLoadingSpinnerVisible} />
          </SignOrJoinContainer>
        </FormContainer>
      </form>
    </WalletAuthContainer>
  );
};
