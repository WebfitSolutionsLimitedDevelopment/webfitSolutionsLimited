// Generic, hand-drawn style SVG illustrations for catalogue products.
// No brands, packaging or supplier photos: each tile shows the snack's shape.

const W = 320
const H = 180

function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function rng(seed) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const FRYUM_COLOURS = ['#F9A8D4', '#FDE68A', '#86EFAC', '#FFFFFF', '#FDBA74', '#C4B5FD']

// Each shape is drawn centred on 0,0. `c` = main colour, `s` = outline colour.
const SHAPES = {
  puff: (c, s) => <ellipse rx="7" ry="3.6" fill={c} stroke={s} strokeWidth="1" />,
  leaf: () => <path d="M-7 0 Q0 -6 7 0 Q0 6 -7 0Z" fill="#3F8F3A" stroke="#2D6A2A" strokeWidth="0.8" />,
  sev: (c, s) => <path d="M-14 0 q3.5 -4 7 0 t7 0 t7 0 t7 0" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" />,
  gathiya: (c, s) => (
    <g>
      <rect x="-18" y="-4.5" width="36" height="9" rx="4.5" fill={c} stroke={s} strokeWidth="1" />
      <path d="M-12 -1.5 H12 M-12 1.5 H12" stroke={s} strokeWidth="0.8" opacity="0.6" />
    </g>
  ),
  peanut: (c, s) => (
    <g>
      <ellipse cx="-4" rx="5.5" ry="5" fill={c} stroke={s} strokeWidth="1" />
      <ellipse cx="4.5" rx="5" ry="4.6" fill={c} stroke={s} strokeWidth="1" />
    </g>
  ),
  cashew: (c, s) => <path d="M-8 -4 Q-9 6 0 7 Q8 7 8 1 Q5 4 1 3 Q-4 2 -3 -4 Z" fill={c} stroke={s} strokeWidth="1" />,
  diamond: (c, s) => <path d="M0 -9 L8 0 L0 9 L-8 0Z" fill={c} stroke={s} strokeWidth="1.2" strokeLinejoin="round" />,
  flake: (c, s) => <path d="M-8 -3 L-2 -6 L7 -4 L8 3 L1 6 L-7 4Z" fill={c} stroke={s} strokeWidth="0.8" strokeLinejoin="round" />,
  wheel: (c, s) => (
    <g>
      <circle r="10" fill="none" stroke={c} strokeWidth="3.2" />
      <path d="M0 -10V10M-10 0H10M-7 -7L7 7M-7 7L7 -7" stroke={c} strokeWidth="2" />
      <circle r="10" fill="none" stroke={s} strokeWidth="0.6" />
    </g>
  ),
  pipe: (c, s) => (
    <g>
      <rect x="-14" y="-5" width="28" height="10" rx="2" fill={c} stroke={s} strokeWidth="1" />
      <ellipse cx="14" rx="2.5" ry="5" fill={s} opacity="0.45" />
    </g>
  ),
  triangle: (c, s) => (
    <g>
      <path d="M0 -11 L11 8 L-11 8Z" fill={c} stroke={s} strokeWidth="1" strokeLinejoin="round" />
      <circle cy="2" r="2.6" fill="#ffffff" opacity="0.85" />
    </g>
  ),
  penne: (c, s) => (
    <g>
      <path d="M-14 4 L-8 -5 L14 -5 L8 4Z" fill={c} stroke={s} strokeWidth="1" strokeLinejoin="round" />
      <path d="M-7 -5 L-13 4 M0 -5 L-6 4 M7 -5 L1 4" stroke={s} strokeWidth="0.7" opacity="0.6" />
    </g>
  ),
  papad: (c, s) => (
    <g>
      <circle r="13" fill={c} stroke={s} strokeWidth="1" />
      <circle cx="-4" cy="-3" r="1.2" fill={s} opacity="0.5" />
      <circle cx="4" cy="2" r="1.2" fill={s} opacity="0.5" />
      <circle cx="-1" cy="6" r="1.2" fill={s} opacity="0.5" />
      <circle cx="5" cy="-6" r="1.2" fill={s} opacity="0.5" />
    </g>
  ),
  noodle: (c) => <path d="M-14 0 q3 -7 6 0 t6 0 t6 0 t6 0" fill="none" stroke={c} strokeWidth="2.6" strokeLinecap="round" />,
  star: (c, s) => <path d="M0 -10 L2.9 -3.1 L10 -3.1 L4.3 1.4 L6.5 8.5 L0 4.3 L-6.5 8.5 L-4.3 1.4 L-10 -3.1 L-2.9 -3.1Z" fill={c} stroke={s} strokeWidth="1" strokeLinejoin="round" />,
  fish: (c, s) => <path d="M-10 0 Q-2 -8 7 0 Q-2 8 -10 0Z M7 0 L13 -5 L13 5Z" fill={c} stroke={s} strokeWidth="1" strokeLinejoin="round" />,
  katori: (c, s) => (
    <g>
      <path d="M-11 -3 H11 Q10 8 0 9 Q-10 8 -11 -3Z" fill={c} stroke={s} strokeWidth="1" strokeLinejoin="round" />
      <ellipse cy="-3" rx="11" ry="2.4" fill="#ffffff" opacity="0.6" stroke={s} strokeWidth="0.8" />
    </g>
  ),
}

