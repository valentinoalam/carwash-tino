'use client'
import { useEffect, useRef, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { step: "Step 1", title: "Pre-rinse", body: "Low-pressure water lifts loose grit and mud so it never gets dragged across your paint." },
  { step: "Step 2", title: "Foam soak", body: "Thick snow foam clings to every panel and loosens road film while it dwells." },
  { step: "Step 3", title: "Hand wash", body: "Two buckets, clean mitts, one panel at a time, top to bottom." },
  { step: "Step 4", title: "Decontaminate", body: "Iron remover and clay pull out the bonded grit that a wash can't reach." },
  { step: "Step 5", title: "Dry and inspect", body: "Microfiber towels, then a walk-around under bright light before we call you." },
];

/* ---------- theme tokens (CSS variables set as arbitrary properties) ---------- */
const VARS =
  "[--pr-accent:#1f7ae0] [--pr-car:#2b3442] [--pr-glass:#9fb6cc] [--pr-tire:#11151b] [--pr-rim:#c9d1da] " +
  "[--pr-metal:#8d99a6] [--pr-clay:#d9b45a] [--pr-foam:#f6fafc] [--pr-shadow:rgba(0,0,0,.28)] " +
  "[--pr-bg1:#e9f1f8] [--pr-bg2:#b9d0e4]";

/* ---------- SVG animation classes (play only while the scene's <svg> has data-on="true") ---------- */
const FX = "[transform-box:fill-box] origin-center";
const FX_TOP = "[transform-box:fill-box] origin-top";

const C = {
  drop: `${FX} fill-[#4aa3ff] opacity-0 group-data-[on=true]:[animation:pr-fall_.9s_linear_infinite]`,
  grit: `${FX} fill-[#6b5a46] group-data-[on=true]:[animation:pr-wash_1.6s_ease-in_forwards]`,
  foam: `pr-foam ${FX} fill-[var(--pr-foam)] stroke-[#c4d3df] stroke-1 [transform:scale(0)] group-data-[on=true]:[animation:pr-pop_.6s_cubic-bezier(.3,1.4,.5,1)_forwards]`,
  drip: `pr-drip ${FX_TOP} fill-[var(--pr-foam)] [transform:scaleY(0)] group-data-[on=true]:[animation:pr-run_1.6s_1.2s_ease-in_forwards]`,
  sud: `pr-sud ${FX} fill-[var(--pr-foam)] opacity-0 group-data-[on=true]:[animation:pr-sud_1.8s_ease-in-out_infinite]`,
  mitt: `${FX} group-data-[on=true]:[animation:pr-wipe_2.4s_ease-in-out_infinite]`,
  clay: `${FX} group-data-[on=true]:[animation:pr-wipe_2s_ease-in-out_infinite]`,
  iron: `${FX} fill-none [stroke:#8f4fd6] [stroke-width:6] [stroke-linecap:round] opacity-0 group-data-[on=true]:[animation:pr-iron_2.2s_ease-in-out_infinite]`,
  spark: `pr-spark ${FX} fill-[#ffd24a] [transform:scale(0)] group-data-[on=true]:[animation:pr-twinkle_1.6s_ease-in-out_infinite]`,
  shine: `${FX} [transform:translateX(-80px)_skewX(-20deg)] group-data-[on=true]:[animation:pr-shine_1.8s_.3s_ease-in-out_infinite]`,
  check: `pr-check ${FX} [transform:scale(0)] group-data-[on=true]:[animation:pr-pop_.6s_1s_cubic-bezier(.3,1.6,.5,1)_forwards]`,
};

const BODY = "M40 170 Q40 150 62 146 L110 140 Q135 100 175 96 L245 96 Q285 100 308 138 L345 146 Q364 150 364 170 L364 192 L40 192 Z";
const CLIP = "pr-clip";

/* The car is drawn ONCE and never moves: it is the fixed "actor" of the film. */
function Car() {
  return (
    <g>
      <clipPath id={CLIP}><path d={BODY} /></clipPath>
      <ellipse cx="202" cy="224" rx="170" ry="9" fill="var(--pr-shadow)" />
      <path d={BODY} fill="var(--pr-car)" />
      <path d="M128 140 Q146 108 178 106 L200 106 L200 140 Z M212 106 L244 106 Q272 110 290 140 L212 140 Z" fill="var(--pr-glass)" />
      <circle cx="112" cy="194" r="28" fill="var(--pr-tire)" />
      <circle cx="292" cy="194" r="28" fill="var(--pr-tire)" />
      <circle cx="112" cy="194" r="12" fill="var(--pr-rim)" />
      <circle cx="292" cy="194" r="12" fill="var(--pr-rim)" />
    </g>
  );
}

