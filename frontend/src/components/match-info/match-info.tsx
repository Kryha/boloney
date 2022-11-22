import { FC } from "react";
import { RaisedHandIcon, RoundIcon, text } from "../../assets";
import { color } from "../../design";
import { MatchSettings } from "../../types";
import { GeneralText, Heading6 } from "../atoms";
import { Die } from "../die";
import { DiceIcon, PowerUpIcon } from "../icons";
import { Tooltip } from "../tooltip";
import { MatchInfoDescription, MatchInfoHeader, MatchInfoOverview, RaisedHand } from "./styles";

export type MatchInfoSettings = "players" | "dice" | "powerUp" | "extraPowerUp" | "healAction" | undefined;
interface MatchInfoProps {
  type: MatchInfoSettings;
  title: string;
  hasTooltip?: boolean;
  tooltipTitle?: string;
  tooltipDescription?: string;
  matchSettings: MatchSettings;
}

export const MatchInfo: FC<MatchInfoProps> = ({ title, type, hasTooltip, tooltipDescription, tooltipTitle, matchSettings }) => {
  const findInfo = () => {
    switch (type) {
      case "players":
        return (
          <>
            <RaisedHand />
            <GeneralText>{text.param.xAmount(matchSettings.players)}</GeneralText>
          </>
        );
      case "dice":
        return <DiceIcon diceAmount={matchSettings.dicePerPlayer} diceValue={2} faceColor={color.white} pipColor={color.black} />;
      case "powerUp":
        return <PowerUpIcon powerUpAmount={matchSettings.initialPowerUpAmount} />;
      case "extraPowerUp":
        return (
          <>
            <RoundIcon />
            <GeneralText>{text.param.xRounds(matchSettings.drawRoundOffset)}</GeneralText>
          </>
        );
      case "healAction":
        return <PowerUpIcon powerUpAmount={matchSettings.healPowerUpAmount} />;
    }
  };
  return (
    <MatchInfoOverview>
      <MatchInfoHeader>
        <Heading6>{title}</Heading6>
        {hasTooltip && <Tooltip title={tooltipTitle} info={tooltipDescription} />}
      </MatchInfoHeader>
      <MatchInfoDescription>{findInfo()}</MatchInfoDescription>
    </MatchInfoOverview>
  );
};
