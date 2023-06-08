import { FC } from "react";
import { text } from "../../assets";
import { TooltipText, DefaultListItem, BaseColumn } from "../../atoms";
import { BulletContainer } from "./styles";

export const StageNumberContent: FC = () => {
  return (
    <BaseColumn>
      <TooltipText>{text.general.toolTipStageNumberInfo}</TooltipText>
      <TooltipText>{text.general.example}</TooltipText>
      <TooltipText>{text.general.diceInPlay}</TooltipText>
      <BulletContainer>
        {text.general.toolTipStageNumberBulletList.map((item, index) => (
          <DefaultListItem key={index}>
            <TooltipText>{item}</TooltipText>
          </DefaultListItem>
        ))}
      </BulletContainer>
    </BaseColumn>
  );
};
