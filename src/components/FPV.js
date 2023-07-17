import { useThree } from "@react-three/fiber";

export const FPV = () => {
  const { camera } = useThree();

  return <PointerLockControls args={[camera]} />;
};
