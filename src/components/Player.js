import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

export const Player = () => {
  const { camera } = useThree();

  //create the player's 3D object and enable physics simulation for it
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1, 0],
  }));

  //--- ref for position to subscribe from the sphere--
  const pos = useRef([0, 0, 0]);
  //subscribe to changes in the position of the player controlled by the useSphere hook
  useEffect(() => {
    //callback function
    api.position.subscribe((p) => (pos.current = p));
  }, [api.position]);

  //--ref for velocity to subscribe from the sphere--
  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  //camera follows pos/ref
  useFrame(() => {
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );
    api.velocity.set(0, 1, 0); //constantly lift it upwards
  });

  return <mesh ref={ref}></mesh>;
};
