import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ── Mouse-reactive camera ── */
function CameraRig() {
    const { camera, mouse } = useThree();
    useFrame(() => {
        camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.04;
        camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
    });
    return null;
}


/* ── Drifting particle field ── */
function ParticleField() {
    const count = 280;
    const { positions, colors } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const palette = [
            new THREE.Color("#3b82f6"), // blue
            new THREE.Color("#8b5cf6"), // purple
            new THREE.Color("#60a5fa"), // light-blue
            new THREE.Color("#a78bfa"), // lavender
        ];
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 28;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
            const c = palette[Math.floor(Math.random() * palette.length)];
            col[i * 3] = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
        }
        return { positions: pos, colors: col };
    }, []);

    const points = useRef();
    useFrame(({ clock }) => {
        if (!points.current) return;
        points.current.rotation.y = clock.getElapsedTime() * 0.018;
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.07}
                vertexColors
                transparent
                opacity={0.75}
                sizeAttenuation
            />
        </points>
    );
}

/* ── Main export ── */
const Hero3DBackground = () => (
    <div
        style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
        }}
    >
        <Canvas
            camera={{ position: [0, 0, 10], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
        >
            {/* Lights */}
            <ambientLight intensity={0.4} />
            <pointLight position={[6, 6, 6]} color="#3b82f6" intensity={3} />
            <pointLight position={[-6, -4, 4]} color="#8b5cf6" intensity={2} />
            <pointLight position={[0, 8, -4]} color="#60a5fa" intensity={1.5} />

            {/* Stars */}
            <Stars
                radius={80}
                depth={60}
                count={4000}
                factor={3}
                saturation={0.3}
                fade
                speed={0.6}
            />

            {/* Sparkles — blue layer */}
            <Sparkles
                count={120}
                scale={18}
                size={3}
                color="#3b82f6"
                speed={0.25}
                opacity={0.6}
            />

            {/* Sparkles — purple layer */}
            <Sparkles
                count={80}
                scale={14}
                size={5}
                color="#8b5cf6"
                speed={0.15}
                opacity={0.45}
            />


            {/* Drifting colored particles */}
            <ParticleField />

            {/* Mouse parallax camera */}
            <CameraRig />
        </Canvas>
    </div>
);

export default Hero3DBackground;
