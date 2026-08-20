"use client";

import { useGLTF, OrbitControls, Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

// Preload the model for faster rendering
useGLTF.preload("/models/stylized_planet.glb");

function Model() {
  const { scene } = useGLTF("/models/stylized_planet.glb");
  // Adjust scale or position if needed, depending on the specific GLB file's native scale
  return <primitive object={scene} scale={1.3} />;
}

export default function ContactModel() {
  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-[600px] relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#c084fc" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#818cf8" />
        
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Model />
          </Float>
        </Suspense>

        <OrbitControls
          autoRotate
          autoRotateSpeed={1}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
