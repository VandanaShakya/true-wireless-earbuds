const CX = 200
const CY = 200

const RINGS = [
  { count: 22, length: 152, width: 42, fill: '#5C0105', tip: '#A01016', cavity: '#2A0002', rim: '#E07070', ring: 7 },
  { count: 20, length: 138, width: 38, fill: '#7A0108', tip: '#C21820', cavity: '#3A0104', rim: '#E88888', ring: 6 },
  { count: 18, length: 124, width: 36, fill: '#98010A', tip: '#DC1C24', cavity: '#4A0105', rim: '#F0A0A0', ring: 5 },
  { count: 16, length: 108, width: 32, fill: '#B8010C', tip: '#E8242A', cavity: '#5C0106', rim: '#F2B0B0', ring: 4 },
  { count: 14, length: 92, width: 28, fill: '#D4010E', tip: '#F04046', cavity: '#6E0108', rim: '#F6C4C4', ring: 3 },
  { count: 12, length: 74, width: 24, fill: '#E8242A', tip: '#F56A6E', cavity: '#8B0108', rim: '#FAD0D0', ring: 2 },
  { count: 10, length: 56, width: 20, fill: '#F25A5A', tip: '#F8A0A0', cavity: '#9B0109', rim: '#FFE0E0', ring: 1 },
  { count: 8, length: 36, width: 16, fill: '#F78A8A', tip: '#FFD0D0', cavity: '#B8010C', rim: '#FFF0F0', ring: 0 },
]

function unit(seed) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function scoopPath(length, width) {
  const w = width / 2
  const l = length

  return [
    `M 0 0`,
    `C ${w * 0.18} ${-l * 0.03} ${w * 1.02} ${-l * 0.16} ${w * 1.02} ${-l * 0.46}`,
    `C ${w * 1.0} ${-l * 0.74} ${w * 0.58} ${-l * 0.97} 0 ${-l}`,
    `C ${-w * 0.58} ${-l * 0.97} ${-w * 1.0} ${-l * 0.74} ${-w * 1.02} ${-l * 0.46}`,
    `C ${-w * 1.02} ${-l * 0.16} ${-w * 0.18} ${-l * 0.03} 0 0`,
    `Z`,
  ].join(' ')
}

function foldPath(length, width, open) {
  const l = length
  const mouth = Math.min(width * (0.42 + open * 0.12), l * 0.28)
  const cy = -l * (0.52 + open * 0.04)
  const rx = mouth
  const ry = mouth * (0.72 + (1 - open) * 0.38)

  return [
    `M 0 ${cy + ry * 0.58}`,
    `C ${rx * 0.95} ${cy + ry * 0.32} ${rx * 1.02} ${cy - ry * 0.08} ${rx * 0.58} ${cy - ry * 0.68}`,
    `C ${rx * 0.2} ${cy - ry * 1.08} ${-rx * 0.2} ${cy - ry * 1.08} ${-rx * 0.58} ${cy - ry * 0.68}`,
    `C ${-rx * 1.02} ${cy - ry * 0.08} ${-rx * 0.95} ${cy + ry * 0.32} 0 ${cy + ry * 0.58}`,
    `Z`,
  ].join(' ')
}

function buildPetals() {
  const petals = []
  let index = 0

  RINGS.forEach((ring, ringIndex) => {
    const step = 360 / ring.count
    const offset = ringIndex % 2 === 0 ? 4 : step / 2 + 3
    const faceOn = 1 - ring.ring / (RINGS.length - 1)

    for (let i = 0; i < ring.count; i += 1) {
      const jitter = unit(index + 1)
      petals.push({
        id: `petal-${index}`,
        angle: offset + i * step + (jitter - 0.5) * 5.5,
        length: ring.length * (0.94 + jitter * 0.1),
        width: ring.width * (0.92 + unit(index + 9) * 0.14),
        fill: ring.fill,
        tip: ring.tip,
        cavity: ring.cavity,
        rim: ring.rim,
        open: 0.35 + faceOn * 0.5,
        ring: ring.ring,
        index,
      })
      index += 1
    }
  })

  return petals
}

const PETALS = buildPetals()

const Flower = () => {
  return (
    <svg
      className="flower-svg h-auto w-[min(92vw,760px)] overflow-visible"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="flower-core" cx="42%" cy="36%" r="58%">
          <stop offset="0%" stopColor="#FFD8B8" />
          <stop offset="35%" stopColor="#F25A5A" />
          <stop offset="100%" stopColor="#6E0108" />
        </radialGradient>
        <linearGradient id="stem-grad" x1="200" y1="230" x2="200" y2="520" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5A8F3C" />
          <stop offset="100%" stopColor="#2F5A28" />
        </linearGradient>
        <radialGradient id="sphere-light" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="42%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sphere-shade" cx="58%" cy="62%" r="72%">
          <stop offset="0%" stopColor="#2A0002" stopOpacity="0" />
          <stop offset="55%" stopColor="#2A0002" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#140000" stopOpacity="0.5" />
        </radialGradient>
        <clipPath id="round-head">
          <circle cx={CX} cy={CY} r="156" />
        </clipPath>
        {RINGS.map((ring) => (
          <linearGradient
            key={`grad-ring-${ring.ring}`}
            id={`petal-fill-${ring.ring}`}
            gradientUnits="objectBoundingBox"
            x1="0.5"
            y1="1"
            x2="0.5"
            y2="0"
          >
            <stop offset="0%" stopColor={ring.fill} />
            <stop offset="62%" stopColor={ring.tip} />
            <stop offset="100%" stopColor={ring.rim} />
          </linearGradient>
        ))}
      </defs>

      <g className="flower-stem">
        <path
          d="M 200 250 C 196 340 208 420 198 520"
          stroke="url(#stem-grad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      <g className="flower-head" clipPath="url(#round-head)">
        <circle className="flower-glow" cx={CX} cy={CY} r="150" fill="#D90102" opacity="0.2" />

        {PETALS.map((petal) => (
          <g key={petal.id} className="petal" data-petal={petal.index} data-ring={petal.ring}>
            <g transform={`rotate(${petal.angle} ${CX} ${CY})`}>
              <g transform={`translate(${CX} ${CY})`}>
                <path d={scoopPath(petal.length, petal.width)} fill={`url(#petal-fill-${petal.ring})`} />
                <path
                  d={scoopPath(petal.length * 0.9, petal.width * 0.72)}
                  fill={petal.fill}
                  opacity="0.35"
                />
                <path d={foldPath(petal.length, petal.width, petal.open)} fill={petal.cavity} opacity="0.92" />
                <path
                  d={foldPath(petal.length * 0.78, petal.width * 0.55, petal.open)}
                  fill={petal.rim}
                  opacity="0.16"
                />
                <path
                  d={scoopPath(petal.length, petal.width)}
                  fill="none"
                  stroke={petal.rim}
                  strokeWidth="0.7"
                  opacity="0.28"
                />
              </g>
            </g>
          </g>
        ))}

        <circle cx={CX} cy={CY} r="156" fill="url(#sphere-shade)" />
        <circle cx={CX} cy={CY} r="156" fill="url(#sphere-light)" />
        <circle className="flower-core" cx={CX} cy={CY} r="13" fill="url(#flower-core)" />
        <circle className="flower-core" cx={CX} cy={CY} r="5.5" fill="#3A0104" opacity="0.6" />
      </g>
    </svg>
  )
}

export default Flower
