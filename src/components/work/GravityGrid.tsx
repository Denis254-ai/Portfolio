"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Project, PROJECTS } from "@/lib/data";
import { ProjectCard } from "./ProjectCard";

export const GravityGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [constraints, setConstraints] = useState({ width: 0, height: 0 });

    // FIXED: Changed Matter.Body to 'any' to bypass TypeScript strictness
    const bodiesRef = useRef<Map<string, any>>(new Map());
    // Refs for DOM elements
    const cardsRef = useRef<Map<string, HTMLDivElement>>(new Map());

    useEffect(() => {
        if (!containerRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        setConstraints({ width, height });

        // Module aliases
        const Engine = Matter.Engine,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint;

        // Create engine
        const engine = Engine.create();
        const world = engine.world;

        // Add walls
        const wallOptions = { isStatic: true, render: { visible: false } };
        const ground = Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions);
        const leftWall = Bodies.rectangle(-50, height / 2, 100, height, wallOptions);
        const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions);

        Composite.add(world, [ground, leftWall, rightWall]);

        // Add bodies for projects
        const projectBodies: any[] = []; // Type as any array

        PROJECTS.forEach((project) => {
            const x = Math.random() * (width - 100) + 50;
            const y = -Math.random() * 500 - 100; // Start above screen

            // Card Dimensions (Must match CSS below)
            const w = 320;
            const h = 256; 

            const body = Bodies.rectangle(x, y, w, h, {
                restitution: 0.4, // Bounciness
                friction: 0.1,
                angle: Math.random() * 0.5 - 0.25, // Random small rotation
                label: project.id
            });

            bodiesRef.current.set(project.id, body);
            projectBodies.push(body);
        });

        Composite.add(world, projectBodies);

        // Mouse control
        const mouse = Mouse.create(containerRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        Composite.add(world, mouseConstraint);

        // Run the engine
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Sync loop
        let animationFrameId: number;

        const renderLoop = () => {
            bodiesRef.current.forEach((body, id) => {
                const cardEl = cardsRef.current.get(id);
                if (cardEl) {
                    const { x, y } = body.position;
                    const rotation = body.angle;

                    // Apply transform to DOM element
                    // Offset by half width/height because Matter.js uses center-origin
                    cardEl.style.transform = `translate(${x - 160}px, ${y - 128}px) rotate(${rotation}rad)`;
                }
            });
            animationFrameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
            Runner.stop(runner);
            Composite.clear(world, false);
            Engine.clear(engine);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative h-[800px] w-full overflow-hidden bg-transparent">
            {/* FIXED: Removed duplicate map loop. Only keeping the one attached to Physics. */}
            {PROJECTS.map((project) => (
                <div
                    key={project.id}
                    ref={(el) => {
                        if (el) cardsRef.current.set(project.id, el);
                    }}
                    className="absolute left-0 top-0 h-64 w-[320px] touch-none"
                    style={{ willChange: "transform" }}
                >
                    <ProjectCard project={project} />
                </div>
            ))}
        </div>
    );
};
