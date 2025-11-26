'use client'
import React from 'react'
import { 
  Zap, Shield, Rocket, Smartphone, Laptop, Palette, 
  Globe, Lock, Settings, Users, FileText, Heart 
} from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Mapping des icônes
const iconMap: Record<string, React.ElementType> = {
  Zap, Shield, Rocket, Smartphone, Laptop, Palette,
  Globe, Lock, Settings, Users, FileText, Heart
}

type Feature = {
  icon: string
  title: string
  description?: string | null
  id?: string | null
}

type HeroFeaturesProps = {
  features?: Feature[] | null
}

export const HeroFeatures: React.FC<HeroFeaturesProps> = ({ features }) => {
  if (!features || !Array.isArray(features) || features.length === 0) return null

  return (
    <div className="mb-12">
      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {features.map((feature, i) => {
            const IconComponent = iconMap[feature.icon] || Zap

            return (
              <CarouselItem 
                key={feature.id || i} 
                className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3"
              >
                <div 
                  className="
                    h-full flex flex-col items-center text-center p-6
                    bg-white/5 backdrop-blur-sm rounded-xl
                    border border-white/10
                    transition-all duration-300
                    hover:border-[#00bcfe]
                    hover:shadow-[0_0_20px_rgba(0,188,254,0.3)]
                    hover:bg-[#00bcfe]/10
                    hover:-translate-y-1
                    group/card
                    cursor-grab active:cursor-grabbing
                  "
                >
                  <div className="mb-4 p-3 rounded-full bg-white/5 group-hover/card:bg-[#00bcfe]/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-[#00bcfe]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  {feature.description && (
                    <p className="text-sm text-white/70 font-light leading-relaxed">
                      {feature.description}
                    </p>
                  )}
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="left-[-2rem] border-white/10 bg-black/50 hover:bg-[#00bcfe] hover:text-black hover:border-[#00bcfe]" />
          <CarouselNext className="right-[-2rem] border-white/10 bg-black/50 hover:bg-[#00bcfe] hover:text-black hover:border-[#00bcfe]" />
        </div>
      </Carousel>
    </div>
  )
}