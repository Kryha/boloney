import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const spin = keyframes`
  0% {
    transform: translateZ(-100px)               rotateX(0deg)
      rotateY(0deg)
      rotateZ(0deg);
  }
  16% {
    transform: translateZ(-100px)               rotateX(180deg)
      rotateY(180deg)
      rotateZ(0deg);
  }
  33% {
    transform: translateZ(-100px)
      rotateX(360deg)
      rotateY(90deg)
      rotateZ(180deg);
  }
  50% {
    transform: translateZ(-100px)
      rotateX(360deg)
      rotateY(360deg)
      rotateZ(360deg);
  }
  66% {
    transform: translateZ(-100px)
      rotateX(180deg)
      rotateY(360deg)
      rotateZ(270deg); }
  83% {
    transform: translateZ(-100px)
      rotateX(270deg)
      rotateY(180deg)
      rotateZ(180deg); }
  100% {
    transform: translateZ(-100px)
      rotateX(-60deg)
      rotateY(360deg)
      rotateZ(360deg);
  }
`;

export const roll = keyframes`
    0% { transform: translate3d(100px,-250px,500px) }
    25% { transform: translate3d(0px,0,200px) }
    50% { transform: translate3d(-125px,-75px,100px) }
    75% { transform: translate3d(50,-25px,50px) }
    100% { transform: translate3d(0px,0px,0px) }
`;
interface Props {
  playing: boolean;
  stop: boolean;
}

export const Platform = styled.div<Props>`
  margin-top: 100px;
  ${({ playing }) => {
    return playing
      ? css`
          > .dice {
            animation-duration: 2s;
            animation-iteration-count: 1;
          }
          width: 200px;
          height: 200px;
          transform-style: preserve-3d;
          animation: ${roll} 0.5s infinite linear;
          animation-iteration-count: 1;
        `
      : "";
  }};

  ${({ stop }) => {
    return stop
      ? css`
          #platform.stop > .dice,
          #platform.stop {
            animation-play-state: paused;
          }
        `
      : "";
  }};
`;
export const Wrapper = styled.div`
  position: relative;
  width: 200px;
  padding-top: 10px;
  margin: 0 auto;
  perspective: 1200px;
`;

export const Side = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background: #fff;
  box-shadow: inset 0 0 40px #ccc;
  border-radius: 40px;
`;
export const Dice = styled.div<Props>`
  position: absolute;
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  transform: rotateX(0deg) rotateY(20deg) rotateZ(-20deg) span {
    position: absolute;
    margin: 100px 0 0 100px;
    display: block;
    font-size: 2.5em;
    padding: 10px;
  }
  #dice1 {
    left: -200px;
  }
  #dice2 {
    left: 200px;
  }
  ${({ playing }) => {
    return playing
      ? css`
          > .dice {
            /*animation: spin 2s infinite linear;*/
            animation: ${spin} 2s 1 linear;
            animation-iteration-count: 1;
          }
        `
      : "";
  }};
  .dice .cover,
  .dice .inner {
    background: #e0e0e0;
    box-shadow: none;
  }
  .dice .cover {
    border-radius: 0;
  }
  .dice .cover.x {
    transform: rotateY(90deg);
  }
  .dice .cover.z {
    transform: rotateX(90deg);
  }
  .dice .front {
    transform: translateZ(100px);
  }
  .dice .front.inner {
    transform: translateZ(99px);
  }
  .dice .back {
    transform: rotateX(-180deg) translateZ(100px);
  }
  .dice .back.inner {
    transform: rotateX(-180deg) translateZ(99px);
  }
  .dice .right {
    transform: rotateY(90deg) translateZ(100px);
  }
  .dice .right.inner {
    transform: rotateY(90deg) translateZ(99px);
  }
  .dice .left {
    transform: rotateY(-90deg) translateZ(100px);
  }
  .dice .left.inner {
    transform: rotateY(-90deg) translateZ(99px);
  }
  .dice .top {
    transform: rotateX(90deg) translateZ(100px);
  }
  .dice .top.inner {
    transform: rotateX(90deg) translateZ(99px);
  }
  .dice .bottom {
    transform: rotateX(-90deg) translateZ(100px);
  }
  .dice .bottom.inner {
    transform: rotateX(-90deg) translateZ(99px);
  }
`;
export const Dot = styled.div`
  position: absolute;
  width: 46px;
  height: 46px;
  border-radius: 23px;
  background: #444;
  box-shadow: inset 5px 0 10px #000;
  .dot.center {
    margin: 77px 0 0 77px;
  }
  .dot.dtop {
    margin-top: 20px;
  }
  .dot.dleft {
    margin-left: 134px;
  }
  .dot.dright {
    margin-left: 20px;
  }
  .dot.dbottom {
    margin-top: 134px;
  }
  .dot.center.dleft {
    margin: 77px 0 0 20px;
  }
  .dot.center.dright {
    margin: 77px 0 0 134px;
  }
`;

export const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: #071a1e;
  background: -moz-linear-gradient(top, #071a1e 0%, #274249 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #071a1e), color-stop(100%, #274249));
  background: -webkit-linear-gradient(top, #071a1e 0%, #274249 100%);
  background: linear-gradient(to bottom, #071a1e 0%, #274249 100%);
`;

export const Point = styled.span`
  color: #fff;
  text-align: center;
`;

export const Play = styled.button`
  display: block;
  margin: 10px auto;
  width: 100%;
  -webkit-appearance: none;
  border: solid 1px red;
  border-radius: 9px;
  padding: 10px;
`;
