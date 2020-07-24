import React, { Suspense, useState } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, Stars } from "drei";
import Menu from "../Menu/Menu";
import Marker from "../Marker/Marker";
import Navigation from "../Navigation/Navigation";
import Fallback from "../Fallback/Fallback";
import Room from "../Room/Room";
import {useSpring, animated, config} from "react-spring";

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

  const AnimatedNavigation = animated(Navigation);
  const AnimatedOrbitControls = animated(OrbitControls);

  const [cameraValues, setCameraValues] = useState({
    cachedPos: initialCameraPos,
    cachedTarget: initialControlsTarget,
    pos: initialCameraPos,
    target: initialControlsTarget,
    autoRotate: true,
  });

  function onNavigationItemClicked(id: number) {
    updateCamera(id);
  }

  function updateCamera(id: number) {
    let index = id - 1;
    setCameraValues({
      cachedPos: cameraValues.pos,
      cachedTarget: cameraValues.cachedTarget,
      pos: markers[index].cameraPos,
      target: markers[index].position,
      autoRotate: false,
    });
  }

  function onTitleClicked() {
    setCameraValues({
      cachedPos: cameraValues.pos,
      cachedTarget: cameraValues.cachedTarget,
      pos: initialCameraPos,
      target: initialControlsTarget,
      autoRotate: true,
    });
  }

  const spring = useSpring({
    pos: cameraValues.pos,
    target: cameraValues.target,
    from: {
      pos: cameraValues.cachedPos,
      target: cameraValues.cachedTarget
    },
    config: config.slow
  })

  return (
    <div className="content">
      <Menu
        items={markers}
        onMarkerClicked={onNavigationItemClicked}
        onTitleClicked={onTitleClicked}
      />
      <Canvas
        camera={{ position: cameraValues.pos, rotation: [0, 0, 0] }}
      >
        <ambientLight />
        <pointLight position={[0, 5, 0]} intensity={1} />
        <AnimatedNavigation cameraPosition={spring.pos} />
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
        <AnimatedOrbitControls
          autoRotate={cameraValues.autoRotate}
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 2.5}
          minPolarAngle={Math.PI / 3}
          target={spring.target}
          enableKeys={false}
          enablePan={false}
        />
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
