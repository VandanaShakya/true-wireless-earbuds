import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GALLERY_CORNERS = [
  { x: '-36vw', y: '-30vh', rotation: -8 },
  { x: '36vw', y: '-30vh', rotation: 8 },
  { x: '-36vw', y: '30vh', rotation: 6 },
  { x: '36vw', y: '30vh', rotation: -6 },
]

const GALLERY_MIDS = [
  { x: '-8vw', y: '-34vh', rotation: -3 },
  { x: '8vw', y: '-34vh', rotation: 3 },
  { x: '-8vw', y: '34vh', rotation: 2 },
  { x: '8vw', y: '34vh', rotation: -2 },
]

const GALLERY_STACK = [
  { x: '-4.6vw', y: '-5vh', rotation: -10 },
  { x: '4.8vw', y: '-4vh', rotation: 8 },
  { x: '-4.2vw', y: '5vh', rotation: -6 },
  { x: '4.4vw', y: '4.6vh', rotation: 9 },
]

export const useScrollStory = (rootRef) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const petals = gsap.utils.toArray('.petal')
      const words = gsap.utils.toArray('.hero-word')
      const cores = gsap.utils.toArray('.flower-core, .flower-glow')
      const featureSections = gsap.utils.toArray('.feature-section')
      const typeLines = gsap.utils.toArray('.type-line')
      const galleryImgs = gsap.utils.toArray('.gallery-img')

      gsap.set(petals, { scale: 0.2, svgOrigin: '200 200', force3D: false })
      gsap.set(words, { opacity: 0, y: 36 })
      gsap.set('.flower-stem', { scaleY: 0, svgOrigin: '200 250', force3D: false })
      gsap.set('.flower-head', { scale: 0.42, svgOrigin: '200 200', force3D: false })
      gsap.set(cores, { scale: 0, svgOrigin: '200 200', force3D: false })
      gsap.set('.flower-scene', { x: 0, y: 0, scale: 1, transformOrigin: '50% 50%' })

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: '+=280%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      heroTl.to('.flower-stem', { scaleY: 1, duration: 0.5, ease: 'none' }, 0)
      heroTl.to('.flower-head', { scale: 1, duration: 1.35, ease: 'none' }, 0.06)

      const bloomPetals = [...petals].sort(
        (a, b) => Number(a.dataset.ring) - Number(b.dataset.ring),
      )

      bloomPetals.forEach((petal, index) => {
        heroTl.to(petal, { scale: 1, duration: 0.4, ease: 'none' }, 0.1 + index * 0.014)
      })

      const petalWindow = Math.max(bloomPetals.length * 0.014, 1.1)
      heroTl.to(cores, { scale: 1, duration: 0.35, ease: 'none' }, petalWindow * 0.28)
      heroTl.to(words[0], { opacity: 1, y: 0, duration: 0.45, ease: 'none' }, petalWindow * 0.22)
      heroTl.to(words[1], { opacity: 1, y: 0, duration: 0.45, ease: 'none' }, petalWindow * 0.48)
      heroTl.to(words[2], { opacity: 1, y: 0, duration: 0.45, ease: 'none' }, petalWindow * 0.72)

      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        featureSections.forEach((section, index) => {
          const title = section.querySelector('.feature-title')
          const cards = section.querySelector('.feature-cards')

          gsap.set(title, {
            top: '50%',
            yPercent: -50,
            left: '50%',
            xPercent: -50,
          })
          gsap.set(cards, { opacity: 0, y: 40 })

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=140%',
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            },
          })

          tl.to(title, { left: '6vw', xPercent: 0, duration: 1, ease: 'none' }, 0)

          if (index === 0) {
            tl.to('.flower-scene', { x: '6vw', y: 0, scale: 1.22, duration: 1, ease: 'none' }, 0)
            tl.to('.flower-head', { scale: 1.04, duration: 1, ease: 'none' }, 0)
          }

          tl.to(cards, { opacity: 1, y: 0, duration: 0.7, ease: 'none' }, 0.28)
        })

        gsap.set(typeLines, {
          opacity: 0,
          y: 160,
          rotateX: 78,
          rotateZ: -10,
          transformOrigin: '50% 80%',
        })

        const typeTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.type-section',
            start: 'top top',
            end: '+=220%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        typeTl.fromTo(
          '.flower-scene',
          { x: '6vw', y: 0, scale: 1.22 },
          { x: '18vw', y: '-8vh', scale: 1.14, duration: 1, ease: 'none', immediateRender: false },
          0,
        )
        typeTl.to('.flower-scene', { x: 0, y: 0, scale: 1.08, duration: 1, ease: 'none' }, 1)
        typeTl.fromTo(
          '.flower-head',
          { scale: 1.04 },
          { scale: 1.08, duration: 2, ease: 'none', immediateRender: false },
          0,
        )

        typeLines.forEach((line, index) => {
          typeTl.to(
            line,
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              rotateZ: 0,
              duration: 0.7,
              ease: 'none',
            },
            0.15 + index * 0.55,
          )
        })

        galleryImgs.forEach((img, index) => {
          gsap.set(img, {
            top: '50%',
            left: '50%',
            xPercent: -50,
            yPercent: -50,
            width: 'min(28vw, 280px)',
            height: 'min(38vh, 340px)',
            ...GALLERY_CORNERS[index],
          })
        })

        const galleryTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.gallery-section',
            start: 'top top',
            end: '+=240%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        galleryTl.fromTo(
          '.flower-scene',
          { x: 0, y: 0, scale: 1.08 },
          { x: '-18vw', y: '7vh', scale: 1.12, duration: 1, ease: 'none', immediateRender: false },
          0,
        )
        galleryTl.to('.flower-scene', { x: '-8vw', y: 0, scale: 1.18, duration: 1, ease: 'none' }, 1)

        galleryImgs.forEach((img, index) => {
          galleryTl.to(
            img,
            {
              keyframes: [
                { ...GALLERY_MIDS[index], duration: 0.9 },
                { ...GALLERY_STACK[index], duration: 1.1 },
              ],
              ease: 'none',
            },
            0,
          )
        })

        gsap.set('.cta-copy', { opacity: 0, y: 40 })

        const ctaTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.cta-section',
            start: 'top top',
            end: '+=160%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        ctaTl.fromTo(
          '.flower-scene',
          { x: '-8vw', y: 0, scale: 1.18 },
          { x: '6vw', y: '-6vh', scale: 1.1, duration: 0.8, ease: 'none', immediateRender: false },
          0,
        )
        ctaTl.to('.flower-scene', { x: '18vw', y: 0, scale: 1.05, duration: 0.8, ease: 'none' }, 0.8)
        ctaTl.to('.cta-copy', { opacity: 1, y: 0, duration: 0.7, ease: 'none' }, 0.2)
      })

      mm.add('(max-width: 767px)', () => {
        gsap.set('.feature-title', { xPercent: 0 })
        gsap.set('.feature-cards', { opacity: 1, y: 0 })
        gsap.set(typeLines, { opacity: 1, y: 0, rotateX: 0, rotateZ: 0 })
        gsap.set('.cta-copy', { opacity: 1, y: 0 })

        galleryImgs.forEach((img, index) => {
          gsap.set(img, {
            top: '50%',
            left: '50%',
            xPercent: -50,
            yPercent: -50,
            width: '42vw',
            height: '28vh',
            ...GALLERY_STACK[index],
          })
        })

        gsap.to('.flower-scene', {
          y: -36,
          scale: 0.82,
          opacity: 0.42,
          scrollTrigger: {
            trigger: '.feature-section',
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [rootRef])
}
