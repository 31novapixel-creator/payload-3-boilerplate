import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export const SectionSeparator: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("container mx-auto px-8 max-w-7xl pointer-events-none select-none", className)}>
      <div className="relative flex items-center justify-center w-full">
        
        {/* 1. La ligne "Laser" principale */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00bcfe]/30 to-transparent" />
        
        {/* 2. (Optionnel) Un petit éclat au centre pour plus de réalisme */}
        <div className="absolute w-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00bcfe]/50 to-transparent blur-[1px]" />
        
      </div>
    </div>
  )
}