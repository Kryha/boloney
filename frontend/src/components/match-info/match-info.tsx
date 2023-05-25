import { FC } from "react";
import { text } from "../../assets/text";
import { color } from "../../design";
import { BaseIcon, GeneralText, Heading6, IconImage } from "../../atoms";
import { MatchSettings } from "../../types";
import { DiceIcon, PowerUpIcon } from "../icons";
import { InfoPosition, Tooltip } from "../tooltip";
import { HandImageWrapper, MatchInfoDescription, MatchInfoHeader, MatchInfoOverview } from "./styles";
import { RaisedHandIconSVG, RoundIconSVG } from "../../assets";

type MatchInfoSettings = "players" | "dice" | "powerUps" | "drawRoundOffset" | "healAction" | undefined;

interface MatchInfoProps {
  matchSettingsType: MatchInfoSettings;
  title: string;
  hasTooltip?: boolean;
  tooltipTitle?: string;
  tooltipDescription?: string;
  matchSettings: MatchSettings;
  tooltipPosition?: InfoPosition;
}

const findInfo = (matchSettingsType: MatchInfoSettings, matchSettings: MatchSettings) => {
  switch (matchSettingsType) {
    case "players":
      return (
        <HandImageWrapper>
          <IconImage src={RaisedHandIconSVG} />
          <GeneralText>{text.param.xAmount(matchSettings.players)}</GeneralText>
        </HandImageWrapper>
      );
    case "dice":
      return <DiceIcon diceAmount={matchSettings.dicePerPlayer} iconColor={color.white} pipColor={color.black} isMatchSettings />;
    case "powerUps":
      return <PowerUpIcon powerUpAmount={matchSettings.initialPowerUpAmount} strokeColor={color.black} />;
    case "drawRoundOffset":
      return (
        <>
          <BaseIcon src={<RoundIconSVG />} />
          <GeneralText>{text.param.xRounds(matchSettings.drawRoundOffset)}</GeneralText>
        </>
      );
    case "healAction":
      return <PowerUpIcon powerUpAmount={matchSettings.healPowerUpAmount} strokeColor={color.black} />;
  }
};

export const MatchInfo: FC<MatchInfoProps> = ({
  title,
  matchSettingsType,
  hasTooltip,
  tooltipDescription,
  tooltipTitle,
  matchSettings,
  tooltipPosition,
}) => {
  return (
    <MatchInfoOverview>
      <MatchInfoHeader>
        <Heading6>{title}</Heading6>
        {hasTooltip && <Tooltip title={tooltipTitle} info={tooltipDescription} infoPosition={tooltipPosition} />}
      </MatchInfoHeader>
      <MatchInfoDescription>{findInfo(matchSettingsType, matchSettings)}</MatchInfoDescription>
    </MatchInfoOverview>
  );
};
