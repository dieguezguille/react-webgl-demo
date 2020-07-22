import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import RoomModel from "../../models/viking-room/VikingRoom";
import { OrbitControls, Html } from "drei";
import Menu from "../Menu/Menu";
import Marker from "../Marker/Marker";
// import Stars from "../Stars/Stars";
// import {useSpring} from "react-spring";

const Fallback = () => (
  <Html>
    <h2 className="loading">Loading...</h2>
  </Html>
);

let isSphereActive = false;

function onActiveStateChanged(active: boolean) {
  isSphereActive = active;
  console.log(isSphereActive);
}

function App() {
  return (
    <div className="content">
      <Menu></Menu>
      <Canvas camera={{ position: [25, 18, 15] }}>
        <perspectiveCamera></perspectiveCamera>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<Fallback />}>
          <RoomModel position={[0, 0, 0]} />
          <Marker
            position={[-12, 10, 2]}
            name="The Tales"
            id={1}
            onActiveStateChanged={onActiveStateChanged}
          />
          <Marker
            position={[0, 10, -7]}
            name="The Weapons"
            id={2}
            onActiveStateChanged={onActiveStateChanged}
          />
          <Marker
            position={[0, 6, 2]}
            name="The Food"
            id={3}
            onActiveStateChanged={onActiveStateChanged}
          />
        </Suspense>
        {/* <Stars /> */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
