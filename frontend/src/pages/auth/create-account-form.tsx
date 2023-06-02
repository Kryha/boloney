import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { text } from "../../assets/text";
import { FormContainer, GeneralContentWrapper, Heading1, Heading4, BodyText } from "../../atoms";
import { fontSizes } from "../../design";
import { useViewport } from "../../hooks/use-viewport";
import { AuthFields, isNkError, NkCode } from "../../types";
import { routes } from "../../navigation";
import { LoginFormContainer, SignOrJoinContainer } from "./styles";
import { useStore } from "../../store";
import { useAuthenticateUser } from "../../service";
import { Link, PrimaryButton } from "../../molecules";
import { AuthenticationForm } from "../../organisms";

export const CreateAccountForm: FC = () => {
  const { authenticateUser } = useAuthenticateUser();
  const navigate = useNavigate();
  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);
  const isLoadingSpinnerVisible = useStore((state) => state.isLoadingSpinnerVisible);
  const { width, height } = useViewport();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<AuthFields>({ mode: "onChange", reValidateMode: "onChange" });

  const getFieldName = (code: NkCode): "username" | "password" => {
    const isUsernameError = code === NkCode.ALREADY_EXISTS || code === NkCode.INVALID_ARGUMENT;
    if (isUsernameError) {
      return "username";
    } else {
      return "password";
    }
  };

  const onSubmit = async (username: string, password: string) => {
    if (!isValid) return;
    setSpinnerVisibility(true);
    const res = await authenticateUser(username, password, true);
    setSpinnerVisibility(false);
    if (!isNkError(res)) return navigate(routes.home);
    setError(getFieldName(res.code), { type: res.message }); // response is an error
  };

  return (
    <LoginFormContainer>
      <GeneralContentWrapper>
        <Heading1>{text.authForm.createAccount}</Heading1>
        <Heading4>{text.authForm.whoAreYou}</Heading4>
      </GeneralContentWrapper>
      <form onSubmit={handleSubmit((data) => onSubmit(data.username, data.password))}>
        <FormContainer>
          <AuthenticationForm register={register} errors={errors} />
          <SignOrJoinContainer width={width} height={height}>
            <BodyText>{text.authForm.iAlreadyHaveAnAccount}</BodyText>
            <Link transformText="none" fontSize={fontSizes.body} onClick={() => navigate(routes.login)} text={text.authForm.here} />
            <PrimaryButton buttonType="submit" primaryText={text.authForm.join} isLoading={isLoadingSpinnerVisible} />
          </SignOrJoinContainer>
        </FormContainer>
      </form>
    </LoginFormContainer>
  );
};
