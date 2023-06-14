// TODO: delete when molecules + organisms are done
export const margins = {
  small0: "0.25em", // 4px
  small1: "0.5em", // 8px
  small2: "0.625em", // 10px
  small3: "0.8125em", // 13px
  small4: "1em", // 16px
  small5: "1.25em", // 20px
  small6: "1.75em", // 28px
  medium0: "1.875em", // 30px
  medium1: "2em", // 36px
  large0: "2.5em", // 40px
  large1: "3.125em", // 50px
  large2: "4.0625em", // 65px
  large3: "5em", // 80px
};

/** Our margins and spacing now uses rem like our text so that they can complement each other better.
 * The paddings, margins and gutters now have grouped spacing as follows:
 * @param {string} xxs - 3-5px
 * @param {string} xs - 8-11px
 * @param {string} s - 13-16px
 * @param {string} sm - 20-24px
 * @param {string} ms - 30px
 * @param {string} md - 40px
 * @param {string} lg - 50px
 * @param {string} xl - 65px
 * @param {string} xxl - 80px
 * @param {string} xxxl - 210-1000px
 */

export const spacing = {
  xxs: "clamp(0.13rem, calc(0.08rem + 0.17vw), 0.50rem)", // 3-5px
  xs: "clamp(0.13rem, calc(0.06rem + 0.26vw), 0.69rem)", // 8-11px
  s: "clamp(0.50rem, calc(0.33rem + 0.70vw), 2.00rem)", // 13-16px
  sm: "clamp(0.94rem, 0.87vw + 0.42rem, 2.5rem)", // 20-24px
  ms: "clamp(1.25rem, calc(0.94rem + 1.25vw), 3.94rem)", // 30px
  md: "clamp(1.94rem, calc(1.65rem + 1.16vw), 4.44rem)", // 40px
  lg: "clamp(2.19rem, calc(1.83rem + 1.42vw), 5.25rem)", // 50px
  xl: "clamp(2.50rem, calc(1.88rem + 2.50vw), 7.88rem)", // 65px
  xxl: "clamp(1.88rem, calc(0.87rem + 4.01vw), 10.50rem)", // 80px
  xxxl: "clamp(13.13rem, 27.43vw + -3.33rem, 62.5rem)", // 210-1000px
};

/** Our radius is grouped as follows
 * @param {string} none - no border radius
 * @param {string} xxs - 2px
 * @param {string} xs - 4px
 * @param {string} sm - 8px
 * @param {string} md - 10px
 * @param {string} lg - 16px
 * @param {string} xl - 25px
 * @param {string} xxl - 100px
 */

export const radius = {
  none: "0px",
  xxs: "clamp(2px, 0.1vw + 1px, 3px)", // 2px
  xs: "clamp(3px, 0.24vw + 0.67px, 10px)", // 4px
  sm: "clamp(6px, 0.21vw + 4px, 12px)", // 8px
  md: "clamp(8px, 0.24vw + 5.67px, 15px)", // 10px
  lg: "clamp(12px, 0.28vw + 9.33px, 20px)", // 16px
  xl: "clamp(22px, 0.21vw + 20px, 28px)", // 25px
  xxl: "clamp(94px, -2.78vw + 120.67px, 14px)", // 100px
};
