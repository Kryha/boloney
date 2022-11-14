import { animated, SpringValue } from "@react-spring/three";
import { ConvexPolyhedronProps, Triplet, useConvexPolyhedron } from "@react-three/cannon";
import { Text } from "@react-three/drei";
import React, { useEffect, useMemo, useRef } from "react";
import { BufferGeometry, Matrix4, Mesh, PolyhedronGeometry, Quaternion, Vector3 } from "three";
import { Geometry } from "three-stdlib/deprecated/Geometry";
import { useDiceResult } from "../hooks/use-dice-result";
import { DiceConfig, TextConfig } from "../lib/dice-config";
import { getDiceDefinition } from "../lib/polyhedron-config";
import { multiply } from "../lib/vector";
import { DiceType, PolyhedronDefinition } from "../types";

export interface DiceProps {
  onResult: (result: number) => void;
  position: Triplet;
  type: DiceType;
  rotation: Triplet;
  radius: number;
  config: DiceConfig;
  scale: SpringValue<number>;
}

export const Dice = ({ type, radius, position, rotation, onResult, scale, config }: DiceProps): JSX.Element => {
  const ref = useRef<Mesh>(null!);
  const polyRef = useRef<PolyhedronGeometry>(null!);
  const definition = useMemo(() => getDiceDefinition(type), [type]);

  const args = useMemo(() => {
    const geometry = new PolyhedronGeometry(definition.vertices, definition.indices, radius);

    return toConvexProps(geometry);
  }, [radius, definition]);

  const [, api] = useConvexPolyhedron(() => ({ args, mass: 1.5, position, rotation }), ref);

  useEffect(() => {
    const direction = new Vector3().sub(new Vector3(position[0], position[1], position[2])).normalize();
    const force = multiply(direction.toArray(), [100, 100, 0]);
    api.velocity.set(...force);
    api.applyTorque([1000, 1000, 0]);
  }, [position, api]);

  useDiceResult(ref, api, onResult);

  const textElem = useMemo(() => createText(definition, radius, config.textConfig), [definition, config.textConfig, radius]);

  const poly = <polyhedronGeometry ref={polyRef} args={[definition.vertices, definition.indices, 2, 0]} />;
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <animated.mesh castShadow rotation={rotation} position={position} scale={scale} ref={ref}>
      (
      <meshPhysicalMaterial
        color={config.color}
        polygonOffset
        polygonOffsetFactor={1}
        envMapIntensity={0.4}
        clearcoat={0.8}
        clearcoatRoughness={0}
        roughness={1}
        metalness={0}
      />
      {poly}
      {textElem}
    </animated.mesh>
  );
};

function toConvexProps(bufferGeometry: BufferGeometry): ConvexPolyhedronProps["args"] {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry);
  geo.mergeVertices();
  return [geo.vertices.map((v) => [v.x, v.y, v.z]), geo.faces.map((f) => [f.a, f.b, f.c]), []];
}

/**
 * The logic here is to iterate through indices (which in the case of Deltahedrons
 * directly map to faces), and transform text such that it is centered and parallel
 * to each face
 *
 * TODO: in a D4 the text is usually not at the center of the face but toward one of the edges
 */
const createText = (polyhedron: PolyhedronDefinition, radius: number, textConfig?: TextConfig): JSX.Element[] => {
  return polyhedron.faces.map((face, i) => {
    const position = getCenterOfFace(polyhedron, radius, face);
    const matrix = new Matrix4().setPosition(position);
    matrix.lookAt(position, new Vector3(), new Vector3(0, 1, 0));
    const rotation = new Quaternion();
    matrix.decompose(position, rotation, new Vector3());
    // TODO: add pips here
    return (
      <Text depthOffset={-1} key={i} matrix={matrix} quaternion={rotation} position={position} fontSize={0.3} {...textConfig}>
        {i + 1}
      </Text>
    );
  });
};

const getCenterOfFace = (polyhedron: PolyhedronDefinition, radius: number, face: number[]): Vector3 => {
  const coords: Triplet[] = [];
  face.forEach((v) => {
    coords.push(applyRadius(getVertexByIndex(polyhedron.vertices, v), radius));
  });

  const val = new Vector3().fromArray(
    coords.reduce((acc, val, idx) => [
      (val[0] + idx * acc[0]) / (idx + 1),
      (val[1] + idx * acc[1]) / (idx + 1),
      (val[2] + idx * acc[2]) / (idx + 1),
    ])
  );

  return val;
};

export const getVertexByIndex = (vertices: Array<number>, index: number): Triplet => {
  const stride = index * 3;

  return [vertices[stride], vertices[stride + 1], vertices[stride + 2]];
};

const applyRadius = (vertex: Triplet, radius: number): Triplet => {
  return new Vector3().fromArray(vertex).normalize().multiplyScalar(radius).toArray();
};
