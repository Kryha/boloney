import { FC } from "react";
import { spacing } from "../../design";
import { BaseRow, Heading6 } from "../../atoms";
import { MatchSettings } from "../../types";

import { MatchInfoOverview } from "./styles";
import { Tooltip } from "../tooltip";
import { findInfo, MatchInfoSettings } from "./match-info-description";

interface MatchInfoProps {
  matchSettingsType: MatchInfoSettings;
  title: string;
  hasTooltip?: boolean;
  tooltipTitle?: string;
  tooltipDescription?: string;
  matchSettings: MatchSettings;
}

/**
 * @description - Match info molecule
 * @param {matchSettingsType} - Type of match settings
 * @param {title} - Title of match info
 * @param {hasTooltip} - If there is a tooltip present
 * @param {tooltipTitle} - Title of tooltip
 * @param {tooltipDescription} - Description of tooltip
 * @param {matchSettings} - Match settings
 * @param {tooltipPosition} - Position of tooltip
 */

export const MatchInfo: FC<MatchInfoProps> = ({
  title,
  matchSettingsType,
  hasTooltip,
  tooltipDescription,
  tooltipTitle,
  matchSettings,
}) => {
  return (
    <MatchInfoOverview alignItems="flex-start" padding={`${spacing.xs} ${spacing.sm}`} justifyContent="center">
      <BaseRow gap={spacing.xxs} alignItems="center">
        <Heading6>{title}</Heading6>
        {hasTooltip && <Tooltip title={tooltipTitle} info={tooltipDescription} description={tooltipDescription} />}
      </BaseRow>
      <BaseRow gap={spacing.xs} alignItems="center" justifyContent="center">
        {findInfo(matchSettingsType, matchSettings)}
      </BaseRow>
    </MatchInfoOverview>
  );
};
