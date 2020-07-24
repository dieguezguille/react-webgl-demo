import { useThree } from "react-three-fiber";

function Navigation({
  cameraPosition,
}: {
  cameraPosition: [number, number, number];
}) {

  const { camera } = useThree();

  camera.position.set(...cameraPosition);
  camera.updateProjectionMatrix();

  return null;
}

export default Navigation;