import { randomInt, getRange } from "./math";

describe("getRange function", () => {
  it("Should assert that returned variable is an array of size 10 and distinct elements in range [0,10]", () => {
    const value = getRange(10);
    const result: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(value).toEqual(result);
  });
  it("Should assert that returned variable is an empty array", () => {
    const value = getRange(0);
    const result: number[] = [];
    expect(value).toEqual(result);
  });
});

describe("randomInt function", () => {
  const minValue = 0;

  it("Should assert that returned variable is a random number between 0 and 10", () => {
    const maxValue = 10;
    const value = randomInt(maxValue);
    expect(value <= maxValue && value >= minValue);
  });
  it("Should assert that returned variable is a random number between 0 and 0", () => {
    const maxValue = 0;
    const value = randomInt(maxValue);
    expect(value <= maxValue && value >= minValue);
  });
  it("Should assert that returned variable is a random number between 8 and 10", () => {
    const maxValue = 10;
    const minValue = 8;
    const value = randomInt(maxValue, minValue);
    expect(value <= maxValue && value >= minValue);
  });
  it("Should assert that returned variable is a random number between 10 and 9", () => {
    const maxValue = 9;
    const minValue = 10;
    const value = randomInt(maxValue, minValue);
    expect(value <= maxValue && value >= minValue);
  });
});
