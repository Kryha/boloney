import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { text } from "../../assets/text";
import {
  BaseInput,
  FormContainer,
  Link,
  PrimaryButton,
  GeneralContentWrapper,
  InputLegend,
  Heading1,
  Heading4,
  BodyText,
} from "../../components";
import { fontSizes } from "../../design";
import { useViewport } from "../../hooks/use-viewport";
import { AuthFields, isNkError } from "../../types";
import { routes } from "../../navigation";
import { AuthContainer, LoginFormContainer, SignOrJoinContainer } from "./styles";
import { useStore } from "../../store";
import { useAuthenticateUser } from "../../service";
import { ENV_MODE } from "../../constants";

export const LoginForm: FC = () => {
  const { authenticateUser } = useAuthenticateUser();
  const navigate = useNavigate();
  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);
  const { width, height } = useViewport();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm<AuthFields>({ mode: "onChange", reValidateMode: "onChange" });

  const showPasswordError = () => {
    switch (errors.password?.type) {
      case "User account not found.":
        return text.authForm.errorMessages.invalidCredentials;
      case "required":
        return text.authForm.errorMessages.passwordRequired;
      default:
        return "";
    }
  };

  const onSubmit = async (username: string, password: string) => {
    setSpinnerVisibility(true);
    if (!isValid) return;
    const res = await authenticateUser(username, password);
    setSpinnerVisibility(false);
    setValue("password", "");
    if (!isNkError(res)) return navigate(routes.home);
    setError("password", { type: res.message }); // response is an error
  };

  return (
    <LoginFormContainer>
      <GeneralContentWrapper>
        <Heading1>{text.authForm.welcomeBack}</Heading1>
        <Heading4>{text.authForm.goodSeeingYouAgain}</Heading4>
      </GeneralContentWrapper>
      <form onSubmit={handleSubmit((data) => onSubmit(data.username, data.password))}>
        <FormContainer>
          <AuthContainer>
            <InputLegend
              label={text.authForm.username}
              isError={!!errors.username}
              errorMessage={text.authForm.errorMessages.usernameRequired}
              isRow
            >
              <BaseInput type="text" {...register("username", { required: true })} />
            </InputLegend>
            <InputLegend label={text.authForm.password} isError={!!errors.password} errorMessage={showPasswordError()} isRow childNode={2}>
              <BaseInput type="password" {...register("password", { required: true })} />
            </InputLegend>
          </AuthContainer>
          <SignOrJoinContainer width={width} height={height}>
            {ENV_MODE !== "production" && (
              <>
                <BodyText>{text.authForm.iDontHaveAnAccountYet}</BodyText>
                <Link
                  transformText="none"
                  fontSize={fontSizes.body}
                  onClick={() => navigate(routes.createAccount)}
                  primaryText={text.authForm.here}
                />
              </>
            )}
            <PrimaryButton buttonType="submit" primaryText={text.authForm.signIn} />
          </SignOrJoinContainer>
        </FormContainer>
      </form>
    </LoginFormContainer>
  );
};