const FOAM = [
  [70, 160, 14], [100, 150, 11], [140, 128, 16], [180, 114, 13], [220, 112, 17], [260, 118, 12],
  [296, 142, 15], [330, 160, 12], [90, 178, 12], [160, 160, 18], [210, 150, 14], [250, 165, 16],
  [310, 176, 11], [190, 180, 12], [125, 118, 10], [275, 130, 10],
];
const DROPS = Array.from({ length: 14 }, (_, i) => ({ x: 70 + i * 21, d: (i % 5) * 0.18 }));
const sparkPath = (x: number, y: number) =>
  `M${x} ${y - 9} l2.5 6.5 6.5 2.5 -6.5 2.5 -2.5 6.5 -2.5 -6.5 -6.5 -2.5 6.5 -2.5 z`;

/* Props for each step. They dissolve into one another over the same car. */
function Props({ i }: { i: number }) {
  const clip = `url(#${CLIP})`;
  switch (i) {
    case 0:
      return (
        <g>
          <rect x="150" y="14" width="100" height="10" rx="5" fill="var(--pr-metal)" />
          <rect x="196" y="22" width="8" height="14" fill="var(--pr-metal)" />
          {[[90, 160], [150, 150], [230, 128], [280, 150], [200, 170], [320, 166]].map(([x, y], k) => (
            <circle key={k} className={C.grit} cx={x} cy={y} r="4" style={{ animationDelay: `${0.4 + k * 0.12}s` }} />
          ))}
          {DROPS.map((d, k) => (
            <ellipse key={k} className={C.drop} cx={d.x} cy="40" rx="2.6" ry="6" style={{ animationDelay: `${d.d}s` }} />
          ))}
        </g>
      );
    case 1:
      return (
        <g clipPath={clip}>
          {FOAM.map(([x, y, r], k) => (
            <circle key={k} className={C.foam} cx={x} cy={y} r={r} style={{ animationDelay: `${k * 0.09}s` }} />
          ))}
          <rect className={C.drip} x="150" y="150" width="5" height="26" rx="2.5" />
          <rect className={C.drip} x="256" y="156" width="5" height="22" rx="2.5" style={{ animationDelay: "0.8s" }} />
        </g>
      );
    case 2:
      return (
        <g>
          <g clipPath={clip}>
            {[[120, 150], [170, 130], [220, 150], [270, 136], [310, 160]].map(([x, y], k) => (
              <circle key={k} cx={x} cy={y} r="9" className={C.sud} style={{ animationDelay: `${k * 0.25}s` }} />
            ))}
          </g>
          <g className={C.mitt}>
            <rect x="188" y="116" width="46" height="30" rx="14" fill="var(--pr-accent)" />
            <rect x="196" y="122" width="30" height="6" rx="3" fill="#fff" opacity=".35" />
          </g>
          {[8, 352].map((x, k) => (
            <g key={x}>
              <path d={`M${x} 214 h40 l-5 40 h-30 z`} fill="var(--pr-metal)" />
              <ellipse cx={x + 20} cy="214" rx="20" ry="5" fill={k === 0 ? "var(--pr-accent)" : "var(--pr-foam)"} />
            </g>
          ))}
        </g>
      );
    case 3:
      return (
        <g>
          <g clipPath={clip}>
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <path key={k} className={C.iron} d={`M${70 + k * 50} 100 q10 40 -6 100`} style={{ animationDelay: `${k * 0.2}s` }} />
            ))}
          </g>
          <g className={C.clay}>
            <rect x="160" y="130" width="54" height="26" rx="8" fill="var(--pr-clay)" />
            <rect x="168" y="136" width="38" height="5" rx="2.5" fill="#fff" opacity=".3" />
          </g>
          {[[110, 120], [250, 112], [300, 150]].map(([x, y], k) => (
            <path key={k} className={C.spark} d={sparkPath(x, y)} style={{ animationDelay: `${0.5 + k * 0.4}s` }} />
          ))}
        </g>
      );
    default:
      return (
        <g>
          <g clipPath={clip}>
            <rect className={C.shine} x="0" y="90" width="46" height="110" fill="#fff" opacity=".55" />
          </g>
          <g className={C.check}>
            <circle cx="326" cy="70" r="24" fill="var(--pr-accent)" />
            <path d="M314 70 l9 9 l16 -18" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          {[[96, 112], [284, 104]].map(([x, y], k) => (
            <path key={k} className={C.spark} d={sparkPath(x, y)} style={{ animationDelay: `${0.9 + k * 0.3}s` }} />
          ))}
        </g>
      );
  }
}

