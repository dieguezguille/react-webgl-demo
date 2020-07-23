import React, { Suspense, useState } from "react";
import { Canvas, extend } from "react-three-fiber";
import { OrbitControls } from "drei";
import Menu from "../Menu/Menu";
import Marker from "../Marker/Marker";
import Navigation from "../Navigation/Navigation";
import Fallback from "../Fallback/Fallback";
import Room from "../Room/Room";

extend({ OrbitControls });

function App() {

  const [markers, setMarkers] = useState<Array<any>>(
    [
      {
        position: [-12, 10, 2],
        name: "The Tales",
      },
      {
        position: [0, 10, -7],
        name: "The Weapons",
      }, {
        position: [0, 6, 2],
        name: "The Food",
      },
    ]
  );

  const [cameraPos, setCameraPos] = useState<[number, number, number]>([18, 18, 18]);

  return (
    <div className="content">
      <Menu></Menu>
      <Canvas camera={{ position: cameraPos, rotation: [0, 0, 0] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Navigation cameraPosition={cameraPos} />
        <Suspense fallback={<Fallback />}>

          <Room position={[0, 0, 0]} />

          {markers.map(function (marker) {
            let key = markers.indexOf(marker);
            return <Marker position={marker.position} name={marker.name} key={key} id={key+1} />
          })}

        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
