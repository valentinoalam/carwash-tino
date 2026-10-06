import { CFG, Service, Vehicle } from "@/data/catalog";

export function fmt(n: number): string {
  return (
    CFG.currency +
    " " +
    Math.round(n)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  );
}

export function price(svc: Service, veh: Vehicle): number {
  return Math.round((svc.price * veh.mult) / 5000) * 5000;
}

export function waLink(text: string): string {
  return "https://wa.me/" + CFG.wa + "?text=" + encodeURIComponent(text);
}

export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const ease = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
export const rnd = (a: number, b: number) => a + Math.random() * (b - a);
