import React from "react";
import { HTML } from "drei";
import Nav from "react-bootstrap/esm/Nav";

function Sphere(props) {
  return (
    <mesh {...props}>
      <sphereGeometry attach="geometry" args={[0.5, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
      <HTML scaleFactor={100}>
        <Nav.Link className="sphereText">{props.name}</Nav.Link>
      </HTML>
    </mesh>
  );
}

export default Sphere;
