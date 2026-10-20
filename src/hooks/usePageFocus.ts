import { useEffect, useRef } from 'react'

/**
 * 遷移後に新しい見出しへフォーカスを移す（SPEC §8）。
 * 初回表示では動かさない。ワイプの cover 完了で呼ばれる。
 */
export function usePageFocus(pathname: string) {
  const lastPath = useRef(pathname)

  useEffect(() => {
    if (lastPath.current === pathname) return

    lastPath.current = pathname
    document.getElementById('page-title')?.focus({ preventScroll: true })
  }, [pathname])
}
