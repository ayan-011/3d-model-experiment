"use client";

/*
Base geometry from gltfjsx export of /public/gun.glb
Source: https://sketchfab.com/3d-models/sc0rn-r3vlv3r-7b304d7d55504cac858c44f76c147f3e
License: CC-BY-4.0
Wrapped in a forwardRef so the scroll rig can drive its transform.
*/

import { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import type { Group } from "three";
import type { GLTF } from "three-stdlib";
import type { Mesh, MeshStandardMaterial } from "three";

type GunGLTF = GLTF & {
  nodes: Record<string, Mesh>;
  materials: Record<string, MeshStandardMaterial>;
};

// Every mesh in the source file shares one material, so we can just
// walk the node table instead of hand-listing Object_4 ... Object_20.
export const Model = forwardRef<Group, ThreeElements["group"]>(
  (props, ref) => {
    const { nodes, materials } = useGLTF("/gun.glb") as unknown as GunGLTF;

    const meshEntries = Object.entries(nodes).filter(
      ([, node]) => node.type === "Mesh" || (node as Mesh).isMesh
    );

    return (
      <group ref={ref} {...props} dispose={null}>
        {meshEntries.map(([name, node]) => (
          <mesh
            key={name}
            castShadow
            receiveShadow
            geometry={node.geometry}
            material={
              materials[
                "tripo_material_8422ae61-ea16-47f6-b96f-5a43159052f2"
              ] ?? node.material
            }
          />
        ))}
      </group>
    );
  }
);

Model.displayName = "Model";

useGLTF.preload("/gun.glb");
