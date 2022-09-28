import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { text } from "../../assets/text";
import { Heading1, Heading4, Input, Paragraph, BaseInput, PageTitleWrapper, FormContainer, Link, PrimaryButton } from "../../components";
import { MINIMUM_PASSWORD_LENGTH } from "../../constants";
import { useViewport } from "../../hooks/use-viewport";
import { AuthFields, StatusCodes } from "../../interfaces";
import { useAuth } from "../../service/auth";
import { AuthContainer, LoginFormContainer, SignOrJoinContainer } from "./styles";

export const LoginForm: FC = () => {
  const { authenticateUser } = useAuth();
  const navigator = useNavigate();
  const { width, height } = useViewport();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthFields>({ mode: "onChange", reValidateMode: "onChange" });

  const usernameError = errors.username && errors.username.type === "required";
  const passwordError = errors.password && (errors.password.type === "minLength" || errors.password.type === "invalid");

  const showPasswordError = (): string | undefined => {
    return errors.password?.type === "invalid"
      ? text.authForm.errorMessages.invalidCredentials
      : text.authForm.errorMessages.passwordMinimum.replace("%", String(MINIMUM_PASSWORD_LENGTH));
  };

  const onSubmit = async (username: string, password: string) => {
    const statusCode = await authenticateUser(username, password);
    if (statusCode === StatusCodes.NOT_FOUND) setError("password", { type: "invalid" });
  };

  return (
    <LoginFormContainer>
      <PageTitleWrapper>
        <Heading1>{text.authForm.firstThingsFirst}</Heading1>
        <Heading4>{text.authForm.goodSeeingYouAgain}</Heading4>
      </PageTitleWrapper>
      <form onSubmit={handleSubmit((data) => onSubmit(data.username, data.password))}>
        <FormContainer>
          <AuthContainer>
            <Input label={text.authForm.username} isError={usernameError} errorMessage={text.authForm.errorMessages.usernameRequired}>
              <BaseInput isError={usernameError} type="text" defaultValue="" {...register("username", { required: true })} />
            </Input>
            <Input label={text.authForm.password} isError={passwordError} errorMessage={showPasswordError()}>
              <BaseInput
                type="password"
                defaultValue=""
                {...register("password", { required: true, minLength: MINIMUM_PASSWORD_LENGTH })}
                isError={passwordError}
              />
            </Input>
          </AuthContainer>
          <SignOrJoinContainer width={width} height={height}>
            <Paragraph>{text.authForm.iDontHaveAnAccountYet}</Paragraph>
            <Link onClick={() => navigator("/create-account")} text={text.authForm.register} />
            <PrimaryButton type="submit" text={text.authForm.signIn} />
          </SignOrJoinContainer>
        </FormContainer>
      </form>
    </LoginFormContainer>
  );
};
