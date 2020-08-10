import React, { Suspense, useState } from "react";
import { Canvas, extend } from "react-three-fiber";
import { Stars } from "drei";
import Marker from "../Marker/Marker";
import Navigation from "../Navigation/Navigation";
import Fallback from "../Fallback/Fallback";
import Room from "../Room/Room";
import { useSpring, animated, config } from "react-spring";
import Nav from "react-bootstrap/esm/Nav";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Controls from "../Controls/Controls";
import NavLink from "../NavLink/NavLink";

let selectedItemIndex: number = 0;

const initialCameraPos: [number, number, number] = [18, 18, 18];
const initialControlsTarget: [number, number, number] = [0, 0, 0];

extend({ OrbitControls })

function App() {
  const [markers] = useState<
    Array<{
      position: [number, number, number];
      cameraPos: [number, number, number];
      name: string;
    }>
  >([
    {
      position: [0, 0, 0],
      cameraPos: [18, 18, 18],
      name: "Title"
    },
    {
      position: [-12, 10, 2],
      cameraPos: [3, 9, 2],
      name: "The Tales",
    },
    {
      position: [0, 10, -7],
      cameraPos: [0, 10, 9],
      name: "The Weapons",
    },
    {
      position: [0, 6, 2],
      cameraPos: [9, 8, 14],
      name: "The Food",
    },
  ]);

  const AnimatedNavigation = animated(Navigation);

  const [isAnimating, setIsAnimating] = useState(false);

  const [cameraValues, setCameraValues] = useState({
    cachedPos: initialCameraPos,
    cachedTarget: initialControlsTarget,
    pos: initialCameraPos,
    target: initialControlsTarget,
    autoRotate: true,
  });

  const cameraSpring = useSpring({
    pos: cameraValues.pos,
    target: cameraValues.target,
    from: {
      pos: cameraValues.cachedPos,
      target: cameraValues.cachedTarget
    },
    config: config.slow,
    onRest: () => setIsAnimating(false)
  })

  function onNavigationItemClicked(id: number) {
    if (selectedItemIndex !== id && !isAnimating) {
      selectedItemIndex = id;
      setIsAnimating(true);
      setCameraValues({
        cachedPos: cameraValues.pos,
        cachedTarget: cameraValues.cachedTarget,
        pos: markers[selectedItemIndex].cameraPos,
        target: markers[selectedItemIndex].position,
        autoRotate: id === 0,
      });
    }
  }

  return (
    <div className="content">
      <div className="ui">
        <h2 className="title"
          onClick={() => onNavigationItemClicked(0)}>
          The Viking Room
        </h2>
        <Nav defaultActiveKey="/home" className="flex-column">
          <NavLink
            id={1}
            name={markers[1].name}
            onNavLinkClicked={onNavigationItemClicked}>
          </NavLink>
          <NavLink
            id={2}
            name={markers[2].name}
            onNavLinkClicked={onNavigationItemClicked}>
          </NavLink>
          <NavLink
            id={3}
            name={markers[3].name}
            onNavLinkClicked={onNavigationItemClicked}>
          </NavLink>
        </Nav>
      </div>
      <Canvas>
        <ambientLight />
        <pointLight
          position={[0, 5, 0]}
          intensity={1} />
        <AnimatedNavigation
          cameraPosition={cameraSpring.pos}
          cameraTarget={cameraSpring.target} />
        <Suspense
          fallback={<Fallback />}>
          <Room
            position={[0, 0, 0]} />
          {isAnimating ? null :
            <group>
              <Marker
                position={markers[1].position}
                name={markers[1].name}
                id={1}
                selected={selectedItemIndex}
                onMarkerClicked={onNavigationItemClicked} />
              <Marker
                position={markers[2].position}
                name={markers[2].name}
                id={2}
                selected={selectedItemIndex}
                onMarkerClicked={onNavigationItemClicked} />
              <Marker
                position={markers[3].position}
                name={markers[3].name}
                id={3}
                selected={selectedItemIndex}
                onMarkerClicked={onNavigationItemClicked} />
            </group>}
        </Suspense>
        <Controls
          enabled={!isAnimating}
          autoRotate={cameraValues.autoRotate}
          target={cameraValues.target} />
        <Stars
          radius={100}
          depth={100}
          count={2000}
          factor={6}
          saturation={0}
          fade={true} />
      </Canvas>
      <audio autoPlay loop>
        <source src="music.mp3" type="audio/mpeg"></source>
      </audio>
    </div>
  );
}

export default App;