// Per-product recipe: background, outline colour, and a list of [shape, colour, weight].
const ART = {
  'vagharela-mamara': { bg: ['#FEF3C7', '#FDE68A'], s: '#C9A14A', mix: [['puff', '#F7DC8C', 9], ['leaf', null, 1]] },
  'masala-mamara': { bg: ['#FFEDD5', '#FDBA74'], s: '#B45309', mix: [['puff', '#F4A261', 1]] },
  'garlic-mamara': { bg: ['#FEFCE8', '#FEF08A'], s: '#BFA15A', mix: [['puff', '#FBF3D5', 1]] },
  'bhavnagri-gathiya': { bg: ['#FEF3C7', '#FCD34D'], s: '#B7791F', mix: [['gathiya', '#F2C66D', 1]] },
  'ratlami-sev': { bg: ['#FFEDD5', '#FB923C'], s: '#9A3412', mix: [['sev', '#D9822B', 1]] },
  'indori-sev': { bg: ['#FEF9C3', '#FDE047'], s: '#A16207', mix: [['sev', '#EAB308', 1]] },
  'garlic-sev': { bg: ['#FEF3C7', '#FDE68A'], s: '#A16207', mix: [['sev', '#E3B04B', 1]] },
  'kaju-mix-chavana': { bg: ['#FFEDD5', '#FDBA74'], s: '#9A3412', mix: [['sev', '#E09A3E', 3], ['cashew', '#F5E6C8', 2], ['peanut', '#C2763A', 2]] },
  'khatta-mitha-chavana': { bg: ['#FFE4E6', '#FDBA74'], s: '#9A3412', mix: [['sev', '#E39B3A', 3], ['peanut', '#B9652F', 2], ['flake', '#F5DFA9', 2]] },
  'sing-bhujiya': { bg: ['#FFEDD5', '#F97316'], s: '#7C2D12', mix: [['peanut', '#D9792E', 1]] },
  sakkarpara: { bg: ['#FEF3C7', '#FBBF24'], s: '#A16207', mix: [['diamond', '#F6CF7A', 1]] },
  'farali-chiwda-mitha': { bg: ['#FEFCE8', '#FDE68A'], s: '#A16207', mix: [['flake', '#FBEFC9', 3], ['peanut', '#C98A4B', 1], ['cashew', '#F8EAD0', 1]] },
  'farali-chiwda-tikha': { bg: ['#FEF3C7', '#FCA5A5'], s: '#9A3412', mix: [['flake', '#F8E3A8', 3], ['peanut', '#B8622C', 1], ['leaf', null, 1]] },
  'fryums-wheels': { bg: ['#FCE7F3', '#FDE68A'], s: '#9D7A8A', mix: [['wheel', 'multi', 1]] },
  'fryums-pipe': { bg: ['#ECFCCB', '#FBCFE8'], s: '#8A8F6A', mix: [['pipe', 'multi', 1]] },
  'fryums-triangle': { bg: ['#FEF9C3', '#DDD6FE'], s: '#8B8064', mix: [['triangle', 'multi', 1]] },
  'fryums-penne': { bg: ['#FFEDD5', '#BBF7D0'], s: '#8A7A5C', mix: [['penne', 'multi', 1]] },
  'fryums-khichiya-papad': { bg: ['#FEFCE8', '#E7E5E4'], s: '#A8A29E', mix: [['papad', '#FBF7EC', 1]] },
  'fryums-noodles': { bg: ['#FCE7F3', '#FEF08A'], s: '#9D7A8A', mix: [['noodle', 'multi', 1]] },
  'fryums-mix-animal': { bg: ['#E0F2FE', '#FBCFE8'], s: '#7C8A9A', mix: [['star', 'multi', 1], ['fish', 'multi', 1]] },
  'fryums-katori': { bg: ['#FEF3C7', '#FBCFE8'], s: '#8B7A64', mix: [['katori', 'multi', 1]] },
  'fryums-abcd': { bg: ['#EDE9FE', '#FEF08A'], s: '#6B6390', mix: [['letter', 'multi', 1]] },
}

const LETTERS = ['A', 'B', 'C', 'D']

export default function ProductArt({ id, name, className = '' }) {
  const art = ART[id] || { bg: ['#F1F5F9', '#E2E8F0'], s: '#94A3B8', mix: [['puff', '#CBD5E1', 1]] }
  const r = rng(hash(id))
  const pool = art.mix.flatMap(([shape, colour, w]) => Array(w).fill([shape, colour]))
  const big = ['papad', 'wheel', 'katori', 'gathiya', 'triangle'].includes(art.mix[0][0])
  const cols = big ? 6 : 8
  const rows = big ? 3 : 4
  const items = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const [shape, colour] = pool[Math.floor(r() * pool.length)]
      const fill = colour === 'multi' ? FRYUM_COLOURS[Math.floor(r() * FRYUM_COLOURS.length)] : colour
      const x = ((col + 0.5) * W) / cols + (r() - 0.5) * (W / cols) * 0.55
      const y = ((row + 0.5) * H) / rows + (r() - 0.5) * (H / rows) * 0.55
      const rot = Math.round(r() * 360)
      const scale = (big ? 1.3 : 1.25) * (0.85 + r() * 0.35)
      items.push({ shape, fill, x, y, rot, scale, k: `${row}-${col}` })
    }
  }
  const gid = `g-${id}`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Illustration: ${name}`} className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={art.bg[0]} />
          <stop offset="1" stopColor={art.bg[1]} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${gid})`} />
      {items.map((it) => (
        <g key={it.k} transform={`translate(${it.x.toFixed(1)} ${it.y.toFixed(1)}) rotate(${it.rot}) scale(${it.scale.toFixed(2)})`}>
          {it.shape === 'letter' ? (
            <text textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="800" fontFamily="ui-rounded, system-ui, sans-serif" fill={it.fill} stroke={art.s} strokeWidth="0.8">
              {LETTERS[(it.k.length + Math.round(it.x)) % 4]}
            </text>
          ) : (
            SHAPES[it.shape](it.fill, art.s)
          )}
        </g>
      ))}
    </svg>
  )
}
