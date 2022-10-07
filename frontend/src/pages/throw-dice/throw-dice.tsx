// import Dice from "react-dice-roll";
import DiceBox from "@3d-dice/dice-box";
import { DiceRoller } from "dice-roller-parser";
import DisplayResults from "@3d-dice/dice-ui/src/displayResults";
import AdvancedRoller from "@3d-dice/dice-ui/src/advancedRoller";
import BoxControls from "@3d-dice/dice-ui/src/boxControls";
import {
  BaseLayout,
  GameLayout,
  GeneralContentWrapper,
  Hand,
  Heading2,
  Heading6,
  HeadingContentWrapper,
  PrimaryButton,
  TopNavigation,
} from "../../components";
import { RightSection } from "../../components/base-layout/styles";
import { HUD } from "../../components/hud";
import { color } from "../../design";
import { Players } from "../../service/fake-players";
import { AttributesContainer, DiceContainer, ThrowDiceContainer } from "./styles";
import { DiceManager, DiceD6 } from "threejs-dice";

import Scene from "./roll";
import THREE, { OrbitControls } from "./three";
import CANNON from "cannon";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { routes } from "../../navigation";
import { YourDice } from "./your-dice";
import { Die } from "../../interfaces";
import { DiceOneIcon } from "../../assets";

interface Models {
  [type: string]: THREE.Object3D;
}

interface Dice {
  physicsBody: CANNON.Body;
  renderBody: THREE.Object3D;
}

let container;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let modelLoader: GLTFLoader;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let customModels: Models;
let world: CANNON.World;
let fixedTimeStep: number;
let objectsList: Array<Dice>;
let numOfUsedModels: number;
const dice: DiceD6[] = [];
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const Box = new DiceBox("#dice-box", {
  assetPath: "/assets/dice-box/",
  theme: "diceOfRolling",
  offscreen: false,
  scale: 5,
});

const init = () => {
  Box.init()
    .then(async () => {
      document.addEventListener("mousedown", () => {
        const diceBoxCanvas = document.getElementById("dice-canvas");
        console.log(diceBoxCanvas);
        if (diceBoxCanvas)
          if (window.getComputedStyle(diceBoxCanvas).display !== "none") {
            Box.hide().clear();
          }
      });

      Box.roll(["10d6"]);
    })
    .catch((e: any) => {
      console.log(e);
    });
};

export const ThrowDice = () => {
  const [hasRolled, setHasRolled] = useState(false);
  const [rollComplete, setRollComplete] = useState(false);
  const [diceValues, setDiceValues] = useState<Die[] | undefined>();

  const getRolledValues = (rolls: any): Die[] => {
    const values: Die[] = [];

    rolls.map((roll: any, index: number) => {
      const tempValue = roll.value;
      values[index] = { rolledValue: tempValue };
    });

    return values;
  };

  Box.onRollComplete = async (results: any) => {
    await delay(3000);
    const rolls = getRolledValues(results[0].rolls);
    console.log(rolls);
    setRollComplete(true);
    setDiceValues(rolls);
    Box.hide().clear();
  };

  if (rollComplete) return <YourDice diceValues={diceValues} />;

  return (
    <DiceContainer>
      <GameLayout players={[Players[6]]}>
        <GeneralContentWrapper>
          <HeadingContentWrapper>
            <Heading6>{"setting it up"}</Heading6>
          </HeadingContentWrapper>
          <Heading2>{"your dice"}</Heading2>
          <Heading2 customColor={color.darkGrey}>{"Welcome Skiny.boy, let’s find out your pips for this first round..."}</Heading2>
        </GeneralContentWrapper>
        <AttributesContainer>
          {!hasRolled && (
            <PrimaryButton
              onClick={() => {
                init();
                setHasRolled(true);
              }}
              text="roll it"
            />
          )}
        </AttributesContainer>
      </GameLayout>
    </DiceContainer>
  );
};
