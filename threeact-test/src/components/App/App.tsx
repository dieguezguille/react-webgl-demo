import React, { Suspense, useRef } from "react";
import { Canvas, extend } from "react-three-fiber";
import RoomModel from "../../models/viking-room/VikingRoom";
import { OrbitControls, Html } from "drei";
import Menu from "../Menu/Menu";
import Marker from "../Marker/Marker";
import {useSpring} from "react-spring";
import { Camera } from "three";

extend({ OrbitControls });

const Fallback = () => (
  <Html>
    <h2 className="loading">Loading...</h2>
  </Html>
);

let isMarkerSelected = false;

function onActiveStateChanged(active: boolean) {
  isMarkerSelected = active;
  console.log(isMarkerSelected);
}

function App() {

  // reference to the camera
  const cameraRef = useRef<Camera>();

  return (
    <div className="content">
      <Menu></Menu>
      <Canvas camera={{ position: [18,18, 18], rotation: [0,0,0], ref: cameraRef }}>
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
        <OrbitControls/>
      </Canvas>
    </div>
  );
}

export default App;
