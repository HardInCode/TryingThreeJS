import { useGLTF } from '@react-three/drei'
import React from 'react'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const skyScene = '/assets/3D/sky.glb';

export const Sky = ({ isRotating, ...props }) => {
    const sky = useGLTF(skyScene);
    const skyRef = useRef();

    useFrame((_, delta) => {
        if (isRotating) {
            skyRef.current.rotation.y += 0.15 * delta; // Slow rotation for the sky
        }
    })

    return (
        <mesh ref={skyRef}>
            <primitive 
                object={sky.scene} 
                scale={[1, 1, 1]}
                position={[0, 0, 0]}
            />
        </mesh>
    )
}

// Preload the model for better performance
useGLTF.preload(skyScene);