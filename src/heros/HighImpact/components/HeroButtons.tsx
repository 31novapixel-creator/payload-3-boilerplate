'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'
import { cn } from '@/lib/utils'
import type { Page } from '@/payload-types'

type HeroButtonsProps = {
  links: Page['hero']['links']
}

export const HeroButtons: React.FC<HeroButtonsProps> = ({ links }) => {
  if (!links || !Array.isArray(links) || links.length === 0) return null

  return (
    <div className="flex flex-row flex-wrap justify-center gap-4">
      {links.map(({ link }, i) => {
        const isPrimary = i === 0
        
        return (
          <Button
            key={i}
            asChild
            variant={isPrimary ? "default" : "outline"}
            className={cn(
              "h-auto px-8 py-4 rounded-sm tracking-widest uppercase text-xs sm:text-sm transition-all duration-300",
              isPrimary 
                ? "bg-[#00bcfe] text-black border border-[#00bcfe] hover:bg-[#33c9fe] font-semibold shadow-[0_0_20px_rgba(0,188,254,0.4)]"
                : "bg-transparent text-white border-white/20 hover:border-[#00bcfe] hover:text-[#00bcfe] hover:bg-[#00bcfe]/5"
            )}
          >
            <CMSLink {...link} />
          </Button>
        )
      })}
    </div>
  )
}