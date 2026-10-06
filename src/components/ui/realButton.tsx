import React from 'react'
import "./realButton.css"
import { cn } from '@/lib/utils';
const RealButton = ({children, onClick, className}: {children:React.ReactNode; className: string;onClick: ()=>void; size?: "default" | "sm" | "lg" | "icon" | null | undefined;}) => {
  return (
    <button suppressHydrationWarning onClick={onClick} className={cn('button',className)}>
      <div className="button-outer">
        <div className="button-inner flex items-center">
          {children}
        </div>
      </div>
    </button>
  )
}

export default RealButton