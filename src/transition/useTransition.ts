import { useContext } from 'react'
import { TransitionContext } from './context'

export function useTransition() {
  const value = useContext(TransitionContext)

  if (!value) {
    throw new Error('useTransition は TransitionProvider の中で使う')
  }

  return value
}
