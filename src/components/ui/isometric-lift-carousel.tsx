"use client"

import * as React from "react"

/**
 * Isometric Lift Carousel — a row of portrait photos standing on edge, seen
 * from above and to the side like cards in a file box. The chosen one widens
 * and lifts out of the row; the rest stay standing.
 *
 * Pure CSS 3D: the row is tilted once (rotateX / rotateY), each card is turned
 * a quarter round inside it, and each slot is pushed forward in Z by its place
 * in the line so the left edge of every card stays clickable. The lift and the
 * widening ride a spring baked into a CSS `linear()` easing, so nothing runs
 * per frame in JavaScript.
 *
 * React is the only import.
 */

export type IsometricLiftItem = {
  title: string
  /** Image URL. Without one the card is a soft gradient. */
  src?: string
  alt?: string
  /** Intrinsic width ÷ height. The card keeps this ratio and uses the shared width. */
  ratio?: number
}

export type IsometricLiftCarouselProps = {
  items: IsometricLiftItem[]
  /** Root height. **Must be a definite length.** */
  height?: string
  /** Width of a standing card, any CSS length. */
  cardWidth?: string
  /** Width of the lifted card, any CSS length. */
  activeWidth?: string
  /** How far the chosen card rises, px. */
  lift?: number
  /** Gap between cards, px. In a flat skewed row this is the vertical step. */
  gap?: number
  /** Horizontal overlap in a flat skewed row, px. Defaults to `gap`. */
  gapX?: number
  /** How far each card sits forward of the next, px. */
  depth?: number
  /** Tilt of the whole row, degrees. Ignored when `skew` is set. */
  tiltX?: number
  rotateY?: number
  /**
   * Flat row: no row rotation. Each card is skewed by this many degrees
   * (vertical edges stay vertical). `gap` is the vertical step and `gapX` the
   * horizontal overlap. The leftmost card paints on top.
   */
  skew?: number
  /** Card corner radius in px. */
  radius?: number
  /** Spring bounce, 0 (none) to about 0.5. */
  bounce?: number
  /** Roughly how long a move takes, in seconds. */
  duration?: number
  /** The chosen card's title, above the controls. */
  titles?: boolean
  /** The prev / dots / next pill. */
  controls?: boolean
  /** Root background, any CSS colour or gradient. */
  background?: string
  /** Text, dots and buttons. Defaults to the theme's foreground. */
  color?: string
  fontFamily?: string
  /** A stylesheet to load for `fontFamily`, e.g. a Google Fonts URL. Nothing loads by default. */
  fontHref?: string | null
  index?: number
  defaultIndex?: number
  onIndexChange?: (index: number) => void
  /** Clicking the card that's already lifted. */
  onSelect?: (item: IsometricLiftItem, index: number) => void
  /** No card is lifted until one is hovered. Leaving the row drops it back. */
  activateOnHover?: boolean
  ariaLabel?: string
  className?: string
}

// #region spring
/**
 * Step response of a spring, in the same terms as motion's `bounce` and
 * `duration`: damping ratio 1 - bounce, natural period `duration`.
 */
export function springAt(t: number, bounce: number, duration: number): number {
  const zeta = 1 - Math.min(Math.max(bounce, 0), 0.9)
  const w = (2 * Math.PI) / Math.max(duration, 0.05)
  if (zeta >= 1) return 1 - Math.exp(-w * t) * (1 + w * t)
  const wd = w * Math.sqrt(1 - zeta * zeta)
  return 1 - Math.exp(-zeta * w * t) * (Math.cos(wd * t) + ((zeta * w) / wd) * Math.sin(wd * t))
}

/** How long the spring takes to settle within 0.1% and stay there, seconds. */
export function settleTime(bounce: number, duration: number): number {
  const zeta = 1 - Math.min(Math.max(bounce, 0), 0.9)
  const w = (2 * Math.PI) / Math.max(duration, 0.05)
  // the envelope e^(-zeta w t) bounds every later wobble
  return Math.log(1000) / (zeta * w)
}

/** The spring as a CSS easing: `linear(...)` sampled over its settle time. */
export function springEasing(bounce: number, duration: number, samples = 96): { easing: string; ms: number } {
  const T = settleTime(bounce, duration)
  const pts: string[] = []
  for (let k = 0; k <= samples; k++) {
    const v = k === samples ? 1 : springAt((k / samples) * T, bounce, duration)
    pts.push(+v.toFixed(5) + "")
  }
  return { easing: "linear(" + pts.join(", ") + ")", ms: Math.round(T * 1000) }
}

