import { PowerUpProbability, ProbabilityRanges } from "../types";
import { generateProbabilityRange, getPowerUpIdFromProbability } from "./power-ups";

describe("PowerUp - Toolkit API", () => {
  const rn = 42;

  const mockpowerUpsProbability: PowerUpProbability[] = [
    {
      id: "1",
      probability: 11,
    },
    {
      id: "2",
      probability: 0,
    },
    {
      id: "3",
      probability: 26,
    },
    {
      id: "4",
      probability: 0,
    },
    {
      id: "5",
      probability: 50,
    },
    {
      id: "6",
      probability: 13,
    },
  ];

  const mockProbabilityRange: ProbabilityRanges = [
    {
      id: "1",
      from: 1,
      to: 11,
    },
    {
      id: "3",
      from: 12,
      to: 37,
    },
    {
      id: "5",
      from: 38,
      to: 87,
    },
    {
      id: "6",
      from: 88,
      to: 100,
    },
  ];

  it("Should return the correct ID given a number and probability range", () => {
    const probabilityRange = generateProbabilityRange(mockpowerUpsProbability);
    const powerUpId = getPowerUpIdFromProbability(rn, mockProbabilityRange);

    expect(probabilityRange).toEqual(expect.arrayContaining(mockProbabilityRange));
    expect(powerUpId).toBe("5");
  });
});
