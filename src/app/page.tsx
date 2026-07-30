import { Scene } from "@/components/Scene";
import { Hud } from "@/components/Hud";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.3em] text mb-4">
      {children}
    </p>
  );
}

function Section({
  index,
  eyebrow,
  title,
  body,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  align?: "left" | "right";
}) {
  return (
    <section
      className={`relative min-h-screen flex items-center px-8 md:px-20 ${
        align === "right" ? "justify-end text-right" : "justify-start"
      }`}
    >
      <div className="max-w-md">
        <span className="font-mono text-[11px] text-steel-line block mb-2">
          {index}
        </span>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-[family-name:var(--font-display)] uppercase text-4xl md:text-5xl font-medium leading-[1.05] mb-5">
          {title}
        </h2>
        <p className="font-[family-name:var(--font-body)] text-sm md:text-base text-muted leading-relaxed max-w-sm">
          {body}
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Scene />
      <Hud />

      <main id="content-track" className="relative z-10">
        {/* HERO */}
        <section className="relative min-h-screen flex flex-col items-center justify-between px-8 py-16 text-center">
          {/* <Eyebrow>INSPECTION BAY UNIT 1</Eyebrow> */}

          <div className="flex-1 flex flex-col items-center justify-center mt-35">
            <h1 className="font-[family-name:var(--font-display)] uppercase text-5xl md:text-7xl font-semibold tracking-tight">
              Sc0rn <span className="text- ">Revolver</span>
            </h1>
            <p className="mt-5 font-[family-name:var(--font-body)] text-muted max-w-md text-sm md:text-base">
              Every scroll rotates the frame one notch closer. Descend
              through forge, mechanism, and balance before the piece is
              racked back into standby.
            </p>
          </div>

          
        </section>

        <Section
          index="01"
          eyebrow="ORIGIN"
          title="Forged in one piece"
          align="left"
          body="The frame is cut from a single steel billet rather than cast, so the barrel, cylinder gate, and grip frame share one continuous grain. Cold enough to hold an edge, tempered enough not to chip under recoil."
        />

        <Section
          index="02"
          eyebrow="MECHANISM"
          title="Six chambers, one motion"
          align="right"
          body="The cylinder indexes off a single hand and star, timed so each chamber locks dead-center on the forcing cone before the hammer can fall. No half-steps, no drift — the tolerance is closer to a watch than a tool."
        />

        <Section
          index="03"
          eyebrow="ERGONOMICS"
          title="Weight sits low, on purpose"
          align="left"
          body="Most of the mass lives in the frame, not the barrel, so the muzzle rises less between shots. The grip is cut narrow at the web of the hand and widens toward the base — it settles instead of shifting."
        />

        <section className="relative min-h-screen flex flex-col items-center justify-center px-8 text-center">
          <Eyebrow>STATUS</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] uppercase text-4xl md:text-6xl font-semibold mb-6">
            Racked &amp; Ready
          </h2>
          <p className="text-muted max-w-md text-sm md:text-base mb-10">
            Inspection complete. The unit returns to standby above the
            frame — scroll back up to run it again.
          </p>
          <div className="font-mono text-[11px] tracking-[0.2em] border border-steel-line px-6 py-3 text">
            04 / 04 — CLEARED
          </div>
        </section>
      </main>
    </>
  );
}
