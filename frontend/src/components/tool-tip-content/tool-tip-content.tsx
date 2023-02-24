import { FC } from "react";
import { text } from "../../assets/text";
import { BulletContainer, DefaultListItem } from "../atoms";
import { ToolTipContent } from "./styles";

export const ToolTipStageNumber: FC = () => {
  return (
    <ToolTipContent>
      {text.general.toolTipStageNumberInfo}
      <BulletContainer>
        <DefaultListItem>{text.general.toolTipStageNumberInfoPointOne}</DefaultListItem>
        <DefaultListItem>{text.general.toolTipStageNumberInfoPointTwo}</DefaultListItem>
      </BulletContainer>
    </ToolTipContent>
  );
};