const LAST = STEPS.length - 1;
const SCROLL_PER_STEP = 1; // viewport-heights of scroll per step

/* opacity of step i when the playhead is at `pos`: holds ~25% each side, dissolves in between */
const layerOpacity = (pos: number, i: number) =>
  gsap.utils.clamp(0, 1, (0.75 - Math.abs(pos - i)) / 0.5);

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(SVGGElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  /* move the "playhead": cross-dissolve scenes and captions like film frames */
  const paint = useCallback((pos: number) => {
    STEPS.forEach((_, i) => {
      const o = layerOpacity(pos, i);
      const layer = layerRefs.current[i];
      const text = textRefs.current[i];
      if (layer) gsap.set(layer, { opacity: o });
      if (text) gsap.set(text, { opacity: o, y: (i - pos) * 18, pointerEvents: o > 0.5 ? "auto" : "none" });
    });
    if (fillRef.current) gsap.set(fillRef.current, { scaleX: pos / LAST });
    const next = Math.round(pos);
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActive(next);
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * SCROLL_PER_STEP * LAST}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // every scroll settles exactly on a step, so the scene is always centered and complete
        snap: {
          snapTo: 1 / LAST,
          duration: { min: 0.25, max: 0.6 },
          delay: 0.06,
          ease: "power2.inOut",
        },
        onUpdate: (self) => paint(self.progress * LAST),
      });
      triggerRef.current = st;
      paint(0);
      return () => { triggerRef.current = null; };
    });

    // reduced motion: no pin, steps are switched with the controls only
    mm.add("(prefers-reduced-motion: reduce)", () => {
      paint(0);
    });

    return () => mm.revert();
  }, [paint]);

  const goTo = useCallback((i: number) => {
    const st = triggerRef.current;
    if (!st) { paint(i); return; }
    window.scrollTo({ top: st.start + ((st.end - st.start) * i) / LAST, behavior: "smooth" });
  }, [paint]);

  const step = (dir: 1 | -1) => goTo(Math.min(LAST, Math.max(0, activeRef.current + dir)));

  return (
    <section
      ref={sectionRef}
      id="process"
      className={`sec process relative flex min-h-screen items-center overflow-hidden ${VARS}`}
    >
      <style>{CSS}</style>
      <Card className="mx-auto w-full max-w-6xl border-0 bg-transparent px-6 gap-0 shadow-none">
        <CardHeader className="mt-6 text-center">
          <CardTitle className="h2 m-0 text-center text-[1.6rem] leading-[1.15] min-[1001px]:text-[clamp(1.8rem,3vw,2.6rem)]">
            Five steps. None skipped.
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div role="region" aria-label="Our wash process">
            {/* STAGE: the background is a smaller frame; the SVG is larger and breaks out of it */}
            <div className="relative mx-auto aspect-video w-full max-w-2xl">
              {/* background frame (clips only itself) */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-[0_30px_70px_-30px_rgba(10,30,60,.55),0_0_0_1px_rgba(10,30,60,.06)]">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--pr-bg1),var(--pr-bg2)_60%,var(--pr-bg1))]" />
                <div
                  className="pr-road pr-road-on absolute inset-x-0 bottom-0 h-[18%] [background:linear-gradient(90deg,#f4f7fa_0_34px,transparent_34px_90px)_0_50%/90px_4px_repeat-x,#3a4452]"
                  aria-hidden="true"
                />
              </div>

              {/* the object: wider than the frame, always horizontally centered, overflow visible */}
              <svg
                viewBox="0 0 180 120"
                className="pr-scene pointer-events-none absolute left-1/2 top-[54%] block h-auto w-full max-w-none -translate-x-1/2 overflow-visible object-cover"
                aria-hidden="true"
              >
                <g transform="translate(200 130) scale(3) translate(-200 -130)">
                <Car />
                {STEPS.map((_, i) => (
                  <g
                    key={i}
                    ref={(el) => { layerRefs.current[i] = el; }}
                    className="group"
                    data-on={i === active}
                    opacity={i === 0 ? 1 : 0}
                  >
                    <Props i={i} />
                  </g>
                ))}
                </g>
              </svg>
            </div>

            {/* captions dissolve in the same grid cell, like subtitles */}
            <div className="mx-auto mt-8 grid max-w-md text-center text-[#14202e]" aria-live="polite">
              {STEPS.map((s, i) => (
                <div
                  key={s.step}
                  ref={(el) => { textRefs.current[i] = el; }}
                  className="[grid-area:1/1]"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                  aria-hidden={i !== active}
                >
                  <em className="mb-1 block text-[.78rem] font-medium not-italic text-(--pr-accent)">{s.step}</em>
                  <h3 className="m-0 text-[clamp(1.15rem,1.7vw,1.45rem)] leading-[1.15]">{s.title}</h3>
                  <p className="m-0 mt-2 text-[.95rem] leading-[1.55] opacity-[.78]">{s.body}</p>
                </div>
              ))}
            </div>

            {/* controls */}
            <div className="mx-auto mt-6 flex w-[min(100%,420px)] items-center gap-4">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={active === 0}
                aria-label="Previous step"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-[rgba(20,32,46,.2)] bg-white text-[#14202e] disabled:opacity-40"
              >
                ‹
              </button>

              <div className="relative flex-1">
                <div className="absolute inset-x-0 top-1/2 h-1.25 -translate-y-1/2 overflow-hidden rounded-full bg-[rgba(20,32,46,.14)]">
                  <div ref={fillRef} className="h-full origin-left scale-x-0 bg-(--pr-accent)" />
                </div>
                <div className="relative flex justify-between" role="tablist" aria-label="Jump to step">
                  {STEPS.map((s, i) => (
                    <button
                      key={s.step}
                      role="tab"
                      aria-selected={i === active}
                      aria-label={`${s.step}: ${s.title}`}
                      onClick={() => goTo(i)}
                      className={`size-3.5 cursor-pointer rounded-full border-2 border-white p-0 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-(--pr-accent) ${
                        i <= active ? "bg-(--pr-accent)" : "bg-[#b4bfcb]"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => step(1)}
                disabled={active === LAST}
                aria-label="Next step"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-[rgba(20,32,46,.2)] bg-white text-[#14202e] disabled:opacity-40"
              >
                ›
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

/* Tailwind can't declare @keyframes inline, so these stay as plain CSS. */
const CSS = `
@keyframes pr-fall{0%{transform:translateY(0);opacity:0}15%{opacity:1}100%{transform:translateY(110px);opacity:0}}
@keyframes pr-wash{0%{opacity:1}100%{opacity:0;transform:translateY(34px) scale(.4)}}
@keyframes pr-pop{from{transform:scale(0)}to{transform:scale(1)}}
@keyframes pr-run{0%{transform:scaleY(0)}100%{transform:scaleY(1)}}
@keyframes pr-sud{0%,100%{opacity:0;transform:scale(.4)}50%{opacity:.95;transform:scale(1.1)}}
@keyframes pr-wipe{0%,100%{transform:translateX(-80px) rotate(-6deg)}50%{transform:translateX(80px) rotate(6deg)}}
@keyframes pr-iron{0%,100%{opacity:0}50%{opacity:.75}}
@keyframes pr-twinkle{0%,100%{transform:scale(0) rotate(0)}50%{transform:scale(1.2) rotate(30deg)}}
@keyframes pr-road{from{background-position-x:0,0}to{background-position-x:-90px,0}}
@keyframes pr-shine{from{transform:translateX(-80px) skewX(-20deg)}to{transform:translateX(480px) skewX(-20deg)}}

.pr-road-on{animation:pr-road .6s linear infinite}

@media (prefers-reduced-motion:reduce){
  .pr-road-on{animation:none!important}
  .pr-scene *{animation:none!important;transition:none!important}
  .pr-foam,.pr-check,.pr-spark{transform:scale(1)!important}
  .pr-drip{transform:none!important}
  .pr-sud{opacity:.9!important}
}
`;