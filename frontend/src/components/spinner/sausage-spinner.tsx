import { gsap } from "gsap";
import { SausageContainer } from "./styles";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { Heading3, sausageAnimate } from "../atoms";
import { SausageLoader, text } from "../../assets";
import { useEffect } from "react";

export const SausageSpinner = () => {
  useEffect(() => {
    gsap.set("svg", {
      visibility: "visible",
    });

    const sausage = document.querySelector("#sausage-loader");
    const points = [300, 400, 300, 300, 300, 200];
    const curviness = 1;
    let rawPath;

    const updatePath = () => {
      rawPath = [MotionPathPlugin.pointsToSegment(points, curviness)];
      if (sausage) sausage.setAttribute("d", MotionPathPlugin.rawPathToString(rawPath));
    };

    const tl = gsap.timeline({ onUpdate: updatePath, repeat: -1 });

    updatePath();
    sausageAnimate(tl, sausage, points);
  }, []);

  return (
    <SausageContainer>
      <SausageLoader />
      <Heading3>{text.general.loading}</Heading3>
    </SausageContainer>
  );
};
