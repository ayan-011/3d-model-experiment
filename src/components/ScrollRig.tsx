"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import type { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Model } from "./Model";

gsap.registerPlugin(ScrollTrigger);

export function ScrollRig() {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    const group = groupRef.current;
    const track = document.getElementById("content-track");
    if (!group || !track) return;

    const ctx = gsap.context(() => {
      // starting pose: sitting in view on the hero, not hidden above frame
      gsap.set(group.position, { x: 0, y: 0.7, z: 0});
      gsap.set(group.rotation, { x: 0.2, y: -1.6, z: 0 });
      gsap.set(group.scale, { x: 0.9, y: 0.9, z: 0.9 });
      camera.position.set(0, 0, 7.2);

      const tl = gsap.timeline({
        defaults: { duration: 4, ease: "power1.inOut" },
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // every keyframe below is chosen to stay inside the camera frustum
      // at its paired camera.z, so the model never drifts off-screen —
      // it ends settled and visible in the final/footer section.
      tl.to(
        group.position,
        {
          keyframes: [
            { x: -0.6, y: 0.7, z: 0.3 },
            { x: 0.6, y: 0.15, z: 1.0 },
            { x: -0.5, y: -0.25, z: 0.2 },
            { x: 0, y: -1, z: -0.2 },
          ],
        },
        0
      )
        .to(
          group.rotation,
          {
            keyframes: [
              { x: 0.05, y: 0.85, z: 0.02 },
              { x: -0.1, y: 2.35, z: -0.05 },
              { x: 0.2, y: 3.4, z: 0.05 },
              { x: 0, y: 4.7, z: 0 },
            ],
          },
          0
        )
        .to(
          group.scale,
          {
            keyframes: [
              { x: 1, y: 1, z: 1 },
              { x: 1.6, y: 1.6, z: 1.6 },
              { x: 1.1, y: 1.1, z: 1.1 },
              { x: 0.9, y: 0.9, z: 0.9 },
            ],
          },
          0
        )
        .to(
          camera.position,
          {
            keyframes: [{ z: 6.4 }, { z: 4.3 }, { z: 6.0 }, { z: 6.8 }],
          },
          0
        );

      // recompute trigger bounds once fonts/images settle
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => ctx.revert();
  }, [camera]);

  return <Model ref={groupRef} />;
}
