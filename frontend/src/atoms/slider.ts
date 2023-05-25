import styled from "@emotion/styled";
import { color, radius } from "../design";
import { sliderDefault } from "../design/slider";

// Webkit cannot style progress so we fake it with a long shadow on the thumb element
// This function creates a long shadow with a given color and height
// The shadow is made by stacking many box-shadows on top of each other
// TODO: This is a hacky solution, find a better way to do this
const makeLongShadow = (color: string, size: string) => {
  let i = 18;
  let shadow = `${i}px 0 0 ${size} ${color}`;

  for (; i < 800; i++) {
    shadow = `${shadow}, ${i}px 0 0 ${size} ${color}`;
  }

  return shadow;
};

interface BaseSliderProps {
  lowerBackgroundColor?: string;
  upperBackgroundColor?: string;
  thumbHeight?: string;
  thumbColor?: string;
  sliderHeight?: string;
}

export const BaseSlider = styled.input<BaseSliderProps>`
  overflow: hidden;
  appearance: none;
  width: 100%;
  margin: 0;
  border-radius: ${radius.xl};
  border: 1px solid ${color.mediumGrey};
  border-right: 0px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: ${({ sliderHeight }) => sliderHeight ?? sliderDefault.sliderHeigth};
    background: linear-gradient(to bottom, ${color.lightGrey}, ${color.lightGrey}) 100% 50% / 100%
      ${({ sliderHeight }) => sliderHeight ?? sliderDefault.sliderHeigth} no-repeat transparent;
  }

  &::-webkit-slider-thumb {
    position: relative;
    appearance: none;
    height: ${({ thumbHeight }) => thumbHeight ?? sliderDefault.sliderHeigth};
    width: ${({ thumbHeight }) => thumbHeight ?? sliderDefault.sliderHeigth};
    background: ${color.lightGrey};
    border-radius: 100%;
    top: 50%;
    border: 1px solid ${color.mediumGrey};
    transform: translateY(-50%);
    box-shadow: ${makeLongShadow(color.mediumGrey, sliderDefault.boxShadowOffset)};
    transition: background-color 150ms;
  }

  &::-moz-range-track,
  &::-moz-range-progress {
    width: 100%;
    height: ${({ sliderHeight }) => sliderHeight ?? sliderDefault.sliderHeigth};
    background: ${({ upperBackgroundColor }) => upperBackgroundColor ?? color.mediumGrey};
  }

  &::-moz-range-progress {
    background: ${({ lowerBackgroundColor }) => lowerBackgroundColor ?? color.lightGrey};
  }

  &::-moz-range-thumb {
    appearance: none;
    margin: 0;
    height: ${({ thumbHeight }) => thumbHeight ?? sliderDefault.thumbHeightMoz};
    width: ${({ thumbHeight }) => thumbHeight ?? sliderDefault.thumbHeightMoz};
    background: ${({ thumbColor }) => thumbColor ?? color.lightGrey};
    border-radius: 100%;
    border: 1px solid ${color.darkGrey};
    transition: background-color 150ms;
  }
`;
