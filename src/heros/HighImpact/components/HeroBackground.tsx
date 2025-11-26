'use client'
import React from 'react'
import { Media } from '@/components/Media'
import type { Page } from '@/payload-types'

type HeroBackgroundProps = {
  media: Page['hero']['media']
  scrollY: number
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ media, scrollY }) => {
  return (
    <div 
      className="absolute inset-0 w-full h-[120%] -top-[10%] select-none pointer-events-none"
      style={{ transform: `translateY(${scrollY}px)` }}
    >
      {media && typeof media === 'object' && (
        <>
          <Media
            fill
            imgClassName="object-cover object-center opacity-70"
            priority
            loading="eager"
            resource={media}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/40" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </>
      )}
    </div>
  )
}