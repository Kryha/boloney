import { FC } from "react";
import { FieldErrorsImpl, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { text } from "../../assets/text";
import { Heading1, Heading4, Input, Paragraph, BaseInput, PageTitleWrapper, FormContainer, Link, PrimaryButton } from "../../components";
import { MINIMUM_PASSWORD_LENGTH } from "../../constants";
import { useViewport } from "../../hooks/use-viewport";
import { AuthFields, StatusCodes } from "../../interfaces";
import { useAuth } from "../../service/auth";
import { AuthContainer, LoginFormContainer, SignOrJoinContainer } from "./styles";

export const CreateAccountForm: FC = () => {
  const { authenticateUser } = useAuth();
  const navigator = useNavigate();
  const { width, height } = useViewport();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthFields>({ mode: "onChange", reValidateMode: "onChange" });

  const usernameError = errors.username && (errors.username.type === "required" || errors.username.type === "taken");
  const passwordError = errors.password && (errors.password.type === "minLength" || errors.password.type === "invalid");

  const showUsernameError = (errors: FieldErrorsImpl): string | undefined => {
    return errors.username?.type === "taken"
      ? text.authForm.errorMessages.usernameAlreadyTaken
      : text.authForm.errorMessages.usernameRequired;
  };

  const onSubmit = async (username: string, password: string) => {
    const newUser = true;
    const statusCode = await authenticateUser(username, password, newUser);

    if (statusCode === StatusCodes.CONFLICT) setError("username", { type: "taken" });
  };

  return (
    <LoginFormContainer>
      <PageTitleWrapper>
        <Heading1>{text.authForm.firstThingsFirst}</Heading1>
        <Heading4>{text.authForm.whoAreYou}</Heading4>
      </PageTitleWrapper>
      <form onSubmit={handleSubmit((data) => onSubmit(data.username, data.password))}>
        <FormContainer>
          <AuthContainer>
            <Input label={text.authForm.username} isError={usernameError} errorMessage={showUsernameError(errors)}>
              <BaseInput isError={usernameError} type="text" defaultValue="" {...register("username", { required: true })} />
            </Input>
            <Input
              label={text.authForm.password}
              isError={passwordError}
              errorMessage={text.authForm.errorMessages.passwordMinimum.replace("%", String(MINIMUM_PASSWORD_LENGTH))}
            >
              <BaseInput
                type="password"
                defaultValue=""
                {...register("password", { required: true, minLength: MINIMUM_PASSWORD_LENGTH })}
                isError={passwordError}
              />
            </Input>
          </AuthContainer>
          <SignOrJoinContainer width={width} height={height}>
            <Paragraph>{text.authForm.iAlreadyHaveAnAccount}</Paragraph>
            <Link onClick={() => navigator("/login")} text={text.authForm.signIn} />
            <PrimaryButton type="submit" text={text.authForm.join} />
          </SignOrJoinContainer>
        </FormContainer>
      </form>
    </LoginFormContainer>
  );
};
