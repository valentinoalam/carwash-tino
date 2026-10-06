"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef } from "react";

export default function Compare() {
  const baRef = useRef<HTMLDivElement | null>(null);
  const rangeRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const ba = baRef.current;
    const range = rangeRef.current;
    if (!ba || !range) return;
    
    let userTouched = false;
    let killAnimation: (() => void) | null = null;

    const onInput = () => {
      userTouched = true;
      ba.style.setProperty("--x", `${range.value}%`);
    };

    range.addEventListener("input", onInput);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      return () => {
        range.removeEventListener("input", onInput);
      };
    }

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const progress = { value: 50 };

      const scrollTrigger = ScrollTrigger.create({
        trigger: ba,
        start: "top 70%",
        once: true,

        onEnter: () => {
          if (userTouched) return;

          const timeline = gsap
            .timeline({
              onUpdate: () => {
                ba.style.setProperty("--x", `${progress.value}%`);
                range.value = String(progress.value);
              },
            })
            .to(progress, {
              value: 88,
              duration: 1.2,
              ease: "power2.inOut",
            })
            .to(progress, {
              value: 12,
              duration: 1.8,
              ease: "power2.inOut",
            })
            .to(progress, {
              value: 50,
              duration: 1.1,
              ease: "power2.inOut",
            });

          killAnimation = () => timeline.kill();
        },
      });

      if (!killAnimation) {
        killAnimation = () => scrollTrigger.kill();
      }
    })();

    return () => {
      range.removeEventListener("input", onInput);
      killAnimation?.();
    };
  }, []);

  return (
    <Card id="compare" className="overflow-hidden bg-none bg-linear-to-b gap-0 pb-0 from-[#0b0f11] to-[#232c30] text-white">
      <CardHeader className="text-center px-0">
        <CardTitle className="h2 px-6">Before and after detailing.</CardTitle>
        <span>Same car. Same day. Same owner.</span>
        <CardDescription className="px-0">
            Full Detailing: foam wash, clay, polish and ceramic coat.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div
          ref={baRef}
          id="ba"
          className="ba overflow-visible aspect-video w-full touch-none relative"
          style={
            {
              "--x": "50%",
            } as React.CSSProperties
          }
        >
          {/* AFTER */}
          <div
            className="ba-layer ba-after absolute inset-0"
            aria-hidden="true"
          >
            <Image
              src="/img/after.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover"
            />
          </div>

          {/* BEFORE */}
          <div
            className="ba-layer ba-before absolute inset-0"
            aria-hidden="true"
          >
            <Image
                  src="/img/before.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover"
            />
          </div>

          {/* Labels */}
          {/* <span className="ba-tag l">Before</span>
          <span className="ba-tag r">After</span> */}
          
          <span className="absolute z-50 bottom-0 left-0 pl-2 w-full bg-black/20 bg-opacity-50 text-white text-sm">
            Drag, or use the arrow keys.
          </span>
          {/* Accessible range control */}
          <input
            ref={rangeRef}
            id="baRange"
            type="range"
            min={0}
            max={100}
            step={0.1}
            defaultValue={50}
            aria-label="Compare car before and after detailing"
          />

          {/* Visual drag handle */}
          <div className="ba-handle" aria-hidden="true">
            <i>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 5L3 12L8 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 5L21 12L16 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </i>
          </div>
        </div>
      </CardContent>

      {/* <CardFooter className="ba-note">
        
      </CardFooter> */}
    </Card>
  );
}