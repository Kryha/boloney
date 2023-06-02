import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { text } from "../../assets";
import { BaseInput } from "../../atoms";
import { MINIMUM_PASSWORD_LENGTH, MINIMUM_USERNAME_LENGTH } from "../../constants";
import { InputLegend } from "../../molecules";
import { AuthFields } from "../../types";
import { AuthContainer } from "./styles";

interface AuthenticationFormProps {
  register: UseFormRegister<AuthFields>;
  errors: FieldErrors<AuthFields>;
}

export const AuthenticationForm: FC<AuthenticationFormProps> = ({ register, errors }) => {
  //TODO: refactor these functions.
  const showUsernameError = () => {
    const ALREADY_EXISTS = "Username already exists";
    const CONTAINS_PROFANITY = "Username contains profanity";
    const INTERNAL = "internalError";
    const MIN_LENGTH = "minLength";
    const REQUIRED = "required";

    switch (errors.username?.type) {
      case ALREADY_EXISTS:
        return text.authForm.errorMessages.usernameAlreadyTaken;
      case CONTAINS_PROFANITY:
        return text.authForm.errorMessages.usernameProfanity;
      case MIN_LENGTH:
        return text.authForm.errorMessages.usernameMinimum;
      case REQUIRED:
        return text.authForm.errorMessages.usernameRequired;
      case INTERNAL:
        return text.authForm.errorMessages.internal;
      default:
        return "";
    }
  };

  const showPasswordError = () => {
    const REQUIRED = "required";
    const NOT_FOUND = "User account not found.";
    const INTERNAL = "internalError";
    const MIN_LENGTH = "minLength";

    switch (errors.password?.type) {
      case NOT_FOUND:
        return text.authForm.errorMessages.invalidCredentials;
      case MIN_LENGTH:
        return text.authForm.errorMessages.passwordMinimum;
      case REQUIRED:
        return text.authForm.errorMessages.passwordRequired;
      case INTERNAL:
        return text.authForm.somethingWentWrong;
    }
  };

  return (
    <AuthContainer alignItems="flex-start">
      <InputLegend label={text.authForm.username} isError={!!errors.username} errorMessage={showUsernameError()} isRow>
        <BaseInput type="text" {...register("username", { required: true, minLength: MINIMUM_USERNAME_LENGTH })} />
      </InputLegend>
      <InputLegend label={text.authForm.password} isError={!!errors.password} errorMessage={showPasswordError()} isRow childNode={2}>
        <BaseInput type="password" {...register("password", { required: true, minLength: MINIMUM_PASSWORD_LENGTH })} />
      </InputLegend>
    </AuthContainer>
  );
};
