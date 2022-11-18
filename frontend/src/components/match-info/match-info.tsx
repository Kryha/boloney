import { FC } from "react";
import { MatchSettings } from "../../types";
import { Heading6 } from "../atoms";
import { Tooltip } from "../tooltip";
import { MatchInfoDescription, MatchInfoHeader, MatchInfoOverview } from "./styles";

interface MatchInfoProps {
  title: string;
  hasTooltip?: boolean;
  tooltipTitle?: string;
  tooltipDescription?: string;
  matchSettings: MatchSettings;
}

export const MatchInfo: FC<MatchInfoProps> = ({ title, hasTooltip, tooltipDescription, tooltipTitle, matchSettings }) => {
  return (
    <MatchInfoOverview>
      <MatchInfoHeader>
        <Heading6>{title}</Heading6>
        {hasTooltip && <Tooltip title={tooltipTitle} info={tooltipDescription} />}
      </MatchInfoHeader>
      <MatchInfoDescription></MatchInfoDescription>
    </MatchInfoOverview>
  );
};
