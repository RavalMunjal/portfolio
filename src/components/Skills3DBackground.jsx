import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function StarField(props) {
    const ref = useRef();
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00f3ff"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function FloatingShape({ position, color, speed }) {
    const meshRef = useRef();

    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta * speed;
        meshRef.current.rotation.y += delta * speed;
    });

    return (
        <Float speed={2} rotationIntensity={2} floatIntensity={2}>
            <mesh ref={meshRef} position={position}>
                <icosahedronGeometry args={[0.4, 0]} />
                <meshStandardMaterial color={color} wireframe transparent opacity={0.3} />
            </mesh>
        </Float>
    );
}

const Skills3DBackground = () => {
    return (
        <div className="skills-3d-bg">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ambientLight intensity={0.5} />
                <StarField />
                <FloatingShape position={[-0.8, 0.2, 0]} color="#bc13fe" speed={0.5} />
                <FloatingShape position={[0.8, -0.2, 0]} color="#00f3ff" speed={0.4} />
                <FloatingShape position={[0, 0.5, -0.5]} color="#ffffff" speed={0.3} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
};

export default Skills3DBackground;
