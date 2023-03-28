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

/*
  Our text now uses rem like our text so that they can complement each other better. The paddings, margins and gutters now have grouped spacing as follows
  tiny: 3-5px
  small: 8-12px
  small: 13-16px
  medium: 20-24px
  medium: 30px
  medium: 40px
  large: 50px
  large: 65px
  huge: 80px
*/

export const spacing = {
  xxs: "clamp(0.13rem, calc(0.08rem + 0.17vw), 0.50rem)", // 3-5px
  xs: "clamp(0.13rem, calc(0.06rem + 0.26vw), 0.69rem)", // 8-11px
  s: "clamp(0.50rem, calc(0.33rem + 0.70vw), 2.00rem)", // 13-16px
  sm: "clamp(0.94rem, calc(0.80rem + 0.55vw), 2.13rem)", // 20-24px
  ms: "clamp(1.25rem, calc(0.94rem + 1.25vw), 3.94rem)", // 30px
  md: "clamp(1.94rem, calc(1.65rem + 1.16vw), 4.44rem)", // 40px
  lg: "clamp(2.19rem, calc(1.83rem + 1.42vw), 5.25rem)", // 50px
  xl: "clamp(2.50rem, calc(1.88rem + 2.50vw), 7.88rem)", // 65px
  xxl: "clamp(1.88rem, calc(0.87rem + 4.01vw), 10.50rem)", // 80px
};

export const radius = {
  none: "0px",
  xs: "4px",
  sm: "8px",
  md: "10px",
  lg: "16px",
  xl: "25px",
  xxl: "100px",
};
