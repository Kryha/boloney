import { FC } from "react";
import { text } from "../../assets/text";
import { GeneralText, TooltipText, DefaultListItem } from "../../atoms";
import { BulletContainer, ToolTipContent } from "./styles";

export const ToolTipStageNumber: FC = () => {
  return (
    <ToolTipContent>
      {text.general.toolTipStageNumberInfo}
      <GeneralText>{text.general.example}</GeneralText>
      <GeneralText>{text.general.diceInPlay}</GeneralText>
      <BulletContainer>
        {text.general.toolTipStageNumberBulletList.map((item, index) => (
          <DefaultListItem key={index}>
            <TooltipText>{item}</TooltipText>
          </DefaultListItem>
        ))}
      </BulletContainer>
    </ToolTipContent>
  );
};
