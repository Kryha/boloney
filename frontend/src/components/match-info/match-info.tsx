import { FC } from "react";
import { text } from "../../assets/text";
import { color } from "../../design";
import { MatchSettings } from "../../types";
import { GeneralText, Heading6 } from "../atoms";
import { DiceIcon, PowerUpIcon } from "../icons";
import { Tooltip } from "../tooltip";
import { MatchInfoDescription, MatchInfoHeader, MatchInfoOverview, RaisedHand, Round } from "./styles";

type MatchInfoSettings = "players" | "dice" | "powerUps" | "drawRoundOffset" | "healAction" | undefined;
interface MatchInfoProps {
  matchSettingsType: MatchInfoSettings;
  title: string;
  hasTooltip?: boolean;
  tooltipTitle?: string;
  tooltipDescription?: string;
  matchSettings: MatchSettings;
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
      // TODO: remove hardcoded value
      return <DiceIcon diceAmount={matchSettings.dicePerPlayer} diceValue={2} faceColor={color.white} pipColor={color.black} />;
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
  }
};

export const MatchInfo: FC<MatchInfoProps> = ({
  title,
  matchSettingsType,
  hasTooltip,
  tooltipDescription,
  tooltipTitle,
  matchSettings,
}) => {
  return (
    <MatchInfoOverview>
      <MatchInfoHeader>
        <Heading6>{title}</Heading6>
        {hasTooltip && <Tooltip title={tooltipTitle} info={tooltipDescription} />}
      </MatchInfoHeader>
      <MatchInfoDescription>{findInfo(matchSettingsType, matchSettings)}</MatchInfoDescription>
    </MatchInfoOverview>
  );
};
