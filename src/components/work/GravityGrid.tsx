"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Project, PROJECTS } from "@/lib/data";
import { ProjectCard } from "./ProjectCard";

export const GravityGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [constraints, setConstraints] = useState({ width: 0, height: 0 });

    // Refs to keep track of bodies to sync with DOM
    const bodiesRef = useRef<Map<string, Matter.Body>>(new Map());
    // Refs for DOM elements
    const cardsRef = useRef<Map<string, HTMLDivElement>>(new Map());

    useEffect(() => {
        if (!containerRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        setConstraints({ width, height });

        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint;

        // Create engine
        const engine = Engine.create();
        const world = engine.world;

        // Create renderer (Optional: useful for debugging, but we are using DOM)
        // We won't actually "render" to canvas visibly, but we need the runner.
        // Actually we can just run the engine.

        // Add walls
        const wallOptions = { isStatic: true, render: { visible: false } };
        const ground = Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions);
        const ceiling = Bodies.rectangle(width / 2, -50, width, 100, wallOptions); // Prevent flying too high?
        const leftWall = Bodies.rectangle(-50, height / 2, 100, height, wallOptions);
        const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions);

        Composite.add(world, [ground, leftWall, rightWall]);

        // Add bodies for projects
        // We assume card size roughly 300x400 or responsive. 
        // Let's spawn them at random top positions.
        const projectBodies: Matter.Body[] = [];

        PROJECTS.forEach((project, index) => {
            const x = Math.random() * (width - 100) + 50;
            const y = -Math.random() * 500 - 100; // Start above screen

            // Approximate size of our card component. 
            // Important: Must match the CSS size or be updated. 
            // Let's assume w=300, h=350 for now, or measure refs.
            // Since we don't have refs measured yet, we'll hardcode a "hitbox" size.
            const w = 320;
            const h = 256; // h-64 = 16rem = 256px

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
                    cardEl.style.transform = `translate(${x - 160}px, ${y - 128}px) rotate(${rotation}rad)`;
                    // translate offset by half width/height because Matter.js positions are center-based, 
                    // but CSS transform translate usually moves from top-left unless origin is center.
                    // Actually if position absolute top-0 left-0, translate(x,y) moves it to x,y.
                    // But Matter body.position is center. 
                    // So we need: left: 0, top: 0. transform: translate(body.x - w/2, body.y - h/2).
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
            {PROJECTS.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                // We attach refs to manipulate style directly
                // @ts-ignore - refs are tricky with custom components, we need to wrap ProjectCard or forward ref
                />
            ))}
            {/* 
        Issue: ProjectCard needs to accept a ref or we wrap it in a div. 
        Wrapping in a div is safer for the Ref logic.
      */}
            {PROJECTS.map((project) => (
                <div
                    key={project.id}
                    ref={(el) => {
                        if (el) cardsRef.current.set(project.id, el);
                    }}
                    className="absolute left-0 top-0 h-64 w-[320px] touch-none" // touch-none for dragging
                    style={{ willChange: "transform" }}
                >
                    <ProjectCard project={project} className="h-full w-full" />
                </div>
            ))}
        </div>
    );
};
