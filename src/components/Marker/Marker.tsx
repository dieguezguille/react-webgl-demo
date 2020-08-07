import React from "react";
import { Html } from "drei";
import Nav from "react-bootstrap/esm/Nav";
import { useSpring, animated, config } from "react-spring";

function Marker(props) {

  const markerSpring = useSpring({
    opacity: 1,
    from: {
      opacity: 0
    },
    config: config.slow,
  })

  return (
    <mesh position={props.position}>
      <Html scaleFactor={100}>
        <animated.div className="overlay" style={markerSpring} onClick={() => props.onMarkerClicked(props.id)}>
          <div className="circle box">{props.id}</div>
          <div className="box">
            <Nav.Link className="text-overlay">{props.name}</Nav.Link>
          </div>
        </animated.div>
      </Html>
    </mesh>
  );
}

export default Marker;