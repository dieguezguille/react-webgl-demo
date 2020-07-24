import React, { Suspense, useState } from "react";
import { Canvas, extend } from "react-three-fiber";
import { OrbitControls, Stars } from "drei";
import Menu from "../Menu/Menu";
import Marker from "../Marker/Marker";
import Navigation from "../Navigation/Navigation";
import Fallback from "../Fallback/Fallback";
import Room from "../Room/Room";

extend({ OrbitControls });

function App() {
  const [markers] = useState<
    Array<{
      position: [number, number, number];
      cameraPos: [number, number, number];
      name: string;
    }>
  >([
    {
      position: [-12, 10, 2],
      cameraPos: [0, 10, 2],
      name: "The Tales",
    },
    {
      position: [0, 10, -7],
      cameraPos: [0, 10, 5.7],
      name: "The Weapons",
    },
    {
      position: [0, 6, 2],
      cameraPos: [7, 8, 10],
      name: "The Food",
    },
  ]);

  const initialCameraPos: [number, number, number] = [18, 18, 18];
  const initialControlsTarget: [number, number, number] = [0, 0, 0];

  const [cameraValues, setCameraValues] = useState({
    prevCameraPos: initialCameraPos,
    prevControlsTarget: initialControlsTarget,
    cameraPos: initialCameraPos,
    controlsTarget: initialControlsTarget,
  });

  function onNavigationItemClicked(id: number) {
    updateCamera(id);
  }

  function updateCamera(id: number) {
    let index = (id - 1);
    setCameraValues({
      prevCameraPos: cameraValues.cameraPos,
      prevControlsTarget: cameraValues.prevControlsTarget,
      cameraPos: markers[index].cameraPos,
      controlsTarget: markers[index].position,
    });
  }

  function onTitleClicked(){
    setCameraValues({
      prevCameraPos: cameraValues.cameraPos,
      prevControlsTarget: cameraValues.prevControlsTarget,
      cameraPos: initialCameraPos,
      controlsTarget: initialControlsTarget,
    });
  }

  return (
    <div className="content">
      <Menu markers={markers} onMarkerClicked={onNavigationItemClicked} onTitleClicked={onTitleClicked}/>
      <Canvas
        camera={{ position: cameraValues.cameraPos, rotation: [0, 0, 0] }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Navigation cameraPosition={cameraValues.cameraPos} />
        <Suspense fallback={<Fallback />}>
          <Room position={[0, 0, 0]} />
          {markers.map(function (marker) {
            let key = markers.indexOf(marker);
            return (
              <Marker
                position={marker.position}
                name={marker.name}
                key={key}
                id={key + 1}
                onMarkerClicked={onNavigationItemClicked}
              />
            );
          })}
        </Suspense>
        <OrbitControls target={cameraValues.controlsTarget} enableZoom={false} enableKeys={false} enablePan={false} />
        <Stars
          radius={100}
          depth={100}
          count={2000}
          factor={6}
          saturation={0}
          fade={true}
        />
      </Canvas>
    </div>
  );
}

export default App;
