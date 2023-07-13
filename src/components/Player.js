import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useRef } from "react";
import { Vector3 } from "three";

export const Player = () => {
  const { camera } = useThree();
  const [ref] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 0, 0],
  }));

  //position for player
  const pos = useRef([0, 0, 0]);

  useFrame(() => {
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );
  });

  return <mesh ref={ref}></mesh>;
};
