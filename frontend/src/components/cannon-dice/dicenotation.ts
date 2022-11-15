export class DiceNotation {
  set: number[] = [];
  constant = 0;
  result: number[] = [];
  error = false;

  static parse(value: string) {
    const no = value.split("@");
    const dr0 = /\s*(\d*)([a-z]+)(\d+)(\s*\+\s*(\d+)){0,1}\s*(\+|$)/gi;
    const dr1 = /(\b)*(\d+)(\b)*/gi;
    let res: RegExpExecArray | null;

    const notation = new DiceNotation();

    while ((res = dr0.exec(no[0]))) {
      const command = res[2];
      if (command != "d") {
        notation.error = true;
        continue;
      }

      let count = res[1] === "" ? 1 : parseInt(res[1]);
      const sides = parseInt(res[3]);

      if ([4, 6, 8, 10, 12, 20, 100].indexOf(sides) === -1) {
        notation.error = true;
        continue;
      }

      while (count--) {
        notation.set.push(sides);
      }

      if (res[5]) {
        notation.constant += parseInt(res[5]);
      }
    }

    while ((res = dr1.exec(no[1]))) {
      notation.result.push(parseInt(res[2]));
    }

    return notation;
  }

  toString() {
    const dict: any = {};
    let result = "";
    for (const i in this.set)
      if (!dict[this.set[i]]) dict[this.set[i]] = 1;
      else ++dict[this.set[i]];
    for (const i in dict) {
      if (result.length) result += " + ";
      result += (dict[i] > 1 ? dict[i] : "") + i;
    }
    if (this.constant) result += " + " + this.constant;
    return result;
  }
}
