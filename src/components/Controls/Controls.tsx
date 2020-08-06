import React, { useRef } from "react";
import { OrbitControls } from "drei";
import { useThree, useFrame } from "react-three-fiber";

function Controls({
    autoRotate,
    enabled,
    target
  }: {
    autoRotate: boolean
    enabled: boolean
    target: [number, number, number]
  }) {
    const controls = useRef<OrbitControls>();
    const { camera, gl } = useThree();

    useFrame(() => {
        if (controls && controls.current && controls.current.update && enabled) {
            controls.current?.update();
        }
    });

    return enabled ? <OrbitControls
        enabled={enabled}
        ref={controls}
        target={target}
        args={[camera, gl.domElement]}
        enableDamping
        enableZoom={false}
        enableKeys={false}
        enablePan={false}
        dampingFactor={0.1}
        rotateSpeed={0.2}
        autoRotate={autoRotate}
        autoRotateSpeed={0.2}/> :
        null
}

export default Controls;