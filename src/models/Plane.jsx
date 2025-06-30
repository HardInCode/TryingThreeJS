import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const planeScene = '/assets/3D/plane.glb';

export const Plane = ({ isRotating, position, rotation, scale, ...props }) => {
    const ref = useRef();
    const { scene, animations } = useGLTF(planeScene);
    const { actions } = useAnimations(animations, ref);

    useEffect(() => {
        if (isRotating) {
            actions['Take 001'].play();
        } else {
            actions['Take 001'].stop();
        }
    }, [actions, isRotating])

    // Remove this useFrame hook - it's causing the plane body to rotate
    // The propeller animation should be handled by the GLTF animation ('Take 001')
    // useFrame((_, delta) => {
    //     if (isRotating && ref.current) {
    //         ref.current.rotation.y += 0.15 * delta
    //     }
    // })
    
    return (
        <mesh 
            {...props} 
            ref={ref}
            position={position}
            scale={scale}
            rotation={rotation}
        >
            <primitive object={scene} />
        </mesh>
    )
}

// Preload the model for better performance
useGLTF.preload(planeScene)