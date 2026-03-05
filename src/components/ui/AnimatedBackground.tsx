"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeuralNetwork({ count = 180 }) { // Reduced count for performance
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const frameCount = useRef(0);

    const positions = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 15;
            p[i * 3 + 1] = (Math.random() - 0.5) * 15;
            p[i * 3 + 2] = (Math.random() - 0.5) * 5;
        }
        return p;
    }, [count]);

    const velocities = useMemo(() => {
        const v = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            v[i] = (Math.random() - 0.5) * 0.015; // slightly slower drift
        }
        return v;
    }, [count]);

    const maxConnections = 4;
    const maxDistanceSq = 2.5 * 2.5; // Use squared distance to avoid sqrt

    // Pre-allocate line buffer
    const linePositions = useMemo(() => new Float32Array(count * maxConnections * 6), [count]);
    const lineGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
        return geo;
    }, [linePositions]);

    const lineMaterial = useMemo(
        () =>
            new THREE.LineBasicMaterial({
                color: 0xff3333,
                transparent: true,
                opacity: 0.12,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            }),
        []
    );

    useFrame((state) => {
        if (!pointsRef.current || !linesRef.current) return;

        const posAttr = pointsRef.current.geometry.attributes.position;
        const pos = posAttr.array as Float32Array;

        // 1. Position Update (Every frame)
        for (let i = 0; i < count * 3; i++) {
            pos[i] += velocities[i];
            if (pos[i] > 10 || pos[i] < -10) {
                velocities[i] *= -1;
            }
        }
        posAttr.needsUpdate = true;

        // Rotate
        const rotSpeed = 0.0003;
        pointsRef.current.rotation.y += rotSpeed;
        pointsRef.current.rotation.x += rotSpeed * 0.5;
        linesRef.current.rotation.y = pointsRef.current.rotation.y;
        linesRef.current.rotation.x = pointsRef.current.rotation.x;

        // 2. Connection Update (Skip frames to save CPU)
        frameCount.current++;
        if (frameCount.current % 2 !== 0) return;

        let lineIdx = 0;
        const lineAttr = lineGeometry.attributes.position;
        const lp = lineAttr.array as Float32Array;

        for (let i = 0; i < count; i++) {
            let connections = 0;
            const i3 = i * 3;
            const ix = pos[i3], iy = pos[i3 + 1], iz = pos[i3 + 2];

            for (let j = i + 1; j < count; j++) {
                const j3 = j * 3;
                const dx = ix - pos[j3];
                const dy = iy - pos[j3 + 1];
                const dz = iz - pos[j3 + 2];
                const dSq = dx * dx + dy * dy + dz * dz;

                if (dSq < maxDistanceSq) {
                    lp[lineIdx++] = ix;
                    lp[lineIdx++] = iy;
                    lp[lineIdx++] = iz;
                    lp[lineIdx++] = pos[j3];
                    lp[lineIdx++] = pos[j3 + 1];
                    lp[lineIdx++] = pos[j3 + 2];

                    connections++;
                    if (connections >= maxConnections) break;
                }
            }
        }

        // Fill remaining buffer with 0s or just hide them by setting draw range
        lineGeometry.setDrawRange(0, lineIdx / 3);
        lineAttr.needsUpdate = true;
    });

    return (
        <group>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.04}
                    color="#ff0000"
                    transparent
                    opacity={0.6}
                    sizeAttenuation={true}
                />
            </points>
            <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
        </group>
    );
}

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-black pointer-events-none" suppressHydrationWarning>
            <div suppressHydrationWarning className="w-full h-full">
                <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]}>
                    <NeuralNetwork count={180} />
                </Canvas>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,#030305_100%)]" suppressHydrationWarning></div>
        </div>
    );
}
