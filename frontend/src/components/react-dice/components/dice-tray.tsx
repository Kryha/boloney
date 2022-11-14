import styled from "@emotion/styled";
import { useTransition } from "@react-spring/three";
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { useMeasure } from "../hooks/use-measure";
import { useSavedCallback } from "../hooks/use-saved-callback";
import { useStore } from "../hooks/use-store";
import { defaultConfig } from "../lib/dice-config";
import { DiceType } from "../types";
import { BoundingBox } from "./bounding-box";
import { Dice } from "./dice";

const ZOOM = 40;

interface UseRollReturn {
  roll: (type: DiceType) => void;
  processing: boolean;
}

export const CanvasContainer = styled.div`
  height: 80vh;
  width: 70vw;
  margin-top: 10vh;
  margin-left: 5vw;
  > div {
    height: 80vh !important;
    width: 70vw !important;
    margin-top: 10vh;
    margin-left: 5vw;
  }
`;
export const useRoll = (): UseRollReturn => {
  return useStore((state) => ({
    roll: state.addDice,
    processing: state.dice.length !== 0,
  }));
};

export const DiceTray = ({ onResult }: { onResult: (result: number) => void }): JSX.Element => {
  const dice = useStore((state) => state.dice);
  const screenSize = useStore((state) => state.screen);
  const setScreenSize = useStore((state) => state.setScreen);
  useMeasure((x, y) => setScreenSize(x / ZOOM, y / ZOOM));
  const resultCallback = useSavedCallback(onResult);

  const transition = useTransition(dice, {
    from: { scale: 1 },
    enter: { scale: 1 },
    leave: { scale: 0 },
    delay: 5000,
  });

  return (
    <CanvasContainer>
      <Canvas orthographic camera={{ zoom: ZOOM, near: 1, far: 50 }}>
        <ambientLight />
        <spotLight intensity={1} position={[0, 0, 50]} angle={0.5} castShadow penumbra={0.5} />
        <Physics gravity={[0, 0, -10]}>
          <BoundingBox w={screenSize.x} h={screenSize.y} />
          {transition(({ scale }, v) => {
            return (
              <Dice
                onResult={resultCallback}
                scale={scale}
                radius={2}
                key={v.id}
                type={v.type}
                rotation={[0, 0, 0]}
                position={v.position}
                config={defaultConfig}
              />
            );
          })}
        </Physics>
      </Canvas>
    </CanvasContainer>
  );
};
