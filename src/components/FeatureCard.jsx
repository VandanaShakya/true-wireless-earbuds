import { useState } from 'react'

const CheckIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.2" />
    <path d="M4.6 8.2 L7 10.4 L11.4 5.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const CardContent = ({ card, inverted }) => {
  const label = inverted ? 'text-white/90' : ''
  const title = inverted ? 'text-white' : 'text-black'
  const muted = inverted ? 'text-white/70' : 'text-black/55'
  const bar = inverted ? '#ffffff' : card.accent
  const category = inverted ? 'text-white' : ''

  return (
    <div className="flex h-full flex-col justify-between p-6 md:p-7">
      <div>
        <p
          className={`mb-8 flex items-center gap-2 text-[11px] tracking-[0.04em] ${category}`}
          style={inverted ? undefined : { color: card.accent }}
        >
          <span className="inline-block h-4 w-px" style={{ backgroundColor: bar }} />
          {card.category}
        </p>
        <h3 className={`text-[1.65rem] leading-none font-semibold tracking-tight ${title}`}>{card.title}</h3>
        <p className={`mt-2 text-sm font-light tracking-[0.18em] ${label || 'text-black/70'}`}>{card.subtitle}</p>
      </div>

      <div>
        <div className="grid grid-cols-2 gap-4 text-[11px]">
          <div>
            <p className={muted}>{card.stat1Label}</p>
            <p className={`mt-1 ${inverted ? 'text-white' : 'text-black/80'}`}>{card.stat1}</p>
          </div>
          <div>
            <p className={muted}>{card.stat2Label}</p>
            <p className={`mt-1 ${inverted ? 'text-white' : 'text-black/80'}`}>{card.stat2}</p>
          </div>
        </div>
        <p
          className={`mt-6 flex items-center gap-2 border-t pt-5 text-[11px] tracking-[0.04em] ${
            inverted ? 'border-white/25 text-white' : 'border-black/10 text-black/70'
          }`}
        >
          <CheckIcon className="h-3.5 w-3.5" />
          {card.check}
        </p>
      </div>
    </div>
  )
}

const FeatureCard = ({ card, offset }) => {
  const [flipped, setFlipped] = useState(false)

  return (
    <article className={`h-[280px] w-full max-w-[280px] [perspective:1200px] ${offset ? 'md:mt-20' : ''}`}>
      <div
        className={`fund-card relative h-full w-full cursor-pointer transition-transform duration-700 ease-out [transform-style:preserve-3d] hover:[transform:rotateY(180deg)] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
        onClick={() => setFlipped((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setFlipped((open) => !open)
          }
        }}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${card.title} feature card`}
      >
        <div className="card-face absolute inset-0 bg-cream text-black [transform:rotateY(0deg)]">
          <CardContent card={card} inverted={false} />
        </div>
        <div
          className="card-face absolute inset-0 text-white [transform:rotateY(180deg)]"
          style={{ backgroundColor: card.back }}
        >
          <CardContent card={card} inverted />
        </div>
      </div>
    </article>
  )
}

export default FeatureCard
