import { Triplet, usePlane } from "@react-three/cannon";
import React, { useEffect, useRef } from "react";
import { Mesh } from "three";

interface Props {
  w: number;
  h: number;
}

/**
 * Extension of plane that surrounds canvas with a bounding box
 * orthogonal to Z to contain dice
 */
export const BoundingBox = ({ w, h }: Props): JSX.Element => {
  // change size here
  const width = w * 0.8;
  const height = h * 0.6;
  return (
    <>
      <Plane height={height} width={width} position={[0, 0, -20]} rotation={[0, 0, 0]} receiveShadow />
      <Plane position={[width / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Plane position={[-width / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Plane position={[0, height / 2, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <Plane position={[0, -height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} />
    </>
  );
};

interface PlaneProps {
  position: Triplet;
  rotation: Triplet;
  receiveShadow?: boolean;
  width?: number;
  height?: number;
}

export const Plane = ({ position, rotation, receiveShadow = false, width = 10, height = 10 }: PlaneProps): JSX.Element => {
  const ref = useRef<Mesh>(null!);
  const [, api] = usePlane(
    () => ({
      type: "Dynamic",
      position,
      rotation,
    }),
    ref
  );

  useEffect(() => api.position.set(...position), [position, api.position]);

  return (
    <mesh ref={ref} receiveShadow={receiveShadow} position={position} rotation={rotation}>
      <planeBufferGeometry args={[width, height]} />
      {/* <meshBasicMaterial color={'black'} /> */}
      <shadowMaterial opacity={0.2} color={"#171717"} />
    </mesh>
  );
};
