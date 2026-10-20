import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import type { Location } from 'react-router'
import { TRANSITION, directionTo, labelFor } from './config'
import type { Direction, Phase } from './config'
import { TransitionContext } from './context'
import type { TransitionContextValue } from './context'
import { TransitionCharacter } from './TransitionCharacter'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import { Wipe } from './Wipe'

type TransitionProviderProps = {
  readonly children: ReactNode
}

/**
 * 画面遷移を横取りする（docs/MOTION.md §6）。
 * - cover 完了時に URL（pushState）と表示内容を同時に差し替える
 * - popstate は逆方向のワイプにする
 * - 遷移中の navigate は無視し、タップ / Esc / Enter は早送り
 */
export function TransitionProvider({ children }: TransitionProviderProps) {
  const routerLocation = useLocation()
  const routerNavigate = useNavigate()
  const reduced = usePrefersReducedMotion()

  const [location, setLocationState] = useState<Location>(routerLocation)
  const locationRef = useRef(routerLocation)

  const [phase, setPhaseState] = useState<Phase>('idle')
  const phaseRef = useRef<Phase>('idle')
  const [direction, setDirection] = useState<Direction>('forward')
  const [signLabel, setSignLabel] = useState(() => labelFor(routerLocation.pathname))

  const transitioning = useRef(false)
  const fastForward = useRef(false)
  const queued = useRef<Location | null>(null)
  const pushedPath = useRef<string | null>(null)
  const cancelRequest = useRef<Location | null>(null)
  const holdTimer = useRef<number | null>(null)
  const timers = useRef<number[]>([])

  const setPhase = (next: Phase) => {
    phaseRef.current = next
    setPhaseState(next)
  }

  const setLocation = (next: Location) => {
    locationRef.current = next
    setLocationState(next)
  }

  const revealRef = useRef<() => void>(() => {})
  const finishRef = useRef<() => void>(() => {})
  const beginRef = useRef<(target: Location, dir: Direction, push: boolean) => void>(
    () => {},
  )

  revealRef.current = () => {
    holdTimer.current = null
    setPhase('reveal')
    timers.current.push(
      window.setTimeout(() => finishRef.current(), TRANSITION.revealTotal),
    )
  }

  finishRef.current = () => {
    setPhase('idle')
    transitioning.current = false

    // 遷移中に来た popstate は、最後の1つだけ使う
    const next = queued.current
    queued.current = null
    if (next && next.pathname !== locationRef.current.pathname) {
      beginRef.current(
        next,
        directionTo(locationRef.current.pathname, next.pathname),
        false,
      )
    }
  }

  beginRef.current = (target, dir, push) => {
    if (reduced) {
      setLocation(target)
      if (push) routerNavigate(target.pathname)
      window.scrollTo(0, 0)
      return
    }

    transitioning.current = true
    fastForward.current = false
    cancelRequest.current = null
    setDirection(dir)
    setSignLabel(labelFor(target.pathname))
    setPhase('cover')

    timers.current.push(
      window.setTimeout(() => {
        // cover 中に戻るが押されていたら、push せずにその場へ戻す
        const cancelled = cancelRequest.current
        cancelRequest.current = null

        if (cancelled) {
          setLocation(cancelled)
        } else {
          if (push) {
            pushedPath.current = target.pathname
            routerNavigate(target.pathname)
          }
          setLocation(target)
        }

        // スクロールする構成なので、差し替え時に先頭へ（MOTION §6）
        window.scrollTo(0, 0)
        setPhase('hold')

        holdTimer.current = window.setTimeout(
          () => revealRef.current(),
          fastForward.current ? TRANSITION.holdFast : TRANSITION.hold,
        )
      }, TRANSITION.coverTotal),
    )
  }

  const navigate = useCallback((to: string) => {
    if (transitioning.current) return
    if (to === locationRef.current.pathname) return

    const target: Location = {
      pathname: to,
      search: '',
      hash: '',
      state: null,
      key: `transition:${to}`,
    }
    beginRef.current(target, directionTo(locationRef.current.pathname, to), true)
  }, [])

  const skip = useCallback(() => {
    if (phaseRef.current === 'cover') {
      fastForward.current = true
      return
    }

    if (phaseRef.current === 'hold') {
      if (holdTimer.current !== null) {
        window.clearTimeout(holdTimer.current)
        holdTimer.current = null
      }
      revealRef.current()
    }
  }, [])

  useEffect(() => {
    // 自分の push で URL が変わっただけなら拾わない
    if (transitioning.current) {
      if (pushedPath.current === routerLocation.pathname) {
        pushedPath.current = null
        return
      }

      // cover 中（まだ push していない）なら、その遷移を取りやめる
      if (phaseRef.current === 'cover') {
        cancelRequest.current = routerLocation
        return
      }

      if (routerLocation.pathname !== locationRef.current.pathname) {
        queued.current = routerLocation
      }
      return
    }

    if (routerLocation.pathname === locationRef.current.pathname) return

    if (reduced) {
      setLocation(routerLocation)
      window.scrollTo(0, 0)
      return
    }

    // 遷移中に戻る/進むが来たら、終わってから最新の位置へ
    beginRef.current(
      routerLocation,
      directionTo(locationRef.current.pathname, routerLocation.pathname),
      false,
    )
  }, [routerLocation, reduced])

  // cover / hold の間はスクロールを止める（MOTION §6）
  useEffect(() => {
    const root = document.documentElement

    if (phase === 'idle') {
      root.classList.remove('is-transitioning')
      return
    }

    root.classList.add('is-transitioning')
    return () => root.classList.remove('is-transitioning')
  }, [phase])

  useEffect(() => {
    if (phase === 'idle') return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' && event.key !== 'Enter') return

      event.preventDefault()
      skip()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [phase, skip])

  useEffect(() => {
    const scheduled = timers.current
    return () => {
      scheduled.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  const value: TransitionContextValue = {
    phase,
    direction,
    location,
    navigate,
    skip,
  }

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <Wipe phase={phase} direction={direction} onSkip={skip} />
      <TransitionCharacter phase={phase} label={signLabel} />
    </TransitionContext.Provider>
  )
}