export function clampIndex(i: number, n: number): number {
  return n <= 0 ? 0 : Math.min(Math.max(Math.round(i), 0), n - 1)
}
// #endregion

const CSS =
  ".ilc-root{position:relative;overflow:hidden;display:grid;place-items:center;width:100%;" +
  "color:var(--color-foreground,#262626);user-select:none;-webkit-user-select:none;touch-action:pan-y;" +
  "outline:none;-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent}" +
  ".ilc-root:focus-visible{box-shadow:inset 0 0 0 2px var(--color-primary,#171717)}" +
  ".ilc-center{width:0;display:flex;justify-content:center}" +
  ".ilc-flat-root .ilc-center{width:0;height:auto}" +
  ".ilc-row{flex-shrink:0;height:400px;padding-bottom:80px;display:flex;justify-content:center;align-items:flex-end;" +
  "transform-style:preserve-3d}" +
  ".ilc-row.ilc-flat{transform:none;transform-style:flat;align-items:center;height:auto;width:max-content;padding-bottom:0;pointer-events:none}" +
  ".ilc-flat .ilc-card{pointer-events:auto}" +
  ".ilc-slot{height:0;margin-bottom:80px;flex-shrink:0;perspective:1200px;transform-style:preserve-3d;" +
  "display:flex;align-items:flex-end;justify-content:center}" +
  ".ilc-flat .ilc-slot{height:auto;margin-bottom:0;perspective:none;transform-style:flat;align-items:center}" +
  ".ilc-card{position:relative;display:block;margin:0;padding:0;border:0;aspect-ratio:3/4;overflow:visible;" +
  "cursor:pointer;background:transparent;box-shadow:none;filter:none;-webkit-filter:none;" +
  "-webkit-tap-highlight-color:transparent}" +
  ".ilc-card:focus-visible{outline:2px solid currentColor;outline-offset:3px}" +
  ".ilc-clip{position:absolute;inset:0;overflow:hidden;border-radius:inherit;transform:none;" +
  "box-shadow:none;filter:none;-webkit-filter:none}" +
  ".ilc-clip>img{position:absolute;inset:0;width:100%;height:100%;max-width:none;display:block;object-fit:cover;" +
  "object-position:center;pointer-events:none;box-shadow:none;filter:none;-webkit-filter:none}" +
  ".ilc-title{position:absolute;left:50%;bottom:76px;transform:translateX(-50%);white-space:nowrap;" +
  "font-size:13px;line-height:18px;letter-spacing:.01em;pointer-events:none;" +
  "color:color-mix(in oklab,currentColor 75%,transparent)}" +
  ".ilc-title>span{display:inline-block;animation:ilc-in .35s ease-out}" +
  "@keyframes ilc-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}" +
  ".ilc-controls{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);display:flex;align-items:center;" +
  "gap:16px;padding:0 8px;border-radius:999px;" +
  "background:color-mix(in oklab,currentColor 7%,transparent);" +
  "border:1px solid color-mix(in oklab,currentColor 12%,transparent);" +
  "-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);" +
  "box-shadow:0 1px 3px rgba(0,0,0,.08),0 1px 2px -1px rgba(0,0,0,.08)}" +
  ".ilc-btn{display:grid;place-items:center;margin:0;padding:8px;border:0;border-radius:999px;background:none;" +
  "color:inherit;cursor:pointer;transition:opacity .2s,transform .2s}" +
  ".ilc-btn:disabled{opacity:.3;cursor:default}" +
  ".ilc-btn:not(:disabled):active{transform:scale(.88)}" +
  ".ilc-btn:focus-visible,.ilc-dot:focus-visible{outline:2px solid currentColor;outline-offset:2px}" +
  ".ilc-dots{min-width:180px;display:flex;justify-content:center;align-items:center;gap:8px}" +
  ".ilc-dot{position:relative;width:8px;height:8px;margin:0;padding:0;border:0;border-radius:999px;" +
  "background:currentColor;opacity:.3;cursor:pointer;transition:width .3s,opacity .3s}" +
  ".ilc-dot::after{content:\"\";position:absolute;inset:-10px -4px}" +
  ".ilc-dot[aria-current]{width:28px;opacity:1}" +
  ".ilc-count{font-size:13px;font-variant-numeric:tabular-nums}" +
  "@media (max-width:640px){.ilc-center{scale:.85}}" +
  ".ilc-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}" +
  "@media (prefers-reduced-motion:reduce){.ilc-card{transition:none !important}" +
  ".ilc-title>span{animation:none}.ilc-dot,.ilc-btn{transition:none}}"

