import { Chibi } from '../components/Chibi'
import type { Phase } from './config'

type TransitionCharacterProps = {
  readonly phase: Phase
  readonly label: string
}

/**
 * 遷移の中央に出るちびキャラと看板（docs/MOTION.md §5）。
 * hold に入ったら中央にポンと出て、看板を掲げる。
 * reveal に入ると小さくなって消える。帯より手前（z-index 60）に置く。
 * 動きは CSS の keyframes（transform と opacity だけ）。
 */
export function TransitionCharacter({ phase, label }: TransitionCharacterProps) {
  if (phase !== 'hold' && phase !== 'reveal') return null

  return (
    <div
      className="morph"
      data-out={phase === 'reveal' ? 'true' : 'false'}
      aria-hidden="true"
    >
      <div className="morph__stage">
        <div className="morph__signAnchor">
          <div className="morph__sign">{label}</div>
        </div>
        <div className="morph__chibi">
          <Chibi className="chibi--blink" />
        </div>
      </div>
    </div>
  )
}
