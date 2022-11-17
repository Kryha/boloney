export const sausageAnimate = (tl: gsap.core.Timeline, sausage: Element | null, points: number[]) => {
  const destPoints1Drag = [300, 400, 300, 300, 250, 200];
  const destPoints1 = [300, 400, 300, 300, 300, 200];
  const destPoints2 = [300, 400, 300, 300, 300, 200];
  const destPoints2Drag = [350, 400, 300, 300, 300, 200];
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
};
