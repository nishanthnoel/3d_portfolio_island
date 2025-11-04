import { useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import planeScene from "../assets/3d/plane.glb";

const Plane = ({ isRotating, ...props }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);
  useEffect(() => {
    console.log("Available animation names:", Object.keys(actions || {}));
    console.log({ isRotating, actions });

    if (!actions) return;
    if (isRotating) {
      actions["Take 001"].play();
    } else {
      actions["Take 001"].stop();
    }
  }, [isRotating, actions]);
  // return (
  //   <mesh {...props} ref={ref}>
  //     <primitive object={scene} />
  //   </mesh>
  //   // <primitive ref={ref} object={scene} {...props} />
  // );
  return <primitive ref={ref} object={scene} {...props} />;
};

export default Plane;
