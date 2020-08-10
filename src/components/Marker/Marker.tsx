import React from "react";
import { Html } from "drei";
import Nav from "react-bootstrap/esm/Nav";
import { useSpring, animated, config } from "react-spring";

function Marker(props) {

  const markerSpring = useSpring({
    opacity: 1,
    from: {
      opacity: 0,
    },
    config: config.slow,
  })

  const infoSpring = useSpring({
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    transform: props.id === props.selected ? 'scale(1)' : 'scale(0)',
    from: {
      transform: 'scale(0)'
    }
  })

  function onClick() {
    props.onMarkerClicked(props.id);
  }

  return (
    <mesh position={props.position}>
      <Html scaleFactor={100}>
        <animated.div className="overlay" style={markerSpring} onClick={onClick}>
          <div className="circle box">{props.id}</div>
          <div className="box">
            <Nav.Link className="text-overlay">{props.name}</Nav.Link>
          </div>
        </animated.div>
        <animated.div className="info" style={infoSpring}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </animated.div>
      </Html>
    </mesh>
  );
}

export default Marker;