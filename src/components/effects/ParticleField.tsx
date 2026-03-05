'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    isRed: boolean;
}

// Spatial grid cell size — particles only check connections within adjacent cells
const GRID_CELL_SIZE = 150;

export function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const animationFrameId = useRef<number>(0);
    const particles = useRef<Particle[]>([]);
    const dpr = useRef(1);

    const initParticles = useCallback((width: number, height: number) => {
        // Cap particle count for performance — 40 particles on mobile, 60 on desktop
        const particleCount = Math.min(Math.floor(width / 25), width < 768 ? 40 : 60);
        const arr: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
            const isRed = Math.random() > 0.8;
            arr.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 1.5 + 0.5,
                color: isRed ? 'rgba(255, 51, 51, 0.8)' : 'rgba(255, 255, 255, 0.4)',
                isRed
            });
        }
        particles.current = arr;
    }, []);

    useEffect(() => {
        if (prefersReducedMotion || !canvasRef.current) return;

        const canvas = canvasRef.current;
        // Use { alpha: true, desynchronized: true } for maximum perf — runs on a separate compositing thread
        const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
        if (!ctx) return;

        dpr.current = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2 for perf

        const resizeCanvas = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas.width = w * dpr.current;
            canvas.height = h * dpr.current;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr.current, 0, 0, dpr.current, 0, 0);
            initParticles(w, h);
        };

        // ── Spatial hash grid for O(n) connection lookups instead of O(n²) ──
        const drawParticles = () => {
            const w = canvas.width / dpr.current;
            const h = canvas.height / dpr.current;
            const pts = particles.current;

            ctx.clearRect(0, 0, w, h);

            // Build spatial grid
            const gridCols = Math.ceil(w / GRID_CELL_SIZE);
            const gridRows = Math.ceil(h / GRID_CELL_SIZE);
            const grid: number[][] = new Array(gridCols * gridRows);
            for (let i = 0; i < grid.length; i++) grid[i] = [];

            // Update positions + bin into grid
            for (let i = 0; i < pts.length; i++) {
                const p = pts[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;

                // Ensure we never have a negative index or an index >= gridCols/gridRows
                const col = Math.max(0, Math.min(Math.floor(p.x / GRID_CELL_SIZE), gridCols - 1));
                const row = Math.max(0, Math.min(Math.floor(p.y / GRID_CELL_SIZE), gridRows - 1));
                const targetIdx = row * gridCols + col;

                if (grid[targetIdx]) grid[targetIdx].push(i);
            }

            // Draw connections — only check particles in same + adjacent cells
            ctx.lineWidth = 0.5;
            for (let row = 0; row < gridRows; row++) {
                for (let col = 0; col < gridCols; col++) {
                    const cellIdx = row * gridCols + col;
                    const cell = grid[cellIdx];

                    // Check current cell and 4 neighbors (right, bottom, bottom-right, bottom-left)
                    const neighbors = [cellIdx];
                    if (col < gridCols - 1) neighbors.push(cellIdx + 1);
                    if (row < gridRows - 1) neighbors.push(cellIdx + gridCols);
                    if (col < gridCols - 1 && row < gridRows - 1) neighbors.push(cellIdx + gridCols + 1);
                    if (col > 0 && row < gridRows - 1) neighbors.push(cellIdx + gridCols - 1);

                    for (const ni of neighbors) {
                        const neighborCell = grid[ni];
                        if (!neighborCell) continue;

                        for (const i of cell) {
                            const startJ = ni === cellIdx ? cell.indexOf(i) + 1 : 0;
                            for (let jIdx = startJ; jIdx < neighborCell.length; jIdx++) {
                                const j = neighborCell[jIdx];
                                const dx = pts[i].x - pts[j].x;
                                const dy = pts[i].y - pts[j].y;
                                const distSq = dx * dx + dy * dy;

                                if (distSq < 22500) { // 150²
                                    const dist = Math.sqrt(distSq);
                                    const opacity = 1 - dist / 150;
                                    const isRedConn = pts[i].isRed || pts[j].isRed;
                                    ctx.strokeStyle = isRedConn
                                        ? `rgba(255, 51, 51, ${opacity * 0.3})`
                                        : `rgba(255, 255, 255, ${opacity * 0.15})`;

                                    ctx.beginPath();
                                    ctx.moveTo(pts[i].x, pts[i].y);
                                    ctx.lineTo(pts[j].x, pts[j].y);
                                    ctx.stroke();
                                }
                            }
                        }
                    }
                }
            }

            // Draw dots
            for (const p of pts) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }

            animationFrameId.current = requestAnimationFrame(drawParticles);
        };

        // Debounced resize
        let resizeTimer: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resizeCanvas, 200);
        };

        window.addEventListener('resize', handleResize, { passive: true });
        resizeCanvas();
        drawParticles();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId.current);
            clearTimeout(resizeTimer);
        };
    }, [prefersReducedMotion, initParticles]);

    if (prefersReducedMotion) return null;

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-[1] w-full h-full pointer-events-none mix-blend-screen opacity-60"
            style={{ willChange: 'transform' }}
        />
    );
}
