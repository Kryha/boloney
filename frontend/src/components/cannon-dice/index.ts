import * as lib from "./dicelib";
import * as _ from "lodash";
import { DiceNotation } from "./dicenotation";
import { DiceBox } from "./dicebox";
import { DiceOptions } from "./diceoptions";
import { DiceFactory } from "./dicefactory";

export function dice_initialize(container: HTMLElement, options?: DiceOptions) {
  options = options || {};
  if (options.loadingElement) {
    document.removeChild(options.loadingElement);
  }

  let canvas = options.canvas;
  if (!canvas) {
    canvas = document.createElement("canvas");
    console.log(container.clientHeight);
    canvas.width = container.clientWidth - 1;
    canvas.height = window.innerHeight - 1;

    const firstChild = _.first(container.children);
    if (firstChild) {
      container.insertBefore(canvas, firstChild);
    } else {
      container.appendChild(canvas);
    }
  }

  const label = options.label;
  const set = options.set;
  const selectorDiv = options.selectorDiv;
  const infoDiv = options.infoDiv;

  const handleSetChange = (ev?: Event) => {
    if (set) set.style.width = set.value.length + 3 + "ex";
  };
  handleSetChange();

  lib.useTrueRandom(false);
  if (set) {
    lib.bindInput(set, "keyup", handleSetChange);
    lib.bindInput(set, "mousedown", (ev: Event) => {
      ev.stopPropagation();
    });
    lib.bindInput(set, "mouseup", (ev: Event) => {
      ev.stopPropagation();
    });
    lib.bindInput(set, "focus", (ev: Event) => lib.removeCssClass(container, "noselect"));
    lib.bindInput(set, "blur", (ev: Event) => lib.removeCssClass(container, "noselect"));

    if (options.clearElement) {
      lib.bind(options.clearElement, ["mouseup", "touchend"], function (ev) {
        ev.stopPropagation();
        set.value = "0";
        handleSetChange();
      });
    }
  }

  const factory = new DiceFactory();
  const box = new DiceBox(new DiceFactory(), canvas, <ClientRect>{ width: 500, height: 500 });
  console.log(box);
  box.animateSelector = false;

  lib.bind(window, "resize", () => {
    if (canvas) {
      canvas.style.width = window.innerWidth - 1 + "px";
      canvas.style.height = window.innerHeight - 1 + "px";
      box.reinit(canvas, <ClientRect>{ width: 500, height: 300 });
    }
  });

  const showSelector = () => {
    if (infoDiv && selectorDiv) {
      infoDiv.style.display = "none";
      selectorDiv.style.display = "inline-block";
      box.drawSelector();
    }
  };

  const beforeRoll = (callback: any) => {
    if (infoDiv && selectorDiv) {
      infoDiv.style.display = "none";
      selectorDiv.style.display = "none";
    }
    // do here rpc call or whatever to get your own result of throw.
    // then callback with array of your result, example:
    // callback([2, 2, 2, 2]); // for 4d6 where all dice values are 2.
    callback();
  };

  const notationGetter = () => {
    if (set) {
      return set.value;
    }
    return "";
  };

  const afterRoll = (box: DiceBox, notation: DiceNotation, result: number[]): void => {
    let res = result.join(" ");
    if (notation.constant) res += " +" + notation.constant;
    if (result.length > 1)
      res +=
        " = " +
        (result.reduce(function (s, a) {
          return s + a;
        }) +
          notation.constant);
    if (label && infoDiv) {
      label.innerHTML = res;
      infoDiv.style.display = "inline-block";
    }
  };

  box.bindMouse(container, notationGetter, beforeRoll, afterRoll);

  if (options.throwElement) {
    box.bindThrow(options.throwElement, notationGetter, beforeRoll, afterRoll);
  }

  lib.bind(container, ["mouseup"], (ev: Event) => {
    ev.stopPropagation();
    if (selectorDiv)
      if (selectorDiv.style.display == "none") {
        if (!box.rolling) showSelector();
        box.rolling = false;
        return;
      }
    console.log("hey");
    const name = box.findDieAtMousePosition(ev);
    if (name !== undefined && set) {
      // console.log("hey");
      const notation = DiceNotation.parse(set.value);
      notation.set.push(name);
      set.value = notation.toString();
      handleSetChange();
    }
  });
}
