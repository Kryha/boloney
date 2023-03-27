// TODO: delete this file when done testing

import { FC } from "react";
import {
  PopUpBlock,
  PopUp,
  Card,
  BlockBox,
  BadgeBlock,
  MessageBlock,
  TooltipBlock,
  InformationBlock,
  CopyBlock,
  ModalBlock,
  Box,
  Sidebar,
  HUDBlock,
  PlayerInformationBlock,
  PlayerBox,
  PlayerMenuBlock,
  PlayerMenuBox,
  BaseInput,
} from "../../components";
import { BaseRow } from "../../components/atoms/grid";

export const Test: FC = () => {
  return (
    <div style={{ padding: "50px", background: "lightBlue" }}>
      <PopUpBlock>{"multiple notifications"}</PopUpBlock>
      <br />
      <PopUp>{"notification"}</PopUp>
      <br />
      <Card>{"large power up card"}</Card>
      <br />
      <Card isSmall>{"small power up card"}</Card>
      <br />
      <br />
      <Card isSmall isEmpty>
        {"smaller power-up card"}
      </Card>
      <br />
      <br />
      <br />
      <Box>{"checkbox box default"}</Box>
      <br />
      <Box active>{"checkbox box active"}</Box>
      <br />
      <BlockBox />
      <br />
      <BadgeBlock>{"winner"}</BadgeBlock>
      <br />
      <MessageBlock>{"message"}</MessageBlock>
      <br />
      <TooltipBlock>{"tooltip"}</TooltipBlock>
      <br />
      <InformationBlock>{"info"}</InformationBlock>
      <br />
      <CopyBlock>{"copy"}</CopyBlock>
      <br />
      <ModalBlock>{"modal"}</ModalBlock>
      <br />
      <h1>layouts</h1>
      <br />
      <Sidebar>{"sidebar"}</Sidebar>
      <br />
      <Sidebar hover enabled>
        {"sidebar hover"}
      </Sidebar>
      <br />
      <Sidebar active>{"sidebar active"}</Sidebar>
      <br />
      <HUDBlock>{"hud"}</HUDBlock>
      <br />
      <HUDBlock hover enabled>
        {"hud hover"}
      </HUDBlock>
      <br />
      <HUDBlock active>{"hud active"}</HUDBlock>
      <br />
      <PlayerInformationBlock>{"hud power up and dice container"}</PlayerInformationBlock>
      <br />
      <PlayerInformationBlock hover enabled>
        {"hud power up and dice container hover"}
      </PlayerInformationBlock>
      <br />
      <PlayerInformationBlock active>{"hud power up and dice container active"}</PlayerInformationBlock>
      <br />
      <PlayerBox>{"hud player"}</PlayerBox>
      <br />
      <PlayerBox hover enabled>
        {"hud player hover"}
      </PlayerBox>
      <br />
      <PlayerBox active>{"hud player active"}</PlayerBox>
      <br />
      <h1>chat and history elements</h1>
      <br />
      <PlayerMenuBox>{"chat / history header"}</PlayerMenuBox>
      <br />
      <PlayerMenuBlock>{"chat / history when both are open"}</PlayerMenuBlock>
      <br />
      <PlayerMenuBlock open>{"chat / history when one is open"}</PlayerMenuBlock>
      <br />
      <h1>row</h1>
      <br />
      <BaseRow>
        <div style={{ background: "white", width: "100%" }}>
          <BaseInput placeholder="hello" />
        </div>
        <div style={{ background: "white", width: "100%" }}>
          <BaseInput placeholder="goodbye" />
        </div>
      </BaseRow>
    </div>
  );
};
