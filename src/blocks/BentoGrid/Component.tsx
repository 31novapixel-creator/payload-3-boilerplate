import React from 'react'
import { 
  Zap, Laptop, Smartphone, Rocket, Palette, Shield, 
  Globe, Settings, Search, BarChart, Cloud, Bot, ArrowRight 
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CMSLink } from '@/components/Link'

// Mapping des icônes (Même liste que le Hero pour la cohérence)
const iconMap: Record<string, React.ElementType> = {
  Zap, Laptop, Smartphone, Rocket, Palette, Shield, 
  Globe, Settings, Search, BarChart, Cloud, Bot
}

// On définit le type des props attendues (basé sur la config Payload)
export type BentoGridProps = {
  title: string
  intro?: string
  cards?: {
    icon: string
    span: '1' | '2' | '3'
    title: string
    description?: string
    links?: any[] // Le type exact viendra de payload-types
    id?: string
  }[]
}

export const BentoGrid: React.FC<BentoGridProps> = ({ title, intro, cards }) => {
  return (
    <section className="relative py-24 px-6 sm:px-8 overflow-hidden">
      {/* Texture de fond subtile pour lier avec le Hero */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* EN-TÊTE DE SECTION */}
        <div className="mb-16 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            <span className="text-[#00bcfe] block text-sm font-mono mb-2 tracking-widest uppercase">
              // Nos Services
            </span>
            {title}
          </h2>
          {intro && (
            <p className="text-lg text-white/70 font-light leading-relaxed">
              {intro}
            </p>
          )}
        </div>

        {/* GRILLE BENTO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(250px,auto)]">
          {cards?.map((card, i) => {
            const IconComponent = iconMap[card.icon] || Zap
            
            // Calcul des classes de largeur (Span)
            const spanClass = {
              '1': 'md:col-span-1',
              '2': 'md:col-span-2',
              '3': 'md:col-span-3',
            }[card.span] || 'md:col-span-1'

            return (
              <div
                key={card.id || i}
                className={cn(
                  spanClass,
                  "group relative p-8 flex flex-col justify-between overflow-hidden rounded-3xl",
                  "bg-[#111] border border-white/10", // Base sombre
                  "hover:border-[#00bcfe]/50 transition-all duration-500", // Hover border
                  "hover:shadow-[0_0_30px_-5px_rgba(0,188,254,0.15)]" // Hover Glow soft
                )}
              >
                {/* Effet de fond au hover (Gradient radial qui suit la souris idéalement, ici statique centré) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00bcfe]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Contenu */}
                <div className="relative z-10">
                  <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 border border-white/5 text-[#00bcfe] group-hover:scale-110 group-hover:bg-[#00bcfe] group-hover:text-black transition-all duration-300">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00bcfe] transition-colors">
                    {card.title}
                  </h3>
                  
                  {card.description && (
                    <p className="text-white/60 font-light leading-relaxed mb-6">
                      {card.description}
                    </p>
                  )}
                </div>

                {/* Lien (si présent) */}
                {card.links && card.links.length > 0 && (
                  <div className="relative z-10 mt-auto pt-4 flex items-center text-sm font-medium text-white group-hover:translate-x-2 transition-transform duration-300">
                    <span className="mr-2">En savoir plus</span>
                    <ArrowRight className="w-4 h-4 text-[#00bcfe]" />
                    
                    {/* Lien cliquable qui couvre toute la carte (UX Pattern) */}
                    <div className="absolute inset-0 -top-[200px] -left-[50px] w-[200%] h-[200%] opacity-0">
                       <CMSLink {...card.links[0].link} />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}