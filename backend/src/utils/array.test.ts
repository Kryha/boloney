import { shuffleArray } from "./array";

//TODO: Make Jest work in the backend.
describe("Testing Match-state service", () => {
  it("Should shuffle the player order array", () => {
    const playerOrder = ["1", "2", "3", "4", "5", "6", "7"];

    expect(shuffleArray(playerOrder)).not.toEqual(playerOrder);
  });
});
