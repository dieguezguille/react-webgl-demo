import { useState } from "react";
import { useSpring, animated } from "react-spring";
import Nav from "react-bootstrap/esm/Nav";
import React from "react";

function NavLink(props) {

  const [hovered, setHovered] = useState(false);
  const AnimatedNavLink = animated(Nav.Link);

  function onEnter() {
    setHovered(true);
  }

  function onLeave() {
    setHovered(false);
  }

  const linkSpring = useSpring({
    transform: hovered ? 'scale(1.1)' : 'scale(1)'
  })

  return (
    <AnimatedNavLink onPointerEnter={onEnter} onPointerLeave={onLeave} style={linkSpring} onClick={props.onClickEventHandler(props.id)}>
      {props.name}
    </AnimatedNavLink>
  );
}

export default NavLink;