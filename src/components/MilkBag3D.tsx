"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Image from "next/image";

interface MilkBag3DProps {
  className?: string;
}

export const MilkBag3D: React.FC<MilkBag3DProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglAvailable, setWebglAvailable] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      setWebglAvailable(false);
      return;
    }

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 520;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 4.4);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 4, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa7f3d0, 1.4); // Fresh mint rim light
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xfffbeb, 0.8); // Cream soft fill
    fillLight.position.set(0, -3, 2);
    scene.add(fillLight);

    // Group for milk pouch
    const bagGroup = new THREE.Group();
    scene.add(bagGroup);

    // Dynamic ground shadow plane
    const shadowGeo = new THREE.PlaneGeometry(3, 3);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.55;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Texture loading for real Mundilácteos pouch
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/images/the-cantaro-doble.png",
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // Custom pouch geometry (tapered pillow pouch with top crimp)
        // We create a composite mesh: front face with real label, metallic back & sealed edges
        const pouchWidth = 1.7;
        const pouchHeight = 2.4;
        const pouchDepth = 0.55;

        // Curved Pillow Pouch shape using Parametric or Extruded / Box with rounded profile
        const pouchGeo = new THREE.BoxGeometry(pouchWidth, pouchHeight, pouchDepth, 32, 32, 16);
        const position = pouchGeo.attributes.position;

        // Morph the box vertices to look like an authentic filled milk pouch
        for (let i = 0; i < position.count; i++) {
          const x = position.getX(i);
          const y = position.getY(i);
          const z = position.getZ(i);

          // Normalize height (-1 to 1)
          const ny = y / (pouchHeight / 2);
          const nx = x / (pouchWidth / 2);

          // Taper top and bottom seal crimps
          const isTopSeal = ny > 0.85;
          const isBottomSeal = ny < -0.85;

          if (isTopSeal || isBottomSeal) {
            // Flatten Z at top and bottom heat-seals
            const sealFactor = (Math.abs(ny) - 0.85) / 0.15;
            position.setZ(i, z * (1 - sealFactor * 0.88));
          } else {
            // Bulge center like pressurized powder
            const bulge = Math.cos(ny * Math.PI * 0.5) * Math.cos(nx * Math.PI * 0.45);
            if (z > 0) {
              position.setZ(i, z + bulge * 0.12);
            } else {
              position.setZ(i, z - bulge * 0.12);
            }
          }
        }
        pouchGeo.computeVertexNormals();

        // Materials: Glossy front label, metallic foil trim
        const frontMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.28,
          metalness: 0.15,
          bumpScale: 0.02
        });

        const foilMaterial = new THREE.MeshStandardMaterial({
          color: 0xf5f5f5,
          roughness: 0.35,
          metalness: 0.4,
          bumpScale: 0.03
        });

        // Apply materials: front face gets texture, sides/back get metallic foil
        const materials = [
          foilMaterial, // right
          foilMaterial, // left
          foilMaterial, // top crimp
          foilMaterial, // bottom crimp
          frontMaterial, // front label
          foilMaterial  // back foil
        ];

        const pouchMesh = new THREE.Mesh(pouchGeo, materials);
        pouchMesh.castShadow = true;
        pouchMesh.receiveShadow = false;
        bagGroup.add(pouchMesh);

        // Top heat-seal crimp bar
        const crimpGeo = new THREE.BoxGeometry(pouchWidth * 1.02, 0.12, 0.04);
        const crimpMat = new THREE.MeshStandardMaterial({
          color: 0x047857, // Brand emerald green seal
          metalness: 0.5,
          roughness: 0.3
        });
        const topCrimp = new THREE.Mesh(crimpGeo, crimpMat);
        topCrimp.position.set(0, pouchHeight / 2 - 0.06, 0);
        bagGroup.add(topCrimp);
      },
      undefined,
      (err) => {
        console.warn("Could not load texture in Three.js, fallback enabled", err);
      }
    );

    // Mouse Tracking & Physics Variables
    let targetRotationX = 0;
    let targetRotationY = 0;
    let targetPositionX = 0;
    let targetPositionY = 0;

    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousPointerX = clientX;
      previousPointerY = clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousPointerX;
        const deltaY = clientY - previousPointerY;
        targetRotationY += deltaX * 0.012;
        targetRotationX += deltaY * 0.012;
        previousPointerX = clientX;
        previousPointerY = clientY;
      } else {
        const rect = container.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

        targetRotationY = normX * 0.45;
        targetRotationX = -normY * 0.35;
        targetPositionX = normX * 0.12;
        targetPositionY = normY * 0.08;
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);
    domElement.addEventListener("mousemove", handlePointerMove);

    domElement.addEventListener("touchstart", handlePointerDown, { passive: true });
    window.addEventListener("touchend", handlePointerUp);
    domElement.addEventListener("touchmove", handlePointerMove, { passive: true });

    // Window resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Idle levitation sine wave
      const floatOffset = Math.sin(elapsedTime * 1.5) * 0.06;

      // Smooth damping (spring physics)
      bagGroup.rotation.y += (targetRotationY - bagGroup.rotation.y) * 0.08;
      bagGroup.rotation.x += (targetRotationX - bagGroup.rotation.x) * 0.08;
      bagGroup.position.x += (targetPositionX - bagGroup.position.x) * 0.08;
      bagGroup.position.y += (targetPositionY + floatOffset - bagGroup.position.y) * 0.08;

      // Slight natural wobble when idle
      if (!isDragging && Math.abs(targetRotationY) < 0.1) {
        bagGroup.rotation.z = Math.sin(elapsedTime * 1.2) * 0.02;
      } else {
        bagGroup.rotation.z += (0 - bagGroup.rotation.z) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchend", handlePointerUp);
      domElement.removeEventListener("mousedown", handlePointerDown);
      domElement.removeEventListener("mousemove", handlePointerMove);
      domElement.removeEventListener("touchstart", handlePointerDown);
      domElement.removeEventListener("touchmove", handlePointerMove);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="GIRAR 3D"
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-[450px] sm:h-[500px] md:h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing relative z-10"
      />

      {/* Fallback 2.5D Animated Graphic if WebGL fails */}
      {!webglAvailable && (
        <div className="relative w-80 h-96 flex items-center justify-center">
          <Image
            src="/images/the-cantaro-doble.png"
            alt="The Cántaro Leche en Polvo"
            width={340}
            height={420}
            className="object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>
      )}

      {/* Interactive Helper Badge */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-300 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-200/80 shadow-md ${
          isInteracting ? "opacity-0 translate-y-2" : isHovered ? "opacity-100 translate-y-0 scale-105" : "opacity-80 translate-y-0"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider font-mono">
          {isInteracting ? "Explorando..." : "Arrastra o mueve para girar la bolsa"}
        </span>
      </div>
    </div>
  );
};
