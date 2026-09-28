import React from 'react';
import Image from 'next/image';
function LogoIcon() {
  return (
    <div className="size-16">
      <Image width={120} height={120} src="/logo/haircut-r.svg" alt={''} />
    </div>
  );
}

export default LogoIcon;