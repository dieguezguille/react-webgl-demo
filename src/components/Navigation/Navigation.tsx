import { useThree } from "react-three-fiber";

function Navigation({
  cameraPosition,
  cameraTarget,
}: {
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
}) {

  const { camera } = useThree();
  camera.position.set(...cameraPosition);
  camera.lookAt(...cameraTarget);
  camera.updateProjectionMatrix();

  return null;
}

export default Navigation;