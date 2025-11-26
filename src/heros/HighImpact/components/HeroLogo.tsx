'use client'
import React from 'react'

type HeroLogoProps = {
  tagline?: string
}

export const HeroLogo: React.FC<HeroLogoProps> = ({ tagline }) => {
  return (
    <div className="mb-8 relative group text-center">
      <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-64 h-64 bg-[#00bcfe]/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <h1 className="relative text-5xl sm:text-6xl md:text-8xl font-extralight tracking-tight leading-none">
        <span className="text-[#00bcfe] drop-shadow-[0_0_15px_rgba(0,188,254,0.3)]">NOVA</span>
        <span className="text-white">PIXEL</span>
      </h1>
      
      <div className="mt-4 flex items-center justify-center gap-3">
         <div className="h-px w-8 bg-[#00bcfe]/50"></div>
         <p className="text-xs sm:text-sm tracking-[0.25em] text-white/60 font-light uppercase">
            {tagline || '< DU CONCEPT AU PIXEL />'}
         </p>
         <div className="h-px w-8 bg-[#00bcfe]/50"></div>
      </div>
    </div>
  )
}