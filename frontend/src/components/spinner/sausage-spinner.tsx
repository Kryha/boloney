import { gsap } from "gsap";
import { SausageContainer } from "./styles";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { color } from "../../design";
import { sausageAnimate } from "../atoms";

export const SausageSpinner = () => {
  gsap.set("svg", {
    visibility: "visible",
  });

  const sausage = document.querySelector("#sausage");
  const points = [300, 400, 300, 300, 300, 200];
  const curviness = 7;
  let rawPath;

  const updatePath = () => {
    rawPath = [MotionPathPlugin.pointsToSegment(points, curviness)];
    if (sausage) sausage.setAttribute("d", MotionPathPlugin.rawPathToString(rawPath));
  };

  const tl = gsap.timeline({ onUpdate: updatePath, repeat: -1 });

  updatePath();
  sausageAnimate(tl, sausage, points);

  return (
    <SausageContainer>
      <svg id="mainSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
        <defs>
          <path id="sausage" />
          <pattern id="graph" width="30" height="30" patternUnits="userSpaceOnUse">
            <line x1="0" x2="30" y1="0" y2="0" stroke={color.lightGrey} strokeWidth="1" opacity="0.3" />
            <line x1="10" x2="10" y1="0" y2="30" stroke={color.lightGrey} strokeWidth="1" opacity="0.3" />
          </pattern>
        </defs>
        <rect fill="url(#graph)" width="100%" height="100%" />

        <use className="shape" xlinkHref="#sausage" stroke={color.black} strokeWidth="70" />
        <use x="-6" id="middle" className="shape" xlinkHref="#sausage" stroke={color.black} strokeWidth="56" />
        <use x="-20" id="shine" className="shape" xlinkHref="#sausage" stroke={color.white} strokeWidth="15" opacity="0.85" />
      </svg>
    </SausageContainer>
  );
};
