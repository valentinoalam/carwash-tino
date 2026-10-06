"use client";

import { useEffect, useRef } from "react";
import { Service } from "@/data/catalog";
import { fmt, rnd } from "@/lib/format";

// Efek "hapus debu" di panel tiap kartu servis. Ini port langsung dari fungsi
// surfaceFx() pada file asli: dua canvas tersembunyi (tekstur kotor + kanvas kerja),
// pointer/keyboard menghapus lapisan kotor secara radial, lalu partikel kecil
// (ripple / foam / dust / bead / sheen) muncul sesuai mode servis.
function attachSurfaceFx(card: HTMLElement) {
  const pane = card.querySelector(".svc-pane") as HTMLElement | null;
  const cv = pane?.querySelector("canvas") as HTMLCanvasElement | null;
  if (!pane || !cv) return () => {};
  const mode = card.dataset.mode as string;
  const ctx = cv.getContext("2d")!;
  const dirtT = document.createElement("canvas");
  const dirt = document.createElement("canvas");
  const tctx = dirtT.getContext("2d")!;
  const dctx = dirt.getContext("2d")!;

  let W = 0,
    H = 0,
    dpr = 1,
    active = false,
    raf = 0,
    restore = 0,
    lx = -1,
    ly = -1,
    sheenX = -100,
    sheenC = -100,
    lastSpawn = 0,
    ready = false;

  type Part =
    | { t: "r"; x: number; y: number; r: number; a: number }
    | { t: "b"; x: number; y: number; r: number; vy: number; a: number }
    | { t: "d"; x: number; y: number; r: number; vy: number; age: number; a: number }
    | { t: "p"; x: number; y: number; vx: number; vy: number; r: number; a: number };
  const parts: Part[] = [];

  function size() {
    const r = pane!.getBoundingClientRect();
    if (!r.width) return false;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width;
    H = r.height;
    [cv, dirtT, dirt].forEach((c) => {
      c!.width = Math.round(W * dpr);
      c!.height = Math.round(H * dpr);
    });
    [ctx, tctx, dctx].forEach((c) => c.setTransform(dpr, 0, 0, dpr, 0, 0));
    tctx.fillStyle = "rgba(112,92,64,.93)";
    tctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 110; i++) {
      const x = rnd(0, W),
        y = rnd(0, H),
        r2 = rnd(10, 46),
        g = tctx.createRadialGradient(x, y, 0, x, y, r2),
        d = Math.random() < 0.5;
      g.addColorStop(0, d ? "rgba(52,40,28,.5)" : "rgba(176,152,110,.42)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      tctx.fillStyle = g;
      tctx.beginPath();
      tctx.arc(x, y, r2, 0, 7);
      tctx.fill();
    }
    for (let j = 0; j < 34; j++) {
      tctx.fillStyle = "rgba(38,29,20,.22)";
      tctx.fillRect(rnd(0, W), 0, rnd(1, 3), H * rnd(0.3, 1));
    }
    dctx.clearRect(0, 0, W, H);
    dctx.drawImage(dirtT, 0, 0, W, H);
    ready = true;
    return true;
  }
  function wipe(x: number, y: number) {
    dctx.globalCompositeOperation = "destination-out";
    const g = dctx.createRadialGradient(x, y, 0, x, y, 38);
    g.addColorStop(0, "rgba(0,0,0,1)");
    g.addColorStop(0.6, "rgba(0,0,0,.85)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    dctx.fillStyle = g;
    dctx.beginPath();
    dctx.arc(x, y, 38, 0, 7);
    dctx.fill();
    dctx.globalCompositeOperation = "source-over";
  }
  function move(x: number, y: number) {
    if (!ready && !size()) return;
    if (lx >= 0) {
      const dx = x - lx,
        dy = y - ly,
        n = Math.ceil(Math.hypot(dx, dy) / 9);
      for (let i = 1; i <= n; i++) wipe(lx + (dx * i) / n, ly + (dy * i) / n);
    } else wipe(x, y);
    lx = x;
    ly = y;
    const now = performance.now();
    if (mode === "ripple" && now - lastSpawn > 90) {
      parts.push({ t: "r", x, y, r: 3, a: 0.8 });
      lastSpawn = now;
    } else if (mode === "foam" && now - lastSpawn > 45) {
      parts.push({ t: "b", x: x + rnd(-14, 14), y: y + rnd(-10, 10), r: rnd(3, 10), vy: -rnd(0.2, 0.7), a: 0.95 });
      lastSpawn = now;
    } else if (mode === "bead" && now - lastSpawn > 50 && parts.length < 110) {
      parts.push({ t: "d", x: x + rnd(-18, 18), y: y + rnd(-14, 14), r: rnd(2, 6), vy: 0, age: 0, a: 1 });
      lastSpawn = now;
    } else if (mode === "dust" && now - lastSpawn > 28) {
      parts.push({ t: "p", x, y, vx: rnd(0.8, 2.8), vy: -rnd(0.1, 1), r: rnd(1, 3), a: 0.8 });
      lastSpawn = now;
    } else if (mode === "sheen") {
      sheenX = x;
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function tick() {
    raf = 0;
    ctx.clearRect(0, 0, W, H);
    if (!active && restore > 0) {
      dctx.globalAlpha = 0.07;
      dctx.drawImage(dirtT, 0, 0, W, H);
      dctx.globalAlpha = 1;
      restore--;
    }
    ctx.drawImage(dirt, 0, 0, W, H);
    if (mode === "sheen" && (active || Math.abs(sheenC - sheenX) > 1)) {
      sheenC += (sheenX - sheenC) * 0.18;
      const g = ctx.createLinearGradient(sheenC - 46, 0, sheenC + 46, 0);
      g.addColorStop(0, "rgba(255,255,255,0)");
      g.addColorStop(0.5, "rgba(255,255,255,.55)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(sheenC - 46, 0);
      ctx.lineTo(sheenC + 46, 0);
      ctx.lineTo(sheenC + 46 - H * 0.45, H);
      ctx.lineTo(sheenC - 46 - H * 0.45, H);
      ctx.closePath();
      ctx.fill();
    }
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      if (p.t === "r") {
        p.r += 1.7;
        p.a -= 0.014;
        ctx.strokeStyle = "rgba(255,255,255," + Math.max(p.a, 0) + ")";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.stroke();
        ctx.strokeStyle = "rgba(255,255,255," + Math.max(p.a * 0.5, 0) + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.62, 0, 7);
        ctx.stroke();
      } else if (p.t === "b") {
        p.y += p.vy;
        p.a -= 0.011;
        ctx.fillStyle = "rgba(255,255,255," + Math.max(p.a * 0.2, 0) + ")";
        ctx.strokeStyle = "rgba(255,255,255," + Math.max(p.a * 0.85, 0) + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fill();
        ctx.stroke();
      } else if (p.t === "d") {
        p.age++;
        if (p.age > 55) p.vy += 0.05 * (p.r / 4);
        p.y += p.vy;
        ctx.fillStyle = "rgba(190,255,235,.2)";
        ctx.strokeStyle = "rgba(255,255,255,.7)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "rgba(255,255,255,.9)";
        ctx.beginPath();
        ctx.arc(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.28, 0, 7);
        ctx.fill();
        if (p.y > H + 10) p.a = 0;
      } else if (p.t === "p") {
        p.x += p.vx;
        p.y += p.vy;
        p.a -= 0.022;
        ctx.fillStyle = "rgba(196,176,136," + Math.max(p.a, 0) + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fill();
      }
      if (p.a <= 0.01) parts.splice(i, 1);
    }
    if (active || restore > 0 || parts.length || (mode === "sheen" && Math.abs(sheenC - sheenX) > 1)) raf = requestAnimationFrame(tick);
  }
  function start() {
    active = true;
    restore = 0;
    if (!ready) size();
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function stop() {
    active = false;
    lx = -1;
    restore = 26;
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function pos(e: PointerEvent): [number, number] {
    const r = pane!.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  }
  const onEnter = () => start();
  const onLeave = () => stop();
  const onDown = (e: PointerEvent) => {
    start();
    const p = pos(e);
    lx = -1;
    move(p[0], p[1]);
  };
  const onMove = (e: PointerEvent) => {
    if (!active) start();
    const p = pos(e);
    move(p[0], p[1]);
  };
  const onCancel = () => stop();

  pane.addEventListener("pointerenter", onEnter);
  pane.addEventListener("pointerleave", onLeave);
  pane.addEventListener("pointerdown", onDown);
  pane.addEventListener("pointermove", onMove);
  pane.addEventListener("pointercancel", onCancel);

  let sweeping = false;
  const onFocusIn = () => {
    if (sweeping) return;
    sweeping = true;
    start();
    let s = 0;
    const step = () => {
      s += 0.028;
      move(s * W, H * 0.5 + Math.sin(s * 9) * H * 0.22);
      if (s < 1) requestAnimationFrame(step);
      else {
        sweeping = false;
        if (!card.matches(":hover")) stop();
      }
    };
    step();
  };
  card.addEventListener("focusin", onFocusIn);

  let ro: ResizeObserver | null = null;
  if ("ResizeObserver" in window) {
    ro = new ResizeObserver(() => {
      if (ready) {
        ready = false;
        size();
        tick();
      }
    });
    ro.observe(pane);
  }
  let io: IntersectionObserver | null = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(
      (en) => {
        if (en[0].isIntersecting) {
          if (!ready) size();
          tick();
          io?.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(pane);
  }

  return () => {
    pane.removeEventListener("pointerenter", onEnter);
    pane.removeEventListener("pointerleave", onLeave);
    pane.removeEventListener("pointerdown", onDown);
    pane.removeEventListener("pointermove", onMove);
    pane.removeEventListener("pointercancel", onCancel);
    card.removeEventListener("focusin", onFocusIn);
    ro?.disconnect();
    io?.disconnect();
    if (raf) cancelAnimationFrame(raf);
  };
}

export default function ServiceCard({ service, onPick }: { service: Service; onPick: (id: string) => void }) {
  const cardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    return attachSurfaceFx(cardRef.current);
  }, []);

  return (
    <article ref={cardRef} className={`svc ${service.cls}`} data-mode={service.mode} data-id={service.id}>
      {service.flag && <span className="svc-flag">{service.flag}</span>}
      <div className="svc-pane">
        <canvas aria-hidden="true" />
      </div>
      <div className="svc-body">
        <h3>{service.name}</h3>
        <p>{service.desc}</p>
        <div className="svc-meta">
          <span>
            {service.duration} &middot; from <b>{fmt(service.price * 0.85)}</b>
          </span>
          <button className="svc-pick" type="button" onClick={() => onPick(service.id)}>
            Price this service
          </button>
        </div>
      </div>
    </article>
  );
}
