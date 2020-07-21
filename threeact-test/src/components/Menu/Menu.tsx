import React from "react";
import Nav from "react-bootstrap/Nav";

function Menu() {
  return (
    <div className="ui">
      <h2>Viking Room</h2>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link>The Tales</Nav.Link>
        <Nav.Link>The Weapons</Nav.Link>
        <Nav.Link>The Food</Nav.Link>
      </Nav>
    </div>
  );
}

export default Menu;