function Chevron({ dir }: { dir: -1 | 1 }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ maxWidth: "none" }}>
      <path d={dir < 0 ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  )
}

const pad = (n: number) => (n < 10 ? "0" + n : "" + n)

// A photo-less card: a quiet two-stop gradient, its hue spread by position.
const blank = (i: number) => {
  const h = (i * 47 + 200) % 360
  return "linear-gradient(160deg, hsl(" + h + " 32% 82%), hsl(" + ((h + 40) % 360) + " 28% 62%))"
}

export default function IsometricLiftCarousel({
  items,
  height = "100svh",
  cardWidth = "clamp(80px, 10vw, 120px)",
  activeWidth = "clamp(120px, 15vw, 180px)",
  lift = 150,
  gap = 12,
  gapX,
  depth = 20,
  tiltX = -10,
  rotateY = 50,
  skew,
  radius = 0,
  bounce = 0.25,
  duration = 0.6,
  titles = false,
  controls = true,
  color,
  background = "color-mix(in oklab, var(--color-foreground, #000) 7%, var(--color-background, #fff))",
  fontFamily = '"Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif',
  fontHref = null,
  index,
  defaultIndex = 2,
  onIndexChange,
  onSelect,
  activateOnHover = false,
  ariaLabel = "Photo carousel",
  className = "",
}: IsometricLiftCarouselProps) {
  const n = items.length
  const [inner, setInner] = React.useState(clampIndex(index ?? defaultIndex, n))
  const [hovered, setHovered] = React.useState<number | null>(null)
  const active = activateOnHover ? hovered : index == null ? clampIndex(inner, n) : clampIndex(index, n)
  const spring = React.useMemo(() => springEasing(bounce, duration), [bounce, duration])
  const swipe = React.useRef({ id: -1, x: 0, done: false })

  const go = (i: number) => {
    const next = clampIndex(i, n)
    if (next === active) return
    setInner(next)
    onIndexChange?.(next)
  }

  React.useEffect(() => {
    if (!fontHref) return
    const exists = Array.from(document.querySelectorAll("link[rel=stylesheet]")).some(
      (l) => (l as HTMLLinkElement).href === fontHref,
    )
    if (exists) return
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = fontHref
    link.setAttribute("data-isometric-lift-font", "")
    document.head.appendChild(link)
  }, [fontHref])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (activateOnHover && (e.key === "Escape" || e.key === "Tab")) return
    const base = active ?? -1
    let to = -1
    if (e.key === "ArrowRight" || e.key === "ArrowDown") to = base + 1
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") to = base - 1
    else if (e.key === "Home") to = 0
    else if (e.key === "End") to = n - 1
    else return
    e.preventDefault()
    if (activateOnHover) setHovered(clampIndex(to, n))
    else go(to)
  }

  // A sideways swipe steps once; a tap falls through to the card's click.
  const onPointerDown = (e: React.PointerEvent) => {
    swipe.current = { id: e.pointerId, x: e.clientX, done: false }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const s = swipe.current
    if (s.id !== e.pointerId || s.done) return
    const dx = e.clientX - s.x
    if (Math.abs(dx) > 40) {
      s.done = true
      if (!activateOnHover) go((active ?? 0) + (dx < 0 ? 1 : -1))
    }
  }
  const onPointerEnd = () => {
    swipe.current.id = -1
    // the click that ends a swipe is swallowed; the next one isn't
    window.setTimeout(() => {
      swipe.current.done = false
    }, 0)
  }

  const transition =
    "width " + spring.ms + "ms " + spring.easing + ", transform " + spring.ms + "ms " + spring.easing
  const current = active == null ? undefined : items[active]
  // Flat stack: the upward steps and the skew sit outside the cards' layout
  // boxes. Pad the row by exactly that overflow so the box hugs the paint,
  // and the centered root can put that box in the middle of the viewport.
  const flatPad =
    skew == null
      ? null
      : (() => {
          const step = Math.abs(gap)
          const ratios = items.map((item) => item.ratio ?? 4 / 3)
          const maxRatio = Math.max(...ratios, 0)
          const rises = ratios.map(
            (ratio, i) =>
              "calc(" + i * step + "px - " + (maxRatio - ratio) / 2 + " * (" + cardWidth + "))",
          )
          const shear = "calc(tan(" + skew + "deg) * (" + cardWidth + ") / 2)"
          return {
            paddingTop: "calc(max(0px, " + rises.join(", ") + ") + " + shear + ")",
            paddingBottom: shear,
          }
        })()

  return (
    <div
      className={"ilc-root" + (skew == null ? "" : " ilc-flat-root") + (className ? " " + className : "")}
      style={{ height, background, color, fontFamily }}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
    >
      <style>{CSS}</style>

      {/* zero-width, so a row wider than the screen overflows both sides evenly */}
      <div className="ilc-center">
        <div
          className={"ilc-row" + (skew == null ? "" : " ilc-flat")}
          style={{
            gap: skew == null ? gap : 0,
            transform: skew == null ? "rotateX(" + tiltX + "deg) rotateY(" + rotateY + "deg)" : "none",
            ...flatPad,
          }}
          onMouseLeave={() => {
            if (activateOnHover) setHovered(null)
          }}
          onBlur={(e) => {
            if (!activateOnHover) return
            const next = e.relatedTarget
            if (!(next instanceof Node) || !e.currentTarget.contains(next)) setHovered(null)
          }}
        >
          {items.map((item, i) => {
            const isActive = i === active
            return (
              <div
                key={i}
                className="ilc-slot"
                // pushing each slot forward keeps the left edge of every card clickable
                style={{
                  transform:
                    skew == null
                      ? "translateZ(" + (n - i) * depth + "px) translateX(-150px)"
                      : "translateY(" + i * gap + "px)",
                  marginLeft: skew != null && i > 0 ? (gapX ?? gap) : undefined,
                  zIndex: skew == null ? (isActive ? n + 1 : i) : n - i,
                }}
              >
                <button
                  type="button"
                  className="ilc-card"
                  aria-label={i + 1 + " of " + n + ": " + item.title}
                  aria-current={isActive ? "true" : undefined}
                  tabIndex={activateOnHover || isActive ? 0 : -1}
                  onMouseEnter={() => {
                    if (activateOnHover) setHovered(i)
                  }}
                  onMouseLeave={() => {
                    if (!activateOnHover) return
                    setHovered((current) => (current === i ? null : current))
                  }}
                  onFocus={() => {
                    if (activateOnHover) setHovered(i)
                  }}
                  onClick={() => {
                    if (swipe.current.done) return
                    if (activateOnHover) {
                      onSelect?.(item, i)
                      return
                    }
                    if (isActive) onSelect?.(item, i)
                    else go(i)
                  }}
                  style={{
                    ...(item.ratio
                      ? {
                          width: cardWidth,
                          height: "auto",
                          aspectRatio: String(item.ratio),
                        }
                      : { width: activateOnHover || !isActive ? cardWidth : activeWidth }),
                    borderRadius: radius,
                    transform:
                      skew == null
                        ? "rotateY(-90deg) translateY(" + (isActive ? -lift : 0) + "px)"
                        : "translateY(" + (isActive ? -lift : 0) + "px) skewY(" + skew + "deg)",
                    transition,
                    background: item.src ? undefined : blank(i),
                  }}
                >
                  {item.src ? (
                    <span className="ilc-clip">
                      <img src={item.src} alt={item.alt ?? item.title} draggable={false} decoding="async" width={360} height={480} style={{ maxWidth: "none" }} />
                    </span>
                  ) : null}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {titles && current ? (
        <div className="ilc-title" aria-hidden="true">
          <span key={active}>{current.title}</span>
        </div>
      ) : null}

      {controls && n > 1 ? (
        <div className="ilc-controls" onPointerDown={(e) => e.stopPropagation()}>
          <button type="button" className="ilc-btn" aria-label="Previous slide" disabled={(active ?? 0) <= 0} onClick={() => go((active ?? 0) - 1)}>
            <Chevron dir={-1} />
          </button>
          <div className="ilc-dots">
            {n > 14 ? (
              <span className="ilc-count">
                {pad((active ?? 0) + 1)} / {pad(n)}
              </span>
            ) : (
              items.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  className="ilc-dot"
                  aria-label={"Go to slide " + (i + 1) + ": " + item.title}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => go(i)}
                />
              ))
            )}
          </div>
          <button type="button" className="ilc-btn" aria-label="Next slide" disabled={(active ?? 0) >= n - 1} onClick={() => go((active ?? 0) + 1)}>
            <Chevron dir={1} />
          </button>
        </div>
      ) : null}

      <div className="ilc-sr" aria-live="polite" aria-atomic="true">
        {current ? "Slide " + ((active ?? 0) + 1) + " of " + n + ": " + current.title : ""}
      </div>
    </div>
  )
}
