import { PublicApi } from "@react-three/cannon";
import { useEffect, useMemo, useRef } from "react";
import { Mesh, Raycaster, Vector3 } from "three/src/Three";
import { assertDefined } from "../lib/utils";
import { useStore } from "./use-store";

const VELOCITY_THRESHOLD = 0.05;

/**
 * Track velocity of dice and use raycasting
 * to intersect upward face
 */
export const useDiceResult = (ref: React.MutableRefObject<Mesh>, api: PublicApi, onResult: (result: number) => void) => {
  const raycaster = useMemo(() => new Raycaster(), []);
  const flag = useRef(false);
  const removeDice = useStore((state) => state.removeDice);

  useEffect(() => {
    const unsub = api.velocity.subscribe((velocity) => {
      if (velocity.filter((v) => Math.abs(v) > VELOCITY_THRESHOLD).length === 0 && flag.current) {
        const origin = ref.current.getWorldPosition(new Vector3()).add(new Vector3(0, 0, 100));
        const direction = new Vector3(0, 0, -1);

        raycaster.set(origin, direction);
        console.log(raycaster);
        const intersect = raycaster.intersectObject(ref.current, false);

        if (intersect.length !== 1) {
          // TODO: what to do about this?
          throw new Error("dice cocked");
        } else {
          console.log(intersect[0].faceIndex);
          // TODO only works for deltahedrons
          assertDefined(intersect[0].faceIndex);
          if (intersect[0].faceIndex) onResult(intersect[0].faceIndex + 1);
          removeDice();
        }
        unsub();
      }
    });

    flag.current = true;

    return () => unsub();
    // TODO fix
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
