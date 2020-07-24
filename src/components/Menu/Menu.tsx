import React from "react";
import Nav from "react-bootstrap/Nav";

function Menu({
  items,
  onMarkerClicked,
  onTitleClicked,
}: {
  items: Array<{
    position: [number, number, number];
    cameraPos: [number, number, number];
    name: string;
  }>;
  onMarkerClicked: (id: number) => void;
  onTitleClicked: () => void;
}) {
  return (
    <div className="ui">
      <h2 className="title" onClick={() => onTitleClicked()}>
        The Viking Room
      </h2>
      <Nav defaultActiveKey="/home" className="flex-column">
        {items.map((marker) => {
          let key = items.indexOf(marker);
          let id = key + 1;
          return (
            <Nav.Link
              onClick={() => onMarkerClicked(id)}
              key={key}
            >
              {marker.name}
            </Nav.Link>
          );
        })}
      </Nav>
    </div>
  );
}

export default Menu;
