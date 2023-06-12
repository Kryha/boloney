import { FC } from "react";

import { text } from "../../assets";
import { GeneralContentWrapper, Heading1, Heading4 } from "../../atoms";
import { useViewport } from "../../hooks";
import { PrimaryButton, WalletPill, WalletPillStatus } from "../../molecules";
import { useWalletAuth } from "../../service";
import { backendErrors } from "../../util";
import { PillsWrapper, SignOrJoinContainer, WalletAuthContainer } from "./styles";

interface Props {
  setSignature: (signature: string) => void;
}

export const WalletLogin: FC<Props> = ({ setSignature }) => {
  const { status, signature, authenticateWallet, error } = useWalletAuth();
  const { width, height } = useViewport();

  let connectionPillStatus: WalletPillStatus = "disabled";
  let signaturePillStatus: WalletPillStatus = "disabled";

  switch (status) {
    case "connecting":
      connectionPillStatus = "inProgress";
      signaturePillStatus = "disabled";
      break;
    case "checking-signature":
      connectionPillStatus = "completed";
      signaturePillStatus = "inProgress";
      break;
    case "error":
      connectionPillStatus = "disabled";
      signaturePillStatus = "disabled";
      break;
    case "success":
      connectionPillStatus = "completed";
      signaturePillStatus = "completed";
      break;
  }

  if (status === "error" && error?.message === backendErrors.notFound && signature) {
    // this will redirect to WalletRegistration in the parent component
    setSignature(signature);
  }

  return (
    <WalletAuthContainer>
      <GeneralContentWrapper>
        <Heading1>{text.authForm.login}</Heading1>
        <Heading4>{text.authForm.followWalletSteps}</Heading4>
      </GeneralContentWrapper>

      <PillsWrapper>
        {!!status && (
          <>
            <WalletPill defaultText={text.authForm.connecting} isCompletedText={text.authForm.connected} status={connectionPillStatus} />
            <WalletPill
              defaultText={text.authForm.validatingSignature}
              isCompletedText={text.authForm.signatureValidated}
              status={signaturePillStatus}
            />
          </>
        )}
      </PillsWrapper>

      <SignOrJoinContainer width={width} height={height}>
        <PrimaryButton
          buttonType="button"
          onClick={() => authenticateWallet()}
          primaryText={text.authForm.connectWithWallet}
          isLoading={status === "connecting" || status === "checking-signature"}
        />
      </SignOrJoinContainer>
    </WalletAuthContainer>
  );
};
