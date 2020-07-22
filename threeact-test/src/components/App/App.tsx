import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import RoomModel from "../../models/viking-room/VikingRoom";
import { OrbitControls, HTML } from "drei";
import Menu from "../Menu/Menu";

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
        <Suspense fallback={<Fallback></Fallback>}>
          <RoomModel position={[0, 0, 0]} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
