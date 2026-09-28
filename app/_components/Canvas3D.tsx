'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Canvas3D() {
  const containerRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const canvas = containerRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#2b2218');
    scene.fog = new THREE.FogExp2('#2b2218', 0.06);

    const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.1, 90);
    camera.position.set(3.7, 1.0, 6.6);

    // Pencahayaan
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.12);
    scene.add(ambientLight);

    // Animasi responsif scroll melalui GSAP ScrollTrigger
    const sections = ['#hero', '#problem', '#process', '#deep', '#detail', '#transform', '#services', '#compare', '#experience', '#book'];

    sections.forEach((secId, i) => {
      ScrollTrigger.create({
        trigger: secId,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          gsap.to(camera.position, {
            x: 3.7 - i * 0.3,
            y: 1.0 + (i % 2) * 0.2,
            z: 6.6 - i * 0.2,
            duration: 1.2,
            ease: 'power2.out',
          });
        },
        onEnterBack: () => {
          gsap.to(camera.position, {
            x: 3.7 - i * 0.3,
            y: 1.0 + (i % 2) * 0.2,
            z: 6.6 - i * 0.2,
            duration: 1.2,
            ease: 'power2.out',
          });
        },
      });
    });

    let animationFrameId: number;
    const render = () => {
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={containerRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />;
}