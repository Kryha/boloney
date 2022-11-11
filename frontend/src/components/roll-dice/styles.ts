import styled from "@emotion/styled";

interface RollDiceContainerProps {
  height: number;
}

export const RollDiceContainer = styled.section<RollDiceContainerProps>`
  // width: 60vw;
  // height: ${({ height }) => (height < 900 ? "49vh" : "59vh")};
  // position: relative;
  // canvas {
  //   position: absolute;
  // }
`;

export const CenterField = styled.div`
  position: absolute;
  text-align: center;
  height: 100%;
  width: 100%;
`;

export const CenterFieldBR = styled.br`
  background-color: rgba(0, 0, 0, 0);
  position: relative;
  font-family: Trebuchet MS;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 5px 15px;
`;

export const BottomField = styled.div`
  position: absolute;
  text-align: center;
  bottom: 5px;
  width: inherit;
  padding: 0px;
`;

export const Label = styled.span`
  font-size: 32pt;
  word-spacing: 0.5em;
  padding: 5px 15px;
  color: rgba(21, 26, 26, 0.6);
  top: 45%;
`;

export const LabelHelp = styled.div`
  font-size: 12pt;
  padding: 5px 15px;
  color: rgba(21, 26, 26, 0.5);
  bottom: 50px;
`;

export const Set = styled.input`
  text-align: center;
  font-size: 26pt;
  border: none;
  color: rgba(0, 0, 0, 0.8);
  background-color: rgba(255, 255, 255, 0);
  top: 60%;
`;

export const SetHelp = styled.div`
  font-size: 12pt;
  color: rgba(21, 26, 26, 0.5);
  background: none;
  top: 25%;
`;

export const SelectorDivButton = styled.div`
  font-size: 20pt;
  color: rgb(255, 255, 255);
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  border: none;
  width: 5em;
  top: 62%;
`;

export const DicePlace = styled.div`
  position: absolute;
  border: solid black 1px;
`;
