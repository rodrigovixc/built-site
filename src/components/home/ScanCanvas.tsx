import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Vec = [number, number, number]
type Box = [x0: number, z0: number, x1: number, z1: number, y0: number, y1: number]

/** Volumetria: pódio, duas torres e laje de cobertura. */
const BOXES: Box[] = [
  [-3, -2, 3, 2, 0, 1.2],
  [-2.6, -1.6, -0.2, 1.6, 1.2, 5.2],
  [0.4, -1.6, 2.6, 0.6, 1.2, 3.6],
  [-2.8, -1.8, 0, 1.8, 5.2, 5.45],
]

type Edge = { a: Vec; b: Vec; floor: boolean }
type Point = { target: Vec; start: Vec; delay: number }

function buildGeometry() {
  const edges: Edge[] = []
  const points: Point[] = []
  const rnd = (m: number, n: number) => m + Math.random() * (n - m)

  for (const [a, b, c, d, y0, y1] of BOXES) {
    const v: Vec[] = [
      [a, y0, b], [c, y0, b], [c, y0, d], [a, y0, d],
      [a, y1, b], [c, y1, b], [c, y1, d], [a, y1, d],
    ]
    const pairs = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]
    for (const [i, j] of pairs) edges.push({ a: v[i], b: v[j], floor: false })
    for (let fy = y0 + 0.6; fy < y1 - 0.1; fy += 0.6) {
      const ring: Vec[] = [[a, fy, b], [c, fy, b], [c, fy, d], [a, fy, d]]
      ring.forEach((p, i) => edges.push({ a: p, b: ring[(i + 1) % 4], floor: true }))
    }
    // Pontos nas fachadas: a "nuvem" do levantamento laser.
    const n = Math.round((c - a + d - b) * (y1 - y0) * 14)
    for (let i = 0; i < n; i++) {
      const face = Math.floor(Math.random() * 4)
      const y = rnd(y0, y1)
      const target: Vec =
        face === 0 ? [rnd(a, c), y, b] : face === 1 ? [c, y, rnd(b, d)] : face === 2 ? [rnd(a, c), y, d] : [a, y, rnd(b, d)]
      points.push({ target, start: [rnd(-9, 9), rnd(-2, 9), rnd(-9, 9)], delay: Math.random() })
    }
  }
  return { edges, points }
}

const ease = (k: number) => (k <= 0 ? 0 : k >= 1 ? 1 : 1 - Math.pow(1 - k, 3))

/**
 * Scan-to-BIM: uma nuvem de pontos assenta nas fachadas e dá lugar
 * ao modelo em arame, que roda devagar sobre a grelha.
 */
export function ScanCanvas({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const { edges, points } = buildGeometry()
    let W = 0, H = 0, cx = 0, cy = 0, sc = 1, frame = 0
    const t0 = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const wide = W > 900
      cx = wide ? W * 0.72 : W * 0.5
      cy = wide ? H * 0.72 : H * 0.55
      sc = Math.min(W, H) * (wide ? 0.075 : 0.06)
    }

    const project = ([x, y, z]: Vec, r: number): [number, number] => {
      const cs = Math.cos(r), sn = Math.sin(r)
      const X = x * cs - z * sn, Z = x * sn + z * cs
      return [cx + (X - Z) * 0.87 * sc, cy + (X + Z) * 0.5 * sc - y * sc]
    }

    const draw = (now: number) => {
      const t = (now - t0) / 1000
      const ink = getComputedStyle(canvas).color.match(/\d+/g)?.slice(0, 3).join(',') ?? '11,22,65'
      const r = reduce ? 0.6 : 0.6 + t * 0.08
      const k = reduce ? 1 : ease((t - 0.3) / 3.2)
      const w = reduce ? 1 : ease((t - 2.6) / 2.4)

      ctx.clearRect(0, 0, W, H)

      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(35,85,232,.08)'
      for (let i = -8; i <= 8; i++) {
        const [a, b, c, d] = [project([i, 0, -8], r), project([i, 0, 8], r), project([-8, 0, i], r), project([8, 0, i], r)]
        ctx.beginPath()
        ctx.moveTo(...a); ctx.lineTo(...b); ctx.moveTo(...c); ctx.lineTo(...d)
        ctx.stroke()
      }

      for (const p of points) {
        const e = ease(k * 1.15 - p.delay * 0.15)
        const q: Vec = [0, 1, 2].map((i) => p.start[i] + (p.target[i] - p.start[i]) * e) as Vec
        const [sx, sy] = project(q, r)
        const g = q[1] / 5.4
        ctx.fillStyle = `rgba(${Math.round(28 + 6 * g)},${Math.round(167 + 9 * g)},${Math.round(236 - 100 * g)},${0.35 + 0.45 * k * (1 - w * 0.45)})`
        ctx.fillRect(sx, sy, 1.6, 1.6)
      }

      if (w > 0) {
        for (const { a, b, floor } of edges) {
          const A = project(a, r), B = project(b, r)
          ctx.strokeStyle = floor ? `rgba(28,167,236,${0.35 * w})` : `rgba(${ink},${0.85 * w})`
          ctx.lineWidth = floor ? 0.8 : 1.2
          ctx.beginPath()
          ctx.moveTo(...A)
          ctx.lineTo(A[0] + (B[0] - A[0]) * w, A[1] + (B[1] - A[1]) * w)
          ctx.stroke()
        }
        if (!reduce) {
          const sy = (t * 0.7) % 6.5
          ctx.strokeStyle = 'rgba(34,176,125,.8)'
          ctx.lineWidth = 1.4
          ctx.beginPath()
          const ring: Vec[] = [[-3.2, sy, -2.2], [3.2, sy, -2.2], [3.2, sy, 2.2], [-3.2, sy, 2.2], [-3.2, sy, -2.2]]
          ring.forEach((p, i) => (i ? ctx.lineTo(...project(p, r)) : ctx.moveTo(...project(p, r))))
          ctx.stroke()
        }
      }

      ctx.fillStyle = `rgba(${ink},.5)`
      ctx.font = '500 11px "Plus Jakarta Sans", sans-serif'
      const [lx, ly] = project([3, 5.2, 2], r)
      ctx.fillText('LOD 300 · IFC', lx + 12, ly)

      if (!reduce) frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [reduce])

  return <canvas ref={ref} aria-hidden="true" className={`text-ink ${className}`} />
}
