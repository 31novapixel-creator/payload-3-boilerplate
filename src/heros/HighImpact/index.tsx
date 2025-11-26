'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef, useState } from 'react'
import type { Page } from '@/payload-types'
import RichText from '@/components/RichText'

// Import des sous-composants que nous avons séparés
import { HeroBackground } from './components/HeroBackground'
import { HeroLogo } from './components/HeroLogo'
import { HeroFeatures } from './components/HeroFeatures'
import { HeroButtons } from './components/HeroButtons'

type HeroProps = Page['hero'] & {
  tagline?: string
  features?: {
    icon: string
    title: string
    description?: string | null
    id?: string | null
  }[]
}

export const HighImpactHero: React.FC<HeroProps> = ({ links, media, richText, tagline, features }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const heroRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setHeaderTheme('dark')
    
    // Délai pour l'animation d'apparition fluide
    const timer = setTimeout(() => setIsVisible(true), 100)
    
    // Gestion du scroll pour le parallax (passé au Background)
    const handleScroll = () => {
      if (heroRef.current) {
        requestAnimationFrame(() => {
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
      className="relative -mt-[10.4rem] min-h-[100svh] flex items-center justify-center w-full text-white overflow-hidden"
      data-theme="dark"
    >
      {/* 1. FOND (Média + Parallax + Texture) */}
      <HeroBackground media={media} scrollY={scrollY} />

      {/* 2. CONTENU PRINCIPAL */}
      <div className="container mx-auto relative z-10 px-6 sm:px-8 pt-32 pb-24">
        <div 
          className={`
            max-w-6xl mx-auto w-full
            transition-all duration-1000 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          `}
        >
          {/* A. Logo & Tagline */}
          <HeroLogo tagline={tagline} />

          {/* B. Texte Riche (Titre & Intro) */}
          {richText && (
            <div className="mb-10 max-w-3xl mx-auto text-center">
              <RichText 
                className="
                  [&_.prose]:max-w-none
                  [&_h1]:text-3xl [&_h1]:sm:text-4xl [&_h1]:md:text-5xl
                  [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-6
                  [&_p]:text-base [&_p]:sm:text-lg
                  [&_p]:text-white/90 [&_p]:font-light [&_p]:leading-relaxed
                " 
                content={richText} 
                enableGutter={false} 
                enableProse={false}
              />
            </div>
          )}

          {/* C. Carrousel de Fonctionnalités */}
          <HeroFeatures features={features} />
          
          {/* D. Boutons d'Action */}
          <HeroButtons links={links} />
        </div>
      </div>
    </section>
  )
}