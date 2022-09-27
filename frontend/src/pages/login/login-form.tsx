import { FC } from "react";
import { FieldErrorsImpl, useForm } from "react-hook-form";

import { text } from "../../assets/text";
import { Heading1, Heading4, Input, Paragraph, BaseInput, PageTitleWrapper, FormContainer, Link, PrimaryButton } from "../../components";
import { MINIMUM_PASSWORD_LENGTH } from "../../constants";
import { useViewport } from "../../hooks/use-viewport";
import { AuthFields, StatusCodes } from "../../interfaces";
import { useAuth } from "../../service/auth";
import { AuthContainer, LoginFormContainer, SignOrJoinContainer } from "./styles";

export const LoginForm: FC = () => {
  const { authenticateUser } = useAuth();
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
    return errors.username?.type === "taken" ?
      text.loginForm.errorMessages.usernameAlreadyTaken :
      text.loginForm.errorMessages.usernameRequired;
  };

  const showPasswordError = (errors: FieldErrorsImpl): string | undefined => {
    return errors.password?.type === "invalid" ?
      text.loginForm.errorMessages.invalidCredentials :
      text.loginForm.errorMessages.passwordMinimum.replace("%", String(MINIMUM_PASSWORD_LENGTH));
  };

  const onSubmit = async (username: string, password: string) => {
    const CREATE_NEW_USER = true; // This will be removed once we have a separate register and login form
    const statusCode = await authenticateUser(username, password, CREATE_NEW_USER);
    
    if (statusCode === StatusCodes.CONFLICT) setError("username", { type: "taken" });
    if (statusCode === StatusCodes.NOT_FOUND) setError("password", { type: "invalid" });
  };
  
  return (
    <LoginFormContainer>
      <PageTitleWrapper>
        <Heading1>{text.loginForm.firstThingsFirst}</Heading1>
        <Heading4>{text.loginForm.whoAreYou}</Heading4>
      </PageTitleWrapper>
      <form onSubmit={handleSubmit((data) => onSubmit(data.username, data.password))}>
        <FormContainer>
          <AuthContainer>
            <Input label={text.loginForm.username} isError={ usernameError } errorMessage={ showUsernameError(errors) }>
              <BaseInput 
                isError={usernameError} 
                type="text" 
                defaultValue="" {...register("username", { required: true })} 
              />
            </Input>
            <Input label={text.loginForm.password} isError={ passwordError } errorMessage={ showPasswordError(errors) }>
              <BaseInput
                type="password"
                defaultValue=""
                {...register("password", { required: true, minLength: MINIMUM_PASSWORD_LENGTH })}
                isError={passwordError}
              />
            </Input>
          </AuthContainer>
          <SignOrJoinContainer width={width} height={height}>
            <Paragraph>{text.loginForm.iAlreadyHaveAnAccount}</Paragraph>
            <Link text={text.loginForm.signIn} />
            <PrimaryButton type="submit" text={text.loginForm.join} />
          </SignOrJoinContainer>
        </FormContainer>
      </form>
    </LoginFormContainer>
  );
};
