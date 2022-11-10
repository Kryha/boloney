import { useViewport } from "../../hooks";
import { BottomField, CenterField, Label, LabelHelp, RollDiceContainer, SelectorDivButton, SetHelp, Set } from "./styles";

export const ThrowDice = () => {
  const { height } = useViewport();
  return (
    <RollDiceContainer height={height} id="diceElement">
      <div id="control_panel">
        <h6>
          <img src="../favicon.ico" style={{ verticalAlign: "middle" }}></img> <a href="..">teal</a> dice
        </h6>
        <p id="loading_text">Loading libraries, please wait a bit...</p>
        <p id="info_text">
          <a href="http://www.teall.info/2014/01/online-3d-dice-roller.html">More info and help</a>
        </p>
      </div>
      <div id="info_div" style={{ display: "none" }}>
        <CenterField className="center_field">
          <Label id="label"></Label>
        </CenterField>
        <CenterField>
          <BottomField className="bottom_field">
            <LabelHelp id="labelhelp">click to continue or tap and drag again</LabelHelp>
          </BottomField>
        </CenterField>
      </div>
      <div id="selector_div" style={{ display: "none" }}>
        <CenterField className="center_field">
          <SetHelp id="sethelp">
            choose your dice set by clicking the dices or by direct input of notation,
            <br />
            tap and drag on free space of screen or hit throw button to roll
          </SetHelp>
        </CenterField>
        <CenterField className="center_field">
          <Set type="text" id="set" value="4d6"></Set>
          <br />
          <button id="clear">clear</button>
          <SelectorDivButton style={{ marginLeft: "0.6em" }} id="throw">
            throw
          </SelectorDivButton>
        </CenterField>
      </div>
      <div id="canvas"></div>
    </RollDiceContainer>
  );
};
