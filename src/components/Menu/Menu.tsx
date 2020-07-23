import React from "react";
import Nav from "react-bootstrap/Nav";

function Menu({
  markers,
  onMarkerClicked,
}: {
  markers: Array<{position: [number, number, number], cameraPos: [number, number, number],  name: string}>; 
  onMarkerClicked: (id: number) => void
}) {
  return (
    <div className="ui">
      <h2 className="title">Viking Room</h2>
      <Nav defaultActiveKey="/home" className="flex-column">
        {markers.map((marker) => {
            let key = markers.indexOf(marker);
            let id = key+1;
            return <Nav.Link onClick={() => onMarkerClicked(id)} key={key}>{marker.name}</Nav.Link> 
        })}
      </Nav>
    </div>
  );
}

export default Menu;