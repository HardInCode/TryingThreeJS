import { Suspense, useState, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Loader } from '../components/Loader'
import * as THREE from 'three'
import HomeInfo from '../components/HomeInfo'

import Island from '../models/Island'
import { Sky } from '../models/Sky'
import { Plane } from '../models/Plane'

// Constants for camera positioning
const CAMERA_POSITIONS = {
  MAIN: [0, 130, 25],
  LOOK_AT: [0, 80, 20]
}

// Camera controller component to set initial view
const CameraController = () => {
  const { camera } = useThree()
  
  useEffect(() => {
    // Position camera to maintain same view but relative to island at origin
    camera.position.set(0, 110, 130)
    camera.lookAt(...CAMERA_POSITIONS.LOOK_AT)
    camera.updateProjectionMatrix()
  }, [camera])

  return null
}

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(null);

  // Adjust island size and position based on screen size
  const adjustIslandForScreenSize = () => {
    const screenScale = window.innerWidth < 768 ? [0.9, 0.9, 0.9] : [1, 1, 1];
    return [screenScale, null, null] 
  }

  // Adjust plane position based on screen size
  const adjustPlaneForScreenSize = () => {
    if (window.innerWidth < 768) {
      return [[3, 3, 3], [0, 107, 123]];
    }
    return [[3, 3, 3], [0, 110, 120]];
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      {/* Info display when stage is selected */}
      {currentStage && (
        <div className='absolute top-18 left-0 right-0 z-10 flex items-center justify-center'>
          <HomeInfo currentStage={currentStage}/> 
        </div>
      )}
      
      <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ 
          position: CAMERA_POSITIONS.MAIN,
          near: 0.1, 
          far: 1000,
          fov: 75
        }}
        gl={{ powerPreference: "default", antialias: true }}
      >
        <Suspense fallback={<Loader />}>
          <CameraController />
          
          {/* Lighting setup */}
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={2} />
          <hemisphereLight 
            skyColor={new THREE.Color(0x87ceeb)} 
            groundColor={new THREE.Color(0x000000)} 
            intensity={1}
          />
          
          {/* Sky background */}
          <Sky isRotating={isRotating} />

          {/* 3D Models */}
          <Island 
            position={islandPosition} 
            scale={islandScale} 
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          
          <Plane 
            isRotating={isRotating}
            position={planePosition}
            scale={planeScale}
            rotation={[0, 1.5, 0]}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home