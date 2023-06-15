import { FC } from "react";

import { RedirectIconSVG, text } from "../../assets";
import { BaseIcon, BaseRow, GeneralContentWrapper, GeneralText, Heading1, Heading4, LinkText } from "../../atoms";
import { BLANK_TARGET_LINK, LEO_WALLET_LINK } from "../../constants";
import { color, fonts, fontSizes, fontWeights, lineHeights, spacing } from "../../design";
import { useViewport } from "../../hooks";
import { PrimaryButton, RowHeadingIcon, Tooltip, WalletPill, WalletPillStatus } from "../../molecules";
import { useWalletAuth } from "../../service";
import { backendErrors } from "../../util";
import { InstructionsWrapper, PillsWrapper, SignOrJoinContainer, WalletAuthContainer } from "./styles";

interface Props {
  setSignature: (signature: string) => void;
}

export const WalletLogin: FC<Props> = ({ setSignature }) => {
  const { status, signature, authenticateWallet, error } = useWalletAuth();
  const { width, height } = useViewport();

  let heading = text.authForm.login;
  let subHeading = text.authForm.connectBelow;
  let connectionPillStatus: WalletPillStatus = "disabled";
  let signaturePillStatus: WalletPillStatus = "disabled";

  switch (status) {
    case "connecting":
      connectionPillStatus = "inProgress";
      signaturePillStatus = "disabled";
      subHeading = text.authForm.followWalletSteps;
      break;
    case "checking-signature":
      connectionPillStatus = "completed";
      signaturePillStatus = "inProgress";
      subHeading = text.authForm.completeWalletSignature;
      break;
    case "error":
      connectionPillStatus = "disabled";
      signaturePillStatus = "disabled";
      subHeading = text.authForm.walletConnectionFailed;
      break;
    case "success":
      connectionPillStatus = "completed";
      signaturePillStatus = "completed";
      heading = text.authForm.connectedExclamation;
      subHeading = text.authForm.walletCorrectlyConnected;
      break;
  }

  if (status === "error" && error?.message === backendErrors.notFound && signature) {
    // this will redirect to WalletRegistration in the parent component
    setSignature(signature);
  }

  return (
    <WalletAuthContainer>
      <GeneralContentWrapper>
        <Heading1>{heading}</Heading1>
        <Heading4>{subHeading}</Heading4>

        {!status && (
          <BaseRow gap={spacing.xs}>
            <Heading4>{text.authForm.noWalletYet}</Heading4>
            <LinkText
              href={LEO_WALLET_LINK}
              target={BLANK_TARGET_LINK}
              transformText="none"
              fontSize={fontSizes.generalText}
              lineHeight={lineHeights.generalText}
            >
              <RowHeadingIcon
                heading={text.authForm.clickToGetOne}
                headingFontSize={fontSizes.heading4}
                headingLineHeight={lineHeights.heading4}
                headingFontWeight={fontWeights.light}
                headingFont={fonts.secondary}
                transformText="none"
                gap={spacing.xs}
                icon={<BaseIcon src={<RedirectIconSVG />} strokeColor={color.black} iconColor={color.transparent} />}
              />
            </LinkText>
          </BaseRow>
        )}
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
          tooltipTitle={text.authForm.clickPopUp}
          tooltipInfo={text.authForm.walletInstructions}
          tooltipInfoPosition="bottom"
        />
      </SignOrJoinContainer>
      <InstructionsWrapper gap={spacing.xs} justifyContent="flex-end" alignItems="center">
        <GeneralText fontSize={fontSizes.toolTip}>{text.authForm.clickPopUp}</GeneralText>
        <Tooltip description={text.authForm.walletInstructions} />
      </InstructionsWrapper>
    </WalletAuthContainer>
  );
};
