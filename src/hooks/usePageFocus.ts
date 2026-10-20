import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

/**
 * 遷移後に新しい見出しへフォーカスを移す（SPEC §8）。
 * 初回表示では動かさない。ワイプ遷移を入れたら TransitionProvider 側へ移す。
 */
export function usePageFocus() {
  const { pathname } = useLocation()
  const lastPath = useRef(pathname)

  useEffect(() => {
    if (lastPath.current === pathname) return

    lastPath.current = pathname
    document.getElementById('page-title')?.focus({ preventScroll: true })
  }, [pathname])
}
