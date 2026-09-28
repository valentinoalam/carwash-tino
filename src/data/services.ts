export interface Vehicle {
  id: string;
  name: string;
  mult: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  base: number;
  time: string;
  mode: 'ripple' | 'foam' | 'dust' | 'sheen' | 'bead';
  cls: string;
  desc: string;
  flag?: string;
}

export const VEHICLES: Vehicle[] = [
  { id: 'city', name: 'City car', mult: 0.85 },
  { id: 'sedan', name: 'Sedan', mult: 1 },
  { id: 'suv', name: 'SUV or MPV', mult: 1.25 },
  { id: 'large', name: 'Pickup', mult: 1.5 },
];

export const SERVICES: ServiceItem[] = [
  { id: 'basic', name: 'Basic Car Wash', base: 60000, time: '30 min', mode: 'ripple', cls: '', desc: 'Exterior hand wash, wheels cleaned, and a towel dry.' },
  { id: 'premium', name: 'Premium Wash', base: 120000, time: '1 hr', mode: 'foam', cls: '', desc: 'Foam wash, wheel and tire dressing, interior vacuum, and glass cleaned inside and out.' },
  { id: 'interior', name: 'Interior Cleaning', base: 250000, time: '2 hr', mode: 'dust', cls: '', desc: 'Deep vacuum, steam on seams and plastics, leather or fabric care, and a headliner wipe.' },
  { id: 'exterior', name: 'Exterior Detailing', base: 600000, time: '4 hr', mode: 'sheen', cls: 'col-span-12 md:col-span-6', desc: 'Clay bar and iron decontamination, then a light polish to bring back depth and clarity.' },
  { id: 'wax', name: 'Wax & Polish', base: 750000, time: '5 hr', mode: 'sheen', cls: 'col-span-12 md:col-span-6', desc: 'Machine polish to level fine swirls, finished with a warm, deep wax gloss.' },
  { id: 'ceramic', name: 'Ceramic Coating', base: 3500000, time: '2 days', mode: 'bead', cls: 'col-span-12 md:col-span-5', desc: 'Paint correction and a multi-year ceramic layer. Water beads up and dirt rinses off.' },
  { id: 'full', name: 'Full Detailing', base: 2500000, time: '1 day', mode: 'foam', cls: 'col-span-12 md:col-span-7', desc: 'Interior and exterior in one visit: deep clean, decontamination, polish and protection.', flag: 'Most complete' },
];

export function formatCurrency(n: number): string {
  return 'Rp ' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function calculatePrice(svc: ServiceItem, veh: Vehicle): number {
  return Math.round((svc.base * veh.mult) / 5000) * 5000;
}