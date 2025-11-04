import { useGLTF } from "@react-three/drei";
import {useRef} from "react";
import { useFrame } from "@react-three/fiber";
import skyScene from "../assets/3d/sky.glb";
// we make sky a primitive element. but the island isnt one it is made up of lot of meshes (island) also we need the functions of dragging the island
const Sky = ({isRotating}) => {
  const sky = useGLTF(skyScene);
  const skyRef = useRef();

  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.15 * delta ;
    }
  });


  return <mesh ref = {skyRef}>
    <primitive object={sky.scene}/>
  </mesh>;
};

export default Sky;
