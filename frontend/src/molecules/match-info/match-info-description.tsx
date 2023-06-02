import { LightningIconSVG, RaisedHandIconSVG, RoundIconSVG, text } from "../../assets";
import { BaseIcon, GeneralText, IconImage } from "../../atoms";
import { color, fontWeights, spacing } from "../../design";
import { MatchSettings } from "../../types";
import { Die } from "../die";
import { RowHeadingIcon } from "../text";
import { HandImageWrapper } from "./styles";

export type MatchInfoSettings =
  | "players"
  | "dice"
  | "powerUps"
  | "drawRoundOffset"
  | "healAction"
  | "sound"
  | "playerTurnDuration"
  | undefined;

export const findInfo = (matchSettingsType: MatchInfoSettings, matchSettings: MatchSettings) => {
  switch (matchSettingsType) {
    case "players":
      return (
        <HandImageWrapper gap={spacing.xs} alignItems="center" justifyContent="center">
          <IconImage src={RaisedHandIconSVG} />
          <GeneralText transformText="none" color={color.black} fontWeight={fontWeights.regular}>
            {text.param.xAmount(matchSettings.players)}
          </GeneralText>
        </HandImageWrapper>
      );
    case "dice":
      return (
        <RowHeadingIcon
          headingFontWeight={fontWeights.regular}
          heading={text.param.xAmount(matchSettings.dicePerPlayer)}
          icon={<BaseIcon src={<Die borderColor={color.black} pipColor={color.black} dieColor={color.transparent} />} />}
          iconPosition="row-reverse"
          justifyContent="flex-end"
          gap={spacing.xs}
          transformText="none"
          headingColor={color.black}
        />
      );
    case "powerUps":
      return (
        <RowHeadingIcon
          headingFontWeight={fontWeights.regular}
          heading={text.param.xAmount(matchSettings.initialPowerUpAmount)}
          icon={<BaseIcon src={<LightningIconSVG />} iconColor={color.transparent} strokeColor={color.black} />}
          iconPosition="row-reverse"
          justifyContent="flex-end"
          gap={spacing.xxs}
          transformText="none"
          headingColor={color.black}
        />
      );
    case "drawRoundOffset":
      return (
        <>
          <BaseIcon src={<RoundIconSVG />} />
          <GeneralText transformText="none" color={color.black} fontWeight={fontWeights.regular}>
            {text.param.xRounds(matchSettings.drawRoundOffset)}
          </GeneralText>
        </>
      );
    case "healAction":
      return (
        <RowHeadingIcon
          headingFontWeight={fontWeights.regular}
          heading={text.param.xAmount(matchSettings.healPowerUpAmount)}
          icon={<BaseIcon src={<LightningIconSVG />} iconColor={color.transparent} strokeColor={color.black} />}
          iconPosition="row-reverse"
          justifyContent="flex-end"
          gap={spacing.xxs}
          transformText="none"
          headingColor={color.black}
        />
      );
    case "playerTurnDuration":
      return <GeneralText>{matchSettings.matchStageDuration.playerTurnLoopStage}</GeneralText>;

    default:
      return <></>;
  }
};
