import React from "react";
import { Html } from "drei";
import Nav from "react-bootstrap/esm/Nav";
import { useSpring, animated, config } from "react-spring";

function Marker({
  position,
  name,
  id,
  onMarkerClicked,
}: {
  position: [number, number, number];
  name: string;
  id: number;
  onMarkerClicked: (id: number) => void 
}) {

  const markerSpring = useSpring({
    opacity: 1,
    from: {
      opacity: 0
    },
    config: config.slow,
  })

  return (
    <mesh position={position}>
      <Html scaleFactor={100}>
        <animated.div className="overlay" style={markerSpring} onClick={() => onMarkerClicked(id)}>
          <div className="circle box">{id}</div>
          <div className="box">
            <Nav.Link className="text-overlay">{name}</Nav.Link>
          </div>
        </animated.div>
      </Html>
    </mesh>
  );
}

export default Marker;