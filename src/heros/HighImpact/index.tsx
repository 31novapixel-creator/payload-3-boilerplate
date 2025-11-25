'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef, useState } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

// On s'assure que tagline est bien typé
type HeroProps = Page['hero'] & {
  tagline?: string
}

export const HighImpactHero: React.FC<HeroProps> = ({ links, media, richText, tagline }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const heroRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setHeaderTheme('dark')
    // Délai réduit pour une apparition rapide mais fluide
    const timer = setTimeout(() => setIsVisible(true), 100)
    
    const handleScroll = () => {
      if (heroRef.current) {
        requestAnimationFrame(() => {
          // Parallax douce (0.4 speed)
          setScrollY(window.scrollY * 0.4)
        })
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [setHeaderTheme])

  return (
    <section
      ref={heroRef}
      className="relative -mt-[10.4rem] min-h-[100svh] flex items-center text-white overflow-hidden"
      data-theme="dark"
    >
      {/* 1. BACKGROUND MEDIA + PARALLAX + TEXTURE */}
      <div 
        className="absolute inset-0 w-full h-[120%] -top-[10%] select-none pointer-events-none"
        style={{ transform: `translateY(${scrollY}px)` }}
      >
        {media && typeof media === 'object' && (
          <>
            <Media
              fill
              imgClassName="object-cover object-center opacity-70" // Légèrement assombri
              priority
              loading="eager"
              resource={media}
            />
            
            {/* Dégradé noir plus fort en bas pour la lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/40" />
            
            {/* Ajout subtil : Texture "Noise" pour un rendu pro/tech (évite l'effet banding) */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </>
        )}
      </div>

      {/* 2. CONTENT CONTAINER */}
      <div className="container relative z-10 px-6 sm:px-8 pt-32 pb-24">
        <div 
          className={`
            max-w-3xl
            transition-all duration-1000 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          `}
        >
          {/* --- NOVAPIXEL LOGO AREA --- */}
          <div className="mb-8 relative group">
            {/* Petite lueur bleue subtile derrière le logo */}
            <div className="absolute -left-10 -top-10 w-64 h-64 bg-[#00bcfe]/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <h1 className="relative text-5xl sm:text-6xl md:text-8xl font-extralight tracking-tight leading-none">
              <span className="text-[#00bcfe] drop-shadow-[0_0_15px_rgba(0,188,254,0.3)]">NOVA</span>
              <span className="text-white">PIXEL</span>
            </h1>
            
            {/* Tagline Dynamique avec effet machine à écrire */}
            <div className="mt-4 flex items-center gap-3">
               <div className="h-px w-8 bg-[#00bcfe]/50"></div>
               <p className="text-xs sm:text-sm tracking-[0.25em] text-white/60 font-light uppercase">
                  {tagline || '< DU CONCEPT AU PIXEL />'}
               </p>
            </div>
          </div>

          {/* --- RICH TEXT CONTENT --- */}
          {/* On garde EXACTEMENT tes styles CSS personnalisés pour la police */}
          {richText && (
            <div className="mb-10 pl-2 border-l-2 border-white/5">
              <RichText 
                className="
                  [&_.prose]:max-w-none
                  [&_h1]:text-xl [&_h1]:sm:text-2xl [&_h1]:md:text-3xl
                  [&_h1]:font-semibold [&_h1]:text-white
                  [&_h1]:leading-tight [&_h1]:mb-5
                  
                  /* Texte paragraphes */
                  [&_p]:text-sm [&_p]:sm:text-base [&_p]:md:text-lg
                  [&_p]:text-white/70 [&_p]:font-light
                  [&_p]:mb-5 [&_p]:leading-relaxed
                  
                  /* Listes à puces */
                  [&_ul]:list-none [&_ul]:p-0 [&_ul]:m-0 [&_ul]:space-y-3
                  [&_li]:text-sm [&_li]:sm:text-base
                  [&_li]:text-white/80 [&_li]:font-light
                  [&_li]:pl-0
                  [&_li]:flex [&_li]:items-center
                " 
                content={richText} 
                enableGutter={false} 
                enableProse={false}
              />
            </div>
          )}

          {/* --- CTA BUTTONS --- */}
          {Array.isArray(links) && links.length > 0 && (
            <div 
              className={`
                flex flex-row flex-wrap gap-4
                transition-all duration-1000 delay-300 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              {links.map(({ link }, i) => (
                <div 
                  key={i}
                  className={`
                    /* Bouton 1 (Principal) : Bleu plein, texte noir */
                    ${i === 0 
                      ? '[&_a]:bg-[#00bcfe] [&_a]:text-black [&_a]:border-[#00bcfe] [&_a]:hover:bg-[#33c9fe] [&_a]:font-semibold [&_a]:shadow-[0_0_20px_rgba(0,188,254,0.4)]' 
                      : ''
                    }
                    /* Bouton 2 (Secondaire) : Transparent, bordure fine */
                    ${i !== 0 
                       ? '[&_a]:bg-transparent [&_a]:text-white [&_a]:border-white/20 [&_a]:hover:border-[#00bcfe] [&_a]:hover:text-[#00bcfe] [&_a]:hover:bg-[#00bcfe]/5' 
                       : ''
                    }
                    /* Styles communs */
                    [&_a]:px-8 [&_a]:py-4
                    [&_a]:text-xs [&_a]:sm:text-sm [&_a]:tracking-widest [&_a]:uppercase
                    [&_a]:border [&_a]:transition-all [&_a]:duration-300
                    [&_a]:inline-block [&_a]:text-center [&_a]:rounded-sm
                  `}
                >
                  <CMSLink {...link} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- SCROLL INDICATOR --- */}
      <div 
        className={`
          absolute bottom-8 left-1/2 -translate-x-1/2 z-10
          flex flex-col items-center gap-2
          transition-all duration-1000 delay-700 ease-out
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 animate-pulse">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#00bcfe] to-transparent" />
      </div>
    </section>
  )
}