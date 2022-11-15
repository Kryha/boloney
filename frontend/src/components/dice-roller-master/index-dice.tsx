import Scene from "./Scene";

const DiceRolls = {
  1: {
    position: {
      x: 0,
      y: -35,
      z: 40,
    },
    velocity: {
      x: 0,
      y: 45,
      z: 0,
    },
    angularVelocity: { x: -3.2, y: 30, z: 4.56 },
    straight: { x: 0, y: 1.4, z: 0 },
  },
  2: {
    position: { x: 0, y: -50, z: 50 },
    velocity: { x: 0, y: 2, z: 0 },
    angularVelocity: { x: 20, y: 20, z: 20 },
    straight: { x: 0, y: 1.4, z: 0 },
  },
  3: {
    position: { x: 15, y: -35, z: 40 },
    velocity: { x: 0, y: 25, z: 0 },
    angularVelocity: { x: -20, y: -7, z: -50 },
    straight: { x: 0, y: 1.4, z: 0 },
  },
  4: {
    position: { x: 15, y: -35, z: 40 },
    velocity: { x: 0, y: 55, z: 0 },
    angularVelocity: { x: 30, y: 30, z: 20 },
    straight: { x: 0, y: 1.4, z: 0 },
  },
  5: {
    position: { x: 15, y: -35, z: 40 },
    velocity: { x: 0, y: 25, z: 0 },
    angularVelocity: { x: 20, y: 20, z: 20 },
    straight: { x: 0, y: 1.4, z: 0 },
  },
  6: {
    position: { x: 0, y: -10, z: 50 },
    velocity: { x: 0, y: 15, z: 0 },
    angularVelocity: { x: 20, y: 30, z: 20 },
    straight: { x: 0, y: 1.4, z: 0 },
  },
};
const app = new Scene();
app.render();
app.init();

const diceAmountElement = document.getElementById("roll-amount") as HTMLElement;
const sliderElement = document.getElementById("slider") as HTMLInputElement;
const incButtonElement = document.querySelector(".btn-set-inc") as HTMLElement;
const decButtonElement = document.querySelector(".btn-set-dec") as HTMLElement;
const rollButtonElement = document.querySelector(".btn-new-main") as HTMLElement;

const RollAmountHandler = (toInc: boolean) => {
  const MaxValue = 10;
  const minValue = 1;
  const targetElementValue = Number(diceAmountElement.textContent);
  const newValue = toInc ? targetElementValue + 1 : targetElementValue - 1;
  if (newValue >= minValue && newValue <= MaxValue) {
    diceAmountElement.textContent = newValue.toString();
  }
};

sliderElement.onclick = () => {
  const selectElements = document.querySelectorAll("span.select");
  selectElements.forEach((el) => el.classList.toggle("active"));
};

incButtonElement.onclick = () => RollAmountHandler(true);
decButtonElement.onclick = () => RollAmountHandler(false);

rollButtonElement.onclick = () => {
  const dieType = sliderElement.checked ? app.customModels.d20 : app.customModels.d6;
  const amountToRoll = Number(diceAmountElement.textContent);
  app.roll(amountToRoll, dieType, [DiceRolls[6]]);
};

window.addEventListener("resize", () => app.resize());

export const IndexDice = () => {
  return <></>;
};

// 1->4
// 2->4
// 3->6
// 4->4
// 5->5
// 6->6
