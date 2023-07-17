import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

const JUMP_FORCE = 4;
const SPEED = 4;

export const Player = () => {
  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    useKeyboard();
  //   console.log(
  //     "actions",
  //     Object.entries(actions).filter(([k, v]) => v)
  //   );
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

    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0) //z
    );
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0), //x
      0,
      0
    );

    // the direction vector should represent the direction in 3D space that the camera should move
    //based on the relative positions of frontVector and sideVector, the SPEED scalar value, and the camera's rotation.
    direction
      .subVectors(frontVector, sideVector) // represents the direction in 3D space from sideVector to frontVector.
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, vel.current[1], direction.z);
    //jump action
    if (jump && Math.abs(vel.current[1] < 0.05)) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    }
  });

  return <mesh ref={ref}></mesh>;
};
