"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Image from "next/image";

interface Product3DCanvasProps {
  image: string;
  name: string;
  category?: string;
  className?: string;
}

export const Product3DCanvas: React.FC<Product3DCanvasProps> = ({
  image,
  name,
  category = "consumer",
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglAvailable, setWebglAvailable] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      });
    } catch {
      setWebglAvailable(false);
      return;
    }

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 220;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 4.2);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 3, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa7f3d0, 1.2);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xfffbeb, 0.8);
    fillLight.position.set(0, -2, 2);
    scene.add(fillLight);

    const meshGroup = new THREE.Group();
    scene.add(meshGroup);

    // Subtle contact ground shadow
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.15 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.35;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      image,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        const isIndustrial = category === "industrial";

        if (isIndustrial) {
          // Industrial Kraft Sack 3D Geometry
          const sackWidth = 1.6;
          const sackHeight = 2.1;
          const sackDepth = 0.75;

          const sackGeo = new THREE.BoxGeometry(sackWidth, sackHeight, sackDepth, 24, 24, 16);
          const pos = sackGeo.attributes.position;

          for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = pos.getZ(i);

            const ny = y / (sackHeight / 2);
            const nx = x / (sackWidth / 2);

            // Flatter sewn top and bottom
            if (ny > 0.8) {
              const f = (ny - 0.8) / 0.2;
              pos.setZ(i, z * (1 - f * 0.75));
            } else if (ny < -0.8) {
              const f = (-ny - 0.8) / 0.2;
              pos.setZ(i, z * (1 - f * 0.5));
            } else {
              // Heavy powder bulge
              const b = Math.cos(ny * Math.PI * 0.5) * Math.cos(nx * Math.PI * 0.5);
              if (z > 0) pos.setZ(i, z + b * 0.15);
              else pos.setZ(i, z - b * 0.15);
            }
          }
          sackGeo.computeVertexNormals();

          const kraftMaterial = new THREE.MeshStandardMaterial({
            color: 0xd4a373, // Natural Kraft paper
            roughness: 0.85,
            metalness: 0.05
          });

          const labelMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.45,
            metalness: 0.1
          });

          const materials = [
            kraftMaterial,
            kraftMaterial,
            kraftMaterial,
            kraftMaterial,
            labelMaterial,
            kraftMaterial
          ];

          const sackMesh = new THREE.Mesh(sackGeo, materials);
          sackMesh.castShadow = true;
          meshGroup.add(sackMesh);

          // Top sewn industrial stitch bar
          const stitchGeo = new THREE.BoxGeometry(sackWidth * 1.04, 0.09, 0.05);
          const stitchMat = new THREE.MeshStandardMaterial({
            color: 0x064e3b,
            roughness: 0.5
          });
          const stitch = new THREE.Mesh(stitchGeo, stitchMat);
          stitch.position.set(0, sackHeight / 2 - 0.04, 0);
          meshGroup.add(stitch);
        } else {
          // Flexible Pillow Pouch Geometry
          const pouchWidth = 1.55;
          const pouchHeight = 2.25;
          const pouchDepth = 0.5;

          const pouchGeo = new THREE.BoxGeometry(pouchWidth, pouchHeight, pouchDepth, 32, 32, 16);
          const pos = pouchGeo.attributes.position;

          for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = pos.getZ(i);

            const ny = y / (pouchHeight / 2);
            const nx = x / (pouchWidth / 2);

            if (ny > 0.85 || ny < -0.85) {
              const sealF = (Math.abs(ny) - 0.85) / 0.15;
              pos.setZ(i, z * (1 - sealF * 0.85));
            } else {
              const bulge = Math.cos(ny * Math.PI * 0.5) * Math.cos(nx * Math.PI * 0.45);
              if (z > 0) pos.setZ(i, z + bulge * 0.1);
              else pos.setZ(i, z - bulge * 0.1);
            }
          }
          pouchGeo.computeVertexNormals();

          const frontMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.28,
            metalness: 0.18
          });

          const foilMaterial = new THREE.MeshStandardMaterial({
            color: 0xf5f5f5,
            roughness: 0.35,
            metalness: 0.4
          });

          const materials = [
            foilMaterial,
            foilMaterial,
            foilMaterial,
            foilMaterial,
            frontMaterial,
            foilMaterial
          ];

          const pouchMesh = new THREE.Mesh(pouchGeo, materials);
          pouchMesh.castShadow = true;
          meshGroup.add(pouchMesh);

          // Top heat seal crimp
          const crimpGeo = new THREE.BoxGeometry(pouchWidth * 1.02, 0.1, 0.035);
          const crimpMat = new THREE.MeshStandardMaterial({
            color: 0x047857,
            metalness: 0.5,
            roughness: 0.3
          });
          const topCrimp = new THREE.Mesh(crimpGeo, crimpMat);
          topCrimp.position.set(0, pouchHeight / 2 - 0.05, 0);
          meshGroup.add(topCrimp);
        }
      },
      undefined,
      (err) => {
        console.warn("Could not load 3D texture, falling back to 2.5D", err);
      }
    );

    // Mouse Tracking & Interaction
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
      const cy = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevX = cx;
      prevY = cy;
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
      const cy = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const dx = cx - prevX;
        const dy = cy - prevY;
        targetRotY += dx * 0.015;
        targetRotX += dy * 0.015;
        prevX = cx;
        prevY = cy;
      } else {
        const rect = container.getBoundingClientRect();
        const nx = ((cx - rect.left) / rect.width) * 2 - 1;
        const ny = -(((cy - rect.top) / rect.height) * 2 - 1);
        targetRotY = nx * 0.5;
        targetRotX = -ny * 0.35;
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mouseup", onPointerUp);
    dom.addEventListener("mousemove", onPointerMove);

    dom.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchend", onPointerUp);
    dom.addEventListener("touchmove", onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      const floatY = Math.sin(elapsed * 1.6) * 0.05;

      meshGroup.rotation.y += (targetRotY - meshGroup.rotation.y) * 0.08;
      meshGroup.rotation.x += (targetRotX - meshGroup.rotation.x) * 0.08;
      meshGroup.position.y += (floatY - meshGroup.position.y) * 0.08;

      if (!isDragging && Math.abs(targetRotY) < 0.1) {
        meshGroup.rotation.z = Math.sin(elapsed * 1.3) * 0.02;
      } else {
        meshGroup.rotation.z += (0 - meshGroup.rotation.z) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchend", onPointerUp);
      dom.removeEventListener("mousedown", onPointerDown);
      dom.removeEventListener("mousemove", onPointerMove);
      dom.removeEventListener("touchstart", onPointerDown);
      dom.removeEventListener("touchmove", onPointerMove);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [image, category]);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="3D ROTAR"
    >
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing relative z-10 touch-none"
      />

      {/* Fallback image if WebGL fails */}
      {!webglAvailable && (
        <div className="relative w-full h-full flex items-center justify-center p-2">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain drop-shadow-lg"
          />
        </div>
      )}

      {/* Subtle 3D Badge Indicator */}
      <div
        className={`absolute bottom-1 right-2 z-20 pointer-events-none transition-all duration-300 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-900/80 backdrop-blur-xs text-[10px] font-mono font-bold text-emerald-100 border border-emerald-500/40 shadow-xs ${
          isInteracting ? "opacity-0" : isHovered ? "opacity-100 scale-105" : "opacity-75"
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>3D</span>
      </div>
    </div>
  );
};
