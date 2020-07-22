import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import RoomModel from "../../models/viking-room/VikingRoom";
import { OrbitControls, HTML } from "drei";
import Menu from "../Menu/Menu";
import Sphere from "../Sphere/Sphere";

const Fallback = () => (
  <HTML>
    <h2 className="loading">Loading...</h2>
  </HTML>
)

function App() {
  return (
    <div className="content">
      <Menu></Menu>
      <Canvas camera={{ position: [25, 18, 15] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<Fallback />}>
          <RoomModel position={[0, 0, 0]} />
          <Sphere position={[-11,10,1]} name="The Tales"/>
          <Sphere position={[0,10,-7]} name="The Weapons"/>
          <Sphere position={[0,6,2]} name="The Food"/> 
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
