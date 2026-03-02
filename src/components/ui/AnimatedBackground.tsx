"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeuralNetwork({ count = 300 }) {
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);

    const [positions, setPositions] = React.useState<Float32Array>(new Float32Array(count * 3));
    const [velocities] = React.useState<Float32Array>(() => {
        const v = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            v[i] = (Math.random() - 0.5) * 0.02; // slow drift
        }
        return v;
    });

    // Initialization
    React.useEffect(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;     // x range -7.5 to 7.5
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15; // y range -7.5 to 7.5
            pos[i * 3 + 2] = (Math.random() - 0.5) * 5;  // depth
        }
        setPositions(pos);
    }, [count]);

    const maxConnections = 5;
    const maxDistance = 2.5;

    const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);
    const lineMaterial = useMemo(
        () =>
            new THREE.LineBasicMaterial({
                color: 0xff2a2a, // Red base for lines
                transparent: true,
                opacity: 0.15,
                blending: THREE.AdditiveBlending,
            }),
        []
    );

    useFrame(() => {
        if (!pointsRef.current || !linesRef.current) return;

        const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

        // Update positions
        for (let i = 0; i < count * 3; i++) {
            pos[i] += velocities[i];
            // bounce off bounds gently to keep them in view
            if (pos[i] > 10 || pos[i] < -10) {
                velocities[i] *= -1;
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.rotation.y += 0.0005;
        pointsRef.current.rotation.x += 0.0002;

        linesRef.current.rotation.y = pointsRef.current.rotation.y;
        linesRef.current.rotation.x = pointsRef.current.rotation.x;

        // Recalculate connections
        let linePosIndex = 0;
        const linePositions = new Float32Array(count * maxConnections * 6);

        for (let i = 0; i < count; i++) {
            let connections = 0;
            for (let j = i + 1; j < count; j++) {
                const dx = pos[i * 3] - pos[j * 3];
                const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
                const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < maxDistance && connections < maxConnections) {
                    linePositions[linePosIndex++] = pos[i * 3];
                    linePositions[linePosIndex++] = pos[i * 3 + 1];
                    linePositions[linePosIndex++] = pos[i * 3 + 2];
                    linePositions[linePosIndex++] = pos[j * 3];
                    linePositions[linePosIndex++] = pos[j * 3 + 1];
                    linePositions[linePosIndex++] = pos[j * 3 + 2];
                    connections++;
                }
            }
        }

        lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions.slice(0, linePosIndex), 3));
    });

    return (
        <group>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.05} color="#8b0000" transparent opacity={0.8} />
            </points>
            <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
        </group>
    );
}

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
                <NeuralNetwork count={250} />
            </Canvas>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,#030305_100%)]"></div>
        </div>
    );
}
