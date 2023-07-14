import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../images/textures";
import { NearestFilter, RepeatWrapping } from "three";
//defines a React-Three-Fiber component, utilizes the usePlane hook to create a ground plane in a 3D scene.
export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  groundTexture.magFilter = NearestFilter; //specifies that the texture should use the nearest neighbor interpolation when magnified. This can result in a pixelated effect when the texture is scaled up.
  groundTexture.wrapS = RepeatWrapping; // texture should repeat or tile when the texture coordinates extend beyond the range of 0 to 1 in the S (horizontal) and T (vertical) directions.
  groundTexture.wrapT = RepeatWrapping;
  groundTexture.repeat.set(100, 100);

  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};
