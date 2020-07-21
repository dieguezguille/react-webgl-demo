import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import RoomModel from "../../models/viking-room/VikingRoom";
import { OrbitControls } from "drei";
import Menu from "../Menu/Menu";

function App() {
  return (
    <div className="content">
      <Menu></Menu>
      <Canvas camera={{ position: [25, 18, 15] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <RoomModel position={[0, 0, 0]} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
