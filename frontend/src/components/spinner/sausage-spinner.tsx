import { gsap } from "gsap";
import { SausageContainer } from "./styles";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export const SausageSpinner = () => {
  gsap.set("svg", {
    visibility: "visible",
  });

  const sausage = document.querySelector("#sausage");
  const points = [300, 400, 300, 300, 300, 200];
  const curviness = 7;
  let rawPath;

  function updatePath() {
    rawPath = [MotionPathPlugin.pointsToSegment(points, curviness)];
    if (sausage) sausage.setAttribute("d", MotionPathPlugin.rawPathToString(rawPath));
  }

  const destPoints1Drag = [300, 400, 300, 300, 250, 200];
  const destPoints1 = [300, 400, 300, 300, 300, 200];
  const destPoints2 = [300, 400, 300, 300, 300, 200];
  const destPoints2Drag = [350, 400, 300, 300, 300, 200];
  const tl = gsap.timeline({ onUpdate: updatePath, repeat: -1 });
  tl.to(sausage, {
    duration: 1,
    rotation: "+=90",
    transformOrigin: "50% 100%",
    ease: "expo.in",
  })
    .to(
      points,
      {
        duration: 1,
        endArray: destPoints1Drag,
        ease: "expo.in",
      },
      "-=1"
    )
    .to(
      "#shine",
      {
        duration: 1,
        attr: {
          x: -10,
          y: -20,
        },
        ease: "expo.in",
      },
      "-=1"
    )
    .to(
      "#middle",
      {
        duration: 1,
        attr: {
          x: -4,
          y: -6,
        },
        ease: "expo.in",
      },
      "-=1"
    )
    .to(points, {
      duration: 1,
      endArray: destPoints1,
      ease: "elastic(0.8, 0.3)",
    })
    .to(
      sausage,
      {
        duration: 1,
        rotation: "+=90",
        transformOrigin: "50% 0%",
        ease: "expo.in",
      },
      "+=0"
    )
    .to(
      points,
      {
        duration: 1,
        endArray: destPoints2Drag,
        ease: "expo.in",
      },
      "-=1"
    )
    .to(
      "#shine",
      {
        duration: 1,
        attr: {
          x: -20,
          y: 0,
        },
        ease: "expo.in",
      },
      "-=1"
    )
    .to(
      "#middle",
      {
        duration: 1,
        attr: {
          x: -6,
          y: 0,
        },
        ease: "expo.in",
      },
      "-=1"
    )
    .to(points, {
      duration: 1,
      endArray: destPoints2,
      ease: "elastic(0.8, 0.3)",
    })
    .to(
      sausage,
      {
        duration: 4,
        x: -200,
        ease: "linear",
      },
      0
    );
  tl.timeScale(3);

  updatePath();

  return (
    <SausageContainer>
      <svg id="mainSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
        <defs>
          <path id="sausage" />
          <pattern id="graph" width="30" height="30" patternUnits="userSpaceOnUse">
            <line x1="0" x2="30" y1="0" y2="0" stroke="grey" strokeWidth="1" opacity="0.3" />
            <line x1="10" x2="10" y1="0" y2="30" stroke="grey" strokeWidth="1" opacity="0.3" />
          </pattern>
        </defs>
        <rect fill="url(#graph)" width="100%" height="100%" />

        <use className="shape" xlinkHref="#sausage" stroke="black" strokeWidth="70" />
        <use x="-6" id="middle" className="shape" xlinkHref="#sausage" stroke="black" strokeWidth="56" />
        <use x="-20" id="shine" className="shape" xlinkHref="#sausage" stroke="#FFF" strokeWidth="15" opacity="0.85" />
      </svg>
    </SausageContainer>
  );
};
