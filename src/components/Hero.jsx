const Hero = () => {
  return (
    <section id="hero" className="hero-section relative z-10 h-screen">
      <div className="flex h-full items-center justify-center px-6">
        <h1 className="text-center uppercase">
          <span className="hero-word block text-4xl font-light tracking-[0.32em] md:text-6xl lg:text-[5.75rem]">
            Hear
          </span>
          <span className="mt-3 flex flex-wrap items-baseline justify-center gap-x-5 md:mt-4 md:gap-x-7">
            <span className="hero-word text-4xl font-light tracking-[0.28em] md:text-6xl lg:text-[5.75rem]">
              Your
            </span>
            <span className="hero-word text-4xl font-bold tracking-[0.12em] md:text-6xl lg:text-[5.75rem]">
              World
            </span>
          </span>
        </h1>
      </div>
    </section>
  )
}

export default Hero
