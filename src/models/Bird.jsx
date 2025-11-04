import { useRef, useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import birdScene from "../assets/3d/bird.glb";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Bird = () => {
  const { scene, animations } = useGLTF(birdScene);
  const birdRef = useRef();
  const { actions } = useAnimations(animations, birdRef);

  useEffect(() => {
    actions["Take 001"].play();
  }, []);

  // useFrame((_, delta) => {
  //   // update the Y position simulate the flight moving in a sin wave
  //   birdRef.current.rotation.y += 0.15 * delta;
  //   birdRef.current.rotation.x += 0.15 * delta;
  // })

    useFrame(({ clock, camera }) => {
      // This function runs on every frame. 'clock' gives you elapsed time, 'camera' gives the current camera position.

      // update the Y position simulate the bird-like motion using a sin wave
      //takes elapsed time from the cloak and uses math.sin to create smooth oscillation
      birdRef.current.rotation.y = Math.sin(clock.elapsedTime) * 0.2 + 1;
      // check if the bird has reached a certain endpoint relative to the camera
      if (birdRef.current.position.x > camera.position.x + 10) {
        // if the bird is to the right of the camera. instantly faces to the opposite direction (180 degrees )
        birdRef.current.rotation.y = Math.PI;
      } else if (birdRef.current.position.x < camera.position.x - 10) {
        // if the bird is to the left of the camera. instantly faces forward (0 degrees)/ (0 radians)
        birdRef.current.rotation.y = 0;
      }
  // update the x and z positions based on the directions
      if (birdRef.current.rotation.y === 0) {
        //moving forward
        birdRef.current.position.x -= 0.01;
        birdRef.current.position.z += 0.01;

      } else {
        //moving backward
        birdRef.current.position.x += 0.01;
        birdRef.current.position.z -= 0.01;
      }
    });

  // useFrame(({ clock }) => {
  //   const t = clock.elapsedTime;

  //   // gentle up-and-down flight motion
  //   birdRef.current.position.y = 2 + Math.sin(t * 2) * 0.5;

  //   // fly forward in -Z direction (into the screen)
  //   birdRef.current.position.z -= 0.02;

  //   // add a slow yaw rotation to make it feel alive
  //   birdRef.current.rotation.y = Math.sin(t) * 0.3;
  // });

  return (
    <mesh position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]} ref={birdRef}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Bird;
