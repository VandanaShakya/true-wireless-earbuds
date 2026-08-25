const PAGE_LINKS = ['Sound', 'Silence', 'Power']
const SOCIAL_LINKS = ['Instagram', 'YouTube']

const CtaSection = () => {
  return (
    <section id="contact" className="cta-section relative z-10 min-h-screen overflow-hidden">
      <div className="relative flex min-h-screen flex-col justify-between px-6 py-28 md:px-12 lg:px-16">
        <div className="flex flex-1 items-center">
          <div className="cta-copy relative z-10 md:opacity-0">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
              <h2 className="font-serif text-6xl leading-none font-medium tracking-[0.04em] uppercase md:text-8xl lg:text-[8.5rem]">
                True
              </h2>
              <a
                href="#hero"
                className="cta-button inline-flex items-center rounded-full bg-cream px-8 py-3 text-xs tracking-[0.22em] text-black uppercase transition-transform duration-300 hover:scale-[1.03]"
              >
                Shop Now
              </a>
            </div>
            <p className="mt-3 pl-0 text-5xl leading-none font-bold tracking-[0.08em] uppercase md:mt-4 md:pl-[min(22vw,12rem)] md:text-8xl lg:text-[8rem]">
              Wireless
            </p>
          </div>
        </div>

        <nav className="relative z-10 flex gap-16 pb-4 text-[11px] tracking-[0.2em] uppercase">
          <ul className="flex flex-col gap-3">
            {PAGE_LINKS.map((label) => (
              <li key={label}>
                <a href={`#${label.toLowerCase()}`} className="transition-opacity hover:opacity-60">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-3">
            {SOCIAL_LINKS.map((label) => (
              <li key={label}>
                <a href="#contact" className="transition-opacity hover:opacity-60">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default CtaSection
