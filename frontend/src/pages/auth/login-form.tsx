import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { text } from "../../assets/text";
import { FormContainer, GeneralContentWrapper, Heading1, Heading4, BodyText } from "../../atoms";
import { fontSizes } from "../../design";
import { useViewport } from "../../hooks/use-viewport";
import { AuthFields, isNkError, NkCode, nkCodeSchema } from "../../types";
import { routes } from "../../navigation";
import { LoginFormContainer, SignOrJoinContainer } from "./styles";
import { useStore } from "../../store";
import { useAuthenticateUser } from "../../service";
import { Link, PrimaryButton } from "../../molecules";
import { AuthenticationForm } from "../../organisms";

export const LoginForm: FC = () => {
  const { authenticateUser } = useAuthenticateUser();
  const navigate = useNavigate();
  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);
  const isLoadingSpinnerVisible = useStore((state) => state.isLoadingSpinnerVisible);
  const { width, height } = useViewport();
  const NOT_FOUND = "User account not found.";
  const INTERNAL_ERROR = "internalError";

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm<AuthFields>({ mode: "onChange", reValidateMode: "onChange" });

  const onSubmit = async (username: string, password: string) => {
    setSpinnerVisibility(true);
    if (!isValid) return;

    const res = await authenticateUser(username, password);
    setSpinnerVisibility(false);
    setValue("password", "");
    if (!isNkError(res)) return navigate(routes.home);

    const code = nkCodeSchema.safeParse(res.code); // response is an error
    if (code.success && code.data === NkCode.NOT_FOUND) setError("password", { type: NOT_FOUND });
    else setError("password", { type: INTERNAL_ERROR });
  };

  return (
    <LoginFormContainer>
      <GeneralContentWrapper>
        <Heading1>{text.authForm.welcomeBack}</Heading1>
        <Heading4>{text.authForm.goodSeeingYouAgain}</Heading4>
      </GeneralContentWrapper>
      <form onSubmit={handleSubmit((data) => onSubmit(data.username, data.password))}>
        <FormContainer>
          <AuthenticationForm register={register} errors={errors} />
          <SignOrJoinContainer width={width} height={height}>
            <BodyText>{text.authForm.iDontHaveAnAccountYet}</BodyText>
            <Link transformText="none" fontSize={fontSizes.body} onClick={() => navigate(routes.createAccount)} text={text.authForm.here} />
            <PrimaryButton buttonType="submit" primaryText={text.authForm.signIn} isLoading={isLoadingSpinnerVisible} />
          </SignOrJoinContainer>
        </FormContainer>
      </form>
    </LoginFormContainer>
  );
};
