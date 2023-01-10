const A_LENGTH = 10;
const BCD_LENGTH = 5;
const E_LENGTH = 15;

const TOTAL_LENGTH = A_LENGTH + BCD_LENGTH * 3 + E_LENGTH;

const A_LENGTH_HEX = 8;
const BCD_LENGTH_HEX = 4;
const E_LENGTH_HEX = 12;

const prependWithZeroes = (value: string, desiredLength: number): string => {
  if (desiredLength < 1) return value;

  const amountOfZeroes = desiredLength - value.length;
  if (amountOfZeroes < 1) return value;

  value = "0".repeat(amountOfZeroes) + value;

  return value;
};

export const encodeId = (id: string): bigint | undefined => {
  try {
    const parsed = id.split("-").map((val) => parseInt(val, 16));
    const isParsedNaN = parsed.find((val) => isNaN(val));
    if (isParsedNaN) return;

    const [a, b, c, d, e] = parsed.map((val) => val.toString());

    const merged =
      prependWithZeroes(a, A_LENGTH) +
      prependWithZeroes(b, BCD_LENGTH) +
      prependWithZeroes(c, BCD_LENGTH) +
      prependWithZeroes(d, BCD_LENGTH) +
      prependWithZeroes(e, E_LENGTH);

    return BigInt(merged);
  } catch (error) {
    return;
  }
};

export const decodeId = (encodedId: bigint): string | undefined => {
  try {
    const stringId = prependWithZeroes(encodedId.toString(), TOTAL_LENGTH);

    const parsed = [
      parseInt(stringId.slice(0, 10)),
      parseInt(stringId.slice(10, 15)),
      parseInt(stringId.slice(15, 20)),
      parseInt(stringId.slice(20, 25)),
      parseInt(stringId.slice(25, 40)),
    ];
    const isParsedNaN = parsed.find((val) => isNaN(val));
    if (isParsedNaN) return;

    const [a, b, c, d, e] = parsed.map((val, i) => {
      const length = i === 0 ? A_LENGTH_HEX : i === 4 ? E_LENGTH_HEX : BCD_LENGTH_HEX;
      return prependWithZeroes(val.toString(16), length);
    });

    const merged = `${a}-${b}-${c}-${d}-${e}`;
    return merged;
  } catch (error) {
    return;
  }
};
