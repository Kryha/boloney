// import { ReactNode } from "react";
// import { useViewport } from "../../hooks";
// import * as _ from "lodash";
// import * as lib from "./dicelib";
// import { DiceFactory } from "./dice-factory";

// export interface DiceOptions {
//   canvas?: HTMLCanvasElement;
//   loadingElement?: HTMLElement;
//   label?: HTMLElement;
//   set?: HTMLInputElement;
//   selectorDiv?: HTMLDivElement;
//   infoDiv?: HTMLDivElement;
//   clearElement?: HTMLElement;
//   throwElement?: HTMLElement;
// }

// export const diceInitialize = (container: HTMLElement, height: number, width: number, options?: DiceOptions) => {
//   options = options || {};
//   if (options.loadingElement) {
//     document.removeChild(options.loadingElement);
//   }

//   let canvas = options.canvas;
//   if (!canvas) {
//     canvas = document.createElement("canvas");
//     canvas.width = width - 1;
//     canvas.height = height - 1;

//     const firstChild = _.first(container.children);
//     if (firstChild) {
//       container.insertBefore(canvas, firstChild);
//     } else {
//       container.appendChild(canvas);
//     }
//   }

//   const label = options.label;
//   const set = options.set;
//   const selectorDiv = options.selectorDiv;
//   const infoDiv = options.infoDiv;
//   if (!set) return;
//   const handleSetChange = (ev?: Event) => {
//     set.style.width = set.value.length + 3 + "ex";
//   };

//   handleSetChange();

//   lib.useTrueRandom(false);

//   lib.bind(set, "keyup", handleSetChange);
//   // lib.bind(set, "mousedown", (ev: MouseEvent) => {
//   //   ev.stopPropagation();
//   // });
//   // lib.bind(set, "mouseup", (ev: MouseEvent) => {
//   //   ev.stopPropagation();
//   // });
//   lib.bind(set, "focus", (ev: Event) => lib.removeCssClass(container, "noselect"));
//   lib.bind(set, "blur", (ev: Event) => lib.removeCssClass(container, "noselect"));

//   if (options.clearElement) {
//     lib.bind(options.clearElement, ["mouseup", "touchend"], function (ev) {
//       ev.stopPropagation();
//       set.value = "0";
//       handleSetChange();
//     });
//   }

//   const factory = new DiceFactory();
//   const box = new DiceBox(new DiceFactory(), canvas, { width: 500, height: 500 } as ClientRect);
//   box.animateSelector = false;

//   lib.bind(window, "resize", () => {
//     if (canvas) {
//       canvas.style.width = window.innerWidth - 1 + "px";
//       canvas.style.height = window.innerHeight - 1 + "px";
//       box.reinit(canvas, { width: 500, height: 300 } as ClientRect);
//     }
//   });

//   const showSelector = () => {
//     if (infoDiv && selectorDiv) {
//       infoDiv.style.display = "none";
//       selectorDiv.style.display = "inline-block";
//       box.drawSelector();
//     }
//   };

//   // let beforeRoll = (vectors, notation, callback) => {
//   //   infoDiv.style.display = "none";
//   //   selectorDiv.style.display = "none";
//   //   // do here rpc call or whatever to get your own result of throw.
//   //   // then callback with array of your result, example:
//   //   // callback([2, 2, 2, 2]); // for 4d6 where all dice values are 2.
//   //   callback();
//   // };

//   // let notationGetter = () => set.value;

//   // let afterRoll = (box: DiceBox, notation: DiceNotation, result: number[]): void => {
//   //   var res = result.join(" ");
//   //   if (notation.constant) res += " +" + notation.constant;
//   //   if (result.length > 1)
//   //     res +=
//   //       " = " +
//   //       (result.reduce(function (s, a) {
//   //         return s + a;
//   //       }) +
//   //         notation.constant);
//   //   label.innerHTML = res;
//   //   infoDiv.style.display = "inline-block";
//   // };

//   // box.bindMouse(container, notationGetter, beforeRoll, afterRoll);

//   // if (options.throwElement) {
//   //   box.bindThrow(options.throwElement, notationGetter, beforeRoll, afterRoll);
//   // }

//   // lib.bind(container, ["mouseup"], (ev: MouseEvent) => {
//   //   ev.stopPropagation();
//   //   if (selectorDiv.style.display == "none") {
//   //     if (!box.rolling) showSelector();
//   //     box.rolling = false;
//   //     return;
//   //   }
//   //   var name = box.findDieAtMousePosition(ev);
//   //   if (name !== undefined) {
//   //     let notation = DiceNotation.parse(set.value);
//   //     notation.set.push(name);
//   //     set.value = notation.toString();
//   //     handleSetChange();
//   //   }
//   // });
// };
