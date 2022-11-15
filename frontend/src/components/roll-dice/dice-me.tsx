import { dice_initialize } from "../cannon-dice";

export const DiceMe = () => {
  dice_initialize(document.body);
  return (
    <>
      <div className="control_panel">
        <h6>
          <img src="../favicon.ico" style={{ verticalAlign: "middle" }}></img>
          <a href="..">teal</a> dice
        </h6>
        <p id="loading_text">Loading libraries, please wait a bit...</p>
        <p id="info_text">
          <a href="http://www.teall.info/2014/01/online-3d-dice-roller.html">More info and help</a>
        </p>
        <p id="info_text">
          <a href="/mdice">Multiplayer version</a>
        </p>
      </div>
      <div id="info_div" style={{ display: "none" }}>
        <div className="center_field">
          <span id="label"></span>
        </div>
        <div className="center_field">
          <div className="bottom_field">
            <span id="labelhelp">click to continue or tap and drag again</span>
          </div>
        </div>
      </div>
      <div id="selector_div" style={{ display: "none" }}>
        <div className="center_field">
          <div id="sethelp">
            choose your dice set by clicking the dices or by direct input of notation,
            <br /> tap and drag on free space of screen or hit throw button to roll
          </div>
        </div>
        <div className="center_field">
          <input type="text" id="set" defaultValue="4d6"></input>
          <br />
          <button id="clear">clear</button>
          <button style={{ marginLeft: "0.6em" }} id="throw">
            throw
          </button>
        </div>
      </div>
      <div id="canvas"></div>
    </>
  );
};
