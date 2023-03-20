import { FC } from "react";
import { text } from "../../assets/text";
import { color } from "../../design";
import { GeneralText, Heading6 } from "../atoms";
import { MatchSettings } from "../../types";
import { DiceIcon, PowerUpIcon } from "../icons";
import { InfoPosition, Tooltip } from "../tooltip";
import { SoundToggle } from "../sound-toggle";
import { MatchInfoDescription, MatchInfoHeader, MatchInfoOverview, RaisedHand, Round } from "./styles";

type MatchInfoSettings = "players" | "dice" | "powerUps" | "drawRoundOffset" | "healAction" | "sound" | undefined;

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
        <>
          <RaisedHand />
          <GeneralText>{text.param.xAmount(matchSettings.players)}</GeneralText>
        </>
      );
    case "dice":
      return <DiceIcon diceAmount={matchSettings.dicePerPlayer} faceColor={color.white} pipColor={color.black} isMatchSettings />;
    case "powerUps":
      return <PowerUpIcon powerUpAmount={matchSettings.initialPowerUpAmount} />;
    case "drawRoundOffset":
      return (
        <>
          <Round />
          <GeneralText>{text.param.xRounds(matchSettings.drawRoundOffset)}</GeneralText>
        </>
      );
    case "healAction":
      return <PowerUpIcon powerUpAmount={matchSettings.healPowerUpAmount} />;
    case "sound":
      return <SoundToggle />;
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
