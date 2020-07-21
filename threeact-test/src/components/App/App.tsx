import React, { Suspense } from 'react';
import { Canvas } from "react-three-fiber";
import Model from '../../models/viking-room/VikingRoom';
import { OrbitControls } from 'drei'

function App() {
	return (
        <Canvas camera={{position: [0,15,30]}}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              <Model position={[0,0,0]}/>
            </Suspense>
            <OrbitControls />
        </Canvas>
  );
}

export default App;
