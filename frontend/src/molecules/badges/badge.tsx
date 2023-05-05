import { FC, ReactNode } from "react";
import { BadgeBlock, BaseIcon, BaseRow, BodyText } from "../../atoms";
import { spacing } from "../../design";

interface BadgeProps {
  icon: ReactNode;
  text: string;
}

/*
 * @param {ReactNode} icon - The icon that will be displayed on the badge
 * @param {string} text - The text that will be displayed on the badge
 */

export const Badge: FC<BadgeProps> = ({ icon, text }) => {
  return (
    <BadgeBlock padding={spacing.xxs}>
      <BaseRow gap={spacing.xs}>
        <BaseIcon src={icon} />
        <BodyText>{text}</BodyText>
      </BaseRow>
    </BadgeBlock>
  );
};
