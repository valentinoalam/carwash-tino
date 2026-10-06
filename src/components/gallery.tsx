'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion, type Transition } from 'motion/react'
import { Car, ChevronLeft, ChevronRight, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { images } from '@/data/gallery'

/* -------------------------------------------------------------------------- */
/*  Types & constants                                                          */
/* -------------------------------------------------------------------------- */

type GalleryImage = { src: string; alt: string }
type Phase = 'idle' | 'stacking' | 'open' | 'closing'
type Box = { x: number; y: number; size: number; visible: boolean }

/** Ukuran thumbnail statis (px). */
const THUMB = 96
const THUMB_RADIUS = 10
const PREVIEW_RADIUS = 24

const STAGGER = 0.035
const STAGGER_CAP = 0.3
const STACK_DUR = 0.45
const CLOSE_STAGGER = 0.025
const CLOSE_CAP = 0.2
const CLOSE_DUR = 0.45

const STACK_MS = Math.round((STAGGER_CAP + STACK_DUR) * 1000) + 120
const CLOSE_MS = Math.round((CLOSE_CAP + CLOSE_DUR) * 1000) + 40

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
const EASE_DEAL: [number, number, number, number] = [0.32, 0.72, 0, 1]

// async function getImages(signal?: AbortSignal): Promise<GalleryImage[]> {
//   const response = await fetch('/api/gallery', { signal })
//   if (!response.ok) throw new Error('Failed to fetch gallery images')
//   return response.json()
// }

/* -------------------------------------------------------------------------- */
/*  Gallery                                                                    */
/* -------------------------------------------------------------------------- */

function Gallery() {
  const reduceMotion = !!useReducedMotion()
  // const [images, setImages] = useState<GalleryImage[]>([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(false)
  // const [attempt, setAttempt] = useState(0)

  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')
  const [boxes, setBoxes] = useState<Box[]>([])

  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])
  const returnFocus = useRef(false)

  /* ---- data ---- */
  // useEffect(() => {
  //   function init() {
  //     setLoading(true)
  //     setError(false)
  //   }

  //   const controller = new AbortController()
  //   init()
  //   getImages(controller.signal)
  //     .then(setImages)
  //     .catch((e) => {
  //       if (e?.name === 'AbortError') return
  //       console.error('Failed to fetch gallery images:', e)
  //       setError(true)
  //     })
  //     .finally(() => {
  //       if (!controller.signal.aborted) setLoading(false)
  //     })
  //   return () => controller.abort()
  // }, [attempt])

  /* ---- ukur posisi tiap thumbnail (koordinat viewport) ---- */
  const measure = useCallback((): Box[] => {
    const track = trackRef.current?.getBoundingClientRect()
    return Array.from({ length: images.length }, (_, i) => {
      const r = thumbRefs.current[i]?.getBoundingClientRect()
      if (!r || !track) return { x: 0, y: 0, size: THUMB, visible: false }
      const visible =
        r.right > track.left + 4 &&
        r.left < track.right - 4 &&
        r.bottom > track.top &&
        r.top < track.bottom
      return { x: r.left, y: r.top, size: r.width, visible }
    })
  }, [])

  /* ---- buka / tutup ---- */
  const openAt = (i: number) => {
    setBoxes(measure())
    setSelected(i)
    setPhase(reduceMotion ? 'open' : 'stacking')
  }

  const close = useCallback(() => {
    if (phase !== 'open') return
    returnFocus.current = true
    setBoxes(measure()) // ukur ulang: carousel mungkin sudah bergeser
    setPhase(reduceMotion ? 'idle' : 'closing')
  }, [phase, measure, reduceMotion])

  useEffect(() => {
    if (phase === 'stacking') {
      const t = setTimeout(() => setPhase('open'), STACK_MS)
      return () => clearTimeout(t)
    }
    if (phase === 'closing') {
      const t = setTimeout(() => setPhase('idle'), CLOSE_MS)
      return () => clearTimeout(t)
    }
  }, [phase])

  // Saat berpindah gambar di preview, geser carousel di belakang layar
  // supaya thumbnail tujuan terlihat ketika kartu kembali ke barisnya.
  useEffect(() => {
    if (phase === 'open') api?.scrollTo(selected, true)
  }, [selected, phase, api])

  // Kembalikan fokus ke thumbnail setelah preview ditutup.
  useEffect(() => {
    if (phase === 'idle' && returnFocus.current) {
      returnFocus.current = false
      requestAnimationFrame(() => thumbRefs.current[selected]?.focus())
    }
  }, [phase, selected])

  const overlayOn = phase !== 'idle'

  /* ---- header ---- */
  const header = (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-baseline gap-2">
        <h2 className="text-xl font-bold text-gray-900">Gallery</h2>
        {/* {!loading && !error && images.length > 0 && (
          <span className="text-sm tabular-nums text-gray-400">{images.length} foto</span>
        )} */}
      </div>
      <Link href="#" className="text-sm font-medium text-blue-600 hover:underline">
        View All
      </Link>
    </div>
  )

  /* ---- loading ---- */
  // if (loading) {
  //   return (
  //     <div className="rounded-xl border border-gray-200 bg-white p-6">
  //       {header}
  //       <div className="flex gap-2 overflow-hidden" aria-busy="true" aria-label="Memuat galeri">
  //         {Array.from({ length: 6 }, (_, i) => (
  //           <div
  //             key={i}
  //             style={{ width: THUMB, height: THUMB, borderRadius: THUMB_RADIUS }}
  //             className="flex shrink-0 animate-pulse items-center justify-center bg-linear-to-br from-blue-100 to-blue-200"
  //           >
  //             <Car className="h-8 w-8 text-blue-400" />
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   )
  // }

  /* ---- error / kosong ---- */
  // if (error || images.length === 0) {
  //   return (
  //     <div className="rounded-xl border border-gray-200 bg-white p-6">
  //       {header}
  //       {/* <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 px-4 py-6 text-sm text-gray-600">
  //         <p>{error ? 'Galeri gagal dimuat.' : 'Belum ada foto di galeri.'}</p>
  //         {error && (
  //           <button
  //             type="button"
  //             onClick={() => setAttempt((a) => a + 1)}
  //             className="rounded-md bg-white px-3 py-1.5 font-medium text-blue-600 ring-1 ring-gray-200 hover:bg-blue-50"
  //           >
  //             Coba lagi
  //           </button>
  //         )}
  //       </div> */}
  //     </div>
  //   )
  // }

  /* ---- galeri ---- */
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      {header}
      <Car className="h-8 w-8 text-blue-400" />
      <div ref={trackRef}>
        <Carousel
          setApi={setApi}
          opts={{ align: 'start', dragFree: true, containScroll: 'trimSnaps' }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {images.map((img, i) => (
              <CarouselItem key={img.src} className="basis-auto pl-2">
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 24,
                    delay: Math.min(i * 0.04, 0.4),
                  }}
                >
                  <button
                    type="button"
                    ref={(el) => {
                      thumbRefs.current[i] = el
                    }}
                    onClick={() => openAt(i)}
                    aria-haspopup="dialog"
                    aria-label={`Perbesar foto: ${img.alt}`}
                    style={{
                      width: THUMB,
                      height: THUMB,
                      borderRadius: THUMB_RADIUS,
                      visibility: overlayOn ? 'hidden' : 'visible',
                    }}
                    className="group relative block shrink-0 overflow-hidden bg-blue-100 outline-none ring-1 ring-black/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes={`${THUMB}px`}
                      draggable={false}
                      className="select-none object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </button>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-1 size-8 border-gray-200 bg-white/95 shadow-md disabled:pointer-events-none disabled:opacity-0" />
          <CarouselNext className="right-1 size-8 border-gray-200 bg-white/95 shadow-md disabled:pointer-events-none disabled:opacity-0" />
        </Carousel>
      </div>

      {overlayOn &&
        createPortal(
          <PreviewDeck
            images={images}
            boxes={boxes}
            selected={selected}
            phase={phase}
            reduceMotion={reduceMotion}
            onSelect={setSelected}
            onClose={close}
          />,
          document.body,
        )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  PreviewDeck: thumbnail ditarik jadi tumpukan, lalu kartu teratas membuka    */
/* -------------------------------------------------------------------------- */

interface PreviewDeckProps {
  images: GalleryImage[]
  boxes: Box[]
  selected: number
  phase: Phase
  reduceMotion: boolean
  onSelect: (i: number) => void
  onClose: () => void
}

function PreviewDeck({
  images,
  boxes,
  selected,
  phase,
  reduceMotion,
  onSelect,
  onClose,
}: PreviewDeckProps) {
  const n = images.length
  const [vp, setVp] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Kunci scroll tanpa menggeser layout (kompensasi lebar scrollbar).
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [])

  const go = useCallback(
    (delta: number) => onSelect((selected + delta + n) % n),
    [selected, n, onSelect],
  )

  // Fokus ke tombol tutup saat preview terbuka.
  useEffect(() => {
    if (phase === 'open') closeRef.current?.focus()
  }, [phase])

  // Keyboard: Esc, panah, dan focus trap.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== 'open') return
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'Tab') {
        const items = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])')
        if (!items?.length) return
        const first = items[0]
        const last = items[items.length - 1]
        const active = document.activeElement
        if (!dialogRef.current?.contains(active)) {
          e.preventDefault()
          first.focus()
        } else if (e.shiftKey && active === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, go, onClose])

  /* ---- geometri ---- */
  const P = Math.max(240, Math.round(Math.min(vp.w * 0.86, vp.h - 230, 560)))
  const cx = vp.w / 2
  const cy = (vp.h - 56) / 2

  const sel = boxes[selected]
  const pileCenter = sel
    ? { x: sel.x + sel.size / 2, y: sel.y + sel.size / 2 }
    : { x: cx, y: cy }
  const pileSize = sel?.size ?? THUMB

  // Semua kartu berukuran P x P dengan origin di tengah;
  // ukuran tampil diatur lewat scale.
  const place = (x: number, y: number, size: number, rotate = 0, opacity = 1, radius = THUMB_RADIUS) => {
    const scale = size / P
    return { x: x - P / 2, y: y - P / 2, scale, rotate, opacity, borderRadius: radius / scale }
  }

  const targetFor = (j: number, ph: Phase) => {
    const depth = (j - selected + n) % n

    if (ph === 'open') {
      if (depth === 0) return place(cx, cy, P, 0, 1, PREVIEW_RADIUS)
      const d = Math.min(depth, 4)
      const side = depth % 2 ? 1 : -1
      return place(
        cx + side * d * 10,
        cy - d * 6,
        P * (1 - d * 0.035),
        side * d * 2.2,
        depth <= 4 ? 1 : 0,
        PREVIEW_RADIUS,
      )
    }

    if (ph === 'stacking') {
      const d = Math.min(depth, 6)
      return place(
        pileCenter.x + ((j % 3) - 1) * 1.5,
        pileCenter.y + d * 2.5,
        pileSize,
        ((j % 5) - 2) * 1.8,
        1,
      )
    }

    // 'closing' dan posisi awal: kembali ke slot thumbnail masing-masing
    const b = boxes[j]
    if (b?.visible) return place(b.x + b.size / 2, b.y + b.size / 2, b.size, 0, 1)
    return place(pileCenter.x, pileCenter.y, pileSize, 0, 0)
  }

  const transitionFor = (j: number): Transition => {
    const rank = Math.abs(j - selected)
    if (reduceMotion) return { duration: 0 }
    if (phase === 'stacking')
      return { type: 'tween', ease: EASE_OUT, duration: STACK_DUR, delay: Math.min(rank * STAGGER, STAGGER_CAP) }
    if (phase === 'closing')
      return { type: 'tween', ease: EASE_DEAL, duration: CLOSE_DUR, delay: Math.min(rank * CLOSE_STAGGER, CLOSE_CAP) }
    return { type: 'spring', stiffness: 240, damping: 26 }
  }

  const current = images[selected]

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Pratinjau galeri"
      className="fixed inset-0 z-50"
    >
      {/* backdrop */}
      <motion.div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'closing' ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.35 }}
        onClick={onClose}
      />

      {/* kartu */}
      {images.map((img, j) => {
        const depth = (j - selected + n) % n
        const hiRes = j === selected || (phase === 'open' && depth <= 3)
        return (
          <motion.div
            key={img.src}
            aria-hidden="true"
            initial={targetFor(j, 'closing')}
            animate={targetFor(j, phase)}
            transition={transitionFor(j)}
            onClick={() => {
              if (phase === 'open' && depth > 0 && depth <= 4) onSelect(j)
            }}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: P,
              height: P,
              zIndex: n - depth,
              pointerEvents: phase === 'open' && depth > 0 && depth <= 4 ? 'auto' : 'none',
              cursor: 'pointer',
            }}
            className="overflow-hidden bg-slate-200 shadow-2xl shadow-black/40 ring-1 ring-white/10 will-change-transform"
          >
            <CardFace src={img.src} hiRes={hiRes} hiSizes={`${P}px`} />
          </motion.div>
        )
      })}

      {/* kontrol */}
      <AnimatePresence>
        {phase === 'open' && (
          <motion.button
            key="close"
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup pratinjau"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed right-4 top-4 z-60 flex size-11 items-center justify-center rounded-full bg-white/10 text-white outline-none ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="size-5" />
          </motion.button>
        )}

        {phase === 'open' && (
          <motion.div
            key="bar"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.25 }}
            style={{ top: cy + P / 2 + 20 }}
            className="fixed inset-x-0 z-60 flex justify-center px-4"
          >
            <div className="flex items-center gap-3 rounded-full bg-white/10 p-1.5 pr-4 ring-1 ring-white/15 backdrop-blur">
              <NavButton label="Foto sebelumnya" onClick={() => go(-1)}>
                <ChevronLeft className="size-5" />
              </NavButton>
              <NavButton label="Foto berikutnya" onClick={() => go(1)}>
                <ChevronRight className="size-5" />
              </NavButton>
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-w-0 max-w-[48vw] leading-tight"
              >
                <p className="truncate text-sm font-medium text-white">{current.alt}</p>
                <p className="text-xs tabular-nums text-white/60">
                  {selected + 1} dari {n}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="sr-only" aria-live="polite">
        {phase === 'open' ? `${current.alt}, ${selected + 1} dari ${n}` : ''}
      </p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Bagian kecil                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Lapisan bawah memakai `sizes` yang sama dengan thumbnail (sudah ada di cache),
 * lapisan atas resolusi penuh yang fade-in begitu selesai dimuat,
 * jadi kartu tidak pernah terlihat kosong saat terbang.
 */
function CardFace({ src, hiRes, hiSizes }: { src: string; hiRes: boolean; hiSizes: string }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      <Image src={src} alt="" fill sizes={`${THUMB}px`} draggable={false} className="select-none object-cover" />
      {hiRes && (
        <Image
          src={src}
          alt=""
          fill
          sizes={hiSizes}
          draggable={false}
          onLoad={() => setLoaded(true)}
          className={cn(
            'select-none object-cover transition-opacity duration-300',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
        />
      )}
    </>
  )
}

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white outline-none transition hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white active:scale-95"
    >
      {children}
    </button>
  )
}

export default Gallery