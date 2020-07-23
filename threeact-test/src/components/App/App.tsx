import React, { Suspense, useState, useEffect } from "react";
import { Canvas, extend } from "react-three-fiber";
import RoomModel from "../../models/viking-room/VikingRoom";
import { OrbitControls, Html } from "drei";
import Menu from "../Menu/Menu";
import Marker from "../Marker/Marker";
import Navigation from "../Navigation/Navigation";

extend({ OrbitControls });

const Fallback = () => (
  <Html>
    <h2 className="loading">Loading...</h2>
  </Html>
);

function App() {

  const [cameraPos, setCameraPos] = useState<[number, number, number]>([18,18,18]);

  return (
    <div className="content">
      <Menu></Menu>
      <Canvas camera={{ position: cameraPos, rotation: [0, 0, 0] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Navigation cameraPosition={cameraPos}/>
        <Suspense fallback={<Fallback />}>
          <RoomModel position={[0, 0, 0]} />
          <Marker
            position={[-12, 10, 2]}
            name="The Tales"
            id={1}
            onActiveStateChanged={() => setCameraPos([1,1,1])}
          />
          <Marker
            position={[0, 10, -7]}
            name="The Weapons"
            id={2}
            onActiveStateChanged={() => setCameraPos([2,2,2])}
          />
          <Marker
            position={[0, 6, 2]}
            name="The Food"
            id={3}
            onActiveStateChanged={() => setCameraPos([3,3,3])}
          />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
