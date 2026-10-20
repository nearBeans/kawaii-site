import { createContext } from 'react'
import type { Location } from 'react-router'
import type { Direction, Phase } from './config'

export type TransitionContextValue = {
  readonly phase: Phase
  readonly direction: Direction
  readonly location: Location
  readonly navigate: (to: string) => void
  readonly skip: () => void
}

export const TransitionContext = createContext<TransitionContextValue | null>(
  null,
)
