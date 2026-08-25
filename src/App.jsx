import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Header from './components/Header'
import MenuOverlay from './components/MenuOverlay'
import Flower from './components/Flower'
import Hero from './components/Hero'
import FeatureSection from './components/FeatureSection'
import TypeSection from './components/TypeSection'
import GallerySection from './components/GallerySection'
import CtaSection from './components/CtaSection'
import { features } from './data/features'
import { useScrollStory } from './hooks/useScrollStory'

const App = () => {
  const rootRef = useRef(null)
  const lenisRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useScrollStory(rootRef)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useLayoutEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (menuOpen) {
      lenisRef.current?.stop()
    } else {
      lenisRef.current?.start()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div ref={rootRef} className="relative bg-black">
      <Header menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((open) => !open)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flower-scene pointer-events-none fixed inset-0 z-[5] flex items-center justify-center">
        <Flower />
      </div>

      <Hero />
      {features.map((feature) => (
        <FeatureSection key={feature.id} feature={feature} />
      ))}
      <TypeSection />
      <GallerySection />
      <CtaSection />
    </div>
  )
}

export default App
