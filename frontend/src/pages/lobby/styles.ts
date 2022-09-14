import styled from "@emotion/styled";
import { Heading1 } from "../../components";
import { color } from "../../design";

export const GameName = styled(Heading1)`
  color: transparent;
  -webkit-text-stroke: 1px ${color.black};
  font-size: 24.5vw;
  position: absolute;
  bottom: clamp(3.75rem, 3.13vw + 1.88rem, 5.63rem);
  margin-left: 19px;
`;

export const LobbyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 65px;
`;
