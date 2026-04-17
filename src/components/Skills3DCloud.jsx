import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function SkillItem({ position, skill }) {
    const [hovered, setHovered] = useState(false);

    return (
        <group position={position}>
            <Html center distanceFactor={10} zIndexRange={[100, 0]}>
                <div
                    className="skill-3d-item"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        pointerEvents: 'auto',
                        cursor: 'pointer',
                        padding: '8px 12px',
                        background: hovered ? 'rgba(56, 189, 248, 0.2)' : 'rgba(30, 41, 59, 0.6)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '12px',
                        border: hovered ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.3s ease',
                        transform: hovered ? 'scale(1.2)' : 'scale(1)',
                        minWidth: '80px',
                    }}
                >
                    <img
                        src={skill.icon}
                        alt={skill.name}
                        style={{
                            width: '32px',
                            height: '32px',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                        }}
                    />
                    <span style={{
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                    }}>
                        {skill.name}
                    </span>
                </div>
            </Html>
        </group>
    );
}

function Cloud({ skills, radius = 4 }) {
    // Fibonacci Sphere Algorithm to distribute points evenly
    const points = useMemo(() => {
        const temp = [];
        const phi = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < skills.length; i++) {
            const y = 1 - (i / (skills.length - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phi * i;
            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;
            temp.push(new THREE.Vector3(x * radius, y * radius, z * radius));
        }
        return temp;
    }, [skills, radius]);

    const groupRef = useRef();

    useFrame((state, delta) => {
        // Slow auto-rotation
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {skills.map((skill, i) => (
                <SkillItem key={skill.name} position={points[i]} skill={skill} />
            ))}
        </group>
    );
}

const Skills3DCloud = ({ skills }) => {
    return (
        <div className="skills-3d-container" style={{ width: '100%', height: '600px', cursor: 'grab' }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Cloud skills={skills} radius={3.5} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
};

export default Skills3DCloud;
