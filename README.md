# Sc0rn R3volver — Inspection Bay

A cinematic scroll-driven showcase for a single GLB model, built with
Next.js (App Router), TypeScript, Tailwind v4, React Three Fiber / drei,
and GSAP ScrollTrigger.

## Setup

```bash
npm install
```

Copy your `gun.glb` into `public/gun.glb` (the app already points at that
path — same as your original gltfjsx export).

```bash
npm run dev
```

Open http://localhost:3000.

## How it works

- `src/components/Scene.tsx` — the fixed, full-screen `<Canvas>` with the
  lighting rig and environment reflections. It sits behind the page
  content the whole time (`position: fixed`), so the page's real scroll
  height comes entirely from the copy sections in `page.tsx`.
- `src/components/Model.tsx` — a typed, `forwardRef` version of your
  gltfjsx export. Instead of hardcoding all 17 `Object_N` meshes, it walks
  the node table and renders every mesh with the shared material, so it
  stays correct even if the mesh count changes on a future export.
- `src/components/ScrollRig.tsx` — the actual cinematic driver. A single
  GSAP timeline (keyframed, `scrub: 1`) is pinned to the content track via
  `ScrollTrigger` and animates the model's `position`, `rotation`, and
  `scale`, plus the camera's dolly (`camera.position.z`), across four
  stages: racked above frame → tilt/rotate at eye level → close-up zoom →
  drop back below frame. That's the "top to bottom, zoom, rotate" motion.
- `src/components/Hud.tsx` — a lightweight reticle/telemetry overlay
  (rotation degrees, zoom %, depth, a scroll-progress bar) driven by the
  same scroll position, purely as a visual signature — it doesn't touch
  the 3D scene.
- `src/app/page.tsx` — the actual scrollable content: a hero, three spec
  sections ("Forged" / "Mechanism" / "Ergonomics"), and a closing status
  panel. The wrapping `<main id="content-track">` is what `ScrollRig`
  measures to build its scroll range — add or remove `<Section>`s freely
  and the timeline's range adjusts automatically on next load (it also
  calls `ScrollTrigger.refresh()` after mount).

## Tuning the motion

All the choreography lives in the four keyframe arrays inside
`ScrollRig.tsx` (`group.position`, `group.rotation`, `group.scale`,
`camera.position`). Each array has one entry per section transition —
edit the numbers directly, or add more keyframes if you add more
sections.

## Notes

- Uses Tailwind v4's CSS-based theme (`@theme inline` in
  `globals.css`) — the palette (`bg-void`, `text-brass`, etc.) is defined
  there, not in a `tailwind.config`.
- Fonts (Oswald / JetBrains Mono / Inter) load via `next/font/google`, so
  they need network access at build time.
