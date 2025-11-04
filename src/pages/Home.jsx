import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Island from "../models/Island.jsx";
import Loader from "../components/Loader.jsx";
import Sky from "../models/Sky.jsx";
import Bird from "../models/Bird.jsx";
import Plane from "../models/Plane.jsx";
import Helpers from "../models/Helpers.jsx";
import { OrbitControls } from "@react-three/drei";
import HomeInfo from "../components/HomeInfo.jsx";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];
    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, rotation];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;
    // let rotation = [0.1, 4.7, 0];
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }
    return [screenScale, screenPosition];
  };
  // console.log(adjustIslandForScreenSize());
  const [planeScale, planePosition] = adjustPlaneForScreenSize();
  const [screenScale, screenPosition, screenRotation] =
    adjustIslandForScreenSize();

  useEffect(() => {
    console.log(currentStage);
  }, [currentStage]);
  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        shadows
        camera={{ near: 0.1, far: 1000 }}
        // camera={{ position: [10,10,10], fov: 75, near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <Helpers />
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <hemisphereLight
            skyColor="#b1e2ff"
            groundColor="#000000"
            intensity={1}
          />
          <ambientLight intensity={0.5} />
          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            scale={screenScale}
            position={screenPosition}
            rotation={screenRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            position={planePosition}
            scale={planeScale}
            rotation={[0, 20, 0]}
          />
          <OrbitControls />
          {/* <spotLight />  emits lights from a single point but in a shape of cone. we can contril the angle */}
          {/* <pointLight /> emits light in all directions from  a single point */}
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
