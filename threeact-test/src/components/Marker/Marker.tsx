import React from "react";
import { Html } from "drei";
import Nav from "react-bootstrap/esm/Nav";

function Marker({
  position,
  name,
  id,
  onActiveStateChanged,
}: {
  position: [number, number, number];
  name: string;
  id: number;
  onActiveStateChanged: () => void
}) {
  return (
    <mesh position={position}>
      <Html scaleFactor={100}>
        <div className="overlay" onClick={() => {onActiveStateChanged()}}>
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
