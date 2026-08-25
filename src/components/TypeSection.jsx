const LINES = [
  { text: 'Immersive', serif: true },
  { text: 'Silence', serif: false },
  { text: 'Within', serif: true },
]

const TypeSection = () => {
  return (
    <section id="type" className="type-section relative z-10 h-screen overflow-hidden">
      <div className="flex h-full items-center justify-center px-6 [perspective:1400px]">
        <h2 className="type-stage flex flex-col items-center gap-4 text-center uppercase md:gap-6">
          {LINES.map((line) => (
            <span
              key={line.text}
              className={`type-line block opacity-0 will-change-transform ${
                line.serif
                  ? 'font-serif text-5xl font-medium tracking-[0.08em] md:text-8xl lg:text-[7.5rem]'
                  : 'text-5xl font-bold tracking-[0.12em] md:text-8xl lg:text-[7.25rem]'
              }`}
            >
              {line.text}
            </span>
          ))}
        </h2>
      </div>
    </section>
  )
}

export default TypeSection
