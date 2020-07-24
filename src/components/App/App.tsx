import React, { Suspense, useState } from "react";
import { Canvas, extend } from "react-three-fiber";
import { OrbitControls } from "drei";
import Menu from "../Menu/Menu";
import Marker from "../Marker/Marker";
import Navigation from "../Navigation/Navigation";
import Fallback from "../Fallback/Fallback";
import Room from "../Room/Room";
import { useSpring, animated } from "react-spring/three";

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

  const [initialCameraPos, setInitialCameraPos] = useState<[number, number, number]>([18, 18, 18,]);
  const [initialControlsTarget, setInitialControlsTarget] = useState<[number, number, number]>([0, 0, 0]);

  const [cameraPos, setCameraPos] = useState<[number, number, number]>(initialCameraPos);
  const [controlsTarget, setControlsTarget] = useState<[number, number, number]>(initialControlsTarget);

  const [active, setActive] = useState(false);

  const props = useSpring({
    cameraPos: active ? cameraPos : initialCameraPos,
    controlsTarget: active? controlsTarget : initialControlsTarget,
  })

  function onMarkerClicked(id: number) {
    updateCamera(id);
    console.log(active);
    setActive(!active);
  }

  function updateCamera(id: number) {
    let key = id - 1;
    setCameraPos(markers[key].cameraPos);
    setControlsTarget(markers[key].position);
  }

  return (
    <div className="content">
      <Menu markers={markers} onMarkerClicked={onMarkerClicked} />
      <Canvas camera={{ position: cameraPos, rotation: [0, 0, 0] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Navigation cameraPosition={active ? cameraPos : initialCameraPos} />
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
                onMarkerClicked={onMarkerClicked}
              />
            );
          })}
        </Suspense>
        <OrbitControls target={active ? controlsTarget : initialControlsTarget} />
      </Canvas>
    </div>
  );
}

export default App;
