import React from "react";
import { Html } from "drei";
import Nav from "react-bootstrap/esm/Nav";

function Marker({
  position,
  name,
  id,
}: {
  position: [number, number, number];
  name: string;
  id: number;
}) {
  return (
    <mesh position={position}>
      <Html scaleFactor={100}>
        <div className="overlay">
          <div className="circle box">{id}</div>
          <div className="box">
            <Nav.Link className="text-overlay">{name}</Nav.Link>
          </div>
        </div>
      </Html>
    </mesh>
  );
}

export default Marker;
