import { useState } from "react";
import { useSpring, animated } from "react-spring";
import Nav from "react-bootstrap/esm/Nav";
import React from "react";

function NavLink(props) {

  const [hovered, setHovered] = useState(false);
  const AnimatedNavLink = animated(Nav.Link);

  const linkSpring = useSpring({
    transform: hovered ? 'scale(1.1)' : 'scale(1)',
    padding: 10,
    margin: '0.5rem 1rem',
    borderRadius: '5px',
    backgroundColor: hovered ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)'
  })

  return (
    <AnimatedNavLink onPointerOver={e => setHovered(true)} onPointerOut={e => setHovered(false)} style={{...linkSpring}} onClick={() => props.onNavLinkClicked(props.id)}>
      {props.name}
    </AnimatedNavLink>
  );
}

export default NavLink;