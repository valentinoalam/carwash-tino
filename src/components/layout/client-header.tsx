'use client';

import { usePathname } from 'next/navigation';
import Header from './header';

export default function ClientHeader() {
  const pathname = usePathname();

  return <>{pathname !== '/blog' && <Header />}</>;
}