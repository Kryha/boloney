import { FC } from "react";
import { CheckSVG, CircleIconSVG } from "../../assets";
import { BaseRow, DiceIcon, Heading6 } from "../../atoms";
import { color, fontSizes, fontWeights, lineHeights, spacing } from "../../design";
import { WalletPillContainer } from "./styles";

export type WalletPillStatus = "inProgress" | "completed" | "disabled";

interface Props {
  status?: WalletPillStatus;

  defaultText?: string;
  isCompletedText: string;
}

/**
 * This is the wallet pill it is used in the authentication of the wallet. The default state of this component, is when it is in progress/active.
 * @param {WalletPillStatus} status - If the pill is in a disabled or completed or inprogress state.
 * @param {string} defaultText - The text of the pill when the action in conjunction with the pill is in progress or disabled.
 * @param {string} isCompletedText - The text of the pill when the action in conjunction with the pill is completed.
 */

export const WalletPill: FC<Props> = ({ status, defaultText, isCompletedText }) => {
  const walletPillText = status === "completed" ? isCompletedText : defaultText;
  const walletPillIcon = status === "completed" ? <CheckSVG /> : <CircleIconSVG />;
  const walletPillColor = status === "completed" ? color.black : color.ironGrey;

  return (
    <WalletPillContainer isBackgroundTransparent={status !== "inProgress"}>
      <BaseRow gap={spacing.xs}>
        <DiceIcon src={walletPillIcon} iconColor={color.transparent} pipColor={walletPillColor} />
        <Heading6 fontWeight={fontWeights.light} fontSize={fontSizes.body} lineHeight={lineHeights.body} transformText="capitalize">
          {walletPillText}
        </Heading6>
      </BaseRow>
    </WalletPillContainer>
  );
};
