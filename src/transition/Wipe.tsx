import type { CSSProperties } from 'react'
import { TRANSITION } from './config'
import type { Direction, Phase } from './config'

type WipeStyle = CSSProperties & {
  '--wipe-angle': string
  '--wipe-cover': string
  '--wipe-reveal': string
}

type BandStyle = CSSProperties & {
  '--in-delay': string
  '--out-delay': string
  '--edge': string
}

const BANDS = [0, 1, 2] as const

type WipeProps = {
  readonly phase: Phase
  readonly direction: Direction
  readonly onSkip: () => void
}

/**
 * 3本の帯によるワイプ（docs/MOTION.md §4）。
 * 帯は3枚。stagger ずつズラし、白い先端フチをつける。
 */
export function Wipe({ phase, direction, onSkip }: WipeProps) {
  const wipeStyle: WipeStyle = {
    '--wipe-angle': `${TRANSITION.angle}deg`,
    '--wipe-cover': `${TRANSITION.cover}ms`,
    '--wipe-reveal': `${TRANSITION.reveal}ms`,
  }

  return (
    <div
      className="wipe"
      style={wipeStyle}
      data-phase={phase}
      data-direction={direction}
      onClick={onSkip}
      aria-hidden="true"
    >
      {BANDS.map((index) => {
        const style: BandStyle = {
          '--in-delay': `${index * TRANSITION.stagger}ms`,
          '--out-delay': `${(BANDS.length - 1 - index) * TRANSITION.stagger}ms`,
          '--edge': `${4 - index}px`,
        }

        return (
          <span
            key={index}
            className={`wipe__band wipe__band--${index + 1}`}
            style={style}
          />
        )
      })}
    </div>
  )
}
