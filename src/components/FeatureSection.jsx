import FeatureCard from './FeatureCard'

const FeatureSection = ({ feature }) => {
  return (
    <section id={feature.id} className="feature-section relative z-10">
      <div className="feature-pin relative flex min-h-screen flex-col items-center px-6 py-28 md:h-screen md:overflow-hidden md:px-12 md:py-0 lg:px-16">
        <div className="feature-title relative z-10 mb-16 w-max max-w-[90vw] text-center md:absolute md:top-1/2 md:mb-0 md:text-left">
          <p className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.22em] text-accent uppercase md:justify-start">
            <span className="flex items-end gap-[2px]">
              <span className="h-2 w-px bg-accent" />
              <span className="h-3 w-px bg-accent" />
              <span className="h-2 w-px bg-accent" />
            </span>
            {feature.eyebrow}
          </p>
          <h2 className="text-5xl leading-[0.92] font-semibold tracking-tight uppercase md:text-7xl lg:text-[5.5rem]">
            {feature.title[0]}
            <br />
            {feature.title[1]}
          </h2>
        </div>

        <div className="relative z-10 w-full max-w-[620px] md:absolute md:top-1/2 md:right-10 md:w-[620px] md:-translate-y-1/2 lg:right-16">
          <div className="feature-cards grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:opacity-0">
            {feature.cards.map((card, index) => (
              <FeatureCard key={card.id} card={card} offset={index % 2 === 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
