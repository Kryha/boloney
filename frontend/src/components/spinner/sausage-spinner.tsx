import { gsap } from "gsap";
import { LoadingTextContainer, SausageContainer, SausageSection } from "./styles";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { sausageAnimate } from "../atoms";
import { SausageLoader, text } from "../../assets";
import { FC, useEffect } from "react";

export const SausageSpinner: FC = () => {
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
    <SausageSection>
      <SausageContainer>
        <SausageLoader />
        <LoadingTextContainer>{text.general.loading}</LoadingTextContainer>
      </SausageContainer>
    </SausageSection>
  );
};
